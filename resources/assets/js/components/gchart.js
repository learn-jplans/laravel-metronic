window.App = window.App || {};
window.App.GChart = {

	dataCollection:[],
	init: function() {
		var self = this;
		// google.setOnLoadCallback(self.drawChart);
		self.getData();
	},

	drawGroupChart: function(chartData) {
	      var data = google.visualization.arrayToDataTable(chartData);

	      var options = {
	        chart: {
	          title: 'Graph',
	          subtitle: 'Incident Report: 2014-2017',
	        },
	        bars: 'vertical',
	        vAxis: {format: 'decimal'},
	        height: 400,
	        colors: ['#1b9e77', '#d95f02', '#7570b3','red','blue']
	      };

	      var chart = new google.charts.Bar(document.getElementById('column-group'));

	      chart.draw(data, google.charts.Bar.convertOptions(options));
	},

	drawBarChart: function(chartData) {

	},

	drawDoughnutChart: function(chartData) {
		var data = google.visualization.arrayToDataTable(chartData);

        var options = {
          title: 'My Daily Activities',
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('doughnut'));
        chart.draw(data, options);
	},

	getData: function() {
		var self = this;
		$.ajax({
			url:'/ticket/category/report'
		})
		.done(function(data){
			if(data.status === 'ok'){
				var gbarData = data.googleChart.barGroup;
				self.drawGroupChart(gbarData);

				var dData = data.googleChart.doughnut;
				self.drawDoughnutChart(dData);
			}
		});
	}
};

// $(function(){
// 	App.GChart.init();
// });