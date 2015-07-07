<?php namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Request;
use Sentry;
use Redirect;
use View;
class SiteController extends BaseController {

	public $user = false;
	public $userGroup = false;
	public $userGroups = false;

	public function __construct() {
		//not login
		if(!Sentry::check()){
			Redirect::to('/auth')->send();
		}

		$this->user = Sentry::getUser();
		$this->userGroups = $this->user->getGroups();
		$this->userGroup = $this->user->getGroups()->first();

		//share user data in views
		View::share('user', $this->user);
		View::share('userGroup', $this->userGroup);
	}

}
