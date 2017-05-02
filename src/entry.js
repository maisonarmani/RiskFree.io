const $ = require("jquery");
$.animated =  require('jquery.animated');
const Flickity = require("flickity");
const ClientJS = require("clientjs");

const init = function () {
    new Application(this)
};

class Application {
    constructor(doc) {
        this.bind_is_dropdown();
        this.bind_menu_button();

        const client = new ClientJS();
        const device = client.getDevice();
        if(device.type !== 'mobile') {
            this.setup_flickity();
        }
        this.bind_background_parrallax();
        this.bind_scroll_link();
    }

    bind_scroll_link(){
        $(".scroll-link").click(function(){
            const id = $(this).attr("href");
            window.scrollTo($(id)[0].offsetTop); // Animated
            return false;
        });

    }

    bind_is_dropdown() {
        $(".is-dropdown").hover(function () {
            $(this).addClass('active');
        }, function () {
            $(this).removeClass('active');
        });
    }

    bind_menu_button() {
        const HIDE = () =>{
            $('.menu-button').removeClass('active');
            $('.mobile-menu').removeClass('active');
        }

        const SHOW = () =>{
            $('.menu-button').addClass('active');
            $('.mobile-menu').addClass('active');
        }

        $(".menu-button").click(function () {
            SHOW();
        });

        $(".mobile-menu .cancel").click(function () {
            HIDE();
        });

        $(document).keydown(function (evnt) {
            const ESC = 27;
            if (evnt.keyCode === ESC) {
                HIDE();
            }
        });
    }

    setup_flickity() {
        const flickty = new Flickity('.posts', {
            cellSelector: '.post',
            cellAlign: 'center',
            contain: true,
            wrapAround: !true,
            initialIndex: 0,
            resize: true,
            adaptiveHeight: true,
            pageDots: false,
            prevNextButtons: false,
            //rightToLeft: !false,
            //freeScroll:true,
            //autoPlay: 4000, // /pauseAutoPlayOnHover: true
        });

        $("#flickity-forward").click(function () {
            flickty.previous();
        });
        $("#flickity-backward").click(function () {
            flickty.next();
        });

    }

    bind_background_parrallax() {
        const parrallax = $('.parrallax')
        $(window).scroll(function () {
            const offY = window.pageYOffset / 2.5 + "px"
            parrallax.css({backgroundPositionY: offY});
        })
    }

    bind_timeline() {

        var $timeline_block = $('.cd-timeline-block');

        //hide timeline blocks which are outside the viewport
        $timeline_block.each(function () {
            if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
                $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
            }
        });

        //on scolling, show/animate timeline blocks when enter the viewport
        $(window).on('scroll', function () {
            $timeline_block.each(function () {
                if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
                    $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
                }
            });
        });
    }


}

$(document).ready(init);