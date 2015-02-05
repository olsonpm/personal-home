'use strict';

var TweenLite = require('TweenLite')
    , nh = require('node-helpers')
    , initHoverIntent = require('hoverintent')
    , imagesloaded = require('imagesloaded');

require('gsapCssPlugin');
var gsapd = nh.gsapDefaults(window);

function initNavBehavior($, $scope, $location, log) {
    $scope.navClick = function(path) {
        $location.path(path);

        // if nav-btn is displayed, then we need to animate the nav out and content in
        if ($('#nav-btn').css('display') === 'block') {
            hideNavThenShowContent($, $('.nav-wrapper'), $('.content-wrapper'), log);
        }
    };

    $(document).ready(function() {
        preload($, ['/img/nav-button-hover.png']);
        addChevronBehavior($);
        addClickBehavior($, $scope, $location, log);
    });
}

function addClickBehavior($, $scope, $location, log) {
    $('#nav-btn').click(function() {
        var navWrapper = $('.nav-wrapper');
        var contentWrapper = $('.content-wrapper');

        // if nav isn't showing, then display the nav
        if (navWrapper.hasClass('hidden')) {
            hideContentThenShowNav($, navWrapper, contentWrapper, log);
        } else {
            hideNavThenShowContent($, navWrapper, contentWrapper, log);
        }
    });
}

function hideContentThenShowNav($, navWrapper, contentWrapper, log) {
    TweenLite.to(contentWrapper, gsapd.LONG_DURATION, {
        css: {
            'height': 0
        }
        , ease: gsapd.EASE
        , onComplete: function() {
            log.debug('finished setting contentWrapper height to zero');

            contentWrapper.addClass('hidden');
            navWrapper.removeClass('hidden');

            var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            var heightBelowHeader = viewportHeight - parseInt($('body > .header-wrapper').eq(0).css('height'), 10);

            // get height-to
            navWrapper.css({
                'height': 'auto'
            });
            var navHeightTo = Math.max(parseInt(navWrapper.css('height')), heightBelowHeader) + 'px';
            navWrapper.css('height', '0');
            TweenLite.to(navWrapper, gsapd.LONG_DURATION, {
                css: {
                    'height': navHeightTo
                }
                , ease: gsapd.EASE
                , onComplete: function() {
                    log.debug('finished setting navWrapper height to: ' + navHeightTo);
                }
            });
        }
    });
}

function hideNavThenShowContent($, navWrapper, contentWrapper, log) {
    TweenLite.to(navWrapper, gsapd.LONG_DURATION, {
        css: {
            'height': 0
        }
        , ease: gsapd.EASE
        , onComplete: function() {
            log.debug('finished setting navWrapper height to zero');

            contentWrapper.removeClass('hidden');
            navWrapper.addClass('hidden');

            var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            var heightBelowHeader = viewportHeight - parseInt($('body > .header-wrapper').eq(0).css('height'), 10);

            // get height-to
            contentWrapper.css({
                'height': 'auto'
            });
            var cwHeightTo = Math.max(parseInt(contentWrapper.css('height')), heightBelowHeader) + 'px';
            contentWrapper.css({
                'height': '0'
            });

            TweenLite.to(contentWrapper, gsapd.LONG_DURATION, {
                css: {
                    'height': cwHeightTo
                }
                , ease: gsapd.EASE
                , onComplete: function() {
                    log.debug('finished setting contentWrapper height to: ' + cwHeightTo);
                }
            });
        }
    });
}

function addChevronBehavior($) {
    $('nav .link-wrapper').each(function(i, el) {
        var chevron = $(el).find('.chevron');
        $(el).hoverintent(function() { // handler in
            TweenLite.to(chevron, gsapd.SHORT_DURATION, {
                css: {
                    'left': '15px'
                }
                , ease: gsapd.EASE
            });
        }, function() { // handler out
            TweenLite.to(chevron, gsapd.SHORT_DURATION, {
                css: {
                    'left': '0'
                }
                , ease: gsapd.EASE
            });
        });
    });
}

function preload($, sources, callback) {
    if (sources.length) {
        var preloaderDiv = $('<div style="display: none;"></div>').prependTo(document.body);

        $.each(sources, function(i, source) {
            $("<img/>").attr("src", source).appendTo(preloaderDiv);

            if (i == (sources.length - 1)) {
                $(preloaderDiv).imagesLoaded(function() {
                    $(this).remove();
                    if (callback) callback();
                });
            }
        });
    } else {
        if (callback) callback();
    }
}

module.exports = initNavBehavior;
