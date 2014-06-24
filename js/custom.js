var sent = false;
/* =================================
   LOADER                     
=================================== */
// makes sure the whole site is loaded
jQuery(window).load(function() {
    
    // will first fade out the loading animation
    jQuery(".status").fadeOut();
    // will fade out the whole DIV that covers the website.
    jQuery(".preloader").delay(1000).fadeOut("slow");
    $("input[name='full-name']").val(""); 
    $("input[name='dispensary-name']").val("");
    $("input[name='email']").val("");
    $("input[name='number']").val("");
});

/* =================================
===  MAILCHIMP                 ====
=================================== */

$('.mailchimp').ajaxChimp({
    callback: mailchimpCallback,
    url: "http://facebook.us8.list-manage1.com/subscribe/post?u=4e3ed7214c91ab7caac74aa7d&amp;id=e5f4121811" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
});

function mailchimpCallback(resp) {
    if (resp.result === 'success') {
        $('.subscription-success').html('<i class="icon_check_alt2"></i><br/>' + resp.msg).slideDown(500);
        ga('send', 'event', 'Mailchimp Signup', 'submitted');
        $('.subscription-error').fadeOut(500);

    } else if (resp.result === 'error') {
        $('.subscription-error').html('<i class="icon_close_alt2"></i><br/>' + resp.msg).slideDown(500);
    }
}

/* =================================
===  DISPENSARY FORM            ====
=================================== */
$(".dispensary-form").submit(function(e) {
    e.preventDefault;
    if($("input[name='full-name']").val() !== '' &&  
        $("input[name='dispensary-name']").val() !== '' &&
        $("input[name='email']").val() !== '' &&
        $("input[name='number']").val() !== '') {
        console.log("post to php");
        if(!sent) {

            var sendEmail = $.post("dispensary.php", { "full-name": $("input[name='full-name']").val(),
                                            "dispensary-name": $("input[name='dispensary-name']").val(),
                                            "email": $("input[name='email']").val(),
                                            "number": $("input[name='number']").val()   });
            $(".subscription-error").slideUp(function() {
                    $(".subscription-success").text("Sent! We'll follow up with you in less than 24 hours!").slideDown();
                    sent = true;
                    $(".dispensary-form #subscribe-button").attr("disabled", "disabled");
                });
            sendEmail.done(function(data) {
                console.log(data);
                
                
            });
        }
    } else {
        $(".subscription-error").text("Please fill out all parts of the form!").slideDown();
    }
    return false;
});


/* =================================
===  COURIER FORM            ====
=================================== */
$("#courier-apply, .apply-bottom").click(function(e) {
    e.preventDefault();
    var email = $("#courier-email").val().trim() || $(".bottom-courier-email").val().trim();
    var name  = $("#courier-name").val().trim();
    var numb  = $("#courier-number").val().trim();
    window.location = "https://docs.google.com/forms/d/1OAT-1DZ95gJT6YE4xstHLDLytD817ZXa8T3RldyVKxc/viewform?entry.1871608623=" + email + "&entry.422635318=" + name + "&entry.704730855=" + numb;

});


/* =================================
===  STICKY NAV                 ====
=================================== */

$(document).ready(function() {
    $('.main-navigation').onePageNav({
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollOffset: 60 //Height of Navigation Bar
    });

});

$("#go-to-business").click(function() {
    window.open("http://trycanary.co/partners", "_blank");
});

$("#go-to-consumer").click(function() {
    window.open("http://trycanary.co/", "_blank");
});

$("#go-to-courier").click(function() {
    window.open("http://trycanary.co/couriers", "_blank");
});
/* NAVIGATION VISIBLE ON SCROLL */

$(document).ready(function() {
    mainNav();
});

$(window).scroll(function() {
    mainNav();
});

if (matchMedia('(min-width: 992px), (max-width: 767px)').matches) {
    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.sticky-navigation').stop().animate({
            "top": '0'
        });

        else $('.sticky-navigation').stop().animate({
            "top": '-60'
        });
    }
}

if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.sticky-navigation').stop().animate({
            "top": '0'
        });

        else $('.sticky-navigation').stop().animate({
            "top": '-120'
        });
    }
}


/* =================================
===  DOWNLOAD BUTTON CLICK SCROLL ==
=================================== */
jQuery(function($) {
    $('#download-button').localScroll({
        duration: 1000
    });
});


