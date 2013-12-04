;(function($){

    var defaults = {
        url: false,
        callback: false,
        target: false,
        duration: 120,
        on: 'mouseover',// other options: grab, click, toggle
        touch: true,// enables a touch fallback
        onZoomIn: false,
        onZoomOut: false,
        magnify: 1
    };

    $.zoom = function(target, source, img, magify) {
        var targetHeight,
              targetWidth,
              sourceHeight,
              sorceWidth,
              xRatio,
              yRatio,
              offset,
              position = $(target).css('position');


        $(target).css({
            position: /(absolute|fixed)/.test(position) ? position : 'relative',
            overflow: 'hidden'
        });

        img.style.width = img.style.height = '';

        $(img).addClass('zoomImg').css({
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            width: img.width * magify,
            height: img.height * magify,
            border: 'none',
            maxWidth: 'none'
        }).appendTo(target);


        return {
            init: function() {
                targetWidth = $(target).outerWidth();
                targetHeight = $(target).outerHeight();

                if(source === target) {
                    sourceWidth = targetWidth;
                    sourceHeight = targetHeight;
                } else {
                    sourceWidth = $(source).outerWidth();
                    sourceHeight = $(source).outerHeight();
                }

                xRatio = (img.width - targetWidth) / sourceWidth;
                yRatio = (img.height - targetHeight) / sourceHeight;

                offset = $(source).offset();
            },

            move: function(e) {
                var left = (e.pageX - offset.left),
                    top = (e.pageY - offset.top);

                top = Math.max(Math.min(top, sourceHeight), 0);
                left = Math.max(Math.min(left, sourceWidth), 0);

                img.style.left = (left * -xRatio) + 'px';
                img.style.top = (top * -yRatio) + 'px';
            }
        };
    };

    $.fn.zoom = function(options) {
        return this.each(function(){
            var settings = $.extend({}, defaults, options||{}),
                target = settings.target || this,
                source = this,
                img = document.createElement('img'),
                $img = $(img),
                mousemove = 'mousemove.zoom',
                clicked = false,
                touched = false,
                $urlElement;

            if(!settings.url) {
                $urlElement = $(source).find('img');
                if($urlElement[0]) {
                    settings.url = $urlElement.data('src') || $urlElement.attr('src');
                }

                if(!settings.url) {
                    return;
                }

            }

            img.onload = function() {
                var zoom = $.zoom(target, source, img, settings.magnify);

                function start(e) {
                    zoom.init();
                    zoom.move(e);

                    $img.stop().fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
                }

                function stop() {
                    $img.stop()
                        .fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
                }

                // Mouse events
                if (settings.on === 'grab') {
                    $(source)
                        .on('mousedown.zoom',
                        function (e) {
                            if (e.which === 1) {
                                $(document).one('mouseup.zoom',
                                    function () {
                                        stop();

                                        $(document).off(mousemove, zoom.move);
                                    }
                                );

                                start(e);

                                $(document).on(mousemove, zoom.move);

                                e.preventDefault();
                            }
                        }
                    );
                } else if (settings.on === 'click') {
                    $(source).on('click.zoom',
                        function (e) {
                            if (clicked) {
                                // bubble the event up to the document to trigger the unbind.
                                return;
                            } else {
                                clicked = true;
                                start(e);
                                $(document).on(mousemove, zoom.move);
                                $(document).one('click.zoom',
                                    function () {
                                        stop();
                                        clicked = false;
                                        $(document).off(mousemove, zoom.move);
                                    }
                                );
                                return false;
                            }
                        }
                    );
                } else if (settings.on === 'toggle') {
                    $(source).on('click.zoom',
                        function (e) {
                            if (clicked) {
                                stop();
                            } else {
                                start(e);
                            }
                            clicked = !clicked;
                        }
                    );
                } else if (settings.on === 'mouseover') {
                    zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.

                    $(source)
                        .on('mouseenter.zoom', start)
                        .on('mouseleave.zoom', stop)
                        .on(mousemove, zoom.move);
                }

                // Touch fallback
                if (settings.touch) {
                    $(source)
                        .on('touchstart.zoom', function (e) {
                            e.preventDefault();
                            if (touched) {
                                touched = false;
                                stop();
                            } else {
                                touched = true;
                                start( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
                            }
                        })
                        .on('touchmove.zoom', function (e) {
                            e.preventDefault();
                            zoom.move( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
                        });
                }

                if ($.isFunction(settings.callback)) {
                    settings.callback.call(img);
                }
            };

            img.src = settings.url;

            $(source).one('zoom.destroy', function(){
                $(source).off(".zoom");
                $img.remove();
            });
        });
    };

    $.fn.zoom.defaults = defaults;

}(window.jQuery));