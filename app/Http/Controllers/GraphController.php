<?php namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Request;
use App\Models\Ticket;
use DB;
// use Sentry;
// use Redirect;
// use View;
class GraphController extends BaseController {

	public function index()
	{	
		return redirect('/graph/chartjs');
	}
	public function chartJs()
	{
		return view('pages.chart-js');
	}
	public function googleChart()
	{
		return view('pages.google-chart');
	}

	public function getTicketReport()
	{
		$tickets = Ticket::select(
			DB::raw("DATE_FORMAT(created_at,'%M') AS date"),
			DB::raw("COUNT(*) AS total")
		)->groupBy(DB::raw('MONTH(created_at)'))->get();
		
		return response()->json([
			'status' => 'ok',
			'chart' => array(
				'bar_line' => array(
					'labels' => $tickets->lists('date'),
					'datasets' => array(
						[
							'label' => '1st data set',
							'data' => $tickets->lists('total'),
							'fillColor' => "rgba(220,220,220,0.5)",
				            'strokeColor' => "rgba(220,220,220,0.8)",
				            'highlightFill' => "rgba(220,220,220,0.75)",
				            'highlightStroke' => "rgba(220,220,220,1)",
						],
					)
				),
				'pie_dougnut' => array(
					[
						'value' => $tickets[0]['total'],
						'color' => "#F7464A",
						'highlight' => "#FF5A5E",
	        			'label' => $tickets[0]['date']
					],
					[
						'value' => $tickets[1]['total'],
						'color' => "#46BFBD",
	        			'highlight' => "#5AD3D1",
	        			'label' => $tickets[1]['date']
					],
					[
						'value' => $tickets[2]['total'],
						'color' => "#FDB45C",
	        			'highlight' => "#FFC870",
	        			'label' => $tickets[2]['date']
					],
				),
			)
		]);
	}

	public function getTicketsByCategory()
	{
		$ticketsFire = Ticket::where('category_id', 1)->count();
		$medical = Ticket::where('category_id', 2)->count();
		$crime = Ticket::where('category_id', 3)->count();
		$panic = Ticket::where('category_id', 4)->count();
		$emergency = Ticket::where('category_id', 5)->count();

		$category = ['Fire','Medical','Crime','Panic','Emergency'];

		return response()->json([
			'status' => 'ok',
			'chart' => array(
				'bar_line' => array(
					'labels' => $category,
					'datasets' => array(
						[
							'label' => '1st data set',
							'data' => [$ticketsFire, $medical, $crime, $panic, $emergency],
							'fillColor' => ["red","orange","blue","yellow","green"],
				            'strokeColor' => "rgba(220,220,220,0.8)",
				            'highlightFill' => "rgba(220,220,220,0.75)",
				            'highlightStroke' => "rgba(220,220,220,1)",
						],
					)
				),
				'pie_dougnut' => array(
					[
						'value' => $ticketsFire,
						'color' => "red",
						'highlight' => "lightred",
	        			'label' => $category[0]
					],
					[
						'value' => $medical,
						'color' => "orange",
	        			'highlight' => "lightorange",
	        			'label' => $category[1]
					],
					[
						'value' => $crime,
						'color' => "blue",
	        			'highlight' => "lightblue",
	        			'label' => $category[2]
					],
					[
						'value' => $panic,
						'color' => "yellow",
	        			'highlight' => "lightyellow",
	        			'label' => $category[3]
					],
					[
						'value' => $emergency,
						'color' => "green",
	        			'highlight' => "lightgreen",
	        			'label' => $category[4]
					],
				),
			),
			'googleChart' => [
				'barGroup' => [
					['Year','Fire','Medical','Crime','Panic','Emergency'],
					['2014', 100, 400, 200, 500, 100],
		          	['2015', 70, 460, 250, 300, 100],
		          	['2016', 60, 1120, 300, 400, 100],
		          	['2017', 30, 540, 350, 200, 100]
				],
				'doughnut' => [
					['Task', 'Hours per Day'],
				  	['Work',     11],
				  	['Eat',      2],
				  	['Commute',  2],
				  	['Watch TV', 2],
				  	['Sleep',    7]
				]
			],
		]);
	
	}

}
