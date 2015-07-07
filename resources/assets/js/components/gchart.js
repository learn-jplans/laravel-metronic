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
		// var data = google.visualization.arrayToDataTable(chartData);
		var data = google.visualization.arrayToDataTable([
	        ["Element", "Density", { role: "style" } ],
	        ["Copper", 8.94, "#b87333"],
	        ["Silver", 10.49, "silver"],
	        ["Gold", 19.30, "gold"],
	        ["Platinum", 21.45, "color: #e5e4e2"]
	    ]);

	    var view = new google.visualization.DataView(data);
	    var options = {
	    	legend: {position:'none'}
	    };

	    var chart = new google.visualization.BarChart(document.getElementById('bar'));

	    chart.draw(view, options);
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

				self.drawBarChart();
			}
		});
	}
};

// $(function(){
// 	App.GChart.init();
// });