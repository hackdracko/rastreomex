(function ($) {
"use strict";

/* header_sticky */
 $(window).on('scroll',function() {
   var scroll = $(window).scrollTop();
   if (scroll < 245) {
    $("#header_sticky").removeClass("scroll_header");
   }else{
    $("#header_sticky").addClass("scroll_header");
   }
    var scroll = $(window).scrollTop();
   if (scroll < 245) {
    $("#header_sticky_2").removeClass("scroll_header_2");
   }else{
    $("#header_sticky_2").addClass("scroll_header_2");
   }
    var scroll = $(window).scrollTop();
   if (scroll < 245) {
    $("#header_sticky_3").removeClass("scroll_header_3");
   }else{
    $("#header_sticky_3").addClass("scroll_header_3");
   }
  });


$(function () {
	$('a.smoth-scroll').on('click', function (event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top - 5
		}, 1000);
		event.preventDefault();
	});
});


/* Scroll Up */
$.scrollUp({
	easingType: 'linear',
	scrollSpeed: 900,
	animation: 'fade',
	scrollText: '<i class="fa fa-angle-up"></i>',
});


  $(".hover").mouseleave(
    function () {
      $(this).removeClass("hover");
    }
  );


  /* Scrolling Effect js */
	// Select all links with hashes
	$('a[href*="#"]')
	  // Remove links that don't actually link to anything
	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .click(function(event) {
		// On-page links
		if (
		  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
		  &&
		  location.hostname == this.hostname
		) {
		  // Figure out element to scroll to
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		  // Does a scroll target exist?
		  if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();
			$('html, body').animate({
			  scrollTop: target.offset().top
			}, 500, function() {
			  // Callback after animation
			  // Must change focus!
			  var $target = $(target);
			  $target.focus();
			  if ($target.is(":focus")) { // Checking if the target was focused
				return false;
			  } else {
				$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
				$target.focus(); // Set focus again
			  };
			});
		  }
		}
	});


})(jQuery);
