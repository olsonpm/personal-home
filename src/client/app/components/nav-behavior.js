'use strict';

var TweenLite = require('TweenLite')
    , nh = require('node-helpers')
    , initHoverIntent = require('hoverintent');

require('gsapCssPlugin');
var gsapd = nh.gsapDefaults(window);

function initDocReady($) {
    $(document).ready(function() {
        addLinkBehavior();
    });

    function addLinkBehavior() {
        $('nav .link-wrapper').each(function(i, el) {
            var chevron = $(el).find('.chevron');
            $(el).hoverintent(function() { // handler in
                TweenLite.to(chevron, gsapd.DURATION, {
                    css: {
                        'left': '15px'
                    }
                    , ease: gsapd.EASE
                });
            }, function() { // handler out
                TweenLite.to(chevron, gsapd.DURATION, {
                    css: {
                        'left': '0'
                    }
                    , ease: gsapd.EASE
                });
            });
        });
    }
}
