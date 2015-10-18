

var marker = null,i=0;var datas=[];var flag;var price;var total_prices=0;var number = new Array();var markersArray = [];var markers = new Array();
var url="http://getguzzle.com/app/markers";  var locations = [];  var pinCircle = null;

var app = angular.module("geo", ['ngRoute',"ui.map", "ui.event","readMore",'ngTouch'])
app .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'list.html',

    }).
    when('/outlet/:url', {
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

  $("body").show();
  $rootScope.homemaintitle = false;
  $(".logo-splash").show();
  $(".step1").on('click', function (){
    $('#demoBox2').modal("show"); 
  });


  angular.element(document).ready(function () {
    calls();
  });

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
  scaledSize: new google.maps.Size(35,35)
};



$scope.mapOptions = 
{
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};




$http({
  method: 'GET',
  url: 'http://getguzzle.com/app/markers',

}).success(function(data){

  $rootScope.homemaintitle = true;
  $("#status").fadeOut(); $("#preloader").delay(350).fadeOut("slow");

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

    $scope.lat1 = position.coords.latitude;
    $scope.lng1 = position.coords.longitude;
    $scope.accuracy = position.coords.accuracy;
    
    var images = {
      url: "assets/images/my-location.png"

    };
    var latlng = new google.maps.LatLng($scope.lat1, $scope.lng1);
    var markers = new google.maps.Marker({
      map: $scope.model.myMap,
      position:latlng ,
      icon:images
    });
    markersArray.push(markers);

    $scope.map = {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    }
    

    for (i = 0; i < result.length; i++) {

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


 $scope.setPosition = function (position)
 {


  $scope.$apply();

  if (markersArray) {
    for (i=0; i < markersArray.length; i++) {
     markersArray[i].setMap(null);
   }
   markersArray.length = 0;
 }

 var images = {
  url: "assets/images/my-location.png"

};
var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
markers = new google.maps.Marker({
  map: $scope.model.myMap,
  position:latlng ,
  icon:images
});
markersArray.push(markers);
for (i = 0; i < result.length; i++) {

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

          var positionTimer = navigator.geolocation.watchPosition($scope.setPosition, $scope.showError);

          setTimeout(
            function(){
                    // Clear the position watcher.
                    navigator.geolocation.clearWatch( positionTimer );
                  },
                  (1000 * 60 * 5)
                  );

          function onOnline() {
           navigator.geolocation.clearWatch( positionTimer );
         }

         $scope.getLocation = function () {
          if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError,{
              timeout: (5 * 1000),
              maximumAge: (1000 * 60 * 15),
              enableHighAccuracy: true
            });
          }
          else {
            $scope.error = "Geolocation is not supported by this browser.";
            alert($scope.error);
          }
        }


        $scope.getLocation();




      }).error(function(){

      });
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
         var url='#outlet/'+info.urltitle;
         var latlng = new google.maps.LatLng(info.latitude,info.longitude);
         var marker = new google.maps.Marker({
          map: $scope.model.myMap,
          position:latlng ,
          title:info.title,
          icon:image,
          url:url
        });
         marker.content = '<div><a href="#outlet/"> <img src="assets/images/info.png">' + titles + '</a> </div>';

         $scope.myMarkers.push(marker);

         google.maps.event.addListener(marker, 'click', function() {

          $scope.$apply();
          $scope.infoWindow.setContent('<a href="'+url+'"><h4><img src="assets/images/info.png" style="width:10%;margin-right:5px;">' +  this.title+'  </h4></a>');

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

        for (i = 0; i < response.length; i++) {
          total_cost=Number(total_cost)+Number(results[i].cost);
        }
        $(".total-value-"+names).html(total_cost);
      });
    }


    $scope.login=$(".email").html();


    $scope.listItem = function() 
    {

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

           $(".name").html(name);
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
           $("#myModal").modal('show');

         }

       }

     }
     else
     {
       $("#myModal").modal('show');
     }


   });

   };







   $scope.list = function() 
   {
    $('body').removeClass("page-map");
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
      if(login_id == "" || typeof login_id == "undefined" )
      {
        $("#myModal").modal('show');

      }
      else{
       $("#acc-activated").modal('show');
     }
     $(".user-menu").removeClass("menu-open");
     $("body").removeClass("menu-open");
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
         $(".success").show();
         $(".invite-email").val(null); 
         var val=$(".invite-left").html();
         var invitation=Number(val)-1;
         $(".invite-left").html(invitation);

         setTimeout(function() {
          $(".success").hide();
        }, 2000)

       }


     },
     error      : function() {
                //console.error("error");

              }
            });    


  }


  $scope.addUser = function() {


    var email= $(".emails").val();

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
            var numbers="http://getguzzle.com/app-test/invite-nos/"+names;
            var offer="http://getguzzle.com/app-test/offer-used/"+names;
            $scope.updateInvite(numbers);
            $scope.updateOffer(offer); 
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
     if ($(".maps").css('display') != 'none') {

       $('body').addClass("page-map");
     }
     else
     {

      $('body').addClass("page-list");
    }

    $(".result").hide();
    $scope.update=function()
    {
    };

  });

    app.controller("profileController", function($scope,$http) {
      $(".main").hide();
      $('body').removeClass("page-map");
      $('body').removeClass("page-list");
      $('body').addClass("page-detail");
      $(".user-menu").removeClass("menu-open");
      $("body").removeClass("menu-open");
      $(".result").hide();
      

      var user=$(".login").html();
      var logins="http://getguzzle.com/app-test/login/"+user;
      $http.get(logins)
      .success(function (response) {

        var datas=response;
        $scope.namer=datas[0].names;
        $scope.gender=['male ', 'female'];
        $scope.mobile=datas[0].mobile;
        $scope.city=datas[0].city;
        $scope.country=datas[0].country;
        $scope.nationality=datas[0].nationality;

        $scope.alcohol = ['Yes', 'No']; 
        $scope.profiles = {
          alcohol: datas[0].alcohol,
          gender: datas[0].gender
        };



      });



      $scope.updateProfile=function()
      {

        $(".sucess").hide();
        $(".error").hide();
        var entry_id=$(".entry").html();
        var url="http://getguzzle.com/app-test/update/"+ entry_id;
        var name=$(".screen-name").val();
        var mobile=$(".mobile").val();
        var city=$(".city").val();
        var country=$(".country").val();
        var nationality=$(".nationality").val();
        var alcohols=$("input[name=alcohol]:checked").val();
        var gender=$("input[name=cf_gender]:checked").val();

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
   lastcall:datas[0].lastcall

 }
 var lat=datas[0].latitude;
 var longi=datas[0].longitude;

 $('.owl-carousel').owlCarousel({

  margin:0,
  nav:false,
  responsive:{
    0:{
      items:1
    }
  }

});


 $("#preloader-er").fadeOut();
 $scope.mapClick=function()
 {
  var val=$(".map-toggle").attr('data-id');

  if(val=="maps")
  {
    $(".map-fn").removeClass("maps-hide");
    $(".map-fn").addClass("maps-show");

    $(".map-toggle").addClass("bg-color-a");
    $(".map-toggle").attr('data-id','list');
  }
  else{
    $(".map-fn").removeClass("maps-show");
    $(".map-fn").addClass("maps-hide");
    $(".map-toggle").attr('data-id','maps');
    $(".map-toggle").removeClass("bg-color-a");

  }

}

$scope.displayMap(lat,longi);


});



