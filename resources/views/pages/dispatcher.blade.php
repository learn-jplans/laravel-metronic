@extends('layout.app')
@section('content')
<!-- GMap -->
<div id="map-container" class="map-container"></div>

<div id="map-overlay-container" class="map-overlay-container">
	<!-- Tickets -->
	<div class="portlet box red-sunglo ticket-portlet">
		<div class="portlet-title">
			<div class="caption">
				Tickets
			</div>
			<div class="tools">
				<a href="javascript:;" class="collapse" data-original-title="" title="">
				</a>
				
				<a href="javascript:;" class="reload" data-original-title="" title="">
				</a>
				
			</div>
		</div>
		<div class="portlet-body">
			<table class="table table-hover ticket-table">
			<tbody id="ticket-entry-container">
			</tbody>
			</table>
		</div>
	</div>
	<!-- Tickets -->
</div>

<!-- Ticket Modal -->
<div id="ticket-detail-portlet" class="portlet box green-meadow ticket-detail-portlet">
	<div class="portlet-title portlet-header">
		<div class="caption">
			<i class="fa fa-heart-o"></i>Tickets ID: <span id="ticket-detail-id"></span>
			<span id="ticket-detail-header">- Panic Pressed at 17:13 12/23/2015</span>
		</div>
		<div class="actions pull-left status">
		</div>
		<div class="tools">
			<a href="javascript:;" class="tool-close"  ><i class="retina-the-essentials-024"></i></a>
		</div>
	</div>
	<div class="portlet-body">
		
	</div>
</div>
<!-- Ticket Modal -->

<!-- Ticket Modal Template -->
<script type="text/template" id="ticket-detail-template">
<%
var icon = ["","fa fa-fire","fa fa-plus-square","fa fa-shield","fa fa-exclamation-triangle","fa fa-exclamation-triangle"];

var reporter 		 = ticket.reporter,
	reporterProfile  = ticket.reporter.profile,
	reporterContacts = ticket.reporter.contacts;
%>
<div class="profile-container">
	<div class="profile-title">
		<h4 class="bold uppercase">Reporter Information</h4>
	</div>
	<div class="profile-avatar">

	</div>
	<ul class="profile-info no-style">
		<li class="profile-name"><%= reporter.first_name+' '+reporter.last_name %></li>
		<li class="other-info">Prior Medical Condition</li>
		<li class="other-info">No Prior Incident History</li>
		<li class="other-info"><%= reporterProfile.mobile_number %></li>
	</ul>
	<ul class="nav nav-tabs" id="tab">
		<li class="active dispatch tab1">
			<a href="#tab-profile" data-toggle="tab" aria-expanded="true" >
			<span>Profile</span></a>
		</li>
		<li class="dispatch tab2">
			<a href="#tab-medical" data-toggle="tab" aria-expanded="false" >
			<span>Medical</span> <i class="fa fa-exclamation-circle"></i></a>
		</li>
		<li class="dispatch tab3">
			<a href="#tab-history" data-toggle="tab" aria-expanded="false" >
			<span>History</span> </a>
		</li>
	</ul>
	<div class="tab-content">
		<div class="tab-pane fade active in" id="tab-profile">
			<ul class="profile-detail no-style">
				<li><span class="detail-label">Mobile #: </span><%= reporterProfile.mobile_number %></li>
				<li><span class="detail-label">Home Address: </span><%= reporterProfile.address %></li>
				<li><span class="detail-label">Home #: </span><%= reporterProfile.telephone_number %></li>
				<li><span class="detail-label">Office Address: </span><%= reporterProfile.office_address %></li>
				<li><span class="detail-label">Office #: </span><%= reporterProfile.office_no %></li>
				<li><span class="detail-label">Emergency Contact:</li>
				<% $.each(reporterContacts, function(idx, contact) { %>
					<li><%= contact.first_name+' '+contact.last_name+' '+contact.mobile_number %></li>
				<% }); %>
				<li><span class="detail-label">Occupation: </span><%= reporterProfile.occupation%></li>
			</ul>
		</div>
		<div class="tab-pane fade" id="tab-medical">
			<div class="medical-container">
				<div class="medical-info">
					<h5>BLOOD TYPE</h5>
					<p><%= reporterProfile.blood_type %></p>
				</div>
				<div class="medical-info">
					<h5>KNOWN ALLERGIES</h5>
					<p><%= (reporterProfile.allergies) ? (reporterProfile.allergies).replace(/\|/g,', ') : '' %></p>
				</div>
				<div class="medical-info">
					<h5>KNOWN CONDITIONS</h5>
					<p><%= (reporterProfile.medical_conditions) ? (reporterProfile.medical_conditions).replace(/\|/g,', ') : '' %></p>
				</div>
			</div>
		</div>
		<div class="tab-pane fade" id="tab-history">
			<ul class="history-parent no-style">
				<% $.each(ticketHistory, function(idx, ticket){ %>
					<li class="history-child">
						<a href="#<%= ticket.id %>" data-id="<%= ticket.id %>">
							<div class="ticket-date"><%= $.datepicker.formatDate('mm/dd/yy', new Date(ticket.created_at)) %></div>
							<div class="ticket-desc"><%= ticket.notes %></div>
							<div class="ticket-icon <%= icon[ticket.category_id] %>"></div>
						</a>
					</li>
				<% }); %>
			</ul>
			
		</div>
	</div>
