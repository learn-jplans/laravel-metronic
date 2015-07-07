/*
 * Helper JS component for this project
 */

// generate guid
var guid = function() {
	var S4 = function() {
		return Math.floor(Math.random() * 0x10000).toString(16); /* 65536 */
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

function gcd (a, b) {
	return (b == 0) ? a : gcd (b, a%b);
}

String.prototype.trunc = String.prototype.trunc ||
function(n){
	return this.length>n ? this.substr(0,n-1)+'&hellip;' : this;
};

/*
 * updating indexOf array based function
 */
if(!Array.indexOf) {
	Array.prototype.indexOf = function(obj){
		for(var i=0; i<this.length; i++){
			if(this[i]==obj){
				return i;
			}
		}
		return -1;
	};
}

Array.prototype.contains = function ( needle ) {
	for (i in this) {
		if (this[i] == needle) return true;
	}
	return false;
};

Array.prototype.clean = function(deleteValue) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == deleteValue) {
			this.splice(i, 1);
			i--;
		}
	}
	return this;
};

// Escape regex chars with \
RegExp.escape = function(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

String.prototype.isJSON = function() {
	try {
		JSON.parse(this);
	} catch (e) {
		return false;
	}
	return true;
};

String.prototype.getExt = function() {
	var re = /(?:\.([^.]+))?$/;
	return re.exec(this)[1];
};

String.prototype.slugify = function() {
	var text = this.replace(/[^-a-zA-Z0-9\s_]+/ig, '');
	text = text.replace(/-/gi, "_");
	text = text.replace(/\s/gi, "-");
	return text;
};

// ie7 & ie8
if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

String.prototype.capitalize = function() {
	return this.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};


// to count json array
getSize = function(obj) {
	var keys = [];
	for(var key in obj){
		keys.push(key);
	}
	return keys.length;
};

// The style function
jQuery.fn.style = function(styleName, value, priority) {
	// DOM node
	var node = this.get(0);
	// Ensure we have a DOM node
	if (typeof node == 'undefined') {
		return;
	}
	// CSSStyleDeclaration
	var style = this.get(0).style;
	// Getter/Setter
	if (typeof styleName != 'undefined') {
		if (typeof value != 'undefined') {
			// Set style property
			var priority = typeof priority != 'undefined' ? priority : '';
			style.setProperty(styleName, value, priority);
		} else {
			// Get style property
			return style.getPropertyValue(styleName);
		}
	} else {
		// Get CSSStyleDeclaration
		return style;
	}
};

var MD5 = function (string) {

	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}

	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}

	function F(x,y,z) { return (x & y) | ((~x) & z); }
	function G(x,y,z) { return (x & z) | (y & (~z)); }
	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }

	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};

	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}

	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

	return temp.toLowerCase();
}

/**
 * jQuery.fn.sortElements
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode;
 *   })
 *
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){

	var sort = [].sort;

	return function(comparator, getSortable) {

		getSortable = getSortable || function(){return this;};

		var placements = this.map(function(){

			var sortElement = getSortable.call(this),
				parentNode = sortElement.parentNode,

			// Since the element itself will change position, we have
			// to have some way of storing its original position in
			// the DOM. The easiest way is to have a 'flag' node:
				nextSibling = parentNode.insertBefore(
					document.createTextNode(''),
					sortElement.nextSibling
				);

			return function() {

				if (parentNode === this) {
					throw new Error(
						"You can't sort elements if any one is a descendant of another."
					);
				}

				// Insert before flag:
				parentNode.insertBefore(this, nextSibling);
				// Remove flag:
				parentNode.removeChild(nextSibling);

			};

		});

		return sort.call(this, comparator).each(function(i){
			placements[i].call(getSortable.call(this));
		});

	};

})();

/******************************
 * jQuery snippets
 ******************************/
