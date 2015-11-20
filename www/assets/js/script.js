var marker = null,i=0;var datas=[];var flag;var price;var total_prices=0;var number = new Array();var markersArray = [];var markers = new Array();
var url="http://getguzzle.com/app/markers";  var locations = [];  var pinCircle = null;

var app = angular.module("geo", ['angular-gestures','ngRoute',"ui.map", "ui.event","readMore",'ngTouch'])
app .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'list.html',

    }).
    when('/outlet/:url/:title', {
      templateUrl: 'outlet.html',

    }).
    when('/profile', {
      templateUrl: 'profile.html',

    }).
    otherwise({
      redirectTo: '/'
    });



  }]);
app.controller("mainController", function($scope,$http,$filter,$q,$rootScope)
{


  var version ="version2";
  $http({
    method: 'GET',
    url: 'http://getguzzle.com/app-test/version',

  }).success(function(data){

    if(version!=data[0].title)
    {
     $('#version-modal').modal("show");
     
   }
   
 });

  $("body").show();
  $rootScope.homemaintitle = false;
  $(".logo-splash").show();

  $(".step1").on('click', function (){
    $('#demoBox2').modal("show");
  });
  $(".steps").on('click', function (){
    $('#demoBox').modal("show");
  });
  var myScroll,
  pullDownEl, pullDownOffset,
  pullUpEl, pullUpOffset,
  generatedCount = 0;



  $scope.pullDownAction=function () {
   // <-- Simulate network congestion, remove setTimeout from production!
   $http({
    method: 'GET',
    url: 'http://getguzzle.com/app/markers',

  }).success(function(data){

    localStorage.removeItem("outlets");

    updateOutlet(data,$scope);
    

  });

}




// pullDownEl = document.getElementById('pullDown');
// pullDownOffset = pullDownEl.offsetHeight;



// myScroll = new iScroll('wrapper', {
//   useTransition: true,
//   topOffset: pullDownOffset,
//   onRefresh: function () {
//    pullDownEl.className = '';

//  },
//  onScrollMove: function () {
//   if (this.y > 5 && !pullDownEl.className.match('flip')) {
//     pullDownEl.className = 'flip';
//     pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
//     this.minScrollY = 0;
//   }
// },
// onScrollEnd: function () {
//   if (pullDownEl.className.match('flip')) {
//     pullDownEl.className = 'loading';
//     pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';        
//           // Execute custom function (ajax call?)
//           $scope.pullDownAction();
//         } 
//       }
//     });

// setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);






// angular.element(document).ready(function () {
//   calls();
// });

$scope.hideMenu=function()
{
 $(".user-menu").removeClass("menu-open");
 $("body").removeClass("menu-open");
}

$scope.clearFilter = function() {

 $scope.test="";
 $scope.useMakes={};
};

$scope.model = { myMap: undefined };
$scope.lat = "0";
$scope.lng = "0";
$scope.accuracy = "0";
$scope.error = "";

$scope.myMarkers = [];
var image = {
  url: "assets/images/location.png",
  scaledSize: new google.maps.Size(50,50)
};


var ry=Math.floor(Math.random()*16)
if(ry==0)
{
  ry=1;
}
var image_src="assets/images/users/"+ry+".png";
if (window.localStorage.getItem("image") == undefined)
{
  var picture = localStorage.getItem('image');

  
  $('.img-circle').attr('src', image_src);
}
else{


  $('.img-circle').attr('src', localStorage.getItem('image'));
}

$scope.mapOptions =
{
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};




if(window.localStorage.getItem("outlets") != undefined )
{

  $rootScope.homemaintitle = true;
  setTimeout(function(){
    $("#status").fadeOut(); $("#preloader").delay(350).fadeOut("slow");
  }, 6500);
  $rootScope.storage = JSON.parse(window.localStorage['outlets' || '{}']);

  var datas=$rootScope.storage;
  var result=$rootScope.storage;

  $scope.useMakes = [];
  $scope.cars=[];
  $scope.cars=datas,$scope.lat1, $scope.lng1;
  console.log($scope.cars);
  var nos= datas.length+ " items";
  $(".result").html(nos);


  $scope.showResult = function () {
    return $scope.error == "";
  }

  $scope.showPositions = function (position)
  {


    $scope.$apply();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var images = {
      url: "assets/images/my-location.png",
      scaledSize: new google.maps.Size(55,55)
    };
    $scope.lat1 = position.coords.latitude;
    $scope.lng1 = position.coords.longitude;
    $scope.accuracy = position.coords.accuracy;

    var GeoMarker = new GeolocationMarker($scope.model.myMap);

    GeoMarker.setMarkerOptions({icon: images});
    GeoMarker.setCircleOptions({visible: false});
    google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
      // alert("FDsf");
      $scope.model.myMap.setCenter(this.getPosition());
      $scope.model.myMap.fitBounds(this.getBounds());
    });

    google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {

    });

    GeoMarker.setMap($scope.model.myMap);



    $scope.map = {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    }


    for (i = 0; i < result.length; i++) {


      if(i > 3){
        result[i].show=0;

      }
      

      var lat=result[i].latitude;
      var longi=result[i].longitude;var infobox;
      var latlng = new google.maps.LatLng($scope.lat,$scope.lng);
      var dist=distance(position.coords.latitude,position.coords.longitude,lat,longi,"K",i);
      var encoded=datas[i].title;
      var titles=encoded.replace(/&amp;/g, '&');
      var url=datas[i].urltitle;
      datas[i].title=titles;
      datas[i].distance=dist;
      // offer value
      // var urltit=data[i].title;
      // var names=data[i].urltitle;
      // $scope.offerValue(urltit,names);
      $scope.$apply();

    }

    /*License agreement popup*/
    if (window.localStorage.getItem("install") == undefined) {
     /* run function */
     $('#demoBox').modal("show");
     var val=window.localStorage.getItem("install");
     window.localStorage.setItem("install", true);
   }



 }



 $scope.showErrors = function (error)
 {

  switch (error.code)
  {
    case error.PERMISSION_DENIED:
    $scope.error = "User denied the request for Geolocation."
    break;
    case error.POSITION_UNAVAILABLE:
    $scope.error = "Location information is unavailable."
    break;
    case error.TIMEOUT:
    $scope.error = "The request to get user location timed out."
    break;
    case error.UNKNOWN_ERROR:
    $scope.error = "An unknown error occurred."
    break;
  }

  var latlng = new google.maps.LatLng(25.08135,55.144075);

  for (i = 0; i < result.length; i++)
  {
    if(i==0)
    {
      $scope.lat =25.08135;
      $scope.lng = 55.144075;
                //$scope.accuracy = position.coords.accuracy;
                $scope.$apply();

                var latlng = new google.maps.LatLng($scope.lat, $scope.lng);

                $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
              }
              $scope.lat = result[i].latitude;
              $scope.lng =  result[i].longitude;
              var lat=result[i].latitude;
              var longi=result[i].longitude;

              var latlng = new google.maps.LatLng($scope.lat,$scope.lng);
              var dist=distance(25.08135, 55.144075,lat,longi,"K",i);
              datas[i].distance=dist;

              $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));

              var urltit=data[i].title;
              var names=data[i].urltitle;
              $scope.offerValue(urltit,names);
              $scope.$apply();
            }
          }

          var options = { timeout: 30000 };
          var watchID = null;
          
          watchID = navigator.geolocation.getCurrentPosition($scope.showPositions, $scope.showErrors, options);


          $scope.filterMakes = function ()
          {


            return function (p) {
              flag=0;

              for (var i in $scope.useMakes) {
                flag =1;


                if (p.type == number[i] && $scope.useMakes[i]) {

                  return true;
                }

              }

              if($('input[type="checkbox"]:checked').length == 0) {
                flag=0;
              }
              if(flag==0 )
              {

                return true;
              }
            };
            var count=$("#mylist li").length;



          };






          
        }

        else
        {

         $http({
          method: 'GET',
          url: 'http://getguzzle.com/app/markers',

        }).success(function(data){

          $rootScope.homemaintitle = true;
          $("#status").fadeOut(); $("#preloader").delay(350).fadeOut("slow");
          window.localStorage['outlets'] = JSON.stringify(data);
          var datas=data;
          var result=data;
          $scope.useMakes = [];
          $scope.cars=result,$scope.lat1, $scope.lng1;

          var nos= datas.length+ " items";
          $(".result").html(nos);


          $scope.showResult = function () {
            return $scope.error == "";
          }

          $scope.showPosition = function (position)
          {


            $scope.$apply();
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var images = {
              url: "assets/images/my-location.png",
              scaledSize: new google.maps.Size(55,55)
            };
            $scope.lat1 = position.coords.latitude;
            $scope.lng1 = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;

            var GeoMarker = new GeolocationMarker($scope.model.myMap);

            GeoMarker.setMarkerOptions({icon: images});
            GeoMarker.setCircleOptions({visible: false});
            google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {

              $scope.model.myMap.setCenter(this.getPosition());
              $scope.model.myMap.fitBounds(this.getBounds());
            });

            google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
              alert('There was an error obtaining your position. Message: ' + e.message);
            });

            GeoMarker.setMap($scope.model.myMap);



            $scope.map = {
              latitude:position.coords.latitude,
              longitude:position.coords.longitude
            }


            for (i = 0; i < result.length; i++) {

             if(i > 3){
              result[i].show=0;
            }
            
            var lat=result[i].latitude;
            var longi=result[i].longitude;var infobox;
            var latlng = new google.maps.LatLng($scope.lat,$scope.lng);
            var dist=distance(position.coords.latitude,position.coords.longitude,lat,longi,"K",i);
            var encoded=data[i].title;
            var titles=encoded.replace(/&amp;/g, '&');
            var url=data[i].urltitle;
            data[i].title=titles;
            datas[i].distance=dist;
      // offer value
      // var urltit=data[i].title;
      // var names=data[i].urltitle;
      // $scope.offerValue(urltit,names);
      $scope.$apply();

    }


    /*License agreement popup*/
    if (window.localStorage.getItem("install") == undefined) {
     /* run function */
     $('#demoBox').modal("show");
     var val=window.localStorage.getItem("install");
     window.localStorage.setItem("install", true);
   }



 }



 $scope.showError = function (error)
 {

  switch (error.code)
  {
    case error.PERMISSION_DENIED:
    $scope.error = "User denied the request for Geolocation."
    break;
    case error.POSITION_UNAVAILABLE:
    $scope.error = "Location information is unavailable."
    break;
    case error.TIMEOUT:
    $scope.error = "The request to get user location timed out."
    break;
    case error.UNKNOWN_ERROR:
    $scope.error = "An unknown error occurred."
    break;
  }

  var latlng = new google.maps.LatLng(25.08135,55.144075);

  for (i = 0; i < result.length; i++)
  {
    if(i==0)
    {
      $scope.lat =25.08135;
      $scope.lng = 55.144075;
                //$scope.accuracy = position.coords.accuracy;
                $scope.$apply();

                var latlng = new google.maps.LatLng($scope.lat, $scope.lng);

                $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
              }
              $scope.lat = result[i].latitude;
              $scope.lng =  result[i].longitude;
              var lat=result[i].latitude;
              var longi=result[i].longitude;

              var latlng = new google.maps.LatLng($scope.lat,$scope.lng);
              var dist=distance(25.08135, 55.144075,lat,longi,"K",i);
              datas[i].distance=dist;

              $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));

              var urltit=data[i].title;
              var names=data[i].urltitle;
              $scope.offerValue(urltit,names);
              $scope.$apply();
            }
          }
          


          $scope.filterMakes = function ()
          {


            return function (p) {
              flag=0;

              for (var i in $scope.useMakes) {
                flag =1;


                if (p.type == number[i] && $scope.useMakes[i]) {

                  return true;
                }

              }

              if($('input[type="checkbox"]:checked').length == 0) {
                flag=0;
              }
              if(flag==0 )
              {

                return true;
              }
            };
            var count=$("#mylist li").length;



          };



          $scope.getLocation = function () {
            if (navigator.geolocation) {

              navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
              $scope.error = "Geolocation is not supported. Please enable geolocation in your settings.";
              alert($scope.error);
            }
          }
          $scope.getLocation();
          
          var options = { timeout: 30000 };
          var watchID = null;
          
          watchID = navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError, options);

        }).error(function(){

        });
      }

      $scope.$watch('nas',

        function (newValue, oldValue) {


          for (jdx in $scope.myMarkers) {

            if(jdx != 0)
            {

             $scope.myMarkers[jdx].setMap(null);
           }
         }
         $scope.myMarkers = [];


         for (idx in $scope.nas) {

          createMarker($scope.nas[idx]);


        }
      },
      true);

      var createMarker = function (info)
      {


        if(info !="" || typeof info !="undefined")
        {





         var encoded=info.title;
         var titles=encoded.replace(/&amp;/g, '&');
         var url=info.urltitle;
         $scope.infoWindow = new google.maps.InfoWindow();
         var url='#outlet/'+info.urltitle+'/'+info.title;
         var latlng = new google.maps.LatLng(info.latitude,info.longitude);
         if(info.location!="")
         {
          locations=info.location;
        }
        else
        {
          locations="";
        }
        var marker = new google.maps.Marker({
          map: $scope.model.myMap,
          position:latlng ,
          title:info.title,
          location:locations,
          icon:image,
          url:url
        });
        marker.content = '<div><a href="#outlet/"> <img src="assets/images/info.png" style="width:50%!important;height:50%;">' + titles + '</a> </div>';

        $scope.myMarkers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {

          $scope.$apply();
          $scope.infoWindow.setContent('<div> <a href="'+url+'"><h4 style="margin:0px;"><img src="assets/images/info.png" style="width:25px;margin-right:10px;">' +  this.title+'  </h4></a></div><div style="margin-left:35px; ">'+this.location+'</div>');

          $scope.infoWindow.open($scope.model.myMap,this);
        });
      }

    }





    $scope.offerValue = function (url,names)
    {

      var urls="http://getguzzle.com/app-test/cost/"+url;

      $http.get(urls)
      .success(function (response) {
        var total_cost=0;
        datas=response;
        var results=datas;
        $(".offer-nos").html(response.length);
        for (i = 0; i < response.length; i++) {
          total_cost=Number(total_cost)+Number(results[i].cost);
        }
        $(".total-value-"+names).html(total_cost);
      });
    }


    $scope.login=$(".email").html();


    $scope.listItem = function()
    {
     $scope.getLocations
     $('body').removeClass("page-list");
     $('body').addClass("page-map");
     $(".list-show").show();
     $(".maps").hide();
     $(".items-show").hide();
     flag=1;

   }

   $scope.updateOffer = function (offer) {
     $http.get(offer)
     .success(function (response) {

      var datas=response;
      price = datas;
      var  total_prices=0;

      $(".offer-nos").html(price.length);
      for (i = 0; i < price.length; i++) {


        if(price[i].price  !="" || typeof price[i].price != "undefined")
        {

          total_prices=Number(total_prices)+Number(price[i].price);
        }
      }


      $(".price").html(total_prices);


    });

   };



   $scope.updateInvite = function (numbers) {
     $http.get(numbers)
     .success(function (response) {
      $(".zero-invite").hide();

      if(response.length <10)
      {
       var value=response.length;
       var nos= 10-Number(value);
       $(".invite-left").html(nos);
     }
     else
     {
      $("invites").hide();
      $(".invite-left").html(0);
    }


  });

   };

   $scope.loginCheck = function (logins) {

     var email_id= $(".user-name").html();
     var deviceid= $(".device-id").html();

     var name = email_id.split('@')[0];
     var user = name+deviceid;var flag=0;

     var login="http://getguzzle.com/app-test/login/"+user;
     $http.get(login)
     .success(function (response) {

      var data=response;

      if(data.length !=0)
      {

        for(i=0;i<data.length;i++)
        {

          if(data[i].email==email_id && data[i].device==deviceid)
          {
           var myname=data[i].names;
           if(myname == "" || typeof myname == "undefined")
           {
             $(".name").html(name);
           }
           else
           {
             $(".name").html(myname);
           }
           $(".mynames").html(name);
           $(".login").html(user);
           $(".entry").html(data[i].entry);
           var numbers="http://getguzzle.com/app-test/invite-nos/"+user;
           var offer="http://getguzzle.com/app-test/offer-used/"+user;
           $scope.updateInvite(numbers);
           $scope.updateOffer(offer);



         }
         else
         {
           flag=1;


         }

       }

     }
     else
     {

     }


   });

   };







   $scope.list = function()
   {
    $('body').removeClass("page-map");
    $('body').removeClass("page-profile");
    $('body').removeClass("page-detail");
    $('body').addClass("page-list");
    $(".list-show").show();
    $(".maps").hide();
    $(".result").hide();
    $(".items-show").hide();

    flag=1;
  }



  $scope.Mapsfn = function(lat,lang) {
    var latlng = new google.maps.LatLng(lat,lang);

    $('body').removeClass("page-list");
    $('body').removeClass("page-profile");
    $('body').removeClass("page-detail");
    $('body').addClass("page-map");
    $(".list-show").hide();
    $(".items-show").hide();
    $(".result").show();
    $(".maps").show();
    var bounds = new google.maps.LatLngBounds();
    bounds.extend( latlng );

        // $scope.model.myMap.setCenter(latlng);
        google.maps.event.trigger($scope.model.myMap, 'resize' );
        $scope.model.myMap.setCenter( bounds.getCenter() );


        flag=1;

      }
      $scope.Itemsfn = function(getUrl)
      {

       var geturl="http://getguzzle.com/app-test/outlet"
       setBodyClass(geturl);

       flag=1;
     }


     $scope.loginId = function()
     {
      var login_id=$(".login").html();
      
      if(window.localStorage.getItem("profile") == "completed"  )
      {
        $("#acc-activated").modal('show');

      }
      else{

       $("#myModal").modal('show');
     }
     $(".user-menu").removeClass("menu-open");
     $("body").removeClass("menu-open");
   }

   $scope.feedApp = function()
   {

    var email= $(".user-name").html();
    var value= $(".feedback-text").val();
    if(email =="" || typeof email != undefined)
    {
     email="not-registered@gmail.com";
   }




   var data       = {title:email,feedback:value};
   $.ajax({
    type       : "POST",
    url        : "http://getguzzle.com/app-test/app-feedback/"+data,
    crossDomain: true,
    data:{json: JSON.stringify(data)},
    dataType   : 'json',
    success    : function(response,status)
    {

      if(response.status==true)
      {
       $(".feedback-success").show();
       $(".feedback-text").val(null);
       setTimeout(function() {
        $(".feedback-success").hide();
        $('#app-feed').modal('hide');
      }, 2000)

     }


   },
   error      : function() {
                //console.error("error");

              }
            });


 }
 $scope.feedOut = function()
 {

  var email= $(".user-name").html();
  var status= $(".status").val();
  var value= $(".outfeed").val();
  var outid= $(".outfeed").val();
  if(email =="" || typeof email != undefined)
  {
   email="not-registered@gmail.com";
 }


 var data       = {title:email,status:status,feedback:value};
 $.ajax({
  type       : "POST",
  url        : "http://getguzzle.com/app-test/outlet-feedback/"+data,
  crossDomain: true,
  data:{json: JSON.stringify(data)},
  dataType   : 'json',
  success    : function(response,status)
  {

    if(response.status==true)
    {
     $(".outlet-success").show();

     setTimeout(function() {
      $(".outlet-success").hide();
      $('#outlet-feed').modal('hide');
    }, 2000)

   }


 },
 error      : function() {
                //console.error("error");

              }
            });


}
$scope.inviteUser = function()
{
  var email= $(".user-name").html();
  var value= $(".invite-email").val();
  var login_id=$(".login").html();
  var entry=$(".entry").html();
  var entry_left=$(".invite-left").html();
  var left= 10-Number(entry_left);
  var id="YW"+entry+left;



  var data       = {title:value,email:value,code:id,sender:email,validity:3,senderid:login_id};
  $.ajax({
    type       : "POST",
    url        : "http://getguzzle.com/app-test/invite/"+data,
    crossDomain: true,
    data:{json: JSON.stringify(data)},
    dataType   : 'json',
    success    : function(response,status)
    {

      if(response.status==true)
      {
       $(".invite-success").show();
       $(".invite-email").val(null);
       var val=$(".invite-left").html();
       var invitation=Number(val)-1;
       $(".invite-left").html(invitation);

       setTimeout(function() {
        $(".invite-success").hide();
      }, 2000)

     }


   },
   error      : function() {
                //console.error("error");

              }
            });


}


