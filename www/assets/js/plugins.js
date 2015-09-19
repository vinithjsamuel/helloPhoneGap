jQuery(document).ready(function() {






///////////////////////////////////////////////////////////////////////////
// equal H
///////////////////////////////////////////////////////////////////////////


$(window).load(function() {

	
	$(function() {
		$('.equal .item').matchHeight();
		$("body").swipe( {
        //Generic swipe handler for all directions
        swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
        	alert(event.pageX);
        	 var xPos = e.originalEvent.touches[0].pageX;
        	 alert(xPos);
        	if(xPos<100)
        	{
        		$( "#cd-menu-trigger" ).trigger( "click" );

        	}
        }

    });
	});
	
})





///////////////////////////////////////////////////////////////////////////
// sticky
///////////////////////////////////////////////////////////////////////////

// $(".sticky").stick_in_parent();




$('.owl-carousel').owlCarousel({
	loop:true,
	margin:0,
	nav:false,
	responsive:{
		0:{
			items:1
		}
	}
})


///////////////////////////////////////////////////////////////////////////
//  scrollTo
///////////////////////////////////////////////////////////////////////////


$('.fixed-nav, .controls,#sideMenu,header').localScroll({
	target:'body',
	duration: 1000,
	easing: 'easeInOutExpo', //(see http://easings.net/)
	offset:-99
});




// $('#mainMenu').onePageNav({
// 	currentClass: 'active',
// 	changeHash: false
// });




///////////////////////////////////////////////////////////////////////////
//  scrollUp
///////////////////////////////////////////////////////////////////////////



$.scrollUp({
    scrollName: 'scrollUp', // Element ID
    topDistance: '600', // Distance from top before showing element (px)
    topSpeed: 400, // Speed back to top (ms)
    animation: 'fade', // Fade, slide, none
    animationInSpeed: 200, // Animation in speed (ms)
    animationOutSpeed: 200, // Animation out speed (ms)
    scrollText: '<i class="fa fa-angle-up"></i>', // Text for element
    activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
});


///////////////////////////////////////////////////////////////////////////
//  appear
///////////////////////////////////////////////////////////////////////////


jQuery('.appear').appear();
$(document.body).on('appear', '.appear-fadeIn', function() {
	$(this).each(function(){jQuery(this).addClass('fadeIn') });
});
$(document.body).on('appear', '.appear-bounceInRight', function() {
	$(this).each(function(){jQuery(this).addClass('bounceInRight')});
});
$(document.body).on('appear', '.appear-flip', function() {
	$(this).each(function(){jQuery(this).addClass('flip') });
});
$(document.body).on('appear', '.appear-slide', function() {
	$(this).each(function(){jQuery(this).addClass('slide') });
});
$(document.body).on('appear', '.appear-bounceInDown', function() {
	$(this).each(function(){jQuery(this).addClass('bounceInDown') });
});
$(document.body).on('appear', '.appear-bounceInLeft', function() {
	$(this).each(function(){jQuery(this).addClass('bounceInLeft') });
});
$(document.body).on('appear', '.appear-bounceIn', function() {
	$(this).each(function(){jQuery(this).addClass('bounceIn') });
});
$(document.body).on('appear', '.appear-puffIn', function() {
	$(this).each(function(){jQuery(this).addClass('puffIn') });
});
$(document.body).on('appear', '.appear-holeIn', function() {
	$(this).each(function(){jQuery(this).addClass('holeIn') });
});

$(document.body).on('appear', '.appear-fadeInUp', function() {
	$(this).each(function(){jQuery(this).addClass('fadeInUp') });
});



});	//ready








