'use strict';

var TweenLite = require('TweenLite')
    , nh = require('node-helpers')
    , initHoverIntent = require('hoverintent');

require('perfect-scrollbar');
require('gsapCssPlugin');
var gsapd = nh.gsapDefaults(window);
var resetNavAndContentStyles = true;
var setScrollbar = true;
var jQuery = require('jquery');

function initSiteLayout($, $scope, log) {
    initHoverIntent($); // attaches hoverintent to the jquery object

    $(document).ready(function() {
        jQuery('.header-wrapper').css('background-color', 'red');
        runPerViewLoad($, log);
        positionNavAndContents($, log);
        addEvent(window, "resize", function() {
            return positionNavAndContents($, log);
        });
    });

    $scope.$on('$viewContentLoaded', function() {
        var showTwoPanes = window.matchMedia("(min-width: 1024px) and (min-height: 725px)");
        if (showTwoPanes.matches) {
            positionNavAndContents($, log);
        }
        runPerViewLoad($, log);
    });
}

// This gets rid of all hover styles
function runPerViewLoad($, log) {
    log.debug('page/view loaded!');

    // budySystem is a plugin that removes possibility of single words at the end of a paragraph
    //  on the last line.
    var res = $('p').buddySystem();

    // disable :hover on touch devices
    // based on https://gist.github.com/4404503 
    // via https://twitter.com/javan/status/284873379062890496
    // + https://twitter.com/pennig/status/285790598642946048
    // re http://retrogamecrunch.com/tmp/hover
    if ('createTouch' in document) {
        try {
            var ignore = /:hover/;
            for (var i = 0; i < document.styleSheets.length; i++) {
                var sheet = document.styleSheets[i];
                for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
                    var rule = sheet.cssRules[j];
                    if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
                        sheet.deleteRule(j);
                    }
                }
            }
        } catch (e) {}
    }
}

function positionNavAndContents($, log) {
    log.debug('entered positionNavAndContents');
    $('.header-wrapper').css('background-color', 'blue');

    var navHeight;
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var heightBelowHeader = viewportHeight - parseInt($('body > .header-wrapper').eq(0).css('height'), 10);

    var showTwoPanes = window.matchMedia("(min-width: 1024px) and (min-height: 725px)");
    if (showTwoPanes.matches) {
        log.debug('showing two panes');

        if ($('.nav-wrapper').hasClass('hidden')) {
            $('.nav-wrapper').removeClass('hidden');
            $('.content-wrapper').addClass('hidden');
            $('.nav-wrapper').css('height', 'auto');
        }

        var nav = $('nav').eq(0);
        var contentWrapper = $('.content-wrapper').eq(0);
        var contentWrapperHeight = parseInt(contentWrapper.css('height'), 10);
        navHeight = parseInt($('nav').eq(0).css('height'), 10);
        if ((heightBelowHeader * 0.8) >= navHeight) {
            contentWrapperHeight = (heightBelowHeader * 0.8);
            contentWrapper.css('height', contentWrapperHeight + 'px');
        } else {
            // 16 is just some random number to give the content area more prominence (slightly bigger)
            //   while also giving it a little off-set.  Sometimes when everything lines up so perfectly,
            //   it feels awkward.
            contentWrapperHeight = navHeight + 16;
            contentWrapper.css('height', contentWrapperHeight + 'px');
        }


        if (setScrollbar) {
            $('.content').perfectScrollbar({
                suppressScrollX: true
            });
        } else {
            $('.content').perfectScrollbar('update');
        }

        contentWrapper.css('margin-top', ((heightBelowHeader - contentWrapperHeight) / 2) + 'px');
        nav.css('margin-top', ((heightBelowHeader - navHeight) / 2) + 'px');
        resetNavAndContentStyles = true;
    } else { //else show nav button
        log.debug('showing nav button');
        if (resetNavAndContentStyles) {
            $('nav').eq(0).css('margin-top', '');
            $('.content-wrapper').css('margin-top', '');
            $('.content-wrapper').css('height', 'auto');

            var cwHeight = Math.max(parseInt($('.content-wrapper').css('height')), heightBelowHeader);
            $('.content-wrapper').css('height', cwHeight + 'px');

            $('.nav-wrapper').addClass('hidden');
            $('.content-wrapper').removeClass('hidden');

            resetNavAndContentStyles = false;
            setScrollbar = true;
        }
        var navBtn = $('.header-wrapper > #nav-btn').eq(0);
        navHeight = parseInt($('.header-wrapper').css('height'));
        var navBtnMargin = ((navHeight - parseInt(navBtn.css('height'))) / 2);
        navBtn.css('top', navBtnMargin + 'px');
        $('.header-wrapper').css('background-color', 'green');
    }
}

// found here:
//   http://stackoverflow.com/a/3150139/984407
var addEvent = function(elem, type, eventHandle) {
    if (elem === null || typeof(elem) === 'undefined') return;
    if (elem.addEventListener) {
        elem.addEventListener(type, eventHandle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, eventHandle);
    } else {
        elem["on" + type] = eventHandle;
    }
};

module.exports = initSiteLayout;