$scope.addUser = function() {


  var email= $(".user-name").html();
  var deviceid= $(".device-id").html();
  var code= $(".active-code").val();
  var name = email.split('@')[0];
  var names= name+deviceid;
  var flags=0,flags2=0,flagdone=0,flagdone2=0;

  var url="http://getguzzle.com/app-test/activation/"+code;
  $http.get(url)
  .success(function (response) {
    datas = response;


    if(datas.length==0)
    {

      $(".error-profile").show();


    }
    else
    {

      var url="http://getguzzle.com/app-test/user/"+code;
      $http.get(url)
      .success(function (response) {
        datas = response;

        if(datas.length>=1)
        {

          flags2=1;
          $(".error-profile").show();
        }
        else
        {
          $(".error-profile").hide();
          insertData();
        }
      });
    }

  });


}




});





function distance(lat1, lon1, lat2, lon2, unit,i) {


  var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var radlon1 = Math.PI * lon1/180
  var radlon2 = Math.PI * lon2/180
  var theta = lon1-lon2

  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
        //     var iDiv = document.createElement('div');
        // iDiv.id ="div"+i;
        // iDiv.className = 'block';
        // document.getElementsByClassName('distance')[0].appendChild(iDiv);

        // iDiv.innerHTML =dist;
        var rounded = Math.round( dist * 10 ) / 10;
        dist = rounded.toFixed(1);
        dist=parseFloat(dist)
        return dist

       //names.distance=dist;


     }


     function setBodyClass(getUrl)
     {

      homeflag=0;

      $.pjax({
        url: getUrl,
        container: '#pages',
        timeout: 10000
      });
    }
    var uniqueItems = function (data, key) {



      for (var i = 0; i < data.length; i++) {

        var value = data[i][key];

        if (number.indexOf(value) == -1) {
          number.push(value);

        }

      }
      return number;

    };

    app.filter('groupBy',
      function () {

        return function (collection, key) {

          if (collection === null) return;

          return uniqueItems(collection, key);
        };

      });



    app.controller("othercontroller", function($scope) {
     $(".main").show();

     $('body').removeClass("page-detail");
     $('body').removeClass("page-profile");

     if ($(".maps").css('display') != 'none') {

       $('body').addClass("page-map");
     }
     else
     {

      $('body').addClass("page-list");
    }
    $("#invite-friends").modal("hide");
    $(".result").hide();
    $scope.update=function()
    {
    };

  });

    app.controller("profileController", function($scope,$http) {
      $(".main").hide();
      $("#myModal").modal('hide');
      $('body').removeClass("page-map");
      $('body').removeClass("page-list");
      $('body').removeClass("page-detail");
      $('body').addClass("page-profile");
      $(".user-menu").removeClass("menu-open");
      $("body").removeClass("menu-open");
      $(".result").hide();


      var user=$(".login").html();
      if(user != "")
      {

      }
      else
      {
        user="undefined"
      }
        $scope.namer="";
        $scope.emails="";
        $scope.gender="";
        $scope.mobile="";

        $scope.city="";
        $scope.country="";
      var logins="http://getguzzle.com/app-test/login/"+user;
      $http.get(logins)
      .success(function (response) {

        var profile=response;

        $scope.namer=profile[0].names;
        $scope.emails=profile[0].email;
        $scope.gender=['male ', 'female'];
        $scope.mobile=profile[0].mobile;

        $scope.city=profile[0].city;
        $scope.country=profile[0].country;
        
        $("input[name=cf_gender][value="+profile[0].gender+"]").attr('checked', true);
        $("input[name=alcohol][value="+profile[0].alcohol+"]").attr('checked', true);
        $('select[name^="cf_country"] option[value="'+profile[0].country+'"]').prop("selected",true);
        $('select[name^="cf_nationality"] option[value="'+profile[0].nationality+'"]').prop("selected",true);
        $scope.alcohol = ['Yes', 'No'];
        $scope.profiles = {
          alcohol: profile[0].alcohol,
          gender: profile[0].gender
        };
        if($scope.emails!="")
        {
          $(".emails-id").prop('readonly', true);;
        }
        setTimeout(function(){
          $scope.checkComplete();
        }, 2000);
      });

     //  $(".emails-id").focusout(function() {
     //    alert("fdfsf00");

     // }).blur(function() {

     // });
$(".profile-page input[type=text]").focusout(function() {
  $scope.checkComplete();
  $scope.updateProfile();
}).blur(function() {

});
$(".profile-page select").change(function() {
  $scope.checkComplete();
  $scope.updateProfile();
});
$(".profile-page input[type=radio]").change(function() {
  $scope.checkComplete();
  $scope.updateProfile();
});

$scope.checkComplete=function()
{
  var cntreq = 0;
  var cntvals = 0;
  $('input').each(function(i, val) {
   if($(this).attr('required') == 'required') {
    cntreq++;

    if($(this).val() != '') {


      cntvals++;
      
    }
  }
});
  
  $('#percentage').empty();
  if(cntreq==cntvals)
  {
   $('#percentage').empty();
   window.localStorage.setItem("profile", "completed");
 }

 else
 {
  $('#percentage').append('(Incomplete)');
  window.localStorage.setItem("profile", "incomplete");
}

}
$scope.updateProfile=function()
{

  $(".sucess").hide();
  $(".error").hide();
  var entry_id=$(".entry").html();
  var url="http://getguzzle.com/app-test/update/"+ entry_id;
  var name=$(".screen-name").val();
  var emails_ids=$(".emails-id").val();

  var mobile=$(".mobiles").val();
  var city=$(".city").val();
  var country=$(".country").val();
  var nationality=$(".nationality").val();
  var alcohols=$("input[name=alcohol]:checked").val();
  var gender=$("input[name=cf_gender]:checked").val();
  if(name == "" || typeof name == "undefined")
  {
    var names=$(".mynames").html();
    $(".name").html(names);
  }
  else
  {
   $(".name").html(name);
 }

 var data       = {entry:entry_id,name:name,mobile:mobile,city:city,country:country,nationality:nationality,alcohol:alcohols,gender:gender};
 $.ajax({
  type       : "POST",
  url        :  url,
  crossDomain: true,
  data:{json: JSON.stringify(data)},
  dataType   : 'json',
  success    : function(response,status) {

    if(response.status==true)
    {

      $(".success").show();

    }
    else
    {
      $(".error").show();
    }

  },
  error      : function() {
            //console.error("error");
            $(".error").show();
          }
        });


}

});
//vouche
//voucher code


