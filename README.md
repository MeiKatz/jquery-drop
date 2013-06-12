jQuery Drag & Drop
===========

```javascript
$( "div" ).drop(function ( data, event ) {
  // data contains the DataTransfer object with the dropped content
  console.log( data.getData( "mime/type" ) );
  
  // if the mime type is "text/plain" then you can also use this
  console.log( "" + data );
});

// by default only the elements are matched that exist when you call the plugin,
// but you can pass the option "observe" and all elements are recognized that match
// the selector string
$( "div" ).drop({ "observe": true }, function ( data, event ) {
  // do something
});

```
