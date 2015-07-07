window.App = window.App || {};
window.App.JSChart = {
	// context: { 
	// 	bar: $('#bar-chart').get(0).getContext("2d"),
	// 	doughnut: $('#doughnut-chart').get(0).getContext("2d"),
	// 	line: $('#line-chart').get(0).getContext("2d"),
	// 	pie: $('#pie-chart').get(0).getContext("2d"),
	// },
	chartOptions:
	{

	    ///Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,

	    //String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",

	    //Number - Width of the grid lines
	    scaleGridLineWidth : 1,

	    //Boolean - Whether to show horizontal lines (except X axis)
	    scaleShowHorizontalLines: true,

	    //Boolean - Whether to show vertical lines (except Y axis)
	    scaleShowVerticalLines: true,

	    //Boolean - Whether the line is curved between points
	    bezierCurve : false,

	    //Number - Tension of the bezier curve between points
	    bezierCurveTension : 0.4,

	    //Boolean - Whether to show a dot for each point
	    pointDot : true,

	    //Number - Radius of each point dot in pixels
	    pointDotRadius : 4,

	    //Number - Pixel width of point dot stroke
	    pointDotStrokeWidth : 1,

	    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	    pointHitDetectionRadius : 20,

	    //Boolean - Whether to show a stroke for datasets
	    datasetStroke : true,

	    //Number - Pixel width of dataset stroke
	    datasetStrokeWidth : 2,

	    //Boolean - Whether to fill the dataset with a colour
	    datasetFill : true,

	    //String - A legend template
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	},

	init: function(){
		var self = this;
		self.getTicketReport();
		// self.barLineGraph();

		// self.pieDoughnutGraph();
		// self.updateColor();
	},

	updateColor: function(context, data, options){
		if(_.isUndefined(options)){
			myObjBar = new Chart(context).Bar(data);
		}else{
			myObjBar = new Chart(context).Bar(data, options);	
		}

	    myObjBar.datasets[0].bars[0].fillColor = "red"; //bar 1
	    myObjBar.datasets[0].bars[1].fillColor = "orange"; //bar 2
	    myObjBar.datasets[0].bars[2].fillColor = "yellow"; //bar 3
	    myObjBar.datasets[0].bars[3].fillColor = "blue"; //bar 4
	    myObjBar.datasets[0].bars[4].fillColor = "green"; //bar 5

	    myObjBar.datasets[0].bars[0].highlightFill = "lightred"; //bar 1
	    myObjBar.datasets[0].bars[1].highlightFill = "lightorange"; //bar 2
	    myObjBar.datasets[0].bars[2].highlightFill = "lightyellow"; //bar 3
	    myObjBar.datasets[0].bars[3].highlightFill = "lightblue"; //bar 4
	    myObjBar.datasets[0].bars[4].highlightFill = "lightgreen"; //bar 5
	    
	    myObjBar.update();
	},

	getTicketReport: function(){
		var self = this,
			_labels = [],
			_data = [];

		var url = {
			allTickets: '/ticket/report',
			ticketsByCategory: '/ticket/category/report',
		};

		$.getJSON(url.ticketsByCategory, function(result){
			console.log(result);
			var barLineData = result.chart.bar_line;
			var pieDougData = result.chart.pie_dougnut;
			self.renderGraphBar(self.barContext(), barLineData, self.chartOptions);
			self.updateColor(self.barContext(), barLineData, self.chartOptions);

			self.renderGraphLine(self.lineContext(), barLineData, self.chartOptions);

			self.renderGraphPie(self.pieContext(), pieDougData);
			self.renderGraphDoughnut(self.doughnutContext(), pieDougData);

		});
	},



	barLineGraph: function(){
		var self = this;
		var chartData = {
			labels: ['May', 'June', 'July'],
			datasets: [
				{
					label:'1st data set',
					data: [200, 180, 290],
					fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,0.8)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
				},
				{
					label:'2nd data set',
					data: [120, 80, 300],
					fillColor: "rgba(151,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
				},
				{
					label:'3rd data set',
					data: [220, 280, 350],
					fillColor: "rgba(100,187,205,0.5)",
		            strokeColor: "rgba(100,187,205,0.8)",
		            highlightFill: "rgba(100,187,205,0.75)",
		            highlightStroke: "rgba(100,187,205,1)",
				}
			]
		};
		self.renderGraphBar(self.barContext(), chartData, self.chartOptions);
		self.renderGraphLine(self.lineContext(), chartData, self.chartOptions);
	},

	pieDoughnutGraph: function() {
		var self = this;
		var data = [
		    {
		        value: 300,
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: "Red"
		    },
		    {
		        value: 50,
		        color: "#46BFBD",
		        highlight: "#5AD3D1",
		        label: "Green"
		    },
		    {
		        value: 100,
		        color: "#FDB45C",
		        highlight: "#FFC870",
		        label: "Yellow"
		    }
		];

		self.renderGraphPie(self.pieContext(), data);
		self.renderGraphDoughnut(self.doughnutContext(), data);
	},

	barContext: function(){
		return $('#bar-chart').get(0).getContext("2d");	
	},
	lineContext: function(){
		return $('#line-chart').get(0).getContext("2d");
	},
	pieContext: function(){
		return $('#pie-chart').get(0).getContext("2d");
	},
	doughnutContext: function(){
		return $('#doughnut-chart').get(0).getContext("2d");
	},
	// bar: $('#bar-chart').get(0).getContext("2d"),
	// doughnut: $('#doughnut-chart').get(0).getContext("2d"),
	// line: $('#line-chart').get(0).getContext("2d"),
	// pie: $('#pie-chart').get(0).getContext("2d"),

	renderGraphBar: function(context, data, options){
		if(_.isUndefined(options)){
			new Chart(context).Bar(data);
		}else{
			new Chart(context).Bar(data, options);	
		}
	},
	renderGraphLine: function(context, data, options){
		if(_.isUndefined(options)){
			new Chart(context).Line(data);
		}else{
			new Chart(context).Line(data, options);	
		}
	},
	renderGraphPie: function(context, data, options){
		if(_.isUndefined(options)){
			new Chart(context).Pie(data);
		}else{
			new Chart(context).Pie(data, options);	
		}
	},
	renderGraphDoughnut: function(context, data, options){
		if(_.isUndefined(options)){
			new Chart(context).Doughnut(data);
		}else{
			new Chart(context).Doughnut(data, options);	
		}
	}
};

// $(function(){
// 	App.Report.init();
// });