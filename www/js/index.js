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
      app.receivedEvent('deviceready');
      


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    //   window.plugins.googleplus.isAvailable(
    //     function (available) {
    //       if (available) {
    //         alert("yes");
    //     // show the Google+ sign-in button
    //   }
    // }
    // );

if (window.localStorage.getItem("installed") == undefined) {
 /* run function */
 alert("yes");
 window.localStorage.setItem("installed", true);
}
alert(device.uuid);
alert('Device is ready! Make sure you set your app_id below this alert.');

FB.init({ appId: "756110871177634", nativeInterface: CDV.FB, useCachedDialogs: false });

alert("vcxvxv");
FB.getLoginStatus();


            /*function getSession() {
                alert("session: " + JSON.stringify(FB.getSession()));
            }
            */
            FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
    // the user is logged in and connected to your
    // app, and response.authResponse supplies
    // the user’s ID, a valid access token, a signed
    // request, and the time the access token 
    // and signed request each expire
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    //but not connected to the app
  } else {
    // the user isn't even logged in to Facebook.
  }
});
       // $(".device-id").html(device.uuid);
       // alert(device.uuid);
//        window.plugins.DeviceAccounts.getEmail(function(accounts){
//   // accounts is an array with objects containing name and type attributes


//   //alert(accounts.length);
//   $(".user-name").html(accounts);

//   Insertdata(accounts);
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
function Insertdata(email)
{


    // var email_id= email;
    // var deviceid= $(".device-id").html();


    
    calls();
  }