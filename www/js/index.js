/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var email;
 var pictureSource;   // picture source
var destinationType; // sets the format of returned value
 var app = {
    // Application Constructor
    initialize: function() {

     this.bindEvents();
   },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

     document.addEventListener('deviceready', this.onDeviceReady, false);
   },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
     
    
    
    if (window.localStorage.getItem("install") == undefined) {
     /* run function */
     setTimeout(function() {
      navigator.splashscreen.hide();
    }, 3000);

   }
   else
   {
     setTimeout(function() {
      navigator.splashscreen.hide();
    }, 150);
   }
   if(navigator.network.connection.type == Connection.NONE) {
      $("#offline-modal").modal('show');
    }
   app.receivedEvent('deviceready');



 },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

pictureSource=navigator.camera.PictureSourceType;
destinationType=navigator.camera.DestinationType;

    //   window.plugins.googleplus.isAvailable(
    //     function (available) {
    //       if (available) {
    //         alert("yes");
    //     // show the Google+ sign-in button
    //   }
    // }
    // );






//   //alert(accounts.length);
//   $(".user-name").html(accounts);

Insertdata();
//       //alert('account registered on this device:'+accounts);

//   //alert('account registered on this device:', accounts);
// }, function(error){
//   alert('Fail to retrieve accounts, details on exception:', error);
// });



var parentElement = document.getElementById(id);
var listeningElement = parentElement.querySelector('.listening');
var receivedElement = parentElement.querySelector('.received');

listeningElement.setAttribute('style', 'display:none;');
receivedElement.setAttribute('style', 'display:block;');

console.log('Received Event: ' + id);


}
};

app.initialize();
function Insertdata()
{

  $(".device-id").html(device.uuid);
  var deviceid= $(".device-id").html();
  calls();

  
  
}


function getPhoto(source) {

      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 10,
        destinationType: destinationType.DATA_URL, sourceType: source
      });
    }

    function onPhotoURISuccess(imageData) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';
      smallImage.src = "data:image/jpeg;base64," + imageData;
      window.localStorage.setItem("image", smallImage.src);

    }
    function onSuccess(imageData) {
     var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';
      smallImage.src = "data:image/jpeg;base64," + imageData;
      window.localStorage.setItem("image", smallImage.src);

    }

    // Called if something bad happens.
    //
    function onFail(message) {
      
      
    }
  
