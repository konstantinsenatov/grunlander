var dishes__swiper;

$(document).ready(function() {
    $.getJSON('https://grunlander.woman.ru/get_data/', function(data) {
        try {
            JSON.parse(JSON.stringify(data));

            let pagintaionClass = 'dishes__pagination-active';

            let htmlIngredientsTemplate = '<li class="book-back-dish__ingredients-li">\n' +
                '<span class="book-back-dish__ingredients-name">%ing%</span>\n' +
                '<span class="book-back-dish__ingredients-dotes"></span>\n' +
                '<span class="book-back-dish__ingredients-amount">%count%</span>\n' +
                '</li>';

            let htmlCookingTemplate = '<li class="book-back-dish__cooking-li">\
                <span class="book-back-dish__cooking-num">%number%</span>\
                <span class="book-back-dish__cooking-text">%text%</span>\
                </li>';

            let htmlTemplate = '<div class="swiper-slide">\
                <div class="dishes__dish dish">\
                <div class="dish__front front-dish">\
                <div class="front-dish__container">\
                <div class="leafs-full-width"></div>\
                <div class="front-dish__card">\
                <div class="front-dish__images">\
                <div class="front-dish__image front-dish__image-top-left front-dish__image-flour">\
                %image_l1%\
                </div>\
                <div class="front-dish__image front-dish__image-top-center front-dish__image-pack">\
                <img src="images/dishes/front/pack.png" alt="">\
                </div>\
                <div class="front-dish__image front-dish__image-top-right front-dish__image-butter">\
                %image_r1%\
                </div>\
                <div class="front-dish__image front-dish__image-center-left front-dish__image-milk">\
                %image_l2%\
                </div>\
                <div class="front-dish__image front-dish__image-center-right front-dish__image-mustard">\
                %image_r2%\
                </div>\
                <div class="front-dish__image front-dish__image-bottom-left front-dish__image-photocard">\
                %image_l3%\
                </div>\
                <div class="front-dish__image front-dish__image-bottom-right front-dish__image-crackers">\
                %image_r3%\
                </div>\
                <div class="front-dish__image front-dish__image-plate">\
                <img src="images/dishes/front/plate.png" alt="alt">\
                </div>\
                </div>\
                <div class="dishes__pagination">\
                %pagination%\
                </div>\
                <div class="front-dish__text">%preview%</div>\
                <div class="front-dish__button">\
                <div class="front-dish__switcher front-switcher button-switcher-anim"></div>\
                <div class="front-dish__button-desc">Переключитесь на естественно вкусный рецепт!\
                <svg width="32" height="46" viewBox="0 0 32 46" fill="none" xmlns="http://www.w3.org/2000/svg">\
                <path d="M5.69837 6.2488C7.71645 6.68531 12.0727 8.14254 14.4691 9.18794C25.2396 13.8867 30.9276 21.4742 30.9671 31.4246C30.9732 32.9564 30.924 33.302 30.3349 36.2028C29.8159 38.7586 28.8583 41.7579 28.4629 42.7454C28.1748 43.4648 27.9795 43.9293 27.8017 44.2188C27.7078 44.3718 27.5989 44.5104 27.4545 44.617C27.3038 44.7283 27.1515 44.7774 27.0185 44.8056C27.0185 44.8056 27.0185 44.8056 27.0184 44.8056L27.0163 44.806C26.9209 44.8262 26.8123 44.8492 26.7138 44.8584C26.6044 44.8687 26.4663 44.8669 26.3205 44.8082C26.1798 44.7516 26.0808 44.6613 26.011 44.5865C25.9439 44.5147 25.8748 44.4248 25.808 44.3378L25.808 44.3378L25.5517 44.0038L25.3845 43.7859L25.485 43.5263L26.075 42.0015C26.075 42.0015 26.075 42.0015 26.075 42.0015C26.446 41.0428 27.0161 39.099 27.5044 37.139C27.9956 35.1669 28.3838 33.2571 28.417 32.3465L28.9185 32.3553L28.417 32.3465C28.583 27.7857 27.4931 23.8284 25.1535 20.4409C22.8102 17.048 19.1916 14.1961 14.2521 11.8905C11.6014 10.6533 7.97924 9.4093 4.82903 8.65625L4.82901 8.65624L4.52394 8.5833C4.8656 9.21105 5.40145 10.199 5.96654 11.2434C6.81621 12.8137 7.30371 13.7446 7.48053 14.3207C7.56856 14.6075 7.62016 14.9251 7.48705 15.2208C7.35037 15.5245 7.0793 15.6686 6.90187 15.7515M5.69837 6.2488L6.69491 15.3016M5.69837 6.2488C6.21683 5.94705 6.9435 5.54552 7.82824 5.07426C9.54942 4.15744 10.5369 3.61921 11.025 3.22234C11.2684 3.02451 11.5019 2.77438 11.5426 2.43484C11.5821 2.105 11.4164 1.8389 11.3143 1.68223L11.3142 1.68207C11.2117 1.52508 11.0873 1.36809 10.9194 1.25793C10.7325 1.13524 10.531 1.09543 10.3282 1.11059L10.328 1.1106C10.2332 1.11771 10.142 1.1512 10.1068 1.1641L10.1042 1.16505C10.0494 1.18513 9.98557 1.21147 9.91649 1.24152C9.77728 1.30205 9.59441 1.38743 9.37668 1.49276C8.93999 1.70401 8.3458 2.00391 7.64457 2.36619C6.24125 3.09121 4.39879 4.0715 2.50879 5.10468L2.50875 5.1047C1.97421 5.39696 1.61296 5.60461 1.38014 5.78656C1.25745 5.88245 1.14815 5.9877 1.06337 6.11501C0.974732 6.24811 0.930123 6.37933 0.904821 6.50325C0.864375 6.70134 0.906125 6.89919 0.960991 7.07419C1.01912 7.25958 1.11585 7.48968 1.25331 7.7802C1.52935 8.3636 2.00274 9.2589 2.76203 10.6577L3.20483 10.4152M5.69837 6.2488L3.20483 10.4152M6.90187 15.7515L6.69491 15.3016M6.90187 15.7515C6.90189 15.7515 6.90192 15.7515 6.90194 15.7515L6.69491 15.3016M6.90187 15.7515C6.88911 15.7575 6.87334 15.7651 6.85548 15.7737C6.79419 15.8033 6.70843 15.8447 6.63656 15.8718C6.52609 15.9135 6.36762 15.9566 6.18119 15.927C5.99478 15.8975 5.84461 15.8059 5.72292 15.6992C5.60463 15.5955 5.49217 15.4591 5.37836 15.2998C4.97174 14.7305 4.32919 13.5461 3.09561 11.2724C2.98892 11.0758 2.8778 10.871 2.76204 10.6577L3.20483 10.4152M6.69491 15.3016C6.54508 15.3717 6.434 15.4356 6.32244 15.4385C5.91702 15.449 5.50537 14.6532 3.20483 10.4152M3.72079 8.16715C3.74155 8.20402 3.79055 8.29312 3.86274 8.42521L4.2007 7.99148L4.08126 7.96293L3.72079 8.16715ZM3.72079 8.16715L4.08091 7.96284L3.5321 7.83162L3.72079 8.16715Z" fill="#182D19" stroke="#182D19"></path>\
                </svg>\
                </div>\
                </div>\
                </div>\
                <div class="swiper-btn swiper-btn-prev"><img src="images/dishes/swiper-button-prev.svg" alt="prev"></div>\
                <div class="swiper-btn swiper-btn-next"><img src="images/dishes/swiper-button-next.svg" alt="next"></div>\
                </div>\
                </div>\
                <div class="dish__back back-dish">\
                <div class="back-dish__container">\
                <div class="back-dish__row">\
                <div class="back-dish__img">\
                <img src="%photo_recipe%" alt="%name%">\
                </div>\
                <div class="back-dish__body"> <img class="desk" src="images/dishes/back/figs.png" alt="">\
                <div class="back-dish__title">\
                %name%\
                <img class="desk" src="images/dishes/back/leaf.png" alt="">\
                </div>\
                <div class="back-dish__text">%description%</div>\
                <div class="back-dish__button">\
                <div class="back-dish__switcher back-switcher button-switcher-anim"></div>\
                <div class="back-dish__button-desc">\
                Назад к выбору ингредиентов\
                <svg width="22" height="49" viewBox="0 0 22 49" fill="none" xmlns="http://www.w3.org/2000/svg">\
                <path d="M5.23021 3.82817C6.95205 4.96769 10.4818 7.90726 12.3351 9.75149C20.6642 18.0404 23.2089 27.1754 19.6325 36.4611C19.0819 37.8905 18.9106 38.1947 17.3084 40.6836C15.8968 42.8764 13.9155 45.3233 13.1884 46.0998C12.6588 46.6655 12.3082 47.0274 12.0374 47.2326C11.8943 47.341 11.7426 47.4306 11.5693 47.4775C11.3884 47.5265 11.2288 47.517 11.0946 47.4949C11.0946 47.4949 11.0945 47.4949 11.0945 47.4949L11.0924 47.4945C10.9961 47.4787 10.8866 47.4607 10.7915 47.4335C10.6858 47.4033 10.5578 47.3515 10.4433 47.2439C10.3328 47.14 10.2733 47.02 10.2354 46.9249C10.1989 46.8337 10.1672 46.7248 10.1366 46.6195L10.1366 46.6194L10.0191 46.2152L9.94239 45.9515L10.1303 45.7461L11.2337 44.5397C11.2337 44.5396 11.2337 44.5396 11.2337 44.5396C11.9275 43.7811 13.1645 42.1769 14.3311 40.528C15.5049 38.8689 16.5601 37.2305 16.9217 36.394L17.3858 36.5843L16.9217 36.394C18.7324 32.2048 19.154 28.1219 18.2041 24.116C17.2527 20.1038 14.9167 16.1327 11.1515 12.1907C9.13101 10.0755 6.20778 7.60117 3.54603 5.75563L3.54601 5.75562L3.28825 5.57688C3.37865 6.28584 3.51918 7.40095 3.66646 8.57926C3.88794 10.3509 4.00413 11.3953 3.95971 11.9962C3.9376 12.2954 3.87035 12.6101 3.63892 12.8373C3.4013 13.0706 3.09642 13.1064 2.90098 13.1193M5.23021 3.82817L2.87153 12.6249M5.23021 3.82817C5.82286 3.73528 6.64573 3.62502 7.6412 3.50719C9.57782 3.27793 10.6933 3.135 11.2923 2.94248C11.5908 2.84652 11.8992 2.69825 12.0604 2.39667C12.217 2.1037 12.1593 1.7956 12.121 1.61253L12.121 1.61234C12.0825 1.42887 12.0236 1.23741 11.9072 1.07381C11.7776 0.891617 11.6042 0.781353 11.4098 0.721829L11.4096 0.721782C11.3187 0.693987 11.2216 0.692058 11.1841 0.691313L11.1813 0.691259C11.123 0.690067 11.0539 0.691423 10.9786 0.694329C10.827 0.700181 10.6256 0.713331 10.3845 0.73241C9.90086 0.770677 9.23832 0.834346 8.45341 0.917275C6.88261 1.08324 4.80996 1.32759 2.67378 1.60396L2.67375 1.60397C2.06956 1.68218 1.65758 1.74449 1.37457 1.82948C1.22544 1.87427 1.08538 1.93264 0.960162 2.02048C0.829243 2.11231 0.74003 2.21838 0.671458 2.32465C0.561842 2.49454 0.5289 2.69404 0.516477 2.87702C0.503323 3.07086 0.509896 3.32038 0.532481 3.64098C0.577834 4.2848 0.693818 5.29088 0.893356 6.86993L1.39399 6.80476M5.23021 3.82817L1.39399 6.80476M2.90098 13.1193L2.87153 12.6249M2.90098 13.1193C2.90101 13.1193 2.90104 13.1193 2.90106 13.1193L2.87153 12.6249M2.90098 13.1193C2.88693 13.1202 2.86946 13.1216 2.8497 13.1232C2.78185 13.1284 2.68692 13.1359 2.61011 13.135C2.49206 13.1337 2.32875 13.1163 2.16577 13.0211C2.0028 12.9259 1.89616 12.786 1.82151 12.6425C1.74894 12.5029 1.69368 12.335 1.6455 12.1452C1.47336 11.4671 1.30472 10.1303 0.98095 7.56382C0.952947 7.34185 0.923783 7.11068 0.893358 6.86994L1.39399 6.80476M2.87153 12.6249C2.70647 12.6358 2.57975 12.6551 2.47476 12.6173C2.0932 12.4798 1.99864 11.5888 1.39399 6.80476M2.69103 4.8975C2.69699 4.93939 2.71029 5.0402 2.72959 5.18949L3.20197 4.90808L3.10106 4.83811L2.69103 4.8975ZM2.69103 4.8975L3.10076 4.8379L2.63706 4.51635L2.69103 4.8975Z" fill="white" stroke="white"></path>\
                </svg>\
                </div>\
                </div>\
                </div>\
                </div>\
                <div class="back-dish__book book-back-dish">\
                <div class="book-back-dish__img">\
                <img src="images/dishes/back/book.png" alt="">\
                </div>\
                <div class="book-back-dish__container">\
                <div class="book-back-dish__ingredients">\
                <img class="book-back-dish__ingredients-leaf-top mob" src="images/dishes/back/leaf.png" alt="">\
                <img class="book-back-dish__ingredients-leaf-bottom mob" src="images/dishes/back/leaf.png" alt="">\
                <img class="book-back-dish__ingredients-figs mob" src="images/dishes/back/figs.png" alt="">\
                <div class="book-back-dish__ingredients-bg">\
                <img class="desk" src="images/dishes/back/ingredients.png" alt="">\
                </div>\
                <div class="book-back-dish__ingredients-title">ИНГРЕДИЕНТЫ:</div>\
                <ul class="book-back-dish__ingredients-ul">\
                %ingridients%\
                </ul>\
                <div class="book-back-dish__ingredients-order">\
                <div class="book-back-dish__ingredients-text-bottom">Заказывайте ингредиенты <br>в Яндекс.Лавке с доставкой от 15 минут!</div>\
                <div class="book-back-dish__ingredients-button"><span>Заказать</span></div>\
                </div>\
                </div>\
                <div class="book-back-dish__cooking">\
                <div class="book-back-dish__cooking-bg">\
                <img class="desk" src="images/dishes/back/cooking.png" alt="">\
                <img class="mob" src="images/dishes/back/cooking-mob.png" alt="">\
                </div>\
                <div class="book-back-dish__cooking-title">Способ приготовления:</div>\
                <ul class="book-back-dish__cooking-ul">\
                %cooking_method%\
                </ul>\
                </div>\
                </div>\
                </div>\
                </div>\
                </div>\
                </div>\
                </div>';

            let slidesCount = data.length;

            $.each(data, function(key, value) {
                let left_images = value.left_images,
                    image_l1 = left_images[0] ? '<img src="'+left_images[0]+'">' : "",
                    image_l2 = left_images[1] ? '<img src="'+left_images[1]+'">' : "",
                    image_l3 = left_images[2] ? '<img src="'+left_images[2]+'">' : "";
                let right_images = value.right_images,
                    image_r1 = right_images[0] ? '<img src="'+right_images[0]+'">' : "",
                    image_r2 = right_images[1] ? '<img src="'+right_images[1]+'">' : "",
                    image_r3 = right_images[2] ? '<img src="'+right_images[2]+'">' : "";

                let ingridientsHtml = '';
                $.each(value.ingridients, function(index, ingridient) {
                    let ingridientHtml = htmlIngredientsTemplate;
                    ingridientHtml = ingridientHtml.replace('%ing%', ingridient.ing);
                    ingridientHtml = ingridientHtml.replace('%count%', ingridient.count);
                    ingridientsHtml += ingridientHtml;
                });

                let cookingHtml = '';
                $.each(value.cooking_method, function(index, cook) {
                    let cookHtml = htmlCookingTemplate;
                    cookHtml = cookHtml.replace('%number%', index+1);
                    cookHtml = cookHtml.replace('%text%', cook);
                    cookingHtml += cookHtml;
                });

                let paginationHtml = '';
                for (let i = 0; i < slidesCount; i++) {
                    if (i === key){
                        paginationHtml += '<span class="'+pagintaionClass+'"></span>';
                    } else {
                        paginationHtml += '<span></span>';
                    }
                }

                let description = value.description ? value.description : (value['description '] ? value['description '] : "");

                let html = htmlTemplate;
                html = html.replace(/%name%/g, value.name );
                html = html.replace('%image_l1%', image_l1);
                html = html.replace('%image_l1%', image_l1);
                html = html.replace('%image_l2%', image_l2);
                html = html.replace('%image_l3%', image_l3);
                html = html.replace('%image_r1%', image_r1);
                html = html.replace('%image_r2%', image_r2);
                html = html.replace('%image_r3%', image_r3);
                html = html.replace('%pagination%', paginationHtml);
                html = html.replace('%preview%', value.preview);
                html = html.replace('%photo_recipe%', value.photo_recipe);
                html = html.replace('%description%', description);
                html = html.replace('%ingridients%', ingridientsHtml);
                html = html.replace('%cooking_method%', cookingHtml);

                $(".dishes__swiper .swiper-wrapper").append(html);
            });

            dishes__swiper = new Swiper(".dishes__swiper", {
                navigation: {
                    prevEl: ".dishes__swiper .swiper-btn-prev",
                    nextEl: ".dishes__swiper .swiper-btn-next",
                },
                allowTouchMove: false,
            });

        } catch (e) {
            console.error('Полученные данные не являются валидным JSON');
        }
    });



    $(document).on( "click", ".front-switcher", function() {
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