var str=$scope.urltitle;
str=str.replace(/-/g, ' ');


var urls="http://getguzzle.com/app-test/markers/"+str;
$http.get(urls)
.success(function (response) {
 $scope.vouchers=response
 datas=response;
 var results=datas;
 
 for (i = 0; i < results.length; i++) {

  var day=$scope.vouchers[i].day;
  var month=$scope.vouchers[i].month-1;
  var year=$scope.vouchers[i].year;
  var theBigDay = new Date(year,month,day);
  var mess=$scope.vouchers[i].validity; 
  var mont= Number(month)+Number(mess);
  theBigDay.setMonth(mont);
  var image=datas[i].title;
  $scope.vouchers[i].image = image.replace(/ /g, '-');

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
          var offer_url ="http://getguzzle.com/app/offer-claim/"+$scope.vouchers[i].urltitle+"/"+login_id;

          $.ajax({
            url:offer_url,
            dataType: 'json',
            async: false,
            success: function(data) {
              offers = data;
            }
          });

          var values= offers.length;
          $scope.vouchers[i].used=Number(max)-Number(values);
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

    if(login_id == "" || typeof login_id == "undefined" )
    {
      $("#myModal").modal('show');

    }
    else
    {

     $(".order-"+url).hide();
     $(".confirm-"+url).show();

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
  var email= $(".emails").val();
  var deviceid= $(".device-id").html();
  var code= $(".active-code").val();
  var name = email.split('@')[0];
  var names= name+deviceid;  
  var data       = {title:email,name:names,email:email,device:deviceid,code:code};
  $.ajax({
    type       : "POST",
    url        : "http://getguzzle.com/app-test/account/"+data,
    crossDomain: true,
    data:{json: JSON.stringify(data)},
    dataType   : 'json',
    success    : function(response,status) {

      if(response.status==true)
      {

        $(".login").html(names);
        $(".name").html(name);

        login_id=$(".login").html();
        localStorage.emails = email;
        $("#myModal").modal('hide');

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
  $(".user-name").html(localStorage.getItem("emails"))
  var email_id= $(".user-name").html();
  var deviceid= $(".device-id").html();
  
  if(email_id !=null || typeof email_id !="undefined" )
  {
    var name = email_id.split('@')[0];
    var user = name+deviceid;
    var scope = angular.element(document.getElementById("email-id")).scope();
    var login_id=$(".login").html();

    scope.$apply(function () {
      scope.loginCheck();
    });
  }
  else
  {
   $("#myModal").modal('show');
 }


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
                    var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                    var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                    var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "" : "Read more"}}</span>')(scope);

                    // remove the current contents of the element
                    // and add the new ones we created
                    element.empty();
                    element.append(firstSpan);
                    element.append(secondSpan);
                    element.append(moreIndicatorSpan);
                    element.append(lineBreak);
                    element.append(toggleButton);
                  }
                  else {
                    element.empty();
                    element.append(text);
                  }
                });
}
};
}]);

// function inviteLeft() {


//     var numbers="http://getguzzle.com/app-test/invite-nos/"+login_id;

//     var scope = angular.element(document.getElementById("login")).scope();
//     var login_id=$(".login").html();

//     scope.$apply(function () {
//         scope.updateInvite(numbers);
//     });


// }