(function($) {

	"use strict";

	/** generals
	==================== **/
	var win = $(window),
		ww = window.innerWidth,
		wh = window.innerHeight;


	/** main nav
	==================== **/
	function main_nav() {
		if (ww > 768) {
			$('.main-nav li:has(ul)').off('mouseenter mouseleave');
			$('.main-nav li:has(ul)').find('a').off('click');

			$('.main-nav li:has(ul)').on('mouseenter', function() {
				$(this).find('ul:first').stop().css('display', 'block');
			}).on('mouseleave', function() {
				$(this).find('ul:first').stop().css('display', 'none');
			});

			$('.main-nav li:has(ul)').find('a').on('click', function() {
				var parent = $(this).parent(),
					submenu = $(this).next('ul');

				if (parent.children('ul').length == 0) return true;
				else return false;
			});
		} else {
			$('.main-nav li:has(ul)').off('mouseenter mouseleave');
			$('.main-nav li:has(ul)').find('a').off('click');

			$('.main-nav li:has(ul)').find('a').on('click', function() {
				var parent = $(this).parent(),
					submenu = $(this).next('ul');

				if (submenu.is(':visible'))
					parent.find('ul').slideUp(250);

				if (submenu.is(':hidden')) {
					parent.siblings().find('ul').slideUp(250);
					submenu.css('height', 'auto').slideDown(250);
				}

				if (parent.children('ul').length == 0) return true;
				else return false;
			});
		}
	}


	/** hover works
	==================== **/
	$('.work-entry').each(function() {
		$(this).on('mouseenter', function() {
			$('.work-entry').stop().animate({
				'opacity': 0.2
			}, 200);
			$(this).stop().animate({
				'opacity': 1
			});
		}).on('mouseleave', function() {
			$('.work-entry').stop().animate({
				'opacity': 1
			}, 200);
		});
	});


	/** background images
	==================== **/
	$('.imageBG').each(function() {
		var image = $(this).data('img');

		$(this).css({
			'background-image': 'url(' + image + ')',
			'background-size': 'cover',
			'background-position': 'center center',
			'background-repeat': 'no-repeat'
		});
	});


	/** reveal project images
	==================== **/
	function reveal_images() {
		win.scroll(function() {
			$(".reveal").each(function(i) {

				var revealTop = $(this).offset().top;
				var winBottom = win.scrollTop() + wh;

				if (revealTop < winBottom) {
					$(this).delay(i * 150).queue(function(next) {
						$(this).addClass('reveal-in');
						next();
					});
				}
			});
		});

		win.scroll();
	}


	/** back2top
	==================== **/
	win.on('scroll', function() {
		var scroll = $(this).scrollTop();

		if (scroll > 100) {
			$('.back2top').addClass('visible');
		} else {
			$('.back2top').removeClass('visible');
		}
	});

	$('.back2top').on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	});


	/** play loader
	==================== **/
	function playLoader() {
		setTimeout(function() {
			$('.loader-mask').addClass('hide');
			reveal_images();
		}, 1000);
	}


	/** window
	==================== **/
	win.on('load', function() {
		playLoader();

		main_nav();
	});

	win.on('resize', function() {
		ww = window.innerWidth;
		wh = window.innerHeight;

		main_nav();
	});

})(jQuery);
