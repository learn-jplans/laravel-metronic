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