/* =================================
===  FULL SCREEN HEADER         ====
=================================== */
function alturaMaxima() {
    var altura = $(window).height();
    $(".full-screen").css('min-height', altura);

}

$(document).ready(function() {
    alturaMaxima();
    $(window).bind('resize', alturaMaxima);
});


/* =================================
===  SMOOTH SCROLL             ====
=================================== */
var scrollAnimationTime = 1200,
    scrollAnimation = 'easeInOutExpo';
$('a.scrollto').bind('click.smoothscroll', function(event) {
    event.preventDefault();
    var target = this.hash;
    $('html, body').stop().animate({
        'scrollTop': $(target).offset().top
    }, scrollAnimationTime, scrollAnimation, function() {
        window.location.hash = target;
    });
});


/* =================================
===  WOW ANIMATION             ====
=================================== */
wow = new WOW({
    mobile: false
});
wow.init();


/* =================================
===  OWL CROUSEL               ====
=================================== */
$(document).ready(function() {

    $("#feedbacks").owlCarousel({

        navigation: false, // Show next and prev buttons
        slideSpeed: 800,
        paginationSpeed: 400,
        autoPlay: 5000,
        singleItem: true
    });

    var owl = $("#screenshots");

    owl.owlCarousel({
        items: 4, //10 items above 1000px browser width
        itemsDesktop: [1000, 4], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 2], // betweem 900px and 601px
        itemsTablet: [600, 1], //2 items between 600 and 0
        itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
    });


});


/* =================================
===  Nivo Lightbox              ====
=================================== */
$(document).ready(function() {

    $('#screenshots a').nivoLightbox({
        effect: 'fadeScale',
    });

});


/* =================================
===  SUBSCRIPTION FORM          ====
=================================== */
$("#subscribe").submit(function(e) {
    e.preventDefault();
    var email = $("#subscriber-email").val();
    var dataString = 'email=' + email;

    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    if (isValidEmail(email)) {
        $.ajax({
            type: "POST",
            url: "subscribe/subscribe.php",
            data: dataString,
            success: function() {
                $('.subscription-success').fadeIn(1000);
                $('.subscription-error').fadeOut(500);
                $('.hide-after').fadeOut(500);
            }
        });
    } else {
        $('.subscription-error').fadeIn(1000);
    }

    return false;
});



/* =================================
===  CONTACT FORM          ====
=================================== */
$("#contact").submit(function(e) {
    e.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $("#message").val();
    var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
        $.ajax({
            type: "POST",
            url: "sendmail.php",
            data: dataString,
            success: function() {
                $('.success').fadeIn(1000);
                $('.error').fadeOut(500);
            }
        });
    } else {
        $('.error').fadeIn(1000);
        $('.success').fadeOut(500);
    }

    return false;
});

/* =================================
===  SHARE BUTTONS          ====
=================================== */
// $('.fb-share').click(function() {
//     FB.ui({
//             method: 'feed',
//             name: 'Canary',
//             caption: 'your cannabis, now',
//             description: (
//                 'Canary is a cannabis delivery service - the easiest way to buy cannabis. Launching late 2014 in Seattle and Denver.'
//             ),
//             link: 'http://trycanary.co',
//             picture: 'http://i.imgur.com/kOdOXPY.png'
//         },
//         function(response) {
//             if (response && response.post_id) {
//                 console.log('Facebook post was published.');
//                 ga('send', 'event', 'Social Sharing', 'shared on facebook');
//             }
//         }
//     );
// });

// $('.twitter-share').attr('href', 'https://twitter.com/intent/tweet?url=' + encodeURIComponent('http://trycanary.co') + '&hashtags=canaryapp')
//                     .click(function(){
//     console.log('Twitter post was tweeted.');
//     ga('send', 'event', 'Social Sharing', 'shared on twitter');
// });

$('.fb-share').click(function() {
    ga('send', 'event', 'Clicked on social icons', 'looked at facebook');
});
$('.twitter-share').click(function() {
    ga('send', 'event', 'Clicked on social icons', 'looked at twitter');
});

/* =================================
===  EXPAND COLLAPSE            ====
=================================== */
$('.expand-form').simpleexpand({
    'defaultTarget': '.expanded-contact-form'
});



/* =================================
===  STELLAR                    ====
=================================== */
$(window).stellar({
    horizontalScrolling: false
});


/* =================================
===  Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 FIX
=================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    )
    document.querySelector('head').appendChild(msViewportStyle)
}