<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Ticket extends Model {

	protected $table = 'tickets';

	public function reporter()
	{
		return $this->hasOne('App\Models\User', 'id', 'reporter_id')
					->with('profile')
					->with('contacts');
	}

	public function ticketNotes()
	{
		return $this->hasMany('App\Models\TicketNote', 'ticket_id', 'id')
					->with('user');
	}

	public function reporterNotes()
	{
		return $this->hasMany('App\Models\TicketReporterNote', 'ticket_id', 'id')
					->with('user');
	}

	public function responderNotes()
	{
		return $this->hasMany('App\Models\TicketResponderNote', 'ticket_id', 'id')
					->with('user');
	}

	public function category()
	{
		return $this->hasOne('App\Models\Category', 'id', 'category_id');
	}
	// public function scopeTicketHistoryFilter($query, $id)
	// {
	// 	return $query->where('ids', '<>', $id);
	// }
}
