/**
 * Created by QETHAN on 13-12-9.
 */
$(document).ready(function() {
    var windowHeight = $(window).height();

    /* window resize */
    $(window).on('resize', function() {
        windowHeight = $(window).height();
        $('#index').height(windowHeight);
    });

    /* scroll fix header */
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > windowHeight) {
            $('#site_header').addClass('fixed');
        } else {
            $('#site_header').removeClass('fixed');
        }
    });

    /* fixed header navigation */
    $('#site_header').on('click', 'a', function(event) {
        event.preventDefault();
        var target = $(this).attr('href');
        if (Modernizr.history) {
            history.pushState(null, null, target);
        }
        $('html, body').animate({
            scrollTop: target != "#about" ? $(target).offset().top - $('#site_header').height() : $(target).offset().top
        }, 600);
    });

    /* start browse */
    $('#start_browse').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#about').offset().top
        }, 600);
    });

    /* init carousel */
    $('#carousel_about').carouFredSel({
        circular: false,
        infinite: false,
        auto: false,
        items:  1,
        pagination: {
            container: '#pagination_about',
            anchorBuilder: function(nr) {
                return '<a class="pagi-item" href="#' + nr + '">' + nr + '</a>';
            }
        }
    });

    $('#carousel_campus_dev').carouFredSel({
        circular: false,
        infinite: false,
        auto: false,
        items:  1,
        pagination: {
            container: '#pagination_campus_dev',
            anchorBuilder: function(nr) {
                return '<a class="pagi-item" href="#' + nr + '">' + nr + '</a>';
            }
        }
    });

    $('#carousel_campus_other').carouFredSel({
        circular: false,
        infinite: false,
        auto: false,
        items:  1,
        pagination: {
            container: '#pagination_campus_other',
            anchorBuilder: function(nr) {
                return '<a class="pagi-item" href="#' + nr + '">' + nr + '</a>';
            }
        }
    });

    $('#tab_campus').carouFredSel({
        circular: false,
        infinite: false,
        direction: 'down',
        auto: false,
        items:  1,
        pagination: {
            container: '#tab_nav_campus',
            anchorBuilder: function() {
                return '<a class="tab-item">' + $(this).data('categ') + '</a>';
            }
        }
    });

    $('#carousel_social_dev').carouFredSel({
        circular: false,
        infinite: false,
        auto: false,
        items:  1,
        pagination: {
            container: '#pagination_social_dev',
            anchorBuilder: function(nr) {
                return '<a class="pagi-item" href="#' + nr + '">' + nr + '</a>';
            }
        }
    });

    $('#carousel_social_other').carouFredSel({
        circular: false,
        infinite: false,
        auto: false,
        items:  1,
        pagination: {
            container: '#pagination_social_other',
            anchorBuilder: function(nr) {
                return '<a class="pagi-item" href="#' + nr + '">' + nr + '</a>';
            }
        }
    });

    $('#tab_social').carouFredSel({
        circular: false,
        infinite: false,
        direction: 'down',
        auto: false,
        items:  1,
        pagination: {
            container: '#tab_nav_social',
            anchorBuilder: function() {
                return '<a class="tab-item">' + $(this).data('categ') + '</a>';
            }
        }
    });

    /* init bootstrap modal */
    $('.jobs_list').on('click', 'a', function() {
        var article = $(this).attr('data-detail'),
            title = $(this).text();
        $('#modal_jobs_title').text(title);
        $(article).removeClass('hide').siblings('.job_detail').addClass('hide');
        $('#modal_jobs').modal();
    });

    $('.recruit_detail').on('click', function() {
        var detail = $(this).attr('data-detail'),
            title = $(detail).data('title');
        $('#modal_recruit_detail_title').text(title);
        $(detail).removeClass('hide').siblings('.recruit_detail_content').addClass('hide');
        $('#modal_recruit_detail').modal();
    });

    /* init skrollr */
    if (!('ontouchstart' in document.documentElement)) {
        skrollr.init();
    }
});
