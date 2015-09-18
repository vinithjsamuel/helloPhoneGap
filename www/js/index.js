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

var fbLoginSuccess = function (userData) {

  alert("yes");
  alert("UserInfo: " + JSON.stringify(userData));

}
alert("vcxvxv");


 FB.Event.subscribe('auth.login', function(response) {
                               alert('auth.login event');
                               });
            
            
            /*function getSession() {
                alert("session: " + JSON.stringify(FB.getSession()));
            }
            */
            function getLoginStatus() {
                FB.getLoginStatus(function(response) {
                                  if (response.status == 'connected') {
                                  alert('logged in');
                                  } else {
                                  alert('not logged in');
                                 
                                  }
                                  });
            }
            var friendIDs = [];
      var fdata;
            function me() {
                FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
                       if (response.error) {
                       alert(JSON.stringify(response.error));
                       } else {
                       var data = document.getElementById('data');
             fdata=response.data;
             console.log("fdata: "+fdata);
                       response.data.forEach(function(item) {
                                             var d = document.createElement('div');
                                             d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                                             data.appendChild(d);
                                             });
                       }
          var friends = response.data;
          console.log(friends.length); 
          for (var k = 0; k < friends.length && k < 200; k++) {
                var friend = friends[k];
                var index = 1;
                friendIDs[k] = friend.id;
                //friendsInfo[k] = friend;
          }
          console.log("friendId's: "+friendIDs);
                       });
            }
            
            function logout() {
                FB.logout(function(response) {
                          alert('logged out');
                          });
            }
            
            function login() {
                FB.login(
                         function(response) {
                         if (response.session) {
                         alert('logged in');
                         } else {
                         alert('not logged in');
                         }
                         },
                         { scope: "email" }
                         );
            }
      
      
      function facebookWallPost() {
          console.log('Debug 1');
        var params = {
            method: 'feed',
            name: 'Facebook Dialogs',
            link: 'https://developers.facebook.com/docs/reference/dialogs/',
            picture: 'http://fbrell.com/f8.jpg',
            caption: 'Reference Documentation',
            description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
          };
        console.log(params);
          FB.ui(params, function(obj) { console.log(obj);});
      }
            
      function publishStoryFriend() {
        randNum = Math.floor ( Math.random() * friendIDs.length ); 
        var friendID = friendIDs[randNum];
        if (friendID == undefined){
          alert('please click the me button to get a list of friends first');
        }else{
            console.log("friend id: " + friendID );
              console.log('Opening a dialog for friendID: ', friendID);
              var params = {
                method: 'feed',
                  to: friendID.toString(),
                  name: 'Facebook Dialogs',
                  link: 'https://developers.facebook.com/docs/reference/dialogs/',
                  picture: 'http://fbrell.com/f8.jpg',
                  caption: 'Reference Documentation',
                  description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
            };
          FB.ui(params, function(obj) { console.log(obj);});
          }
      }
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