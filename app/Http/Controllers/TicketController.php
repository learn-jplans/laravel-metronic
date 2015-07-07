<?php namespace App\Http\Controllers;

use App\Http\Requests;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Ticket;
use App\Models\TicketNote;
use App\Models\TicketResponder;
use App\Models\TicketReporterNote;
use App\Models\TicketResponderNote;
use App\Models\Group;
use App\Models\User;
use Input;
use Sentry;
use Config;

class TicketController extends SiteController {
	const TICKET_NOTE    = 1,
		  REPORTER_NOTE  = 2,
		  RESPONDER_NOTE = 3;

	public function __construct() {
		parent::__construct();
	}

	public function getTickets()
	{
		//get date now
		//initial poll value is beginning of time of the current date
		//the value will change depends on the newest ticket
		$last = Input::get('last', false);
		if($last == 0){
			$last = date('Y-m-d')." 00:00:00";
		}else{
			$last = date('Y-m-d H:i:s', $last);	
		}

		$user = $this->user;
		if(!$user){
			return response()->json([
				'msg' => 'Invalid user data',
				'status' => 'error',
				'user' => $user
			]);
		}

		$userGroup = $this->userGroup;
		if(!$userGroup){
			return response()->json([
				'msg' => 'Invalid user group',
				'status' => 'error',
				'userGroup' => $userGroup
			]);
		}

		//get tickets
		if(in_array( $userGroup->id, Group::getGroupIdsByNames(['Administrator', 'Dispatcher']) )) {
			$tickets = Ticket::where('created_at', '>', $last)->get();	
		} else {
			$tickets = Ticket::where('created_at', '>', $last)
							 ->where('status', '<>', 'new')
							 ->get();
		}
		

		if(is_null($tickets)){
			return response()->json([
				'status' => 'error',
				'msg' 	 => 'Invalid Request'
			]);			
		}

		//convert the last date
		//if no new tickets time value will remain
		$next = strtotime($last);

		//if true means the query detect new tickets from the last date
		//get the newest tickets
		//to be append via polling request
		//then get the last or newest ticket time
		//so that it will filter all new tickets and 
		//append in our tickets container
		if($tickets->count() > 0){
			//get the last ticket and get the date created
			//update time value if new tickets detected
			$next = strtotime($tickets->last()->created_at);
		}

		return response()->json([
			'status'  => 'ok',
			'tickets' => $tickets,
			'next'    => $next,
			'last' 	  => $last,
			'userGroup' => $user->userGroup
		]);
	}

	public function getTicketUpdates($id)
	{
		//get date now
		//initial poll value is beginning of time of the current date
		//the value will change depends on the newest ticket
		$last = Input::get('last', false);
		// if($last == 0){
		// 	$last = date('Y-m-d')." 00:00:00";
		// }else{
		// 	$last = date('Y-m-d H:i:s', $last);	
		// }
		if ($last == 0)
		{
			$last = "0000-00-00 00:00:00";
		}
		else
		{
			// if (is_numeric($last))
			// {
				$last = date('Y-m-d H:i:s', $last);
			// }
		}
		// $ticket = Ticket::with('reporter')
		// 				->with('reporterNotes')
		// 				->with('responderNotes')
		// 				->with('ticketNotes')
		// 				->find($id);

		$ticket = Ticket::with('reporter')->find($id);

		if(is_null($ticket)){
			return response()->json([
				'status' => 'error',
				'msg' 	 => 'Invalid request'
			]);
		}

		//dispatcher notes
		$ticketNotes = TicketNote::with('user')
								->where('ticket_id', $ticket->id)
								->where('created_at', '>', $last)
								->get();

		$nextTicketNote = 0;
		if($ticketNotes->count() > 0){
			$nextTicketNote = strtotime($ticketNotes->last()->created_at);
		}

		//reporter chats
		$reporterNotes = TicketReporterNote::with('user')
								->where('ticket_id', $ticket->id)
								->where('created_at', '>', $last)
								->get();

        $nextReporterNote = 0;
        if($reporterNotes->count() > 0){
        	$nextReporterNote = strtotime($reporterNotes->last()->created_at);
        }

        //responder chats
        $responderNotes = TicketResponderNote::with('user')
        						->where('ticket_id', $ticket->id)
								->where('created_at', '>', $last)
								->get();

		$nextResponderNote = 0;
		if($responderNotes->count() > 0){
			$nextResponderNote = strtotime($responderNotes->last()->created_at);
		}

		$next = max($nextTicketNote, $nextReporterNote, $nextResponderNote);
		if($next == 0) $next = strtotime($last);
        //history
		$ticketHistory = Ticket::where('id', '<>', $ticket->id)
							   ->where('reporter_id', $ticket->reporter_id)
							   ->orderBy('created_at', 'DESC')
							   ->get();

		$count_assigned = TicketResponder::filterResponder()->where('ticket_id', $ticket->id)->count();

		return response()->json([
			'status' 		 => 'ok',
			'ticket' 		 => $ticket,
			'ticketNotes'	 => $ticketNotes,
			'reporterNotes'  => $reporterNotes,
			'responderNotes' => $responderNotes,
			'next'			 => $next,
			'last'			 => $last,
			'ticketHistory'  => $ticketHistory,
			'count_assigned' => $count_assigned
		]);
	}

