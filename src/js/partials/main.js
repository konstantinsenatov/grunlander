var dishes__swiper;

$(document).ready(function() {
    dishes__swiper = new Swiper(".dishes__swiper", {
        navigation: {
            prevEl: ".dishes__swiper .swiper-btn-prev",
            nextEl: ".dishes__swiper .swiper-btn-next",
        },/* 
        allowTouchMove: false, */
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
		  slidesPerView: 'auto',
        loop: true,
        speed: 800
    });

    $(document).on( "click", ".front-switcher", function() {
		dishes__swiper.allowTouchMove = false;
		dishes__swiper.update();
		let thisSwitcher = $(this);
		$(thisSwitcher).addClass('js-active');
		$(thisSwitcher).closest('.front-dish').addClass('js-active');
		setTimeout(function () {
			$('.wrapper').addClass('js-active');
			$(thisSwitcher).closest('.front-dish').slideUp().addClass('js-active');
			$(thisSwitcher).closest('.front-dish').next('.back-dish').slideDown().addClass('js-active');
		}, 1200);
		setTimeout(function () {
			$(thisSwitcher).removeClass('js-active')
		}, 2000);
	});
	$(document).on( "click", ".back-switcher", function() {
		dishes__swiper.allowTouchMove = true;
		dishes__swiper.update();
		let thisSwitcher = $(this);
		$(thisSwitcher).addClass('js-active');
		$(thisSwitcher).closest('.back-dish').removeClass('js-active');
		setTimeout(function () {
			$(thisSwitcher).closest('.back-dish').slideUp();
			$(thisSwitcher).closest('.back-dish').prev('.front-dish').slideDown().removeClass('js-active');
			$('.wrapper').removeClass('js-active');
		}, 1200);
		setTimeout(function () {
			$(thisSwitcher).removeClass('js-active')
		}, 2000);
	});
})