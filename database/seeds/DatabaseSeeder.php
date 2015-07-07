<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Models\Product;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		$this->call('ProductTableSeeder');
	}

}

class ProductTableSeeder extends Seeder {

	public function run()
	{

		DB::table('product')->delete();

		Product::create([
			'product_id' => '001',
			'description' => 'Item #1',
			'stocks' => 100,
			'unit_price' => 1200
		]);
		Product::create([
			'product_id' => '002',
			'description' => 'Item #2',
			'stocks' => 70,
			'unit_price' => 1100
		]);
		Product::create([
			'product_id' => '003',
			'description' => 'Item #3',
			'stocks' => 12,
			'unit_price' => 600
		]);
		Product::create([
			'product_id' => '004',
			'description' => 'Item #4',
			'stocks' => 30,
			'unit_price' => 800
		]);
		Product::create([
			'product_id' => '005',
			'description' => 'Item #5',
			'stocks' => 30,
			'unit_price' => 800
		]);
		Product::create([
			'product_id' => '006',
			'description' => 'Item #6',
			'stocks' => 30,
			'unit_price' => 800
		]);
		Product::create([
			'product_id' => '007',
			'description' => 'Item #7',
			'stocks' => 30,
			'unit_price' => 800
		]);

		$this->command->info('Products table seeded');
	}
}