(function( $ ){

	$.extend($.expr[':'],{
		// JQUERY SELECTOR PARENTS
		parents: function(a,i,m) {
			return jQuery(a).parents(m[3]).length > 0;
		},
		// JQUERY SELECTOR CONTAINS CASE INSENSITIVE
		icontains : function(obj, index, meta, stack) {
			return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;
		},
		// JQUERY SELECTOR TAGNAME
		tagname : function(elem, index, match) {
			var regex = new RegExp(String(match[3]).replace(/^\s+|\s+$/g,''), 'ig');
			return regex.test(String($(elem)[0]['tagName']));
		},
		// JQUERY SELECTOR RegExp
		regex : function(elem, index, match) {

			var matchParams = match[3].split(','),
				validLabels = /^(data|css):/,
				attr = {
					method: matchParams[0].match(validLabels) ?
						matchParams[0].split(':')[0] : 'attr',
					property: matchParams.shift().replace(validLabels,'')
				},
				regexFlags = 'ig',
				regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
			return regex.test($(elem)[attr.method](attr.property));
		}
	});

})( jQuery );

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
	var cache = {};

	this.tmpl = function tmpl(str, data){
		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = !/\W/.test(str) ?
			cache[str] = cache[str] ||
			tmpl(document.getElementById(str).innerHTML) :

			// Generate a reusable function that will serve as a template
			// generator (and which will be cached).
			new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +

					// Introduce the data as local variables using with(){}
				"with(obj){p.push('" +

					// Convert the template into pure JavaScript
				str
					.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'")
				+ "');}return p.join('');");

		// Provide some basic currying to the user
		return data ? fn( data ) : fn;
	};
})();


/*! jQuery UI - v1.11.4 - 2015-04-16
 * http://jqueryui.com
 * Includes: core.js, position.js
 * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
	/*!
	 * jQuery UI Core 1.11.4
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/ui-core/
	 */


// $.ui might exist from components with no dependencies, e.g., $.ui.position
	$.ui = $.ui || {};

	$.extend( $.ui, {
		version: "1.11.4",

		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	});

// plugins
	$.fn.extend({
		scrollParent: function( includeHidden ) {
			var position = this.css( "position" ),
				excludeStaticParent = position === "absolute",
				overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				scrollParent = this.parents().filter( function() {
					var parent = $( this );
					if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
						return false;
					}
					return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) + parent.css( "overflow-x" ) );
				}).eq( 0 );

			return position === "fixed" || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
		},

		uniqueId: (function() {
			var uuid = 0;

			return function() {
				return this.each(function() {
					if ( !this.id ) {
						this.id = "ui-id-" + ( ++uuid );
					}
				});
			};
		})(),

		removeUniqueId: function() {
			return this.each(function() {
				if ( /^ui-id-\d+$/.test( this.id ) ) {
					$( this ).removeAttr( "id" );
				}
			});
		}
	});

// selectors
	function focusable( element, isTabIndexNotNaN ) {
		var map, mapName, img,
			nodeName = element.nodeName.toLowerCase();
		if ( "area" === nodeName ) {
			map = element.parentNode;
			mapName = map.name;
			if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
				return false;
			}
			img = $( "img[usemap='#" + mapName + "']" )[ 0 ];
			return !!img && visible( img );
		}
		return ( /^(input|select|textarea|button|object)$/.test( nodeName ) ?
				!element.disabled :
				"a" === nodeName ?
				element.href || isTabIndexNotNaN :
					isTabIndexNotNaN) &&
				// the element and all of its ancestors must be visible
			visible( element );
	}

	function visible( element ) {
		return $.expr.filters.visible( element ) &&
			!$( element ).parents().addBack().filter(function() {
				return $.css( this, "visibility" ) === "hidden";
			}).length;
	}

	$.extend( $.expr[ ":" ], {
		data: $.expr.createPseudo ?
			$.expr.createPseudo(function( dataName ) {
				return function( elem ) {
					return !!$.data( elem, dataName );
				};
			}) :
			// support: jQuery <1.8
			function( elem, i, match ) {
				return !!$.data( elem, match[ 3 ] );
			},

		focusable: function( element ) {
			return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
		},

		tabbable: function( element ) {
			var tabIndex = $.attr( element, "tabindex" ),
				isTabIndexNaN = isNaN( tabIndex );
			return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
		}
	});

