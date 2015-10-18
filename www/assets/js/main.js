jQuery(document).ready(function() {

///////////////////////////////////////////////////////////////////////////
//  flip card
///////////////////////////////////////////////////////////////////////////


$(".ar-switch").on('click touchstart', function (){
	$(this).parent().parent().parent().toggleClass("flip");
});









///////////////////////////////////////////////////////////////////////////
//  close side menu
///////////////////////////////////////////////////////////////////////////



$("#sideMenu a").on('click touchstart', function (){
	// event.preventDefault();
	setTimeout(function() {

		$('#cd-menu-trigger').removeClass('is-clicked');
		$('.mz-main-content').removeClass('lateral-menu-is-open');
		$('header').removeClass('lateral-menu-is-open');
		$('nav').removeClass('lateral-menu-is-open');
		$('body').removeClass('overflow-hidden');

	}, 1500);
});






});	//ready