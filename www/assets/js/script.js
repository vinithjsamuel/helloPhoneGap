

var marker = null,i=0;var datas=[];var flag;var price;var total_prices=0;var number = new Array();
var url="http://getguzzle.com/app/markers";  var locations = [];  var pinCircle = null;

var app = angular.module("geo", ['ngRoute',"ui.map", "ui.event"])
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
app.controller("mainController", function($scope,$http,$filter,$q)
{

  // $("body").swipe(function(){

  //   $( "#cd-menu-trigger" ).trigger( "click" );

  // });

$("body").swipe( {
        //Generic swipe handler for all directions
        swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
          $( "#cd-menu-trigger" ).trigger( "click" );
        }
      });
// angular.element(document).ready(function () {
//   calls();
// });

$scope.model = { myMap: undefined };
$scope.lat = "0";
$scope.lng = "0";
$scope.accuracy = "0";
$scope.error = "";

$scope.myMarkers = [];
$scope.group

$scope.mapOptions = 
{
  center: new google.maps.LatLng($scope.lat, $scope.lng),
  zoom: 13,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};



$http({
  method: 'GET',
  url: 'http://getguzzle.com/app/markers',

}).success(function(data){


 var datas=data;
 var result=data;
 $scope.useMakes = [];
 $scope.cars=result;

 var nos= datas.length+ " items";
 $(".result").html(nos);


 $scope.showResult = function () {
  return $scope.error == "";
}




$scope.visible = false;
$scope.mapViewPosition = {};
LocationCenter = new google.maps.LatLng($scope.lat, $scope.lng);
approxCircle = {
  strokeColor: "#008595",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#008595",
  fillOpacity: 0.25,
  map: $scope.model.myMap,
  center: LocationCenter,
  radius: 50,
  clickable : false
};


pinCircle = new google.maps.Circle(approxCircle);


$scope.showPosition = function (position)
{


  $scope.$apply();
  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  $scope.model.myMap.setCenter(latlng);
  for (i = 0; i < result.length; i++) {
    if(i==0)
    {
      $scope.lat = position.coords.latitude;
      $scope.lng = position.coords.longitude;
      $scope.accuracy = position.coords.accuracy;


      $scope.$apply();
      var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
      $scope.model.myMap.setCenter(latlng);
      $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));

      $scope.$apply();
    }

    $scope.lat = result[i].latitude;
    $scope.lng =  result[i].longitude;
    var lat=result[i].latitude;
    var longi=result[i].longitude;var infobox;



    var latlng = new google.maps.LatLng($scope.lat,$scope.lng);
    var dist=distance(position.coords.latitude,position.coords.longitude,lat,longi,"K",i);
    var encoded=data[i].title;
    data[i].title=encoded.replace(/&amp;/g, '&');
    


    datas[i].distance=dist; 


    $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng 
    }));




  }
  
  $(".items-show").hide();
  $scope.$apply();



}
$scope.offerValue();

