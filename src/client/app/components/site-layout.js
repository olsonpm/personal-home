'use strict';

var TweenLite = require('TweenLite')
    , nh = require('node-helpers')
    , initHoverIntent = require('hoverintent');

require('gsapCssPlugin');
var gsapd = nh.gsapDefaults(window);

function initDocReady($, $scope) {
    initHoverIntent($); // attaches hoverintent to the jquery object

    $(document).ready(function() {
        positionNavAndContents();
        addEvent(window, "resize", positionNavAndContents);
    });

    $scope.$on('$viewContentLoaded', function() {
        positionNavAndContents();
    });

    function positionNavAndContents() {
        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var heightBelowHeader = viewportHeight - parseInt($('body > .header-wrapper').eq(0).css('height'), 10);
        var content = $('.content-wrapper').eq(0);
        var nav = $('nav').eq(0);
        var contentHeight = parseInt(content.css('height'), 10);
        if (heightBelowHeader * 0.8 > contentHeight) {
            contentHeight = (heightBelowHeader * 0.8);
            content.css('height', contentHeight + 'px');
        }

        var navHeight = parseInt($('nav').eq(0).css('height'), 10);

        console.log({
            viewportHeight: viewportHeight
            , heightBelowHeader: heightBelowHeader
            , contentHeight: contentHeight
            , navHeight: navHeight
            , contentNewHeight: (((heightBelowHeader - contentHeight) / 2) + 'px')
            , navNewHeight: (((contentHeight - contentHeight) / 2) + 'px')
        });

        if (heightBelowHeader > contentHeight) {
            content.css('margin-top', ((heightBelowHeader - contentHeight) / 2) + 'px');
            nav.css('margin-top', ((heightBelowHeader - navHeight) / 2) + 'px');
        } else {
            content.addClass('bigContent');
            nav.addClass('bigContent');
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
}

module.exports = initDocReady;
