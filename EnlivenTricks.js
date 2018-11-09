/**
 * EnlivenTricks.js
 * Copyright 2019 Hugo Piat
 * MIT license
 */
(function($) {

    /**
     * Performs fading animation
     * @param {object} settings 
     * -- duration = fade duration (default: 500 ms)
     * -  mode = 'in' / 'out' (default: in if the element is invisible, out otherwise) 
     * -  disappear = when mode is out, should the element be removed (default: false)
     */
    $.fn.FadeTrick = function(settings) {

        settings = $.extend({duration: 500, disappear: false}, settings);

        return this.each(function() {

            if (!settings.mode) {
                // Defining fade mode depending on element visibility
                const visible = ($(this).is(':visible') && parseInt($(this).css('opacity')) !== 0);
                settings.mode = (visible ? 'out' : 'in');
            } else if (settings.mode !== 'out' && settings.mode !== 'in') {
                console.error(`FadeTrick: invalid mode '${settings.mode}'`);
                return;
            }

            if ($(this).is(':animated')) {
                return;
            } else if (settings.mode === 'in') {
                $(this).show();
            }

            $(this).animate({
                opacity: (settings.mode === 'in' ? 1 : 0)
            }, settings.duration, function() {

                if (settings.mode === 'out' && settings.disappear === true) {
                    $(this).hide();
                }
            });
        });
    }

    /**
     * Performs shaking animation
     * @param {object} settings 
     * -- times = number of shakes (default: 6)
     * -  wrapper = parent wrapper reference (default: false) 
     */
    $.fn.ShakeTrick = function(settings) {

        settings = $.extend({times: 6, wrapper: false}, settings);

        if (settings.times % 2 !== 0) settings.times--;

        const duration = 500 / settings.times;
        return this.each(function() {

            let count = 0;
            let $that = $(this);

            if (settings.wrapper !== false) {
                // Getting wrapper element
                const wrapper = $(settings.wrapper);
                if (wrapper.length) $that = wrapper;
            }

            if ($that.is(':animated')) return;

            const wasBlob = _checkBlobState($that);
            _checkPositionState($that);

            const even = () => count % 2 === 0;
            const callback = function() {

                $that.animate({ 
                    left: `${ even() ? '+' : '-' }=30`
                }, duration, function() {

                    count++;
                    if (count < settings.times) {
                        // Looping until anim is complete
                        callback();
                    } else if (wasBlob === true) {
                        // Then restoring blob state
                        $that.addClass(_BLOB_CLASS);
                    }
                })
            }
            callback();
        });
    }

    /**
     * Applies blob effect on element hover
     */
    $.fn.BlobTrick = function() {

        return this.each(function() {
            
            const isBlob = _checkBlobState(this);

            if (isBlob === false) {
                _checkPositionState(this);
                $(this).addClass(_BLOB_CLASS);
            }
        });
    }

    /**
     * Performs swap effect between two containers
     * @param {object} settings
     * -- next = reference of new container to show, can be computed with classes
     * matching the pattern swappable-${number}
     * -  revert = boolean indicating if the animation should be performed
     * in the left direction (default: false)
     * -  callback = callback function to execute after animation
     * -  vertical = if the animation should be vertical (default: false) 
     */
    $.fn.SwapTrick = function(settings) {
        
        settings = $.extend({revert: false, vertical: false, callback: function() {return;}}, settings);
        const duration = 600;
        
        return this.each(function() {

            if ($(this).is(':animated')) return;

            // Dynamic reference to next element using class pattern
            if (!settings.next) {
                let swappableClass;
                const classList = $(this).attr('class').split(' ');
                for (const item of classList) {
                    if (item.startsWith('swappable')) {
                        swappableClass = item;
                        break;
                    }
                }
                // Parsing class name and computing next element reference
                if (swappableClass) {
                    const split = swappableClass.split('-');
                    if (split.length > 1 && parseInt(split[1])) {
                        const current = parseInt(split[1]);
                        const next = `.swappable-${settings.revert === true ? current - 1 : current + 1}`;
                        // Checking if such class owner exists
                        if ($(next).length) {
                            settings.next = next;
                        }
                    }
                }
                if (!settings.next) {
                    console.error('SwapTrick: next reference could not be found, classes should follow the pattern swappable-${number}');
                    return;
                }
            }
            _checkPositionState(this);
            _checkPositionState(settings.next);
            const thisWasBlob = _checkBlobState(this);
            const nextWasBlob = _checkBlobState(settings.next);
            const propertyName = (settings.vertical === true ? 'bottom' : 'left');

            if ($(settings.next).css(propertyName) === 'auto') {
                $(settings.next).css(propertyName, '0');
            }
            $(settings.next).css(propertyName, `${settings.revert === true ? '+' : '-'}=1000`);
            $(settings.next).css('opacity', '0');

            const $that = $(this);
            const oldProperty = $that.css(propertyName);

            // Sliding out first element
            let animData = {opacity: 0};
            animData[propertyName] = `${settings.revert === true ? '-' : '+'}=1000`;
            $that.animate(animData, duration, function() {

                if (thisWasBlob === true) {
                    $that.addClass(_BLOB_CLASS);
                }
            });
            
            setTimeout(function() {
                $that.hide();
                $(settings.next).show();
                // Showing next element
                animData.opacity = 1;
                $(settings.next).animate(animData, duration, function() {

                    $that.css(propertyName, oldProperty);
                    settings.callback();
                    if (nextWasBlob === true) {
                        $(settings.next).addClass(_BLOB_CLASS);
                    }
                });
            }, duration - 150);
        });
    }

    /**
     * Checks element css 'position' 
     * attribute and update its value if needed
     * @param {string} element element reference
     */
    function _checkPositionState(element) {
        
        const DEFAULT = 'relative';
        const attribute = $(element).css('position');

        if (attribute !== 'relative' && 
            attribute !== 'absolute' && attribute !== 'fixed') {

            $(element).css('position', DEFAULT);
        }
    }

    /**
     * Checks element blob class and remove it if present
     * @param {string} element element reference
     * @returns true if blob class has been removed, false otherwise 
     */
    function _checkBlobState(element) {
        
        const isBlob = $(element).hasClass(_BLOB_CLASS);

        if (isBlob === true) {
            $(element).removeClass(_BLOB_CLASS);
        }
        return isBlob;
    }

    const _BLOB_CLASS = 'is-blob';
 
} (jQuery));