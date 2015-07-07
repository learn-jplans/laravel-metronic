<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Group extends Model {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'groups';

	public static function getGroupIdsByNames($names = array()) {
		$ids = Group::whereIn('name', $names)->get(array('id'));
		return array_flatten($ids->toArray());
	}

}
