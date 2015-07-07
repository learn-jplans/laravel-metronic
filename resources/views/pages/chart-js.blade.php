<html>
<head>
	<title>Chart JS</title>
	<style type="text/css">
		.graph-content .chart {
			float: left;
		}

		.clearfix:before,
		.clearfix:after {
			content: " ";
			display: table;
			clear: both;
		}

		.graph-content .chart .inner {
			padding: 20px;
		}
	</style>
</head>
<body>
	<div class="graph-content clearfix">
		<div class="chart">
			<div class="inner">
				<canvas id="bar-chart" width="600" height="300" ></canvas>
			</div>
		</div>
		<div class="chart">
			<div class="inner">
				<canvas id="line-chart" width="600" height="300" ></canvas>
			</div>
		</div>
		<div class="chart">
			<div class="inner">
				<canvas id="pie-chart" width="600" height="300" ></canvas>
			</div>
		</div>
		<div class="chart">
			<div class="inner">
				<canvas id="doughnut-chart" width="600" height="300" ></canvas>
			</div>
		</div>
	</div>

<script type="text/javascript" src="/assets/global/plugins/jquery.min.js"></script>
<script type="text/javascript" src="/assets/global/Chart.min.js"></script>
<script src="/assets/global/underscore-min.js" type="text/javascript"></script>
<script src="/assets/js/app.js" type="text/javascript"></script>
<script type="text/javascript">
	$(document).ready(function(){
		App.JSChart.init();	
	})
</script>
</body>
</html>