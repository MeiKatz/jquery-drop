/**
 * @author      Gregor Mitzka (gregor.mitzka@gmail.com)
 * @version     0.1.3
 * @date        2014-04-30
 * @licence     beer ware licence
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <gregor.mitzka@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Gregor Mitzka
 * ----------------------------------------------------------------------------
 */
(function ( $ ) {
	$.fn.drop = function ( options, callback ) {
		callback = ( typeof callback !== "function" ) ? ( typeof options !== "function" ) ? function(){} : options : callback;
		options  = ( typeof options  === "object"   ) ? options : {};

		options.prefix  = options.prefix  || "droppable";
		options.observe = options.observe || false;

		var $this = $( this ),
				class_dragging = options.prefix + "-dragging",
				class_hover    = options.prefix + "-hover";

		$( document ).off( "dragstart.drop-plugin dragend.drop-plugin" ).on({
			"dragstart.drop-plugin": function() {
				$( "[dropzone]" ).addClass( class_dragging );
			},

			"dragend.drop-plugin": function() {
				$( "[dropzone]" ).removeClass( [ class_dragging, class_hover ].join( " " ) );
			}
		});
		
		var events = {
			"dragover.drop-plugin": function ( e ) {
				e.preventDefault();
				e.stopPropagation();
				
				return false;
			},

			"dragenter.drop-plugin": function ( e ) {
				e.preventDefault();
				e.stopPropagation();
				
				$this.removeClass( class_dragging ).addClass( class_hover );
				return false;
			},

			"drop.drop-plugin": function ( e ) {
				var data = e.originalEvent.dataTransfer;
				var ret, accepted = false, i = 0;

				e.preventDefault();
				e.stopPropagation();

				// will return the data for "text/plain" if you try to stringify the Clipboard object
				data.valueOf = function() {
					return this.getData( "text/plain" );
				};

				$(this).removeClass( class_hover );

				// call the callback function for the drop event
				// mostly you will not return any value, but if you do, we will recognize it
				return ( ( ret = callback.call( e.target, data, e ) ) === undefined || !!ret );
			},

			"dragleave.drop-plugin": function ( e ) {
				e.preventDefault();
				e.stopPropagation();
				
				$this.removeClass( class_hover ).addClass( class_dragging );
				return false;
			}
		};

		// observe the list of matched elements by the selector string if observe is true
		if ( options.observe ) {
			$this.parent().on( events, this.selector );
		// bind only to the matching elements, that currently exist
		} else {
			$this.on( events );
		}

		return this;
	};
})( jQuery );
