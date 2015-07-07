<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Facades\Response;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller {

	public function getProducts()
	{
		$products = Product::all();

		return response()->json([
			'status' => 'ok',
			'products' => $products
		]);
	}

}
