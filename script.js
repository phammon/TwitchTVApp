$(document).ready(function() {
	var clientID = 'un87gjd72fqnrwbtt9d6g17ux03sj3';
	var userArray = ["vitamors", "ronimogames", "deadpine", "drainerx", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "totalbiscuit", "summit1g", "sodapoppin"];
	for(var i=0; i<userArray.length; i++) {
					var user = userArray[i];
					ajxCall(user);
     }
     //click events
     $("#_online").on("click", function() {
     	
     	//loop through list
     	for (var i = 0; i < userArray.length; i++) {
     		var item = document.getElementsByTagName('li')[i].textContent;
     		//identify li's with 'offline'
     		if(containsStr1(item)){
     			//adds offline attribute to offline li's
     			addOfflineAttr(i);
     			//hide offline li's
     			$(".offline").hide();
     			$(".online").show();
     		}
     	}//end loop

     });
     $("#_offline").on("click", function() {
     	for (var i = 0; i < userArray.length; i++) {
     		var item = document.getElementsByTagName('li')[i].textContent;
     		//identify li's with 'online'
     		if(containsStr2(item)){
     			//adds online attribute to online li's
     			addOnlineAttr(i);
     			//hide online li's
     			$(".online").hide();
     			$(".offline").show();

     		}
     	}//end loop
     });
     $("#_all").on("click", function() {
     	for (var i = 0; i < userArray.length; i++) {
     		$(".online").show();
     		$(".offline").show();
     	}
     });
     $("#magGlass").on("click", function() {
     	var input = document.getElementById("userInput").value;
     	//user input in lowercase
     	var toLower = input.toLowerCase();
     	var ul = document.getElementById("unordList");
     	var li = ul.getElementsByTagName('li');
     	for(var i=0; i < li.length; i++) {
     		//grab all the strings from 'li' elements
     		var text = li[i].textContent;
     		var lowerText = text.toLowerCase();
     		if(lowerText.indexOf(toLower) > -1) {
     			li[i].style.display = "";
     		} else {
     			li[i].style.display = "none";
     		}
     	}//end for loop
 		
     });
   //create function to append info to HTML list
   function appendList(user) {
   	$('#unordList').append('<li>' + user + '</li>');

   }
   //checks to see if string contains offline
   function containsStr1 (string) {
   		if(string.indexOf('offline') > -1) {
   			return true;
   		} else {
   			return false;
   		}
   }
   //checks to see if string contains online
   function containsStr2 (string) {
   		if(string.indexOf('online') > -1) {
   			return true;
   		} else {
   			return false;
   		}
   }
   function addOnlineAttr(i) {
   	$('li:eq(' + i + ')').attr('class', 'online');
   }
   function addOfflineAttr(i) {
   	$('li:eq(' + i + ')').attr('class', 'offline');
   }

	// create ajax function to call in for loop to iterate through twitch users
	function ajxCall(user) {
		$.ajax({
				url: 'https://api.twitch.tv/kraken/streams?channel=' + user + '&client_id=' + clientID,
				type: 'GET',
				dataType: 'jsonp',
				success: function(data) {
					if(data._total > 0) {
						var status=data.streams[0].channel.status;
						var userId=data.streams[0]._id;
						//var userImg=data.streams[0].
						if(status === null) {
							//user if offline append to list
							var offlineUser = user + " is offline. User Id is: " + userId;
							//call appendList and append info to list in app
							appendList(offlineUser)
							
						} else {
							//user is online append to list
							var onlineUser = user + " is online. User Id is: " + userId;
							appendList(onlineUser);
						
				  		}
			   		} else {
			   			//not enough data was sent back, append as offline and not enough data
			   			var unknown = user + " is offline. No userId was found";
			  			appendList(unknown);
			  			
			  		}
			    }//end success function
	    }); //end ajax call
	}//end ajxCall Function
});//End document ready