	public function postTicketStatus()
	{
		$ticket_id = Input::get('ticket_id');
		$notes 	   = Input::get('notes');
		$noteType  = Input::get('noteType');

		$ticket    = Ticket::find($ticket_id);

		if(is_null($ticket)){
			return response()->json([
				'status' 	  => 'error',
				'msg'	 	  => 'Invalid request',
				'error_trace' => 'null ticket'
			]);
		}
		// $user = @Sentry::findUserById(2);//temporary until auth implement
		$user = $this->user;
		if(!$user){
			return response()->json([
				'status' => 'error',
				'msg'	 => 'Invalid user data'
			]);
		}

		switch ($noteType) {
			case self::TICKET_NOTE:
				$ticketNote = new TicketNote();
				break;
			case self::REPORTER_NOTE:
				$ticketNote = new TicketReporterNote();
				break;
			case self::RESPONDER_NOTE:
				$ticketNote = new TicketResponderNote();
				break;	
			default:
				return response()->json([
					'status' 	  => 'error',
					'msg'	 	  => 'Invalid request',
					'error_trace' => 'undefined noteType'
				]);
		}

		if($ticket->status === 'new'){
			$ticket->status = 'open';
			$ticket->save();
		}

		$ticketNote->ticket_id = $ticket->id;
		$ticketNote->user_id   = $user->id;
		$ticketNote->notes	   = $notes;
		$ticketNote->save();

		$ticketNote->user 	   = $user;//set the data of user relation

		$next = strtotime($ticketNote->created_at);

		return response()->json([
			'status' 	 => 'ok',
			//we enclosed the var with bracket to make it an array because the 
			//rendering of dispatchernote method in js expect an array value to iterate
			'ticketNotes' => [$ticketNote],
			'next'		  => $next
			// 'ticket' => $ticket
		]);
	}

	public function updateTicketStatus()
	{
		$ticket_id = Input::get('id');
		$ticket_status = Input::get('status');

		if(empty($ticket_status) || empty($ticket_id)){
			return response()->json([
				'status' => 'error',
				'msg'	 => 'Invalid request'
			]);
		}

		$ticket = Ticket::find($ticket_id);
		if(is_null($ticket)){
			return response()->json([
				'status' => 'error',
				'msg'	 => 'Invalid ticket'
			]);
		}

		$statuses = array_keys(Config::get('e117.ticketStatus'));
		if(!in_array($ticket_status, $statuses)) {
			$res = array(
				"status" => "error",
				"msg"    => "Invalid Status."
			);
			return response()->json($res);
		}

		$ticket->status = $ticket_status;
		$ticket->save();

		return response()->json([
			'status' => 'ok',
			'ticket' => $ticket,
		]);
	}

	public function getResponders()
	{
		$responders = User::responder()->get();
		$responderIds = array();//list of available responders

		foreach ($responders as $responder) {
			$tickets = TicketResponder::where('user_id', $responder->id)->get();
			$allClose = true;
			
			foreach ($tickets as $ticket) {//fetch all tickets of
				$t = Ticket::find($ticket->id);//check one ticket if not close
				if(!$t || $t->status != 'close'){
					$allClose = false;
					break;
				}
			}
			if($allClose){
				//append responder if all his tickets were closed
				$responderIds[] = $responder->id;
			}
		}

		$responders = User::with('profile')->whereIn('id', $responderIds)->get();

		// $tickets = Ticket::
		if(is_null($responders)){
			return response()->json([
				'status' => 'error',
				'msg' => 'null responders'
			]);
		}

		return response()->json([
			'status' 	 => 'ok',
			'responders' => $responders,
		]);
	}

	public function postAssignResponder()
	{
		$ticket_id = Input::get('ticket_id');
		$responder_id = Input::get('responder_id');

		$ticket = Ticket::find($ticket_id);
		if(is_null($ticket)){
			return response()->json([
				'status' => 'error',
				'msg' => 'Invalid Ticket'
			]);
		}

		$exist = TicketResponder::where('ticket_id', $ticket_id)
								->where('user_id', $responder_id)
								->first();

		if($exist){
			return response()->json([
				'status' => 'error',
				'msg'	=> 'Responder already exist on this ticket'
			]);
		}

		$ticketResponder = new TicketResponder();
		$ticketResponder->ticket_id = $ticket_id;
		$ticketResponder->user_id = $responder_id;
		$ticketResponder->save();

		$count_assigned = TicketResponder::filterResponder()->where('ticket_id', $ticket_id)->count();

		return response()->json([
			'status' => 'ok',
			'count_assigned' => $count_assigned
		]);
	}

}
