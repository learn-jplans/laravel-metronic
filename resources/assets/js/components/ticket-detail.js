window.App = window.App || {};
window.App.TicketDetail = {
	//variables
	//lastUpdate timestamp this is use for filtering new tickets
	detailLastUpdate: 0,
	selectedTicket: false,
	modalVisible: false,
	template: {
		ticket_detail: $('#ticket-detail-template').html(),
		ticket_note: $('#ticket-note-template').html(),
		chat_item: $('#chat-item-template').html(),
		responder: $('#responder-template').html()
	},
	container: {
		ticket_detail: $('#ticket-detail-portlet .portlet-body'),
		ticket_note_parent: $('#dispatch-note-parent')
	},
	noteType: {
		ticket_note: 1,
		reporter_note: 2,
		responder_note: 3
	},
	modal: {
		ticket_detail: $('#ticket-detail-portlet')
	},

	init: function(){
		var self = this;
		self.bindHandlers();
	},

	bindHandlers: function(){
		var self = this;
		self.onLoad();
		self.actionEvents();
		self.keyEvents();
	},
	onLoad: function(){
		var self = this;
		$(document).ready(function(){
			var id = (window.location.hash).replace('#','');
			if(_.isEmpty(id)){return;}
			self.getTicketDetails(id);
		});
	},
	actionEvents: function(){
		var self = this;

		$(document).on('click','#dispatcher-btn', function(e){
			self.addDispatcherNote();
		});

		$(document).on('click','.history-child a', function(e){
			e.preventDefault();
			self.detailLastUpdate = 0;
			var id = $(this).attr('href').replace('#','');
			window.location.hash = id;
			self.getTicketDetails(id);
		});

		$(document).on('click', '#ticket-detail-portlet .tools .tool-close', function(e){
			e.preventDefault();
			window.location.hash = '';
			self.hideModal();
		});

		$(document).on('click', '.ticket-status-select li a', function(e){
			e.preventDefault();
			var data = $(this).data();
			var statusText = self.getStatus(data.val).trim().toLowerCase();
			var buttonText = $('.status-select a .ticket-status').text().trim().toLowerCase();

			if(buttonText === statusText){
				return;
			}

			self.updateTicketStatus(data.val);
			self.sendNote('Ticket status updated to "'+statusText+'"', self.noteType.reporter_note);
		});

		$(document).on('click', '#btn-select-responders', function(e){
			// $('#modal-select-responder').show();
			self.getResponders();
		});

		$(document).on('click', 'button.assign-responder', function(e){
			var data = $(this).data();
			self.assignResponder(data.id, $(this));
		});

		$(document).on('click', '#modal-select-responder .tools .tool-close, .modal-select-responder-close', function(e){
			$('#modal-select-responder').hide();
		});

		$(document).on('click','#view-map', function(e){
			e.preventDefault();
			var coords = $(this).data();
			var lat = coords.lat;
			var lng = coords.long;
			var id  = coords.id;

			var m = App.util.modal.init({
				'title': 'Map',
				// 'body': _.template( $('#select-dispatch-type-template').html() )(),
				'body': '<div id="dialog-map" class="dialog-map"></div>',
				'width': '600px',
				'footerClose': false,
				'footerButtons': [
					{
						'title': 'Close',
						'classes': ['btn', 'blue'],
						'callback': function(e) {
							// alert('loading map...');
							// dispatch();
							$('#'+e.data.modalId).hide();
							// $('#'+e.data.modalId).remove();
						}
					}
				]
			});
			// console.log(m);
			m.show();
			// console.log(m._options.id);
			var dialogId = m._options.id;
			var $mapContainer = $('#'+dialogId+' .modal-dialog .modal-content .modal-body #dialog-map');
			// console.log($mapContainer);
			// console.log(coords);
			if(App.Maps) {
				App.Maps.loadMap($mapContainer, null, function( self ) {
					self.getInitLocation(lat, lng);
					self.mapLoaded = true;
					self.addMarker(lat, lng, id);
				});
			}
		});
	},

	getStatus: function(status){
		var data = {
			'open' 	  : 'Open',
			'enroute' : 'Enroute',
			'on_site' : 'On Site',
			'close'   : 'Close'
		};
		return data[status];
	},

	getCategoryName: function(categoryId){
		var data = {
			1: 'Alert for Fire',
			2: 'Call Ambulance',
			3: 'Report a Crime',
			4: 'Panic',
			5: 'Emergency Button'
		};
		return data[categoryId];
	},

	setStatus: function(status){
		var self = this;
		var _status = self.getStatus(status);
		$('.status-select a .ticket-status').text(_status);
	},

	keyEvents: function(){
		var self = this;
		
		$(document).on('keypress', '#inputChatReporter', function(e){
			if(e.which === 13){
				e.preventDefault();
				self.addReporterNote();
			}
		});

		$(document).on('keypress', '#inputChatResponder', function(e){
			if(e.which === 13){
				e.preventDefault();
				self.addResponderNote();
			}
		});
	},

	addDispatcherNote: function(){
		var self = this;
		var notes = $('#dispatch-text-input').val();
		var allow = !_.isEmpty(notes);
		if(!allow){return;}
		self.sendNote(notes, self.noteType.ticket_note);
		// self.sendNote('Ticket status updated to "Open"', self.noteType.reporter_note);
		self.sendNote('Update Sent', self.noteType.responder_note);
		//for reporter notification
		$('.ticket-status-select li a[data-val="open"]').trigger('click');
		$('#dispatcher-btn').text('Update');
	},

	addReporterNote: function(){
		var self = this;
		var message = $('#inputChatReporter').val();
		var allow = !_.isEmpty(message);
		if(!allow){return;}
		self.sendNote(message, self.noteType.reporter_note);
	},

	addResponderNote: function(){
		var self = this;
		var message = $('#inputChatResponder').val();
		var allow = !_.isEmpty(message);
		if(!allow){return;}
		self.sendNote(message, self.noteType.responder_note);
	},

	sendNote: function(notes, noteType){
		var self = this;

		var data = {
			ticket_id : self.selectedTicket,
			notes     : notes,
			noteType  : noteType
		};
		if(!self.modalVisible && self.selectedTicket == false){
			return;
		}
		// console.log(data);
		$.ajax({
			url: '/tickets/update',
			type: 'POST',
			data: data,
			success: function(data){
				// console.log(data);
				if(data.status === 'ok'){
					self.detailLastUpdate = data.next;
					self.renderTicketDetails(data, noteType);
				}
			},
			error: function(response){

			}
		});
	},

	showResponderModal: function(){
		$('#modal-select-responder').show();
	},

	assignResponder: function(responderId, selector){
		var self = this;

		$parent = selector.parent();
		selector.prop('disabled', true)
				.find('i').addClass('glyphicon glyphicon-refresh spinning')
				.next().text('');
			
		$.ajax({
			url: '/tickets/assign-responders',
			type: 'POST',
			data: {ticket_id: self.selectedTicket, responder_id: responderId},
			success: function(data){
				console.log(data);
				if(data.status === 'ok'){
					// setTimeout(function(){
						selector.remove();
						$parent.text('ASSIGNED');
					// }, 1000);
					$('#units-selected').find('span').text(data.count_assigned);
				}
			},
			error: function(error){

			}
		});
	},

	getResponders: function(){
		var self = this;
		$.ajax({
			url: '/user/responders',
			type: 'GET',
			data: {},
			success: function(data){
				if(data.status === 'ok'){
					// console.log(data.responders);
					var data = self.sortResponders(data.responders);
					// console.log(data);
					self.showResponderModal();
					self.renderResponderUnits(data);
					
				}
			},
			error: function(error){

			}
		});
	},

	renderResponderUnits: function(responders){
		var self = this;
		$('#modal-select-responder').find('tbody').html("");
		$.each(responders, function(idx, r){
			var compiled = _.template(self.template.responder)({
				id: r.id,
				name: r.name,
				contact: r.contact_no,
				distance: App.util.format(r.distance)+'km'
			});
			$('#modal-select-responder').find('tbody').append(compiled);
		});
	},

	sortResponders: function(responders){
		var data = [];
		var coords = $('#view-map').data();
		var incLatLng = App.Maps.getLongLat(coords.lat, coords.long);
		// console.log('incLatLng :'+incLatLng);
		$.each(responders, function(idx, responder){
			// console.log(responder.first_name);
			// console.log(responder.profile.lat);
			// console.log(responder.profile.long);
			if(responder.profile){
				if(responder.profile.lat > 0 && responder.profile.long > 0){
					var rLatLng = App.Maps.getLongLat(responder.profile.lat, responder.profile.long);
					var r = {
						id: responder.id,
						name: responder.first_name+' '+responder.last_name,
						contact_no: responder.profile.mobile_number,
						lat: responder.profile.lat,
						lng: responder.profile.long,
						rLatLng: rLatLng,
						distance: App.Maps.computeDistance(incLatLng, rLatLng)
					};

					data.push(r);
				}
			}
		});

		return _.sortBy(data, 'distance');
	},

	getTicketDetails: function(id){
		var self = this;
		App.util.loader.show();
		$.ajax({
			url: '/tickets/'+id+'/updates',
			type: 'GET',
			data:{},
			success: function(data){
				if(data.status === 'ok'){
					self.selectedTicket = id;
					self.showModal(data);
					App.util.loader.hide();
				}
			},
			error: function(response){
				App.util.loader.hide();
			}
		});
	},

	updateTicketStatus: function(status){
		var self = this;
		$.ajax({
			url: '/tickets/update-status',
			type: 'POST',
			data: {id:self.selectedTicket, status: status},
			success: function(data){
				if(data.status === 'ok'){
					// console.log(status);
					// $('.status-select a .ticket-status').text(self.getStatus(status));
					self.setStatus(status);
				}
			},
			error: function(error){

			}
		});
	},

	fetchNewTicketDetails: function(){
		var self = this;
		var id = self.selectedTicket;
		// console.log('render details > '+id);
		if(!self.modalVisible && self.selectedTicket == false){
			return;
		}
		$.ajax({
			url: '/tickets/'+id+'/updates',
			type: 'GET',
			data:{last: self.detailLastUpdate},
			success: function(data){
				// console.log('running in detail...');
				// console.log(data);
				if(data.status === 'ok'){
					self.detailLastUpdate = data.next;
					self.setStatus(data.ticket.status);
					self.renderDispatcherNotes(data.ticketNotes);
					self.renderResponderNotes(data.responderNotes);
					if(window.user.group.id === 3){
						self.renderReporterNotes(data.reporterNotes);
					}
				}
				// console.log('detail...');
				self.checkNewTicketDetails();
			},
			error: function(response){
				self.checkNewTicketDetails();
			}
		});
	},

	checkNewTicketDetails: function(){
		var self = this;
		setTimeout(function(){
			self.fetchNewTicketDetails();
		}, 5000);
	},

	showModal: function(data){
		var self = this;//current object
		// console.log(data);
		var compiled = _.template(self.template.ticket_detail)({
			ticket 		  : data.ticket,
			ticketHistory : data.ticketHistory,
		});
		$('#ticket-detail-id').html(self.selectedTicket);
		$('#ticket-detail-header').html('- '+self.getCategoryName(data.ticket.category_id)+' Pressed at '+data.ticket.created_at);

		if(data.ticket.category_id === 4){
			$('#ticket-detail-portlet').find('.portlet-title').addClass('bg-blood')	
		}else{
			$('#ticket-detail-portlet').find('.portlet-title').removeClass('bg-blood')	
		}
		

		self.container.ticket_detail.html(compiled);//render basic info
		self.modal.ticket_detail.show();
		self.modalVisible = true;
		if(App.Maps) {
			App.Maps.loadMap($('#mini-map'), null, function( self ) {
				self.getInitLocation(data.ticket.lat, data.ticket.long);
				self.mapLoaded = true;
				self.addMarker(data.ticket.lat, data.ticket.long, data.ticket.id);
			});
		}

		//render chats, dispatcher notes (must be in polling)
		// self.renderDispatcherNotes(data.ticket.ticket_notes);
		// self.renderResponderNotes(data.ticket.responder_notes);
		// if(window.user.group.id === 3){
		// 	self.renderReporterNotes(data.ticket.reporter_notes);	
		// }
		var text = data.ticket.status === 'new' ? 'Dispatch' : 'Update';
		$('#dispatcher-btn').text(text);
		$('#units-selected').find('span').text(data.count_assigned);
		self.fetchNewTicketDetails();
		
		// console.log(window.user);
	},

	hideModal: function(){
		var self = this;
		self.modal.ticket_detail.hide();
		self.modalVisible = false;
		self.lastUpdate = 0;
	},

	renderTicketDetails: function(data, noteType) {
		var self = this;
		// if(_.isUndefined(noteType)){
		// 	self.renderDispatcherNotes(data);
		// 	self.renderReporterNotes(data);
		// 	return;
		// }
		switch(noteType){
			case self.noteType.ticket_note:
				 self.renderDispatcherNotes(data.ticketNotes);
				 $('#dispatch-text-input').val('');
			break;

			case self.noteType.reporter_note:
				 self.renderReporterNotes(data.ticketNotes);
				 $('#inputChatReporter').val('');
			break;

			case self.noteType.responder_note:
				 self.renderResponderNotes(data.ticketNotes);
				 $('#inputChatResponder').val('');
			break;
		}
		
	},

	renderDispatcherNotes: function(ticketNotes) {
		var self = this;
		
		$.each(ticketNotes, function(idx, ticketNote){
			var compiled = _.template(self.template.ticket_note)({
				ticketNote : ticketNote,
			});

			$('#dispatch-note-parent').append(compiled);
		});

		App.util.scrollBottom('#dispatch-note-parent');
	},

	renderReporterNotes: function(reporterNotes) {
		var self = this;
		$.each(reporterNotes, function(idx, reporterNote){
			var compiled = _.template(self.template.chat_item)({
				user    : reporterNote.user.first_name+' '+reporterNote.user.last_name,
				user_id	: reporterNote.user_id,
				message : reporterNote.notes
			});
			$('#reporter-chat-container').append(compiled);
		});

		App.util.scrollBottom('#reporter-chat-container');
	},

	renderResponderNotes: function(responderNotes){
		var self = this;
		$.each(responderNotes, function(idx, responderNote){
			var compiled = _.template(self.template.chat_item)({
				user    : responderNote.user.first_name+' '+responderNote.user.last_name,
				user_id	: responderNote.user_id,
				message : responderNote.notes
			});
			$('#responder-chat-container').append(compiled);
		});

		App.util.scrollBottom('#responder-chat-container');
	}
};

$(function(){
	App.TicketDetail.init();
});