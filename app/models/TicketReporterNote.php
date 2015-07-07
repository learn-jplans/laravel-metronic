<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class TicketReporterNote extends Model {

	protected $table = 'ticket_reporter_notes';

	public function user()
	{
		return $this->hasOne('App\Models\User', 'id', 'user_id');
	}
}
