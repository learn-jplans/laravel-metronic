<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class TicketResponderNote extends Model {

	protected $table = 'ticket_responder_notes';

	public function user()
	{
		return $this->hasOne('App\Models\User', 'id', 'user_id');
	}
}
