window.App = window.App || {};
window.App.Ticket = {
	//variables
	//lastUpdate timestamp this is use for filtering new tickets
	lastUpdate: 0,
	template: {
		ticket_entry: $('#ticket-entry-template').html()
	},
	container: {
		ticket_entry: $('#ticket-entry-container')
	},
	//functions
	init: function(){
		var self = this;//current object

		self.bindHandlers();
		self.ticketTimer();
		self.fetchTickets();
	},

	bindHandlers: function(){
		var self = this;
		self.actionEvent();
		self.keyEvent();
		self.mouseEvent();
	},
	
	saveSelectedLatLong: function(lat, lng){
		console.log('saving coordinates...');
		console.log(lat);
		console.log(lng);
	},
	//action click event
	actionEvent: function(){
		var self = this;//current object
		$(document).on('click','#ticket-entry-container .ticket-entry', function(e){
			var $this = $(this);//self selector
			var data  = $this.data();

			App.TicketDetail.getTicketDetails(data.id);
		});
	},
	keyEvent: function(){
		$(document).on('keypress','#email', function(e){
			if(e.which === 13){
				console.log('email press');
				$('#password').focus();
			}
		});
		$(document).on('keypress','#password', function(e){
			if(e.which === 13){
				console.log('password press');
				$('#btnLogin').trigger('click');
			}
		});
	},
	//mouse event
	mouseEvent: function(){
		$(document).on('mouseover','#ticket-entry-container .ticket-entry', function(e){
			var $this = $(this);//self selector
			var data  = $this.data();
			//go to center of a marker
			App.Maps.bounceMarker(data.id, true);
		});

		$(document).on('mouseout','#ticket-entry-container .ticket-entry', function(e){
			var $this = $(this);//self selector
			var data  = $this.data();
			//reset marker
			App.Maps.bounceMarker(data.id, false);
		});


	},

	ticketTimer: function(){
		var self = this;//current object
		setInterval(function(){
			self.updateTicketTime();
		}, 1000);
	},

	updateTicketTime: function(){
		var self = this;//current object
		var $items = self.container.ticket_entry.find('.t-time');
		$.each($items, function(idx, item){
			var $item = $(item);
			var data  = $item.data();
			var time  = App.util.timeAgo(data.time);
			$item.html(time);
		});
	},

	fetchTickets: function(){
		var self = this;//current object

		$.ajax({
			url: '/tickets',
			type: 'GET',
			data: {last: self.lastUpdate},
			success: function(response){
				if(response.status === 'ok'){
					// console.log(response);
					self.renderTickets(response.tickets);
					self.updateTicketTime();
					//update lastUpdate if new tickets detected
					self.lastUpdate = response.next;
					if(response.tickets.length > 0){
						self.sortTickets();	
					}
				}
				//call itself after rendering is done
				self.checkNewTicket();
			},
			error: function(response){
				self.checkNewTicket();
			}
		});
	},

	sortTickets: function(){
		var self = this;
		self.container.ticket_entry.find('tr.ticket-entry').sortElements(function (a, b){
			//sort in descending order
			return $(a).data().timeUtc > $(b).data().timeUtc ? -1 : 1;
			//sort in ascending
			//return $(a).data().timeUtc > $(b).data().timeUtc ? 1 : -1;
		});
	},

	renderTickets: function(tickets){
		var self = this;//current object
		$.each(tickets, function(idx, ticket){
			var border_style = {
				1: 'bl-fire',
				2: 'bl-med',
				3: 'bl-crime',
				4: 'bl-panic',
				5: 'bl-emergency',
			};
			var icon = {
				1 : 'i-fire',
				2 : 'i-ambulance',
				3 : 'i-police',
				4 : 'i-alert',
			};
			var data = {
				ticket_id    	 : ticket.id,
				category_id  	 : ticket.category_id,
				notes        	 : ticket.notes,
				lat 		 	 : ticket.lat,
				lng 		 	 : ticket.long,
				created_time	 : ticket.created_at,
				created_time_utc : moment(ticket.created_at).format("X"),
				status 		 	 : ticket.status.split('_').join(' '),
				brdr_color 	 	 : border_style[ticket.category_id],
				status_color 	 : 't-status-'+ticket.status,
				icon 		 	 : icon[ticket.category_id]
			}
			var compiled = _.template(self.template.ticket_entry)(data);

			//append template data in container
			self.container.ticket_entry.append(compiled);

			//render ticket marker
			if(ticket.lat !== 0 && ticket.long !== 0){
				App.Maps.addMarker(ticket.lat, ticket.long, ticket.id);
			}
		});
	},

	checkNewTicket: function(){
		var self = this;//current object
		setTimeout(function(){
			//wait for 5 seconds to run te method
			self.fetchTickets();
		}, 5000);
	}
};

$(function(){
	App.Ticket.init();
});