// support: jQuery <1.8
	if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
		$.each( [ "Width", "Height" ], function( i, name ) {
			var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
				type = name.toLowerCase(),
				orig = {
					innerWidth: $.fn.innerWidth,
					innerHeight: $.fn.innerHeight,
					outerWidth: $.fn.outerWidth,
					outerHeight: $.fn.outerHeight
				};

			function reduce( elem, size, border, margin ) {
				$.each( side, function() {
					size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
					if ( border ) {
						size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
					}
					if ( margin ) {
						size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
					}
				});
				return size;
			}

			$.fn[ "inner" + name ] = function( size ) {
				if ( size === undefined ) {
					return orig[ "inner" + name ].call( this );
				}

				return this.each(function() {
					$( this ).css( type, reduce( this, size ) + "px" );
				});
			};

			$.fn[ "outer" + name] = function( size, margin ) {
				if ( typeof size !== "number" ) {
					return orig[ "outer" + name ].call( this, size );
				}

				return this.each(function() {
					$( this).css( type, reduce( this, size, true, margin ) + "px" );
				});
			};
		});
	}

// support: jQuery <1.8
	if ( !$.fn.addBack ) {
		$.fn.addBack = function( selector ) {
			return this.add( selector == null ?
					this.prevObject : this.prevObject.filter( selector )
			);
		};
	}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
	if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
		$.fn.removeData = (function( removeData ) {
			return function( key ) {
				if ( arguments.length ) {
					return removeData.call( this, $.camelCase( key ) );
				} else {
					return removeData.call( this );
				}
			};
		})( $.fn.removeData );
	}

// deprecated
	$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

	$.fn.extend({
		focus: (function( orig ) {
			return function( delay, fn ) {
				return typeof delay === "number" ?
					this.each(function() {
						var elem = this;
						setTimeout(function() {
							$( elem ).focus();
							if ( fn ) {
								fn.call( elem );
							}
						}, delay );
					}) :
					orig.apply( this, arguments );
			};
		})( $.fn.focus ),

		disableSelection: (function() {
			var eventType = "onselectstart" in document.createElement( "div" ) ?
				"selectstart" :
				"mousedown";

			return function() {
				return this.bind( eventType + ".ui-disableSelection", function( event ) {
					event.preventDefault();
				});
			};
		})(),

		enableSelection: function() {
			return this.unbind( ".ui-disableSelection" );
		},

		zIndex: function( zIndex ) {
			if ( zIndex !== undefined ) {
				return this.css( "zIndex", zIndex );
			}

			if ( this.length ) {
				var elem = $( this[ 0 ] ), position, value;
				while ( elem.length && elem[ 0 ] !== document ) {
					// Ignore z-index if position is set to a value where z-index is ignored by the browser
					// This makes behavior of this function consistent across browsers
					// WebKit always returns auto if the element is positioned
					position = elem.css( "position" );
					if ( position === "absolute" || position === "relative" || position === "fixed" ) {
						// IE returns 0 when zIndex is not specified
						// other browsers return a string
						// we ignore the case of nested elements with an explicit value of 0
						// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
						value = parseInt( elem.css( "zIndex" ), 10 );
						if ( !isNaN( value ) && value !== 0 ) {
							return value;
						}
					}
					elem = elem.parent();
				}
			}

			return 0;
		}
	});

