
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true; 
});


$(document).on("pageshow", "#landing", function () { // When entering pagetwo
// showLoader();
setTimeout(function(){
	  window.location = $('#RootUrl').val();
	  $('.acivatemobile').trigger('click');
	   $('.acivatemobile').click();
 }, 3000);
});




function showLoader(){
 $.mobile.loading( "show", {
		text: 'loading',
		textVisible: false,
		theme: 'a',
		textonly: false,
		html: ''
	 });
}
function hideLoader(){
	 $.mobile.loading( "hide" );
}