@extends('layout.admin')
@section('content')
<div class="portlet box red-sunglo">
	<div class="portlet-title">
		<div class="caption">
			Products
		</div>
		<div class="tools">
			<a href="javascript:;" class="collapse" data-original-title="" title="">
			</a>
			
			<a href="javascript:;" class="reload" data-original-title="" title="">
			</a>
			<a href="javascript:;" class="fullscreen" data-original-title="" title="">
			</a>
			
		</div>
	</div>
	<div class="portlet-body" style="display: block;">
		<div class="table-responsive">
			<table class="table" id="product-table">
			<thead>
			<tr>
				<th>
					 #
				</th>
				<th>
					 Product ID
				</th>
				<th>
					 Description
				</th>
				<th>
					 Stocks
				</th>
				<th>
					 Unit Price
				</th>
			</tr>
			</thead>
			<tbody>

			</tbody>
			</table>
		</div>
	</div>
	<script id="product-template" type="text/template">
		<% _.each(products, function(product, i){ %>
			<tr>
				<td>
					 <%= i+1 %>
				</td>
				<td>
					 <%= product.product_id %>
				</td>
				<td>
					 <%= product.description %>
				</td>
				<td>
					 <%= product.stocks %>
				</td>
				<td>
					 <%= product.unit_price %>
				</td>
			</tr>
		<% }) %>
	</script>
</div>
@stop