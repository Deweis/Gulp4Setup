$(document).ready(function () {
    //Hamburger menu
    $('.hamburger').click(function () {
        $(this).toggleClass('change');
        $('.hamburger-content').toggleClass('hamburger-content-active');
    })
    //Slider of investpage
    $('.slick').slick({
        dots: true,
        arrows: false,
        speed: 1000,
        centerMode: true,
        variableWidth: true,
        slidesToShow: 3,
        focusOnSelect: true,
        autoplay: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
    //Questions tabs toggling
    $('.accordion').click(function () {
        $(this).toggleClass('tabs__item--active');
    });
    //Questions pages changing
    $('.pagination__item').click(function () {
        let dataTab = $(this).attr("data-tab");
        $('.tabs__item').css('display','none');
        $('.tabs__item[data-tab="' + dataTab + '"]').css('display','flex');
        $(this).parent().children().removeClass('pagination__item--active')
        $(this).addClass('pagination__item--active');
    });

    //Hover of benefit cards
    $('.benefits__item').hover(function () {
        AOS.refresh();
        $(this).css("background-color", "#FAFAFA").css("transition", "all 0.6s");
    }, function () {
        $(this).css("background-color", "#FFF");
    })
    //Hover of solution cards
    $('.solution__card').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function (e) {
            $('.solution__card-wrap').hover(function () {
                $(this).css({"transform": "scale(1.05)", "overflow": "hidden"})
            }, function () {
                $(this).css({"transform": "scale(1)", "overflow": "hidden"})
            })
        })
    //Hover zooming function
    let hoverZoom = (elem, elem2) => {
        $(elem).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            $(elem).hover(function () {
                $(this).css({
                    "transform": "scale(1.05)",
                    "overflow": "hidden",
                    "cursor": "default",
                })
            }, function () {
                $(this).css({
                    "transform": "scale(1)",
                    "cursor": "default",
                    "transition": "all 1s"
                })
            })
        })
    }
    //Hover zooming function calling
    hoverZoom('.returns__pros-block')
    hoverZoom('.card-body')

    //Modal window basic initialization
    $('.modal-btn-login').click(function () {
        loginSign('modal__login', 0, 0,'modal__signup');
        setTimeout(function () {
            $('.modal-popup,.popup-overlay').fadeIn();
        },200)
        $('.signup-tab').removeClass('modal__tab--active');
        $('.login-tab').addClass('modal__tab--active');
    })
    $('.modal-btn-signup').click(function () {
        loginSign('modal__signup', 0, 0, 'modal__login');
        setTimeout(function () {
            $('.modal-popup,.popup-overlay').fadeIn();
        },200)
    })
    $('.modal-close,.popup-overlay').click(function () {
        $('.modal-popup,.popup-overlay').fadeOut()
        setTimeout(function () {
            $('.modal__tab').removeClass('modal__tab--active');
            $('.signup-tab').addClass('modal__tab--active');
            $('input').val('');
        }, 500);

    })
    //Tab changing and input resetting function in modal
    let loginSign = (form, time, time2, ...args) => {
        for (let i = 0; i < args.length; i++){
            $('.' + args[i]).fadeOut();
        }
        setTimeout(function () {
            $('.' + form).fadeIn(time2);
            $('input').val('');
            $('.modal__toggle-img').attr('src','/img/dest/modal-show-password.png');
            $('.modal__password').attr('type', 'password');
        },time)
    }
    //Tab changing functions calling on click
    $('.modal__tab').click(function () {
        $('.modal__tab').removeClass('modal__tab--active')
        $(this).toggleClass('modal__tab--active')
        if($(this).hasClass('login-tab')){
            loginSign('modal__login', 500, 400,'modal__signup');
        }else if($(this).hasClass('signup-tab')){
            loginSign('modal__signup', 500, 400, 'modal__login');
        }else{
            loginSign('modal__login, .modal__head', 500, 400, 'modal__verification');
            $('.modal__tab').removeClass('modal__tab--active');
            $('.login-tab').addClass('modal__tab--active');
        }
    })
    //Changing the JS html5 validation to jQuery version
    $.fn.isValid = function(){
        return this[0].reportValidity()
    }
    //Login form submitting
    $('#login-button').click(function () {
        let form = $('.modal__login');
        if (form.isValid()) {
            console.log('no');
            loginSign('modal__verification', 500, 400,'modal__login','modal__signup','modal__head');
        } else {
            console.log('yes');
            // Create the temporary button, click and remove it
            let tmpSubmit = document.createElement('button');
            form.appendChild(tmpSubmit);
            tmpSubmit.click();
            form.removeChild(tmpSubmit);
        }
    })
    //Password hide and show on click
    $('.modal__toggle-img').click(function () {
        let pass = "";
        if($(this).hasClass('signup-password')){
            pass = $('#password-set');
        }else{
            pass = $('#password-get');
        }
        if(pass.attr('type') === "password") {
            pass.attr('type','text');
            $(this).attr('src','/img/dest/modal-hide-password.png');
        } else {
            pass.attr('type','password');
            $(this).attr('src','/img/dest/modal-show-password.png');
        }
    })

    //OTP code input tabbing
    let body = $('body');
    function goToNextInput(e) {
        let key = e.which,
            t = $(e.target),
            sib = t.next('.verification__number');
        if (key != 9 && (key < 48 || key > 57)) {
            e.preventDefault();
            return false;
        }
        if (key === 9) {
            return true;
        }
        if (!sib || !sib.length) {
            sib = body.find('.modal__button-verify').eq(0);
        }
        sib.select().focus();
    }
    function onKeyDown(e) {
        let key = e.which;

        if (key === 9 || (key >= 48 && key <= 57)) {
            return true;
        }
        e.preventDefault();
        return false;
    }
    function onFocus(e) {
        $(e.target).select();
    }
    body.on('keyup', '.verification__number', goToNextInput);
    body.on('keydown', '.verification__number', onKeyDown);
    body.on('click', '.verification__number', onFocus);


//Dashboard functions
    $('.dashboard-account__name').click(function () {
        $('.dashboard-dropdown').fadeToggle()
    })
    $('.sidebar__head').click(function () {
        $('.device-menu').fadeToggle()
    })

    $('.modal__button-verify').click(function () {
        window.open("dashboard.html");
    })
    $('.dashboard-dropdown__link--logout').click(function () {
        window.open("/");
    })
})