// $.ui.plugin is deprecated. Use $.widget() extensions instead.
	$.ui.plugin = {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args, allowDisconnected ) {
			var i,
				set = instance.plugins[ name ];

			if ( !set ) {
				return;
			}

			if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
				return;
			}

			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	};


	/*!
	 * jQuery UI Position 1.11.4
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/position/
	 */

	(function() {

		$.ui = $.ui || {};

		var cachedScrollbarWidth, supportsOffsetFractions,
			max = Math.max,
			abs = Math.abs,
			round = Math.round,
			rhorizontal = /left|center|right/,
			rvertical = /top|center|bottom/,
			roffset = /[\+\-]\d+(\.[\d]+)?%?/,
			rposition = /^\w+/,
			rpercent = /%$/,
			_position = $.fn.position;

		function getOffsets( offsets, width, height ) {
			return [
				parseFloat( offsets[ 0 ] ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
				parseFloat( offsets[ 1 ] ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
			];
		}

		function parseCss( element, property ) {
			return parseInt( $.css( element, property ), 10 ) || 0;
		}

		function getDimensions( elem ) {
			var raw = elem[0];
			if ( raw.nodeType === 9 ) {
				return {
					width: elem.width(),
					height: elem.height(),
					offset: { top: 0, left: 0 }
				};
			}
			if ( $.isWindow( raw ) ) {
				return {
					width: elem.width(),
					height: elem.height(),
					offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
				};
			}
			if ( raw.preventDefault ) {
				return {
					width: 0,
					height: 0,
					offset: { top: raw.pageY, left: raw.pageX }
				};
			}
			return {
				width: elem.outerWidth(),
				height: elem.outerHeight(),
				offset: elem.offset()
			};
		}

		$.position = {
			scrollbarWidth: function() {
				if ( cachedScrollbarWidth !== undefined ) {
					return cachedScrollbarWidth;
				}
				var w1, w2,
					div = $( "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>" ),
					innerDiv = div.children()[0];

				$( "body" ).append( div );
				w1 = innerDiv.offsetWidth;
				div.css( "overflow", "scroll" );

				w2 = innerDiv.offsetWidth;

				if ( w1 === w2 ) {
					w2 = div[0].clientWidth;
				}

				div.remove();

				return (cachedScrollbarWidth = w1 - w2);
			},
			getScrollInfo: function( within ) {
				var overflowX = within.isWindow || within.isDocument ? "" :
						within.element.css( "overflow-x" ),
					overflowY = within.isWindow || within.isDocument ? "" :
						within.element.css( "overflow-y" ),
					hasOverflowX = overflowX === "scroll" ||
						( overflowX === "auto" && within.width < within.element[0].scrollWidth ),
					hasOverflowY = overflowY === "scroll" ||
						( overflowY === "auto" && within.height < within.element[0].scrollHeight );
				return {
					width: hasOverflowY ? $.position.scrollbarWidth() : 0,
					height: hasOverflowX ? $.position.scrollbarWidth() : 0
				};
			},
			getWithinInfo: function( element ) {
				var withinElement = $( element || window ),
					isWindow = $.isWindow( withinElement[0] ),
					isDocument = !!withinElement[ 0 ] && withinElement[ 0 ].nodeType === 9;
				return {
					element: withinElement,
					isWindow: isWindow,
					isDocument: isDocument,
					offset: withinElement.offset() || { left: 0, top: 0 },
					scrollLeft: withinElement.scrollLeft(),
					scrollTop: withinElement.scrollTop(),

					// support: jQuery 1.6.x
					// jQuery 1.6 doesn't support .outerWidth/Height() on documents or windows
					width: isWindow || isDocument ? withinElement.width() : withinElement.outerWidth(),
					height: isWindow || isDocument ? withinElement.height() : withinElement.outerHeight()
				};
			}
		};

		$.fn.position = function( options ) {
			if ( !options || !options.of ) {
				return _position.apply( this, arguments );
			}

			// make a copy, we don't want to modify arguments
			options = $.extend( {}, options );

			var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
				target = $( options.of ),
				within = $.position.getWithinInfo( options.within ),
				scrollInfo = $.position.getScrollInfo( within ),
				collision = ( options.collision || "flip" ).split( " " ),
				offsets = {};

			dimensions = getDimensions( target );
			if ( target[0].preventDefault ) {
				// force left top to allow flipping
				options.at = "left top";
			}
			targetWidth = dimensions.width;
			targetHeight = dimensions.height;
			targetOffset = dimensions.offset;
			// clone to reuse original targetOffset later
			basePosition = $.extend( {}, targetOffset );

			// force my and at to have valid horizontal and vertical positions
			// if a value is missing or invalid, it will be converted to center
			$.each( [ "my", "at" ], function() {
				var pos = ( options[ this ] || "" ).split( " " ),
					horizontalOffset,
					verticalOffset;

				if ( pos.length === 1) {
					pos = rhorizontal.test( pos[ 0 ] ) ?
						pos.concat( [ "center" ] ) :
						rvertical.test( pos[ 0 ] ) ?
							[ "center" ].concat( pos ) :
							[ "center", "center" ];
				}
				pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
				pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";

				// calculate offsets
				horizontalOffset = roffset.exec( pos[ 0 ] );
				verticalOffset = roffset.exec( pos[ 1 ] );
				offsets[ this ] = [
					horizontalOffset ? horizontalOffset[ 0 ] : 0,
					verticalOffset ? verticalOffset[ 0 ] : 0
				];

				// reduce to just the positions without the offsets
				options[ this ] = [
					rposition.exec( pos[ 0 ] )[ 0 ],
					rposition.exec( pos[ 1 ] )[ 0 ]
				];
			});

			// normalize collision option
			if ( collision.length === 1 ) {
				collision[ 1 ] = collision[ 0 ];
			}

			if ( options.at[ 0 ] === "right" ) {
				basePosition.left += targetWidth;
			} else if ( options.at[ 0 ] === "center" ) {
				basePosition.left += targetWidth / 2;
			}

			if ( options.at[ 1 ] === "bottom" ) {
				basePosition.top += targetHeight;
			} else if ( options.at[ 1 ] === "center" ) {
				basePosition.top += targetHeight / 2;
			}

			atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
			basePosition.left += atOffset[ 0 ];
			basePosition.top += atOffset[ 1 ];

			return this.each(function() {
				var collisionPosition, using,
					elem = $( this ),
					elemWidth = elem.outerWidth(),
					elemHeight = elem.outerHeight(),
					marginLeft = parseCss( this, "marginLeft" ),
					marginTop = parseCss( this, "marginTop" ),
					collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) + scrollInfo.width,
					collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) + scrollInfo.height,
					position = $.extend( {}, basePosition ),
					myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );

				if ( options.my[ 0 ] === "right" ) {
					position.left -= elemWidth;
				} else if ( options.my[ 0 ] === "center" ) {
					position.left -= elemWidth / 2;
				}

				if ( options.my[ 1 ] === "bottom" ) {
					position.top -= elemHeight;
				} else if ( options.my[ 1 ] === "center" ) {
					position.top -= elemHeight / 2;
				}

				position.left += myOffset[ 0 ];
				position.top += myOffset[ 1 ];

				// if the browser doesn't support fractions, then round for consistent results
				if ( !supportsOffsetFractions ) {
					position.left = round( position.left );
					position.top = round( position.top );
				}

				collisionPosition = {
					marginLeft: marginLeft,
					marginTop: marginTop
				};

				$.each( [ "left", "top" ], function( i, dir ) {
					if ( $.ui.position[ collision[ i ] ] ) {
						$.ui.position[ collision[ i ] ][ dir ]( position, {
							targetWidth: targetWidth,
							targetHeight: targetHeight,
							elemWidth: elemWidth,
							elemHeight: elemHeight,
							collisionPosition: collisionPosition,
							collisionWidth: collisionWidth,
							collisionHeight: collisionHeight,
							offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
							my: options.my,
							at: options.at,
							within: within,
							elem: elem
						});
					}
				});

				if ( options.using ) {
					// adds feedback as second argument to using callback, if present
					using = function( props ) {
						var left = targetOffset.left - position.left,
							right = left + targetWidth - elemWidth,
							top = targetOffset.top - position.top,
							bottom = top + targetHeight - elemHeight,
							feedback = {
								target: {
									element: target,
									left: targetOffset.left,
									top: targetOffset.top,
									width: targetWidth,
									height: targetHeight
								},
								element: {
									element: elem,
									left: position.left,
									top: position.top,
									width: elemWidth,
									height: elemHeight
								},
								horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
								vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
							};
						if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
							feedback.horizontal = "center";
						}
						if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
							feedback.vertical = "middle";
						}
						if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
							feedback.important = "horizontal";
						} else {
							feedback.important = "vertical";
						}
						options.using.call( this, props, feedback );
					};
				}

				elem.offset( $.extend( position, { using: using } ) );
			});
		};

		$.ui.position = {
			fit: {
				left: function( position, data ) {
					var within = data.within,
						withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
						outerWidth = within.width,
						collisionPosLeft = position.left - data.collisionPosition.marginLeft,
						overLeft = withinOffset - collisionPosLeft,
						overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
						newOverRight;

					// element is wider than within
					if ( data.collisionWidth > outerWidth ) {
						// element is initially over the left side of within
						if ( overLeft > 0 && overRight <= 0 ) {
							newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
							position.left += overLeft - newOverRight;
							// element is initially over right side of within
						} else if ( overRight > 0 && overLeft <= 0 ) {
							position.left = withinOffset;
							// element is initially over both left and right sides of within
						} else {
							if ( overLeft > overRight ) {
								position.left = withinOffset + outerWidth - data.collisionWidth;
							} else {
								position.left = withinOffset;
							}
						}
						// too far left -> align with left edge
					} else if ( overLeft > 0 ) {
						position.left += overLeft;
						// too far right -> align with right edge
					} else if ( overRight > 0 ) {
						position.left -= overRight;
						// adjust based on position and margin
					} else {
						position.left = max( position.left - collisionPosLeft, position.left );
					}
				},
				top: function( position, data ) {
					var within = data.within,
						withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
						outerHeight = data.within.height,
						collisionPosTop = position.top - data.collisionPosition.marginTop,
						overTop = withinOffset - collisionPosTop,
						overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
						newOverBottom;

					// element is taller than within
					if ( data.collisionHeight > outerHeight ) {
						// element is initially over the top of within
						if ( overTop > 0 && overBottom <= 0 ) {
							newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
							position.top += overTop - newOverBottom;
							// element is initially over bottom of within
						} else if ( overBottom > 0 && overTop <= 0 ) {
							position.top = withinOffset;
							// element is initially over both top and bottom of within
						} else {
							if ( overTop > overBottom ) {
								position.top = withinOffset + outerHeight - data.collisionHeight;
							} else {
								position.top = withinOffset;
							}
						}
						// too far up -> align with top
					} else if ( overTop > 0 ) {
						position.top += overTop;
						// too far down -> align with bottom edge
					} else if ( overBottom > 0 ) {
						position.top -= overBottom;
						// adjust based on position and margin
					} else {
						position.top = max( position.top - collisionPosTop, position.top );
					}
				}
			},
			flip: {
				left: function( position, data ) {
					var within = data.within,
						withinOffset = within.offset.left + within.scrollLeft,
						outerWidth = within.width,
						offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
						collisionPosLeft = position.left - data.collisionPosition.marginLeft,
						overLeft = collisionPosLeft - offsetLeft,
						overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
						myOffset = data.my[ 0 ] === "left" ?
							-data.elemWidth :
							data.my[ 0 ] === "right" ?
								data.elemWidth :
								0,
						atOffset = data.at[ 0 ] === "left" ?
							data.targetWidth :
							data.at[ 0 ] === "right" ?
								-data.targetWidth :
								0,
						offset = -2 * data.offset[ 0 ],
						newOverRight,
						newOverLeft;

					if ( overLeft < 0 ) {
						newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
						if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
							position.left += myOffset + atOffset + offset;
						}
					} else if ( overRight > 0 ) {
						newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
						if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
							position.left += myOffset + atOffset + offset;
						}
					}
				},
				top: function( position, data ) {
					var within = data.within,
						withinOffset = within.offset.top + within.scrollTop,
						outerHeight = within.height,
						offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
						collisionPosTop = position.top - data.collisionPosition.marginTop,
						overTop = collisionPosTop - offsetTop,
						overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
						top = data.my[ 1 ] === "top",
						myOffset = top ?
							-data.elemHeight :
							data.my[ 1 ] === "bottom" ?
								data.elemHeight :
								0,
						atOffset = data.at[ 1 ] === "top" ?
							data.targetHeight :
							data.at[ 1 ] === "bottom" ?
								-data.targetHeight :
								0,
						offset = -2 * data.offset[ 1 ],
						newOverTop,
						newOverBottom;
					if ( overTop < 0 ) {
						newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
						if ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) {
							position.top += myOffset + atOffset + offset;
						}
					} else if ( overBottom > 0 ) {
						newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
						if ( newOverTop > 0 || abs( newOverTop ) < overBottom ) {
							position.top += myOffset + atOffset + offset;
						}
					}
				}
			},
			flipfit: {
				left: function() {
					$.ui.position.flip.left.apply( this, arguments );
					$.ui.position.fit.left.apply( this, arguments );
				},
				top: function() {
					$.ui.position.flip.top.apply( this, arguments );
					$.ui.position.fit.top.apply( this, arguments );
				}
			}
		};