$scope.offerValue = function () 
{
  var urls="http://getguzzle.com/app-test/cost"

  $http.get(urls)
  .success(function (response) {

    console.log(response)
    var total_cost=0;
    datas=response;
    var results=datas;
    for (i = 0; i < response.length; i++) {
     
      total_cost=Number(total_cost)+Number(results[i].cost);
      $(".total-value-"+results[i].outlet).html(total_cost);


    }
  });
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
  $scope.model.myMap.setCenter(latlng);
  for (i = 0; i < result.length; i++)
  {
    if(i==0)
    {
      $scope.lat =25.08135;
      $scope.lng = 55.144075;
                //$scope.accuracy = position.coords.accuracy;
                $scope.$apply();

                var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
                $scope.model.myMap.setCenter(latlng);
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

              $(".items-show").hide();
              $(".maps").hide();

              $scope.$apply();
            }
          }


          $scope.$watch('nas',

            function (newValue, oldValue) {

              for (jdx in $scope.myMarkers) {

                $scope.myMarkers[jdx].setMap(null);
              }
              $scope.myMarkers = [];
              for (idx in $scope.nas) {

                createMarker($scope.nas[idx]);

              }
            }, 
            true);

          var createMarker = function (info)
          {
            var latlng = new google.maps.LatLng(info.latitude,info.longitude);
            $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
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
              $scope.error = "Geolocation is not supported by this browser.";
              alert($scope.error);
            }
          }


          $scope.getLocation();



        }).error(function(){

        });
        $("main").show();




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

          for (i = 0; i < price.length; i++) {
           total_prices=Number(total_prices)+Number(price[i].price);
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
         $http.get(logins)
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

             }

           }

         }
         else
         {
          $('#demoBox').modal("show"); 
        }

        if(flag==1)
        {

         $('#demoBox').modal("show");  
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

      $scope.Mapsfn = function() {


        $('body').removeClass("page-list");
        $('body').removeClass("page-detail");
        $('body').addClass("page-map");

        $(".list-show").hide();
        $(".items-show").hide();
        $(".result").show();
        $(".maps").show();
        google.maps.event.trigger($scope.model.myMap, 'resize' );



        flag=1;

      }
      $scope.Itemsfn = function(getUrl) 
      {

       var geturl="http://getguzzle.com/app-test/outlet"
       setBodyClass(geturl);

       flag=1;
     }
     $scope.inviteUser = function()
     {
      var email= $(".user-name").html();
      var value= $(".invite-email").val();
      var login_id=$(".login").html();

      var id="YW"+new Date().getTime();



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
     $(".result").hide();
     $('body').removeClass("page-detail");
     $('body').addClass("page-list");

   });

    app.controller("profileController", function($scope,$http) {
      $(".main").hide();
      $('body').removeClass("page-map");
      $('body').removeClass("page-list");
      $('body').addClass("page-detail");


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



      $scope.update=function()
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

              $(".sucess").show();

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

  var login_id=$(".login").html();

  $(".main").hide();

  $('.equal .item').matchHeight();

  var  map;

  function initialize(lat,longi) {
                  // create the map

                  var myOptions = {
                    zoom: 7,
                    center: new google.maps.LatLng(lat,longi),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                  }
                  var myLatlng=new google.maps.LatLng(lat,longi);
                  map = new google.maps.Map(document.getElementById("map-canvas"),
                    myOptions);
                  var marker = new google.maps.Marker({
                    position: myLatlng

                  });
                  marker.setMap(map);


                }

                $scope.displayMap = function (lat,longi) {



                  initialize(lat,longi);
                  google.maps.event.trigger( map, 'resize' );
                }


// $(".share-icons .btn-map").on('click', function (){

//     $(".map").toggleClass("show");
//     $scope.displayMap();
//     $(this).toggleClass("bg-color-a");
// });
$scope.urltitle = $routeParams.url;

var url="http://getguzzle.com/app/outlets/"+ $scope.urltitle;
$http.get(url)
.success(function (response) {
  datas = response;
  $scope.outlet=datas;
  $scope.phone=datas[0].phonenumber;
  var lat= datas[0].latitude;
  var longi=datas[0].longitude;
  $scope.image1=datas[0].image1;
  $scope.image2=datas[0].image2;
  $scope.image3=datas[0].image3;
  $('.owl-carousel').owlCarousel({
    items : 1,
    margin:0,
    nav:false,
    responsive:{
      0:{
        items:1
      }
    }


  });


  $( ".map-toggle" ).click(function(e) {
    e.preventDefault();

    $(".maps-show").toggleClass("show");
    $scope.displayMap(lat,longi);
    $(this).toggleClass("bg-color-a");

  });



});


var urls="http://getguzzle.com/app-test/markers/"+$scope.urltitle;
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
          console.log(offers);
          var values= offers.length;
          $scope.vouchers[i].used=Number(max)-Number(values);
        }




      }

    });






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

    console.log(datas);
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
        console.log(datas);
        console.log(datas);
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
    console.log(data);
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
  var email= $(".user-name").html();
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
        login_id=$(".login").html();

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
  var email_id= $(".user-name").html();
  var deviceid= $(".device-id").html();

  var name = email_id.split('@')[0];
  var user = name+deviceid;

  var logins="http://getguzzle.com/app-test/login/"+user;
  var scope = angular.element(document.getElementById("email-id")).scope();
  var login_id=$(".login").html();

  scope.$apply(function () {
    scope.loginCheck(logins);
  });



}

// function inviteLeft() {


//     var numbers="http://getguzzle.com/app-test/invite-nos/"+login_id;

//     var scope = angular.element(document.getElementById("login")).scope();
//     var login_id=$(".login").html();

//     scope.$apply(function () {
//         scope.updateInvite(numbers);
//     });


// }







