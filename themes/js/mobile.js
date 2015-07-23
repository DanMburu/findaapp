var db;
var dbCreated = false;
var id;
var uuid;
var value;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
alert('ready');
navigator.geolocation.getCurrentPosition(onSuccess, onError);

   db = window.openDatabase("MyFinda", "1.0", "PhoneGap Demo", 200000);
    
	var firstrun = window.localStorage.getItem("runned");
	 // firstrun=false;
	 // firstrun = null;
	 
	if ( firstrun == null ) {
	
	   $('.toggle-button').hide();
	  
       populateDB();
	}
	else {
		  setTimeout(function(){$('.lnkdashboard').click(); }, 3000);
		GetUserDetails();
		
		}
	
    uuid=device.uuid;
	
	
	
	
	
	
}


// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}




function populateDB(data){


//Create Table
db.transaction(
  function(tx) { 
  
//Create user table
//alert('companies Created');	
  var sql = "DROP TABLE IF EXISTS fd_users";
   tx.executeSql(sql);
   sql = " CREATE TABLE IF NOT EXISTS fd_users ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"username VARCHAR(200), " +
		"subscriber_id INTEGER(20))";    
    tx.executeSql(sql);	
	

  }, 
  function(error){console.log(error); alert('An error has occured. Please try again and check your internet connection');}
  );
	
  init(data);

}



function GetUserDetails(){
db.transaction(function(transaction) {
	transaction.executeSql("select * from fd_users", [],
	function(tx, result) { // On Success
		 var len = result.rows.length;		
		 for (var i=0; i<len; i++) {
			var row = result.rows.item(i);
			$('#SUBSCRIBER').val(row.subscriber_id);
			alert(row.subscriber_id);
			
		}// End for	 
	},
	function(error){ // On error                              
		
	});	
	
	});	//transaction	
	
} // GetUserDetails

function transaction_error(tx, error) {
console.log('Error Message');
console.log(error);
    alert("Database Error: " + error);
}

function SaveUserDetails(data){
	
	var sql = "insert into fd_users(username,subscriber_id) values('user','"+data+"')";  
	db.transaction(
  function(tx) { 
		tx.executeSql(sql);
		firstrun = false;
  },
  function(error){console.log(error); alert('An error has occured. Please try again and check your internet connection');}
  );
}


$(document).ready(function(e) {
   
   
	
	
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
				SaveUserDetails(data);
				$('.register').trigger('reset');
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