// fraction support test
		(function() {
			var testElement, testElementParent, testElementStyle, offsetLeft, i,
				body = document.getElementsByTagName( "body" )[ 0 ],
				div = document.createElement( "div" );

			//Create a "fake body" for testing based on method used in jQuery.support
			testElement = document.createElement( body ? "div" : "body" );
			testElementStyle = {
				visibility: "hidden",
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				background: "none"
			};
			if ( body ) {
				$.extend( testElementStyle, {
					position: "absolute",
					left: "-1000px",
					top: "-1000px"
				});
			}
			for ( i in testElementStyle ) {
				testElement.style[ i ] = testElementStyle[ i ];
			}
			testElement.appendChild( div );
			testElementParent = body || document.documentElement;
			testElementParent.insertBefore( testElement, testElementParent.firstChild );

			div.style.cssText = "position: absolute; left: 10.7432222px;";

			offsetLeft = $( div ).offset().left;
			supportsOffsetFractions = offsetLeft > 10 && offsetLeft < 11;

			testElement.innerHTML = "";
			testElementParent.removeChild( testElement );
		})();

	})();

	var position = $.ui.position;
}));

/***************************************************************************************************
LoadingOverlay - A flexible loading overlay jQuery plugin
	Author			: Gaspare Sganga
	Version			: 1.0
	License			: MIT
	Documentation	: http://gasparesganga.com/labs/jquery-loading-overlay
****************************************************************************************************/
(function($, undefined){	
	var _defaults = {
		color			: "rgba(255, 255, 255, 0.8)",
		image			: "/assets/images/loading.gif",
		maxSize			: "100px",
		minSize			: "20px",
		resizeInterval	: 0,
		size			: "50%"
	};
	
	$.LoadingOverlaySetup = function(settings){
		$.extend(true, _defaults, settings);
	};
	
	$.LoadingOverlay = function(action, options){
		switch (action.toLowerCase()) {
			case "show":
				var settings = $.extend(true, {}, _defaults, options);
				_Show("body", settings, true);
				break;
				
			case "hide":
				_Hide("body", options);
				break;
		}
	};
	
	$.fn.LoadingOverlay = function(action, options){
		switch (action.toLowerCase()) {
			case "show":
				var settings = $.extend(true, {}, _defaults, options);
				return this.each(function(){
					_Show(this, settings, false);
				});
				
			case "hide":
				return this.each(function(){
					_Hide(this, options);
				});
		}
	};
	
	
	function _Show(container, settings, fixed){
		container = $(container);
		var count = container.data("LoadingOverlayCount");
		if (count === undefined) count = 0;
		if (count == 0) {
			var overlay = $("<div>", {
				class	: "loadingoverlay",
				css 	: {
					"background-color"		: settings.color,
					"background-image"		: (settings.image ? "url("+settings.image+")" : "none"),
					"background-position"	: "center center",
					"background-repeat"		: "no-repeat"
				}
			});
			if (fixed) {
				overlay.css({
					"position"	: "fixed",
					"top"		: 0,
					"left"		: 0,
					"width"		: "100%",
					"height"	: "100%"
				});
			} else {
				overlay.css({
					"position"	: "absolute",
					"top"		: 0,
					"left"		: 0
				});
				_CalculateSize(container, overlay, settings);
				if (container.css("position") == "static") {
					overlay.css({
						"top"	: container.position().top  + parseInt(container.css("margin-top"))  + parseInt(container.css("border-top-width")),
						"left"	: container.position().left + parseInt(container.css("margin-left")) + parseInt(container.css("border-left-width"))
					});
				}
				if (settings.resizeInterval > 0) {
					var resizeIntervalId = setInterval(function(){
						_CalculateSize(container, overlay, settings);
					}, settings.resizeInterval);
					container.data("LoadingOverlayResizeIntervalId", resizeIntervalId);
				}
			}
			overlay.appendTo(container);
		}
		count++;
		container.data("LoadingOverlayCount", count);
	}
	
	function _Hide(container, force){
		container = $(container);
		var count	= container.data("LoadingOverlayCount");
		if (count === undefined) return;
		count--;
		if (force || count <= 0) {
			var resizeIntervalId = container.data("LoadingOverlayResizeIntervalId");
			if (resizeIntervalId) clearInterval(resizeIntervalId);
			container.removeData("LoadingOverlayCount").removeData("LoadingOverlayResizeIntervalId");
			container.children(".loadingoverlay").remove();
		} else {
			container.data("LoadingOverlayCount", count);
		}
	}
	
	function _CalculateSize(container, overlay, settings){
		var size = "auto";
		if (settings.size && settings.size != "auto") {
			var size = Math.min(container.innerWidth(), container.innerHeight()) * parseFloat(settings.size) / 100; 
			if (settings.maxSize && size > parseInt(settings.maxSize)) size = parseInt(settings.maxSize)+"px";
			if (settings.minSize && size < parseInt(settings.minSize)) size = parseInt(settings.minSize)+"px";
		}
		$(overlay).css({
			"width"				: container.innerWidth(),
			"height"			: container.innerHeight(),
			"background-size"	: size
		});
	}
	
}(jQuery));
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