app.controller("outController", function($scope,$routeParams,$http)
{



  $('body').removeClass("page-list");
  $('body').removeClass("page-map");
  $('body').removeClass("page-profile");
  $('body').addClass("page-detail");
  $(".result").hide();

  var login_id=$(".login").html();

  $(".main").hide();

  $('.equal .item').matchHeight();

  var  map;

  function initialize(lat,longi) {


   var myOptions = {
    zoom: 14,
    center: new google.maps.LatLng(lat,longi),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var myLatlng=new google.maps.LatLng(lat,longi);
  map = new google.maps.Map(document.getElementById("map-canvas"),
    myOptions);

   // var images = {
   //    url: "assets/images/my-location.png"

   //  };
   //  var latlng = new google.maps.LatLng($scope.lat1, $scope.lng1);
   //  var marker = new google.maps.Marker({
   //    map: $scope.model.myMap,
   //    position:latlng ,
   //    icon:images
   //  });
var icons = {
  url: "assets/images/location.png",
  scaledSize: new google.maps.Size(35,35)
};

var marker = new google.maps.Marker({
  position: myLatlng,
  icon:icons

});
marker.setMap(map);


}

$scope.displayMap = function (lat,longi) {

  initialize(lat,longi);
  google.maps.event.trigger( map, 'resize' );
}

$scope.urltitle = $routeParams.url;

$scope.datas=$scope.cars;


var url="http://getguzzle.com/app/outlets/"+$scope.urltitle;
$http.get(url)
.success(function (response) {




 datas = response;
 $scope.outlets=datas;
 $scope.text = datas[0].desc;
 var encoded=datas[0].title;
 var titles=encoded.replace(/&amp;/g, '&');

 $scope.outlet={
   title:titles,
   phone:datas[0].phonenumber,
   image1:datas[0].image1,
   image2:datas[0].image2,
   lastcall:datas[0].lastcall,
   location:$scope.datas[0].location
 }
 var lat=datas[0].latitude;
 var longi=datas[0].longitude;
 $scope.maplatVal = lat;
 $scope.maplongVal = longi;
 // var owl = $("#owl-demo"),
 // i = 0,
 // textholder,
 // booleanValue = false;
 // var content = "<div><div class=\"item dodgerBlue\"><h1>"+i+"</h1></div><div>Test " + i + "</div></div>";
 // $("#owl-demo").html(content);
 //  //init carousel
 //  owl.owlCarousel();

  /*
  addItem() method add new slides on given position
 
  Syntax:
  owldata.addItem(htmlString, targetPosition)
 
  First parameter(mandatory) "htmlString" accept string like this:
  var newItem = "<div>new Item</div>"
  
  Second parameter "targetPosition" is optional and accept number values. 
  To add item at the end of carousel you could use -1 value. Last item is default value.
  */
  
  // $('.add').on("click", function(e){
  //   e.preventDefault();
  //   i += 1;
  //   var content = "<div><div class=\"item dodgerBlue\"><h1>"+i+"</h1></div><div>Test " + i + "</div></div>";
  //   owl.insertContent(content);
  // });
//  var content = "<div class=\"item dodgerBlue\"><h1>vcbcv</h1></div>";

$('.owl-carousel').owlCarousel({

  margin:0,
  nav:false,
  responsive:{
    0:{
      items:1
    }
  }

});

//  owl.data('owlCarousel').addItem(content);
$("#preloader-er").fadeOut();
});
$scope.offersLength=function(url,i,max)
{
 $http.get(url)
 .success(function (response) {
   $scope.values=response.length;
   console.log(response.length);
   $scope.vouchers[i].used=Number(max)-Number($scope.values);
   return response.length;
 }
 );


}

var str=$scope.urltitle;
str=str.replace(/-/g, ' ');
console.log(str);
var voucher_data;
$scope.outlettitle = $routeParams.title;

var urls="http://getguzzle.com/app-test/voucher-list/"+$routeParams.title;
$http.get(urls)
.success(function (response) {
 $scope.vouchers=response
 voucher_data=response;
 var results=voucher_data;



 for (i = 0; i < results.length; i++) {

  var house=voucher_data[i].housebeverage;
  var beverage=null;
  if(voucher_data[i].title=="2 for 1 house beverage")
  {

    if(house == "" || typeof house == "undefined" )
    {
      var beverage=voucher_data[i].housebeverage
    }
    else
    {
      var beverage=house.replace(/\s\s+/g, ' | ');
      var words = beverage.split("|");
      var temps1="",temps2="",temps3="",temps4="";
      var trims=[];
      for (var k = 0; k < words.length ; k++) {

        trims[k]=$.trim(words[k])
        if(trims[k]=="Malt")
        {
          if(voucher_data[i].Malt == "" || typeof voucher_data[i].Malt == "undefined")
          {
            temps1="Malt";

          }
          else
          {
            temps1=voucher_data[i].Malt;
          }
        }
        if(trims[k]=="Grape")
        {
          if(voucher_data[i].Grape == "" || typeof voucher_data[i].Grape == "undefined")
          {
           temps2=" Grape";
         }
         else
         {
          temps2=" "+voucher_data[i].Grape;
        }
      }
      if(trims[k]=="Spirits")
      {
        if(voucher_data[i].Spirits == "" || typeof voucher_data[i].Spirits == "undefined")
        {
          temps3=" Spirits";
        }
        else
        {
          temps3=" "+voucher_data[i].Spirits;
        }
      }
      if(trims[k]=="Soft drinks")
      {
        if(voucher_data[i].SoftDrinks == "" || typeof voucher_data[i].SoftDrinks == "undefined")
        {
         temps4=" Soft Drinks";
       }
       else
       {
        temps4=" "+voucher_data[i].SoftDrinks;
      }

    }


    beverage= temps1+" "+temps2+" "+temps3+" "+temps4;

    beverage=$.trim(beverage);
    beverage=beverage.replace(/\s\s+/g, ' | ');

    

  }
}
}
else
{
  if($scope.vouchers[i].other!="all")
  { 
    beverage=$scope.vouchers[i].other;
  }
}
var login_id=$(".login").html();
$scope.vouchers[i].housebeverage=beverage;
var day=$scope.vouchers[i].day;
var month=$scope.vouchers[i].month-1;
var year=$scope.vouchers[i].year;
var theBigDay = new Date(year,month,day);
var mess=$scope.vouchers[i].validity;
var mont= Number(month)+Number(mess);
theBigDay.setMonth(mont);
  //change
  // var image=voucher_data[i].id;
  
  $scope.vouchers[i].image =voucher_data[i].id;

  var months=theBigDay.getMonth()+1;
  var date=theBigDay.getDate()+"/"+ months +"/"+theBigDay.getFullYear();
  $scope.vouchers[i].expirydate=theBigDay.getDate()+"/"+ months +"/"+theBigDay.getFullYear();
        // $final_date.html("Valid to  : "+theBigDay.getDate()+"/"+ months +"/"+theBigDay.getFullYear());
        var max=$scope.vouchers[i].maxvouchers;
        if(login_id == "" || typeof login_id == "undefined" )
        {


          $scope.vouchers[i].used= Number(max);

        }
        else{
          var offer_url ="http://getguzzle.com/app/offer-claim/"+$scope.vouchers[i].urltitle+"/"+login_id+"/"+$routeParams.title;
          console.log(offer_url);


          $scope.offersLength(offer_url,i,max);


        }




      }

    });





$scope.goBack= function(url) {


 $(".order-"+url).show();
 $(".confirm-"+url).hide();

}




   //veriffying whether logged in

   $scope.pinVerf = function(url) {
    var user;var profiles;
    var email_id= $(".user-name").html();
    var deviceid= $(".device-id").html();
    login_id=$(".login").html();
    var user_flag=0;

    if(window.localStorage.getItem("profile") == "completed"  )
    {
      $(".code-"+url).val(null);
      $(".order-"+url).hide();
      $(".confirm-"+url).show();

    }
    else
    {

      $("#myModal").modal('show');

    }

  }


  $scope.pageVerf = function(url,voucher1) {
    var code=$(".code-"+url).val();
    var empcode=$(".code1").html();
    var empdata=$(".code1").attr("data-id");
    var temp = new Array();
    var datas = $(".code2").html();;
    temp=datas.split("**");

    var total,user;
    var flag=0; var final_code=0;var users="";

    if(code.length > 3){
      if(code== empcode)
      {
       flag=1;
       users =empdata
       final_code= empcode;
     }

     for(var j=0;j<temp.length;j++)
     {

      var str= temp[j];
      var tricode=str.split("-");
      var string= tricode[1];
      var name= tricode[0];

      if(code == string)
      {
       final_code= code;
       users = empdata;
       flag=1;
     }



   }

   if(flag==1)
   {
    var title=url;

    var outlet_name=$(".outlet-name").html();
    var device_user =$(".user-name").html();
    var voucher2= voucher1;
    var cost=$(".cost-"+url).html();
    var total_now= $(".price").html();
    var total = Number(total_now)+Number(cost);
    var newId = Date.now().toString().substr(7);
    var strings= outlet_name.substr(0, 2);
    var id=strings+" "+newId;
    $(".code-"+url).val(null);

    var data       = {title:title,voucher:title,outlet:outlet_name,employee:users,code:final_code,user:login_id,price:cost,redeemcode:id};

    $.ajax({
      type       : "POST",
      url        : "http://getguzzle.com/app/tester/"+data,
      crossDomain: true,
      data:{json: JSON.stringify(data)},
      dataType   : 'json',
      success    : function(response,status) {

        if(response.status==true)
        {

          $(".confirm-"+url).hide();
          $(".result-"+url).show();
          var number=$(".number-"+url).html();
          var values= Number(number)-1;

          if(values==0)
          {
            $(".pending-"+url).hide();
            $(".finished-"+url).show();



          }
          $(".number-"+url).html(values);
          $(".redem-code-"+url).html(id);
          $(".price").html(total);
          var offer=$(".offer-nos").html();
          offer++;
          if(offer==2)
          {
            $("#invite-friends").modal("show");
          }
          if(offer % 5 === 0)
          {
            $("#invite-friends").modal("show");
          }

        }
        else
        {
          $(".confirm-"+url).hide();
          $(".error-"+url).show();
        }

      },
      error      : function() {
            //console.error("error");
            $(".confirm-"+url).hide();
            $(".error-"+url).show();
          }
        });

}
else
{
 $(".confirm-"+url).hide();
 $(".error-"+url).show();
}


}
//back to
$scope.frontLoad = function(url) {


 $(".error-"+url).hide();
 $(".result-"+url).hide();
 $(".order-"+url).show();



}

}



//finish
});


function insertData()
{
  var email= $(".emails-id").val();
  var deviceid= $(".device-id").html();
  var data_email = email.split('@')[0];
  var data_email= data_email+deviceid;
  var name=$(".screen-name").val();
  var mobile=$(".mobiles").val();
  var city=$(".city").val();
  var country=$(".country").val();
  var nationality=$(".nationality").val();
  var alcohols=$("input[name=alcohol]:checked").val();

  var gender=$("input[name=cf_gender]:checked").val();




  var data       = {title:email,name:data_email,email:email,device:deviceid,mobile:mobile,names:name,city:city,country:country,nationality:nationality,alcohol:alcohols,gender:gender};
  $.ajax({
    type       : "POST",
    url        : "http://getguzzle.com/app-test/account/"+data,
    crossDomain: true,
    data:{json: JSON.stringify(data)},
    dataType   : 'json',
    success    : function(response,status) {

      if(response.status==true)
      {

        $(".login").html(data_email);
        login_id=$(".login").html();
        window.localStorage.setItem("emails", email);
        $("#myModal").modal('hide');
        setTimeout(function(){
          calls();
        }, 6000);

      }
      else
      {

       $("#myModal").modal('hide');
     }

   },
   error      : function() {
            //console.error("error");
            $("#myModal").modal('hide');

          }
        });
}




function calls()
{
 $(".user-name").html(window.localStorage.getItem("emails"));

 var email_id= $(".user-name").html();
 var deviceid= $(".device-id").html();

 var name = email_id.split('@')[0];
 var user = name+deviceid;
 var scope = angular.element(document.getElementById("email-id")).scope();
 var login_id=$(".login").html();

 scope.$apply(function () {
  scope.loginCheck();
});


}



app.directive('ddTextCollapse', ['$compile', function($compile) {

  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs) {

            // start collapsed
            scope.collapsed = false;

            // create the function to toggle the collapse
            scope.toggle = function() {

              scope.collapsed = !scope.collapsed;
            };

            // wait for changes on the text
            attrs.$observe('ddTextCollapseText', function(text) {

                // get the length from the attributes
                var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);

                if (text.length > maxLength) {
                    // split the text in two parts, the first always showing
                    var firstPart = String(text).substring(0, maxLength);
                    var secondPart = String(text).substring(maxLength, text.length);

                    // create some new html elements to hold the separate info
                    var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                    var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                    var moreIndicatorSpan = $compile('<span ng-if="!collapsed">...<br/>Read More </span>')(scope);
                    var lineBreak = $compile('<br ng-if="collapsed">')(scope);


                    // remove the current contents of the element
                    // and add the new ones we created
                    element.empty();
                    element.append(firstSpan);
                    element.append(secondSpan);
                    element.append(moreIndicatorSpan);
                    element.append(lineBreak);

                  }
                  else {
                    element.empty();
                    element.append(text);
                  }
                });
}
};
}]);

