
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true; 
});

$(document).on("pageshow","#dashboard",function(){ // When entering pagetwo
   var iheight=$('.icon-cont').outerWidth();
    $('.icon-cont').css('height',iheight+'px');
	
	$.support.cors = true;
    $.mobile.allowCrossDomainPages = true; 
	
});

$(document).on("pageshow","#cart",function(){ // When entering pagetwo
  
   $('.btn-update').click(function (e) {
		e.preventDefault();
		
        var url = $('#RootUrl').val() + 'cart.aspx?option=update&subscriber-id=' + $('#SUBSCRIBER').val()+'&product-id='+$(this).attr('rel')+'&quantity='+$(this).parent().find('.quantity').val();
        showLoader();
        $.get(url, function (data) {
                alert("Shopping Cart Updated.");
        }).fail(function (data) {
            alert("Check your internet connection");
            $('.lnklogin').click();
            return false;
        }).always(function () {
            hideLoader();
        });
        return false;
    }); //.btn-update
	
      $('.btn-delete').click(function (e) {
		e.preventDefault();
		
	
		
		 if (confirm('Remove product from cart?')) {
			 $(this).parent().parent().remove();
			var url = $('#RootUrl').val() + 'cart.aspx?option=delete&subscriber-id=' + $('#SUBSCRIBER').val()+'&product-id='+$(this).attr('rel');
			showLoader();
			$.get(url, function (data) {
	
				hideLoader();
	           
			}).fail(function (data) {
				alert("Product deleted.");
				$('.lnklogin').click();
				return false;
			}).always(function () {
				hideLoader();
			});
		 }
        return false;
    }); //.btn-delete
	
});

$(document).on("pageshow", "#jobs-details", function () { // When entering pagetwo
    var uri = $('.apply-now').attr('href') + '&subscriber-id=' + $('#SUBSCRIBER').val();
    $('.apply-now').attr('href', uri);
});

$(document).on("pageshow", "#gallery", function () { // When entering pagetwo
   
      $('.gallery-arrow').click(function (e) {
		  e.preventDefault();
	   return false;
	   });
});

$(document).on("pageshow", "#login", function () { // When entering pagetwo
   
  $('.loginbutton').click(function (e) {
		e.preventDefault();
		 if($('#txt-email').val()==""){
			 alert("Enter Email");
		 return false;	
		 }
		 
		 if($('#txt-password').val()==""){
			 alert("Enter Password");
		 return false;	
		 }
		
        var url = $('#RootUrl').val() + 'validate.aspx?option=validate&email=' + $('#txt-email').val()+'&pwd='+$('#txt-password').val();
       
		
      showLoader();
        $.get(url, function (data) {
			hideLoader();
            if (data.trim().toLowerCase() === 'incorrect') {
                alert("Email or Password incorrect.");
            } else {
                $('#SUBSCRIBER').val(data);
                $('.loginbutton-hidden').trigger('click');

            }

        }).fail(function (data) {
            alert("Check your internet connection");
            $('.lnklogin').click();
            return false;
        }).always(function () {
            hideLoader();
        });
        return false;
    });
	
});





$(document).on("pageshow", "#landing", function () { // When entering pagetwo
showLoader();
setTimeout(function(){
	 window.location = $('#RootUrl').val();
	  $('.acivatemobile').trigger('click');
	   $('.acivatemobile').click();
 }, 3000);
});


$(document).on("pageshow", "#register", function () { // When entering pagetwo
 
   
   
   
   
   
   $('.registerbutton').click(function (e) {
		e.preventDefault();
		if(!$('#chkTerms').is(":checked")){
		alert("You must agree to Terms and Conditions");
		 return false;	
		}
		 
		 if($('.password').val()!=$('.passwordconfirm').val()){
			 alert("Password and Confirm Password must match");
		 return false;	
		 }
		
        var url = $('#RootUrl').val() + 'validate.aspx?option=register&' + $('.register').serialize();
        console.log(url);
		
         showLoader();
        $.get(url, function (data) {
            hideLoader();
			
            if (data.trim().toLowerCase() === 'already registered') {
                alert("Email already registered.");
            } else {
                $('#SUBSCRIBER').val(data);
				$('.register')[0].reset();
                $('.registerbutton-hidden').trigger('click');

            }

        }).fail(function (data) {
            alert("Check your internet connection");
            $('.lnklogin').click();
            return false;
        }).always(function () {
            hideLoader();
        });
        return false;
    });
});

