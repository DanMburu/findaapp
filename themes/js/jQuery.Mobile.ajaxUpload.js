/*
 * jQuery.ajaxEnvironment.js
 * https://gist.github.com/jhogervorst/8166217
 *
 * jQuery.Mobile.ajaxUpload.js
 * https://gist.github.com/jhogervorst/8166385
 *
 * Copyright (C) 2013 Jonathan Hogervorst. All rights reserved.
 * This code is licensed under MIT license.
 */

(function($) {
	$.ajaxEnvironment = function(settings, block) {
		var originalSettings = $.ajaxSetup();
		var restoredSettings = {};
		
		$.each(settings, function(key) {
			restoredSettings[key] = originalSettings[key];
		});
		
		$.ajaxSetup(settings);
		block();
		$.ajaxSetup(restoredSettings);
	};
	
	$.mobile.ajaxUpload = {};
	
	$.mobile.ajaxUpload.changePage = function(form, options) {
		form = $(form);
		
		$.ajaxEnvironment({
			contentType: false,
			processData: false,
		}, function () {
		    $.post(form.attr('action'),new FormData(form[0]))
              .done(function (data) {
				  // uploadJob(data);
                  hideLoader(); 
              });
			

		});
	};
})(jQuery);