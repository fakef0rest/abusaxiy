jQuery(document).ready(function() {
	"use strict";

	/* Mapplic Instances */
	$('#mapplic-front').mapplic({
		source: 'mall.json',
		markers: false,
		minimap: false,
		sidebar: false,
		height: 600,
		zoombuttons: false,
		zoom: false,
		smartip: false,
		deeplinking: false,
		rotator: 'starbucks, zara, hnm, subway, jcpenney, pullnbear, petco, massimodutti',
		skin: 'mapplic-dark'
	});

	$('#mapplic-location').mapplic({
		source: 'mall.json',
		markers: false,
		minimap: false,
		sidebar: false,
		landmark: true,
		height: 260,
		zoombuttons: false,
		smartip: false,
		skin: 'mapplic-dark',
		zoom: true
	});

	$('#mapplic-dir').mapplic({
		source: 'mall.json',
		markers: false,
		minimap: false,
		sidebar: false,
		height: 600,
		clearbutton: false,
		zoombuttons: false,
		zoom: false,
		smartip: false,
		deeplinking: false,
		skin: 'mapplic-dark'
	});

	$('#mapplic-dir-small').mapplic({
		source: 'mall.json',
		markers: false,
		minimap: false,
		sidebar: false,
		clearbutton: true,
		zoombuttons: false,
		smartip: false,
		height: 300,
		zoom: true,
		tooltip: {
			title: true,
			thumb: false,
			desc: false,
			link: true
		},
		maxscale: 5,
		skin: 'mapplic-dark'
	});

	$('#mapplic-element').mapplic({
		source: 'mall.json',
		markers: false,
		minimap: true,
		sidebar: true,
		height: 350,
		clearbutton: true,
		zoom: true,
		skin: 'mapplic-dark'
	});

	/* Sticky sidebar */
	var mobile = false;
	$('.sticky-sidebar').stick_in_parent();
	$('.sticky-sidebar').on('sticky_kit:bottom', function(e) {
		$(this).parent().css('position', 'static');
	}).on('sticky_kit:unbottom', function(e) {
		$(this).parent().css('position', 'relative');
	});

	$(window).on('resize', function() {
		if (($(window).width() < 992) && (mobile == false)) {
			$(".sticky-sidebar").trigger("sticky_kit:detach");
			mobile = true;
			console.log('small')
		}
		else if (($(window).width() >= 992) && (mobile == true)) {
			$('.sticky-sidebar').stick_in_parent();
			$('.sticky-sidebar').on('sticky_kit:bottom', function(e) {
				$(this).parent().css('position', 'static');
			}).on('sticky_kit:unbottom', function(e) {
				$(this).parent().css('position', 'relative');
			});
			mobile = false;
			console.log('big');
		}
	}).resize();

	/* Skycons */
	var skycons = new Skycons({'color': '#242424'});
	$('#weather-icon').each(function() {
		skycons.set($(this)[0], $(this).attr('data-weather'));
	});
	skycons.play();

	/* Popup */
	$(document).ready(function() {
		$('.popup-image').magnificPopup({
			type:'image',
			mainClass: 'mfp-with-zoom',
			zoom: {
				enabled: true,
				duration: 300,
				easing: 'ease-in-out'
			}
		});
	});

	/* Directory Search */
	var filterable = $('.filterable'),
		scount = $('.heading-search .search-count');

	$('input.mapplic-search').keyup(function() {
		var keyword = $(this).val().trim().toLowerCase(),
			count = 0;

		$('.filterable .entry').each(function() {
			var content = $(this).text().replace(/\s\s+/g, ' ').trim().toLowerCase();
			
			if (content.search(keyword) < 0) $(this).slideUp(200);
			else {
				$(this).slideDown(200);
				count++;
			}
		});

		if (keyword) {
			filterable.addClass('filtered');
			scount.text(count);
		}
		else filterable.removeClass('filtered');
	});

	/* Animated Menu Icon */
	var clickHandler = ('ontouchstart' in document.documentElement ? 'touchstart' : 'click');

	$('.nav-icon').on(clickHandler, function() {
		$(this).toggleClass('open');
		$('#main-menu').slideToggle(200);
	});

	$('#main-menu a.dropdown').on('click', function(e) {
		if ($(window).width() < 768) {
			e.preventDefault();
			$(this).next('.menu-secondary').slideToggle(200);
		}
	});

	/* Bootstrap Tooltips */
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	/* Form Group */
	$('.form-group-modern').each(function() {
		if ($('.form-control', this).val()) $(this).addClass('focused');
	});

	$('.form-group-modern .form-control').on('focus', function() {
		$(this).parent().addClass('focused');
	}).on('blur', function() {
		if (!$(this).val()) $(this).parent().removeClass('focused');
	});

	/* Background Images */
	$('[data-bg-image]').each(function() {
		$(this).css('background', 'url(' + $(this).attr('data-bg-image') + ') center');
	});

	/* Directions */
	$('input.travel-mode-switch').on('change', function() {
		$(this).click();
	});

	/* Gallery */
	var galleryTop = new Swiper('.gallery-top', {
			parallax: true,
		spaceBetween: 10
	});

	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 10,
		centeredSlides: true,
		slidesPerView: 5,
		touchRatio: 0.2,
		roundLengths: true,
		slideToClickedSlide: true
	});

	galleryTop.params.control = galleryThumbs;
	galleryThumbs.params.control = galleryTop;

	/* Client slider */
	var clientSlider = new Swiper('.client-slider', {
		slidesPerView: 3,
		spaceBetween: 10,
		roundLengths: true,
		autoplay: 3000,
		speed: 600,
		loop: true
	});

	/* Main slider */
	var mainSlider = new Swiper('.slider', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		parallax: true,
		autoplay: 3000,
		speed: 600,
	});

	/* Counters */
	$('.counter').each(function () {
		$(this).prop('counter',0).animate({
			counter: $(this).text()
		}, {
			duration: 3000,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});
	});
});