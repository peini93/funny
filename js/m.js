

   $(document).foundation();
 			$(".off-canvas-submenu").hide();
				$(".off-canvas-submenu-call").click(function() {
					 var icon = $(this).parent().next(".off-canvas-submenu").is(':visible') ? '+' : '-';
					 $(this).parent().next(".off-canvas-submenu").slideToggle('fast');
					 $(this).find("span").text(icon);
				});




//m版登入
$(document).ready(function() {
    
    $(".options1").click(function() {
        $(this).toggleClass("active");
        $(".nav1").slideToggle();
    });
    $(".nav1 > ul > li:has(ul) > a").append('<div class="arrow-bottom"></div>');

    $(".options2").click(function() {
        $(this).toggleClass("active");
        $(".nav2").slideToggle();
    });
    $(".nav2 > ul > li:has(ul) > a").append('<div class="arrow-bottom"></div>');

    
});




$('.m-sinlgeComments h3').click(function() {
    $('.m-sinlgeComments').toggleClass('open');$(this).nextAll().removeClass('open');
});
  
  

  
$(document).on( 'scroll', function(){

	if ($(window).scrollTop() >= 280) {
		$('.sinlge-page .bottomShare,.sinlge-page .postText').addClass('fix2').removeClass('fix1');
	} else {
		$('.sinlge-page .bottomShare,.sinlge-page .postText').addClass('fix1').removeClass('fix2');

	}

	if ($(window).scrollTop() >= 1080) {
		$('.sinlge-article .bottomShare,.sinlge-page .postText').addClass('fix2').removeClass('fix1');
	} else {
		$('.sinlge-article .bottomShare,.sinlge-page .postText').addClass('fix1').removeClass('fix2');

	}

});



$('.close_videoBoxOver').on('click', function(){
    $('.videoBoxOver').css('display','none');
});

var now_scroll = 0 ;

$('.tab-bar .menu-icon,.postText a').click(function(){ 
	//alert($(window).scrollTop());
	now_scroll = $(window).scrollTop();
	//$('.left-off-canvas-menu').animate({scrollTop:$('.left-off-canvas-menu').offset().top}, 0);}
	$('html,body').animate({scrollTop:$('.left-off-canvas-menu').offset().top}, 0);}
	//$('.left-off-canvas-menu').css({"top":"0"});
); 
	
	
$(".exit-off-canvas").click(function(){

	$('html,body').animate({scrollTop:now_scroll}, 0);
	//alert("off");

});


// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.nav-3menu').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});


/*
setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.nav-3menu').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.nav-3menu').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}
*/