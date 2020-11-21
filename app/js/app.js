$(document).ready(function () {
    $('.accordion').click(function () {
        $(this).toggleClass('tabs__item--active');
    });
    $('.pagination__item').click(function () {
        let dataTab = $(this).attr("data-tab");
        $('.tabs__item').css('display','none');
        $('.tabs__item[data-tab="' + dataTab + '"]').css('display','flex');
        $(this).parent().children().removeClass('pagination__item--active')
        $(this).addClass('pagination__item--active');
    });


    $('.hamburger').click(function () {
        $(this).toggleClass('change');
        $('.hamburger-content').toggleClass('hamburger-content-active');
    })
    $('.benefits__item').hover(function () {
        AOS.refresh();
        $(this).css("background-color", "#fff").css("transition", "all 0.6s");
    }, function () {
        $(this).css("background-color", "#FAFAFA");
    })

    $('.solution__card').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function (e) {
            $('.solution__card-wrap').hover(function () {
                $(this).css({"transform": "scale(1.05)", "overflow": "hidden"})
            }, function () {
                $(this).css({"transform": "scale(1)", "overflow": "hidden"})
            })
        })

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
    hoverZoom('.returns__pros-block')
    hoverZoom('.card-body')

    $('.modal-btn').click(function () {
        $('.modal-popup,.popup-overlay').fadeIn();
    })
    $('.modal-close,.popup-overlay').click(function () {
        $('.modal-popup,.popup-overlay').fadeOut()
    })

    $('.modal__tab').click(function () {
        $('.modal__tab').removeClass('modal__tab--active')
        $(this).toggleClass('modal__tab--active')
    })

})