</div>
<div class="detail-container">
	<div class="col1">
		<div class="original-details-container box-border">
			<div class="box-header">
				<div class="od-title bold uppercase">ORIGINAL DETAILS</div>
				<div class="od-status">
					<span>STATUS: </span>
					<div class="btn-group status-select">
						<a class="btn dropdown-toggle dropdown-bg" href="javascript:;" data-toggle="dropdown" aria-expanded="true">
						<span class="ticket-status">New</span> <i class="fa fa-angle-down"></i>
						</a>
						<ul class="dropdown-menu pull-right ticket-status-select">
							@foreach( Config::get('e117.ticketStatus') as $key => $val )
							@if($key != 'new')
							<li>
								<a href="javascript:;" data-val="{{{ $key }}}">
									@if($key == 'open')
										<text class="l-yellow">
									@elseif($key == 'enroute')
										<text class="l-blue">
									@elseif($key == 'on_site')
										<text class="l-green">
									@elseif($key == 'close')
										<text class="l-dark">
									@else
										<text class="">
									@endif
										{{{ $val }}}
										</text>
									</a>
							</li>
							@endif
							@endforeach
						</ul>
					</div>
				</div>
			</div>
			<div class="od-content box-body">
				<ul class="no-style">
					<li>Latitude: <%= ticket.lat %>°, Longtitude:<%= ticket.long %>° , Notes: <%= ticket.notes %>. 
						<a id="view-map" data-lat="<%= ticket.lat %>" data-long="<%= ticket.long %>" data-id="<%= ticket.id %>" class="view-map">View Map</a>
					</li>
					<li>MEDICAL: <%= (reporterProfile.medical_conditions) ? (reporterProfile.medical_conditions).replace(/\|/g,', ') : '' %> </li>
					<li>MOBILE #: <%= reporterProfile.mobile_number %> </li>
					<li>EMERGENCY CONTACT: 
						<% $.each(reporterContacts, function(idx, contact){ %>
							<%= contact.first_name+' '+contact.last_name+' '+contact.mobile_number+ ' ' %>
						<% }); %>
					</li>
					<li>HOME ADDRESS: <%= reporterProfile.address %> </li>
					<li>OFFICE ADDRESS: <%= reporterProfile.office_address %></li>
				</ul>
			</div>
			<div class="od-attachment">
				<div class="bold uppercase attachment-title">Attachments</div>
				<div class="media-container">
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
					<div class="media-thumb">
					</div>
				</div>
			</div>
		</div>
		<div class="dispatcher-container box-border">
			<div class="box-header uppercase bold d-title">Dispatcer notes</div>
			<div class="d-content">
				<ul id="dispatch-note-parent" class="no-style dispatch-note-parent">
					
				</ul>
				<textarea id="dispatch-text-input" rows="2"></textarea>
				<button type="button" class="btn gray" id="dispatcher-btn">Dispatch</button>
			</div>
		</div>
	</div>
	<div class="col2">
		<div id="mini-map" class="mini-map box-border"></div>
		<div class="chat-box box-border">
			<div class="box-header bold uppercase chat-box-title">Reporter</div>
			<ul id="reporter-chat-container" class="chat-container no-style">
			</ul>
			<input type="text" id="inputChatReporter" class="chat-input" placeholder="Type a message here..." />
		</div>

		<div class="chat-box box-border">
			<div class="box-header bold uppercase chat-box-title">Responder</div>
			<ul id="responder-chat-container" class="chat-container no-style">
			</ul>
			<input type="text" id="inputChatResponder" class="chat-input" placeholder="Type a message here..." />
		</div>
	</div>
</div>
</script>
<!-- end Ticket Modal Template -->

<!-- Ticket Entries Template -->
<script type="text/template" id="ticket-entry-template">
	<tr class="ticket-entry" id="<%= 'ticket-'+ticket_id %>" data-id="<%= ticket_id %>" data-lat="<%= lat %>" data-long="<%= lng %>" data-time-utc="<%= created_time_utc %>">
		<td class="t-time <%= brdr_color %>" data-time="<%= created_time %>"></td>	
		<td class="t-id">&num;<%= ticket_id %></td>
		<td class="t-title"><%= notes %></td>
		<td class="t-icon"><i class="<%= icon %>"></i></td>
		<td class="t-status <%= status_color %>"><%= status %></td>
	</tr>
</script>

<!-- Ticket Note Template -->
<script type="text/template" id="ticket-note-template">
<li class="dispatch-note-item box-border">
	<p class="reporter-time"><%= ticketNote.user.first_name+' '+ticketNote.user.last_name+' '+ticketNote.created_at %></p>
	<p class="dispatch-note"><%= ticketNote.notes %></p>
</li>
</script>

<!-- Chat Item Template -->
<script type="text/template" id="chat-item-template">
<li class="chat-item clearfix">
	<div class="chat-avatar <%= user_id == this.user.id ? 'float-left' : 'float-right' %>"></div>
	<div class="chat-content <%= user_id == this.user.id ? 'float-right arrow-box-left' : 'float-left arrow-box-right' %>">
		<span class="chat-user-name bold"><%= user %></span>
		<p class="chat-message"><%= message %></p>
	</div>
</li>
</script>

<!-- Image Item Template -->
<script type="text/template" id="image-item-template">
	<div class="media">
	</div>
</script>

@stop