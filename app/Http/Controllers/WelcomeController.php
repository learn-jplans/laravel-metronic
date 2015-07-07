<?php namespace App\Http\Controllers;

class WelcomeController extends SiteController {

	/*
	|--------------------------------------------------------------------------
	| Welcome Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders the "marketing page" for the application and
	| is configured to only allow guests. Like most of the other sample
	| controllers, you are free to modify or remove it as you desire.
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		$group = strtolower($this->userGroup->name);
		// if($group === 'dispatcher')
		// 	return view('pages.dispatcher');
		// else if($group === 'responderhq')
		// 	return view('pages.responder');
		// else
			switch ($group) {
				case 'dispatcher':
					return view('pages.dispatcher');
				case 'responderhq':
					return view('pages.responder');
				case 'director':
					return view('pages.director');
			}
	}

}
