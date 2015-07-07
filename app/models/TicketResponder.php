<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class TicketResponder extends Model {
	public $timestamps = false;
	protected $table = 'tickets_responders';
	// protected $fillable = array('user_id', 'notes');

	public function user()
	{
		return $this->hasOne('App\Models\User', 'id', 'user_id');
	}
	
	public function group()
	{
		return $this->hasOne('App\Models\UserGroup', 'user_id', 'user_id');
	}

	public function scopeFilterResponder($query)
	{
		return $query->whereHas('group', function($q){
			return $q->whereIn('group_id', Group::getGroupIdsByNames(['Responder']));
		});
	}
}
