App.util = {
	format: function(n){
		return n.toFixed(2).replace(/./g, function(c, i, a) {
			return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
		});
	},
	timeAgo: function(from) {
		var self = this;
		var fromTime = moment(from);
		var diff = moment().diff(fromTime, "seconds");
		if (diff < 60) {
			return diff+"s";
		}

		diff = moment().diff(fromTime, "minutes");
		if (diff < 60) {
			return diff+"m";
		}

		diff = moment().diff(fromTime, "hours");
		if (diff < 24) {
			return diff+"h";
		}

		diff = moment().diff(fromTime, "days");
		if (diff < 7) {
			return diff+"d";
		}

		diff = moment().diff(fromTime, "weeks");
		if (diff < 4) {
			return diff+"w";
		}

		diff = moment().diff(fromTime, "months");
		return diff+"mo";
	},

	loader: {
		show: function() {
			$.LoadingOverlay("show");
		},
		hide: function() {
			// setTimeout(function(){
			//     $.LoadingOverlay("hide");
			// }, 1000);
			$.LoadingOverlay("hide");
		}
	},
	//if position is undefined default scroll would be bottom
	scroll: function(position, selector){
		if(_.isUndefined(position))
			$(selector).animate({'scrollTop' : 0}, 'fast');
		else
			$(selector).animate({'scrollTop' : $(selector)[0].scrollHeight}, 'fast');
	},

	scrollTop: function(selector){
		var self = this;
		self.scroll(selector);
	},

	scrollBottom: function(selector){
		var self = this;
		self.scroll('bottom', selector);
	},
	modal: {
		_modalNumber: 0,
		_options: {
			id: '',
			headerClose: true,
			title: 'Modal Title',
			body: 'Modal Body',
			footerClose: true,
			keyboard: false,
			backdrop: 'static',
			width: false,
			footerButtons: [ // Note: follow template below
				// {
				// 	'title': 'test',
				// 	'classes': ['btn', 'blue', 'btn-test'],
				// 	'attr': {
				// 		'x': '1',
				// 		'y': 'abc',
				// 	},
				// 	'callback': function(e) {
				// 		console.log('test callback for ' + e.data.modalId);
				// 	}
				// }
			],
			callback: function() {},
		},
		_html: "",
		init: function( options ) {
			return $.extend(true, {}, App.util.modal)._init( options );
		},
		_init: function( options ) {
			this._options = $.extend( this._options, options );
			this._generateId();
			this._generateModalHTML();
			return this;
		},
		show: function() {
			this._html.modal().show();
		},
		remove: function() {
			$('#' + this._options.id).remove();
		},
		_generateId: function() {
			var generated = _.uniqueId('e117-modal-');
			this._options.id = (this._options.id === '') ? _.uniqueId('e117-modal-') : this._options.id ;
			this._modalNumber = generated.split('-')[2];
		},
		_generateModalHTML: function() {
			this._html = $('<div/>').addClass('modal fade')
				.attr('id', this._options.id)
				.attr('tabindex', this._modalNumber)
				.attr('role', 'dialog')
				.attr('aria-hidden', 'true')
				.attr('data-backdrop', 'static')
				.attr('data-keyboard', 'false');

			var modalDialog = $('<div/>').addClass('modal-dialog');
			if(this._options.width) {
				modalDialog.css({
					'width': this._options.width,
				});
			}
			modalDialog.appendTo(this._html);

			var modalContent = $('<div/>').addClass('modal-content');
			modalContent.appendTo(modalDialog);

			var modalHeader = $('<div/>').addClass('modal-header');
			modalHeader.appendTo(modalContent);

			// header close
			if(this._options.headerClose) {
				$('<button/>').addClass('close')
					.attr('type', 'button')
					.attr('data-dismiss', 'modal')
					.attr('aria-hidden', 'true')
					.appendTo(modalHeader);
			}

			// title
			$('<h4/>').addClass('modal-title').text(this._options.title).appendTo(modalHeader);

			// body
			$('<div/>').addClass('modal-body').html(this._options.body).appendTo(modalContent);

			var modalFooter = $('<div/>').addClass('modal-footer');
			modalFooter.appendTo(modalContent);

			// footer close
			if(this._options.footerClose) {
				$('<button/>').addClass('btn default')
					.attr('type', 'button')
					.attr('data-dismiss', 'modal')
					.text('Close')
					.appendTo(modalFooter);
			}

			for(var i in this._options.footerButtons) {
				if( typeof this._options.footerButtons[i] !== 'object' ) continue;
				var classes = (this._options.footerButtons[i].classes) ? this._options.footerButtons[i].classes.join(' ') : '';
				$('<button/>').addClass(classes)
					.text(this._options.footerButtons[i].title)
					.on( 'click', null, { 'modalId': this._options.id }, this._options.footerButtons[i].callback )
					.appendTo(modalFooter);
			}

			if(modalFooter.html() === '') { modalFooter.addClass('hide'); }

			$('body').append(this._html);

			if(typeof this._options.callback === 'function') { this._options.callback(); }
		}
	}
};