function updateOutlet(data,$scope) {




  window.localStorage['outlets'] = JSON.stringify(data);
  var datas=data;
  var result=data;
  $scope.useMakes = [];
  $scope.cars=result,$scope.lat1, $scope.lng1;

  var nos= datas.length+ " items";
  $(".result").html(nos);

  

  $scope.showPosition = function ()
  {

    for (i = 0; i < result.length; i++) {

      if(i > 3){
        result[i].show=0;

      }
      var lat=result[i].latitude;
      var longi=result[i].longitude;var infobox;
      var latlng = new google.maps.LatLng($scope.lat1,$scope.lng1);
      var dist=distance($scope.lat1,$scope.lng1,lat,longi,"K",i);
      var encoded=data[i].title;
      var titles=encoded.replace(/&amp;/g, '&');
      var url=data[i].urltitle;
      data[i].title=titles;
      datas[i].distance=dist;
      // offer value
      // var urltit=data[i].title;
      // var names=data[i].urltitle;
      // $scope.offerValue(urltit,names);
      
    }
  }

  $scope.showPosition();




  $scope.filterMakes = function ()
  {


    return function (p) {
      flag=0;

      for (var i in $scope.useMakes) {
        flag =1;


        if (p.type == number[i] && $scope.useMakes[i]) {

          return true;
        }

      }

      if($('input[type="checkbox"]:checked').length == 0) {
        flag=0;
      }
      if(flag==0 )
      {

        return true;
      }
    };
    var count=$("#mylist li").length;



  };







}
function mapinitialize(lat, longi) {
  var myCenter = new google.maps.LatLng(lat, longi);
  var image = {
    url: "assets/images/location.png",
    scaledSize: new google.maps.Size(50,50)
  };
  var mapProp = {center:myCenter,zoom:16,scrollwheel:false,draggable:true,mapTypeId:google.maps.MapTypeId.ROADMAP};
  var map = new google.maps.Map(document.getElementById("map-canvas"),mapProp);
  var marker = new google.maps.Marker({position:myCenter,icon:image,});
  marker.setMap(map);
}


