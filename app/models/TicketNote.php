<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class TicketNote extends Model {

	protected $table = 'ticket_notes';
	// protected $fillable = array('user_id', 'notes');

	public function user()
	{
		return $this->hasOne('App\Models\User', 'id', 'user_id');
	}
}
