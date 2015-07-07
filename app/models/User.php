<?php namespace App\Models;

use Cartalyst\Sentry\Users\UserInterface;
use Cartalyst\Sentry\Users\Eloquent\User as SentryUserModel;
use App\Models\Group;

class User extends SentryUserModel implements UserInterface {

	/*
	 * No need to define the protected table variable since we are extending
	 * the Sentry User Model itself.
	 */

	// relationships
	public function profile()
	{
		return $this->hasOne('App\Models\UserProfile', 'user_id', 'id');
	}
	public function contacts()
	{
		return $this->hasMany('App\Models\UserContact', 'user_id', 'id');
	}
	public function ticketHistory()
	{
		return $this->hasMany('App\Models\Ticket', 'reporter_id', 'id');
	}

	public function group()
	{
		return $this->hasOne('App\Models\UserGroup', 'user_id', 'id');
	}

	public function getGroup()
	{
		$ug = UserGroup::where('user_id', '=', $this->id)->first();
		if(!$ug) { return false; }
		return Group::where('id', '=', $ug->group_id)->first();
	}

	public function scopeResponder($query)
	{
		return $query->whereHas('group', function($q){
			return $q->whereIn('group_id', Group::getGroupIdsByNames(['Responder']));
		});
	}

	public function getJSON()
	{
		$data = array(
			'id' => $this->id,
			'group' => $this->getGroup(),
			'email' => $this->email,
			'profile' => $this->profile
		);
		return json_encode($data);
	}
	
}
