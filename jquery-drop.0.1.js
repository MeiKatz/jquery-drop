/*
 * LICENSE: "THE BEER-WARE LICENSE" (Revision 42)
 * <gregor.mitzka@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Gregor Mitzka
 * 
 * @package  		jQuery Drag&Drop-Plugin
 * @author			Gregor Mitzka <gregor.mitzka@gmail.com>
 * @copyright		2013 (C) Gregor Mitzka
 * @version			0.1
 * @license			The Beer-Ware License
 */
(function ( $ ) {
	$.fn.drop = function ( handler, observe ) {
		if ( typeof handler !== "function" ) {
			throw "handler must be a function";
		}

		var $this = $( this );

		$( document ).off( "dragstart dragend" ).on({
			"dragstart": function() {
				$( "[dropzone]" ).addClass( "droppable-dragging" );
			},

			"dragend": function() {
				$( "[dropzone]" ).removeClass( "droppable-dragging droppable-hover" );
			}
		});
		
		var events = {
			"dragover": function ( e ) {
				e.preventDefault();
				e.stopPropagation();
				
				return false;
			},

			"dragenter": function ( e ) {
				e.preventDefault();
				e.stopPropagation();
				
				$this.removeClass( "droppable-dragging" ).addClass( "droppable-hover" );
				return false;
			},

			"drop": function ( e ) {
				var data = e.originalEvent.dataTransfer;
				var ret;

				e.preventDefault();
				e.stopPropagation();

				// will return the data for "text/plain" if you try to stringify the Clipboard object
				data.valueOf = function() {
					return this.getData( "text/plain" );
				};
				// call the callback function for the drop event
				// mostly you will not return any value, but if you do, we will recognize it
				return ( ( ret = handler.call( e.target, data, e ) ) === undefined || !!ret );
			},

			"dragleave": function ( e ) {
				e.preventDefault();
				e.stopPropagation();
				
				$this.removeClass( "droppable-hover" ).addClass( "droppable-dragging" );
				return false;
			}
		};

		// observe the list of matched elements by the selector string if observe is true
		if ( observe === undefined || observe ) {
			$this.parent().delegate( this.selector, events );
		// bind only to the matching elements, that currently exist
		} else {
			$this.on( events );
		}

		return this;
	};
})( jQuery );