$(document).on("pageshow", function () { // When entering pagetwo

    $(".jqm-navmenu-link, #mainmenu a").on("click", function () {
       
        if ($('#main-panel').hasClass('open')) {

            $('#main-panel').filter(':not(:animated)').animate({ left: '0' }, function () {
                $(".jqm-navmenu-panel").hide();
                $('#main-panel').removeClass('open');
            });
            //$('#main-panel').animate({left: '0'},function(){$(".jqm-navmenu-panel").hide();});



        } else {
            $(".jqm-navmenu-panel").show();
            //$('#main-panel').filter(':not(:animated)').animate({left: '250px'});
            // $('#main-panel').filter(':not(:animated)').animate({left: '250px'});


            $('#main-panel').filter(':not(:animated)').animate({ left: '250px' }, function () {
                $('#main-panel').addClass('open');
            });

        }

       

    });
    
    $('.close-popup').on("click", function (e) {
        window.history.back();
        e.preventDefault();
        return false;
    });
    $('.add-to-wishlist').on('click', function () {
        showLoader();
        var url = $('#RootUrl').val() + 'wishlist.aspx?option=add&product-id=' + $(this).attr("rel")+'&subscriber-id=' + $('#SUBSCRIBER').val();
        $.get(url, function (data) {
            $('.popup-header').html('Wishlist');
            $('.popup-text').html('Item added to wishlist.');
           $('.add-to-wishlist-hidden').trigger("click");
            hideLoader();
        }).fail(function () {
            alert("Check your internet connection.");
        })
        .always(function () {
            hideLoader();
        });
    });
	
	$('.remove-from-wishlist').on('click', function () {
		if (confirm('Remove product from cart?')) {
			$(this).parent().parent().parent().remove();
			showLoader();
			var url = $('#RootUrl').val() + 'wishlist.aspx?option=delete&product-id=' + $(this).attr("rel")+'&subscriber-id=' + $('#SUBSCRIBER').val();
			$.get(url, function (data) {
				$('.popup-header').html('Wishlist');
				$('.popup-text').html('Item removed from wishlist.');
			   $('.add-to-wishlist-hidden').trigger("click");
				hideLoader();
			}).fail(function () {
				alert("Check your internet connection.");
			})
			.always(function () {
				hideLoader();
			});
		}
    });
	
	
    $('.btn-add-to-cart').on('click', function () {
       
	    var quantity=$(this).parent().parent().parent().find('.quantity').val();
        var url = $('#RootUrl').val() + 'cart.aspx?option=add&product-id=' + $('#PRODUCTID').attr("rel") + '&subscriber-id=' + $('#SUBSCRIBER').val()+"&quantity="+quantity;
       
		 showLoader();
		$.get(url, function (data) {

            $('.popup-header').html('Shopping Cart');
            $('.popup-text').html('Item added to cart.');
            
            $('.add-to-cart-hidden').trigger("click");
           hideLoader();
        }).fail(function () {
            alert("Check your internet connection.");
        })
        .always(function () {
            hideLoader();
        });
    });

 $('.btn-place-order').on('click', function () {
       
        var url = $('#RootUrl').val() + 'cart.aspx?option=place-order&product-id=&subscriber-id=' + $('#SUBSCRIBER').val();
       
		 showLoader();
		$.get(url, function (data) {

            $('.popup-header').html('Success');
            $('.popup-text').html('Your order was successfully placed.<br>We have sent you the payment instruction in your email.');
            
            $('.btn-place-order-hidden').trigger("click");
           hideLoader();
        }).fail(function () {
            alert("Check your internet connection.");
        })
        .always(function () {
            hideLoader();
        });
    });

 $('.btn-enquiry').on('click', function () {
       
	   var allFilled = true;

    $(':input:not(:button)').each(function(index, element) {
        if (element.value === '') {
            allFilled = false;
        }
    });
  if(allFilled){
        var url = $('#RootUrl').val() + 'member.aspx?option=enquiry-set&' + $('#frm-enquiry').serialize()+'&subscriber-id='+ $('#SUBSCRIBER').val();
       
		 showLoader();
		$.get(url, function (data) {
			
			 /*if (data.trim().toLowerCase() === 'success') {*/
          
				$('.popup-header').html('success');
				$('.popup-text').html('Message was successfully sent.');
				$('#frm-enquiry')[0].reset();
			/*}else{
				$('.popup-header').html('Error!');
				$('.popup-text').html('Sorry, an error occured.');
			}*/
            $('.btn-enquiry-hidden').trigger("click");
           hideLoader();
        }).fail(function () {
            alert("Check your internet connection.");
        })
        .always(function () {
            hideLoader();
        });
	}else{
	   alert('All fields are required');
	   return;
  }	
		
    });
    $('.EventsSearchbtn').on("click", function (e) {
        e.preventDefault();
        $('.EventSearchbtnhidden').attr('href', 'events.aspx?option=list&location-id=' + $('#ctl02_DDLLocation').val() + '&category-id=' + $('#ctl02_DDLCategories').val() + '&keyword=' + $('#textinput').val());
        $('.EventSearchbtnhidden').trigger('click');
        return false;

    });
    $('.shopSearchbtn').on("click", function (e) {
      
        e.preventDefault();
        $('.shopSearchbtnsHidden').attr('href', 'shop.aspx?option=list&location-id=' + $('.DDLShopLocation').val() + '&category-id=' + $('.DDLShopCategories').val() + '&keyword=' + $('#textinput').val());
        $('.shopSearchbtnsHidden').trigger('click');
        return false;

    });
    $('.jobsSearchbtn').on("click", function (e) {
       
        $('.jobsSearchbtnhidden').attr('href', 'jobs.aspx?option=list&location-id=' + $('#ctl02_DDLLocation').val() + '&category-id=' + $('#ctl02_DDLCategories').val() + '&keyword=' + $('#textinput').val());
        $('.jobsSearchbtnhidden').trigger('click');
        e.preventDefault();
        return false;

    });
    $('.searchbtn').on("click", function (e) {
        var destination = $(this).attr("rel");
        $('.searchbtnhidden').attr('href', destination+'?option=list&location-id=' + $('#ctl02_DDLLocation').val() + '&category-id=' + $('#ctl02_DDLCategories').val() + '&keyword=' + $('#textinput').val());
        $('.searchbtnhidden').trigger('click');
        e.preventDefault();
        return false;

    });


    $('#ctl02_DDLSort').on("change", function (e) {
     

        $('.LNKhidden').attr('href', 'events.aspx?option=list&location-id=' + $('#ctl02_HFLocationId').val() + '&category-id=' + $('#ctl02_HFCategoryId').val() + '&keyword=' + $('#ctl02_txtKeyWord').val() + '&sort=' + $('#ctl02_DDLSort').val());
        $('.LNKhidden').trigger('click');
        e.preventDefault();
        return false;

    });

 
	
 $('.btn-wishlist').attr('href',$('.btn-wishlist').attr('href')+'&subscriber-id='+ $('#SUBSCRIBER').val());   
 $('.btn-cart').attr('href',$('.btn-cart').attr('href')+'&subscriber-id='+ $('#SUBSCRIBER').val());
 $('.btn-check-out').attr('href',$('.btn-check-out').attr('href')+'&subscriber-id='+ $('#SUBSCRIBER').val()); 
 
 $('.btn-place-order').attr('href',$('.btn-place-order').attr('href')+'&subscriber-id='+ $('#SUBSCRIBER').val());  
 $('.lnk-enquiry').attr('href',$('.lnk-enquiry').attr('href')+'&subscriber-id='+ $('#SUBSCRIBER').val()); 


    

});


$(document).bind("pagehide", function(event, ui) {
	
$( window ).resize(function() {
  var iheight=$('.icon-cont').outerWidth();
    $('.icon-cont').css('height',iheight+'px');
});
	
 
});
$(document).ready(function () {
	 
    $('#searchbtn').click(function (e) {
        e.preventDefault();
        alert('here22');
        return false;

    });
})
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