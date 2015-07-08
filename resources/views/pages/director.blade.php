@extends('layout.app')
@section('content')
	
	<div class="row">
		<div class="col-md-6">
			<div class="portlet box blue static">
				<div class="portlet-title">
					<div class="caption">
						Doughnut Chart
					</div>
				</div>
				<div class="portlet-body">
					<div id="doughnut" class="chart">
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="portlet box blue static">
				<div class="portlet-title">
					<div class="caption">
						Bar Chart
					</div>
				</div>
				<div class="portlet-body">
					<div id="bar" class="chart">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div class="portlet box blue static">
				<div class="portlet-title">
					<div class="caption">
						Column Group Chart
					</div>
				</div>
				<div class="portlet-body">
					<div id="column-group" class="chart">
					<!-- <div id="column-group" class="chart"> -->
					</div>
				</div>
			</div>
		</div>
	</div>
@stop

@section('scripts')
<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['bar','corechart']}]}"></script>
<script type="text/javascript">
$(document).ready(function(){
	App.GChart.init();
});
</script>
@stop