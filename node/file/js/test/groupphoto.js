/**
 * Created with JetBrains PhpStorm.
 * User: zhujingsi
 * Date: 13-9-26
 * Time: 下午5:50
 * To change this template use File | Settings | File Templates.
 */

/**
 * 团队照片展示效果
 */
define(['jquery'], function ($) {
    return {
        photo: function () {

            var elems = $([]),
                doc   = $(document);

            $.event.special.proximity = {

                defaults: {
                    max: 100,
                    min: 0,
                    throttle: 0,
                    fireOutOfBounds: 1
                },

                setup: function(data) {

                    if (!elems[0])
                        doc.mousemove(handle);

                    elems = elems.add(this);

                },

                add: function(o) {

                    var handler = o.handler,
                        data = $.extend({}, $.event.special.proximity.defaults, o.data),
                        lastCall = 0,
                        nFiredOutOfBounds = 0,
                        hoc = $(this);

                    o.handler = function(e, pageX, pageY) {

                        var max = data.max,
                            min = data.min,
                            throttle = data.throttle,
                            date = +new Date,
                            distance,
                            proximity,
                            inBounds,
                            fireOutOfBounds = data.fireOutOfBounds;

                        if (throttle && lastCall + throttle > date) {
                            return;
                        }

                        lastCall = date;

                        distance = calcDistance(hoc, pageX, pageY);
                        inBounds = distance < max && distance > min;

                        if (fireOutOfBounds || inBounds) {

                            if (inBounds) {
                                nFiredOutOfBounds = 0;
                            } else {

                                // If fireOutOfBounds is a number then keep incrementing a
                                // counter to determine how many times the handler's been
                                // called out of bounds. Note: the counter is reset whenever
                                // the cursor goes back inBounds...

                                if (typeof fireOutOfBounds === 'number' && nFiredOutOfBounds > fireOutOfBounds) {
                                    return;
                                }
                                ++nFiredOutOfBounds;
                            }

                            proximity = e.proximity = 1 - (
                                distance < max ? distance < min ? 0 : distance / max : 1
                                );

                            e.distance = distance;
                            e.pageX = pageX;
                            e.pageY = pageY;
                            e.data = data;

                            return handler.call(this, e, proximity, distance);

                        }

                    };

                },

                teardown: function(){

                    elems = elems.not(this);

                    if (!elems[0])
                        doc.unbind('mousemove', handle);

                }

            };

            function calcDistance(el, x, y) {

                // Calculate the distance from the closest edge of the element
                // to the cursor's current position

                var left, right, top, bottom, offset,
                    cX, cY, dX, dY,
                    distance = 0;

                offset = el.offset();
                left = offset.left;
                top = offset.top;
                right = left + el.outerWidth();
                bottom = top + el.outerHeight();

                cX = x > right ? right : x > left ? x : left;
                cY = y > bottom ? bottom : y > top ? y : top;

                dX = Math.abs( cX - x );
                dY = Math.abs( cY - y );

                return Math.sqrt( dX * dX + dY * dY );

            }

            function handle(e) {

                var x = e.pageX,
                    y = e.pageY,
                    i = -1,
                    fly = $([]);

                while (fly[0] = elems[++i]) {
                    fly.triggerHandler('proximity', [x,y]);
                }
            }
            ///////////////////////////////////////////////

            var Photo	= (function() {

                var $list	= $('#pe-thumbs'),
                    listW   = $list.width(),
                    listL	= $list.offset().left,
                    elements	= $list.find('img')
                var $descrp	= $list.find('div.pe-description'),
                    settings= {
                        maxScale	: 0.9,
                        maxOpacity	: 1,
                        minOpacity	: Number( elements.css('opacity') )
                    },
                    init    = function() {

                        settings.minScale = _getScaleVal();
                        _loadImages( function() {

                            _calcDescrp();
                            _initEvents();

                        });

                    },

                    _getScaleVal= function() {

                        var st = window.getComputedStyle(elements.get(0), null),
                            tr = st.getPropertyValue("-webkit-transform") ||
                                st.getPropertyValue("-moz-transform") ||
                                st.getPropertyValue("-ms-transform") ||
                                st.getPropertyValue("-o-transform") ||
                                st.getPropertyValue("transform") ||
                                "fail...";

                        if( tr !== 'none' ) {

                            var values = tr.split('(')[1].split(')')[0].split(','),
                                a = values[0],
                                b = values[1],
                                c = values[2],
                                d = values[3];

                            return Math.sqrt( a * a + b * b );

                        }

                    },
                    _calcDescrp	= function() {

                        $descrp.each( function(i) {

                            var $el		= $(this),
                                $img	= $el.prev(),
                                img_w	= $img.width(),
                                img_h	= $img.height(),
                                img_n_w	= settings.maxScale * img_w,
                                img_n_h	= settings.maxScale * img_h,
                                space_t = ( img_n_h - img_h ) / 2,
                                space_l = ( img_n_w - img_w ) / 2;

                            $el.data( 'space_l', space_l ).css({
                                height	: settings.maxScale * $el.height(),
                                top		: -space_t,
                                left	: img_n_w - space_l
                            });

                        });

                    },
                    _initEvents	= function() {

                        elements.on('proximity.Photo', { max: 150, min:0, throttle: 0, fireOutOfBounds : 3 }, function(event, proximity, distance) {

                            var $el			= $(this),
                                $li			= $el.closest('li'),
                                $desc		= $el.next(),
                                scaleVal	= proximity * ( settings.maxScale - settings.minScale ) + settings.minScale,
                                scaleExp	= 'scale(' + scaleVal + ')';

                            var $desc		= $el.next();
                            if( scaleVal === settings.maxScale ) {

                                $li.css( 'z-index', 1000 );

                                if( $desc.offset().left + $desc.width() > listL + listW ) {

                                    $desc.css( 'left', -$desc.width() - $desc.data( 'space_l' ) );

                                }

                                $desc.fadeIn(100);

                            }
                            else {

                                $li.css( 'z-index', 1 );

                                $desc.stop(true,true).hide();

                            }

                            $el.css({
                                '-webkit-transform'	: scaleExp,
                                '-moz-transform'	: scaleExp,
                                '-o-transform'		: scaleExp,
                                '-ms-transform'		: scaleExp,
                                'transform'			: scaleExp,
                                'opacity'			: ( proximity * ( settings.maxOpacity - settings.minOpacity ) + settings.minOpacity )
                            });

                        });

                    },
                    _loadImages	= function( callback ) {

                        var loaded 	= 0,
                            total	= elements.length;

                        elements.each( function(i) {

                            var $el = $(this);

                            $('<img/>').load( function() {

                                ++loaded;
                                if( loaded === total )
                                    callback.call();

                            }).attr( 'src', $el.attr('src') );

                        });

                    };
                    return {
                        init	: init
                    };

                })();

    Photo.init();
        }
    }
})
