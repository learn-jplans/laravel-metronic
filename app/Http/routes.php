<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Route::get('/', 'WelcomeController@index');

// Route::get('home', 'HomeController@index');

// Route::controllers([
// 	'auth' => 'Auth\AuthController',
// 	'password' => 'Auth\PasswordController',
// ]);

Route::get('/', 'WelcomeController@index');
Route::get('products', 'ProductController@getProducts');

Route::get('tickets', 'TicketController@getTickets');
Route::get('tickets/{id}/updates', 'TicketController@getTicketUpdates');
Route::post('tickets/update', 'TicketController@postTicketStatus');
Route::post('tickets/update-status', 'TicketController@updateTicketStatus');
Route::post('tickets/assign-responders', 'TicketController@postAssignResponder');

Route::get('auth', 'AuthController@index');
Route::get('auth/login', 'AuthController@getLogin');
Route::post('auth/login', 'AuthController@postLogin');
Route::get('auth/logout', 'AuthController@logout');

Route::get('user/responders', 'TicketController@getResponders');

Route::get('graph', 'GraphController@index');
Route::get('graph/chartjs', 'GraphController@chartJs');
Route::get('graph/google','GraphController@googleChart');

Route::get('ticket/report', 'GraphController@getTicketReport');
Route::get('ticket/category/report', 'GraphController@getTicketsByCategory');

Route::get('jplans', function(){
	return 'Hello jplans';
});

