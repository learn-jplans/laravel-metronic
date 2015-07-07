<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Input;
use Sentry;
class AuthController extends Controller {

	public function index()
	{
		return $this->getLogin();
	}

	public function getLogin()
	{
		if(Sentry::check()){
			return redirect('/');
		}
		return view('pages.login');
	}

	public function postLogin()
	{
		$email = Input::get('email');
		$password = Input::get('password');
		$remember = Input::get('remember');

		$credentials = array(
			'email' => $email,
			'password' => $password
		);

		$valid = true;
		$error_message = '';

		try {
			$user = Sentry::authenticate($credentials, $remember == 1);
		} catch (\Exception $e) {
			$valid = false;
			$error_message = 'Invalid email and/or password.';
		}

		if(!$valid){
			return view('pages.login')->with('error_message', $error_message);
		}

		return redirect('/');
	}

	public function logout()
	{
		Sentry::logout();
		return redirect('/auth');
	}
}