function mapClick()
{

  var val=$(".map-toggle").attr('data-id');

  if(val=="maps")
  {
    $(".map-fn").show();
    
    /*google.maps.event.trigger( map, 'resize' );*/
    //$(".map-fn").addClass("maps-show");

    $(".map-toggle").addClass("bg-color-a");
    $(".map-toggle").attr('data-id','list');
  }
  else{

   $(".map-fn").hide();
   
   // $(".map-fn").removeClass("maps-show");
    // $(".map-fn").addClass("maps-hide");
    $(".map-toggle").attr('data-id','maps');
    $(".map-toggle").removeClass("bg-color-a");

  }

  var lat = document.getElementById('maplatVal').innerHTML;
  var longi = document.getElementById('maplongVal').innerHTML;

  mapinitialize(lat,longi);

}
function checkInternet() {

  var networkState = navigator.connection.type;

  if(networkState == Connection.NONE) {

    $("#offline-modal").modal("show");

  } else {

   return true;
 }
}



// function inviteLeft() {


//     var numbers="http://getguzzle.com/app-test/invite-nos/"+login_id;

//     var scope = angular.element(document.getElementById("login")).scope();
//     var login_id=$(".login").html();

//     scope.$apply(function () {
//         scope.updateInvite(numbers);
//     });


// }
