/*
 * Map JS component for this project
 */

window.App = window.App || {};

window.App.Maps = {
	$mapContainer: $('#map-container'),
	defaultZoomLevel: 10,
	autoComplete: false,
	region: "PH",
	map: false,
	mapCenter: false,
	markers: {},
	mapBounds: false,
	userLocation: false,
	currentLocation: false,
	mapLoaded: false,
	selectedLat: 0,
	selectedLng: 0,
	default: {
		lat: 13.9490476,
		lng: 121.1579272,
		location: "Lipa Batangas, PH",
		zoomLevel: 13
	},
	mapStyle:  [
		{
			"featureType": "all",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#ffffff"
				}
			]
		},
		{
			"featureType": "all",
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 13
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#000000"
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#144b53"
				},
				{
					"lightness": 14
				},
				{
					"weight": 1.4
				}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [
				{
					"color": "#08304b"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#0c4152"
				},
				{
					"lightness": 5
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#000000"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#0b434f"
				},
				{
					"lightness": 25
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#000000"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#0b3d51"
				},
				{
					"lightness": 16
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				}
			]
		},
		// {
		// 	"featureType": "transit",
		// 	"elementType": "all",
		// 	"stylers": [
		// 		{
		// 			"color": "#146474"
		// 		}
		// 	]
		// },
		{
			"featureType": "transit",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#ffffff"
				}
			]
		},
		// {
		// 	"featureType": "transit",
		// 	"elementType": "labels.text.stroke",
		// 	"stylers": [
		// 		{
		// 			"color": "#000000"
		// 		},
		// 		{
		// 			"lightness": 13
		// 		}
		// 	]
		// },
		// {
		// 	"featureType": "transit",
		// 	"elementType": "labels.icon",
		// 	"stylers": [
		// 		{
		// 			"color": "#ffffff"
		// 		},
		// 	]
		// },
		{
			"featureType": "water",
			"elementType": "all",
			"stylers": [
				{
					"color": "#021019"
				}
			]
		}
	],

	init: function() {
		var self = this;
		self.loadMapScript();
	},

	loadMapScript: function() {
		var self = this;
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "//maps.googleapis.com/maps/api/js?v=3.exp&language=en&sensor=false&libraries=places,geometry&callback=App.Maps.mapScriptLoaded";
		document.body.appendChild(script);
	},

	mapScriptLoaded: function() {
		var self = this;

		self.loadMap( self.$mapContainer, null, function( self ) {
			self.getInitLocation();
			self.mapLoaded = true;
		} );
		
		// self.initMap();
		// self.getInitLocation();
		// self.mapLoaded = true;
	},

	// initMap: function() {
	// 	var self = this;

	// 	if (self.$mapContainer.length === 0) {
	// 		return false;
	// 	}

	// 	self.mapCenter = new google.maps.LatLng(self.default.lat, self.default.lng);
	// 	self.currentLocation = self.mapCenter;

	// 	var mapOptions = {
	// 		zoom: self.default.zoomLevel,
	// 		center: self.mapCenter,
	// 		options: {
	// 			styles: self.mapStyle
	// 		},
	// 		scrollwheel: false,
	// 		mapTypeControl: false,
	// 		panControl: false,
	// 		scaleControl: true,
	// 		zoomControl: true,
	// 		streetViewControl: false,
	// 		zoomControlOptions: {
	// 			style: google.maps.ZoomControlStyle.LARGE,
	// 			position: google.maps.ControlPosition.TOP_RIGHT
	// 		}
	// 	};

	// 	self.map = new google.maps.Map(self.$mapContainer.get(0), mapOptions);
	// },
	eventHandler: function(){
		var self = this;
		google.maps.event.addListener(self.map, "click", function (e) {

		    //lat and lng is available in e object
		    // var lat = e.latLng.lat();
		    // var lng = e.latLng.lng();
		    self.selectedLat = e.latLng.lat();
		    self.selectedLng = e.latLng.lng();
		    console.log('map module...');
		    console.log(self.selectedLat);
		    console.log(self.selectedLng);
		    App.Ticket.saveSelectedLatLong(self.selectedLat, self.selectedLng);
		});
	},
	loadMap: function( container, options, callback ) { //options === default
		var self = this;
		options = options || {};

		if( container.length === 0 ) {
			return false;
		}

		self.default = $.extend( self.default, options );

		self.mapCenter = new google.maps.LatLng(self.default.lat, self.default.lng);
		self.currentLocation = self.mapCenter;

		var mapOptions = {
			zoom: self.default.zoomLevel,
			center: self.mapCenter,
			options: {
				styles: self.mapStyle
			},
			scrollwheel: false,
			mapTypeControl: false,
			panControl: false,
			scaleControl: true,
			zoomControl: true,
			streetViewControl: false,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.TOP_RIGHT
			}
		};

		container.ready(function() { // make sure the container is rendered before rendering map
			self.map = new google.maps.Map( container[0], mapOptions );
			if( typeof callback === 'function' ) { callback( self ); }
		});
		self.eventHandler();
	},
	
	getInitLocation: function(lat,longtitude) {
		var self = this;
		if(lat,longtitude){
					self.mapCenter = new google.maps.LatLng(lat, longtitude);
					self.currentLocation = self.mapCenter;
					self.userLocation = self.mapCenter;
					self.map.setZoom(self.default.zoomLevel);
					self.map.setCenter(self.mapCenter);
					self.geolocationInProgress = false;

					self.initDefaultGeoInterval = setInterval(function(){
						if(!self.geolocationInProgress) {
								clearInterval(self.initDefaultGeoInterval);
							}
					}, 200);
		}else{
				if (navigator.geolocation) {

				self.geolocationInProgress = true;
				navigator.geolocation.getCurrentPosition(function(position) {
					console.log(position);
					self.mapCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					self.currentLocation = self.mapCenter;
					self.userLocation = self.mapCenter;
					self.map.setZoom(self.default.zoomLevel);
					self.map.setCenter(self.mapCenter);
					self.geolocationInProgress = false;
				}, function(error) {
					self.geolocationInProgress = false;
				}, { maximumAge: 600000, timeout:10000 });

				self.initDefaultGeoInterval = setInterval(function(){
					if(!self.geolocationInProgress) {
						clearInterval(self.initDefaultGeoInterval);
					}
				}, 200);
			}
		}
 

	},

	addMarker: function(lat, long, id) {
		var self = this;
		if (lat == 0 || long == 0) return false;
		if (self.mapLoaded) {

			var latLong = new google.maps.LatLng(lat,long);

			var marker = new google.maps.Marker({
				position: latLong,
				map: self.map,
				tag: 'ticket-'+id
			});

			self.markers[String(id)] = marker;
		} else {
			setTimeout(function() {
				self.addMarker(lat, long, id);
			}, 100);
		}

	},

	bounceMarker: function(id, on){
		var self = this;
		if (typeof self.markers[id] === "undefined") return false;
		if (typeof self.markers[id].isBounce == "undefined") self.markers[id].isBounce = !on;
		var marker = self.markers[id];

		if (marker.isBounce == on) return false;
		self.markers[id].isBounce = on;

		if (on) {
			marker.setAnimation(google.maps.Animation.BOUNCE);
			self.map.panTo(marker.getPosition());
		} else {
			marker.setAnimation(null);
		}

	},

	clearMarker: function(){
		var self = this;
		$.each(self.markers, function(idx, marker) {
			marker.setMap(null);
		});
		self.markers = [];
		self.mapBounds = false;
		self.currentStores = [];

	},

	getLongLat: function(lat, long){
		return new google.maps.LatLng(lat, long);
	},
	computeDistance: function(longlat1, longlat2){
		var _distance = google.maps.geometry.spherical.computeDistanceBetween(
			longlat1, longlat2
		);
		return _distance / 1000;//convert meters into km
	},
};

$(function(){
	App.Maps.init();
});