(function($) {

	Array.max = function( array ){
	    return Math.max.apply( Math, array );
	};

	$.easing.__Slide = function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	};

	$.simplemasonry = function(element, options) {

        var defaults = {
        	'animate': false,
        	'easing': '__Slide',
        	'timeout': 800
        };
        var settings = $.extend({}, defaults, options);	        
		var $element = $(element);		
		var _sm = this;

		$.extend(_sm, {

			refresh: function() {

		        var $images = $('img', element);
		        var numImages = $images.length;
		        var imgLoadCount = 0;

		        if ( $images.length > 0 )
		        	$element.addClass('sm-images-waiting').removeClass('sm-images-loaded');

				$images.on('load', function(i) {
					imgLoadCount++;
					
					if ( imgLoadCount == numImages ) {
						_sm.resize();
						$element.removeClass('sm-images-waiting').addClass('sm-images-loaded');
					}						
				});

				_sm.resize();
			},

			resize: function() {
				var $children = $element.children(':visible');      
				var childInfo = childElementInfo($children[0]);
				var width = childInfo['width'];
				var columns = childInfo['num'];
				var column_matrix = initialRange(columns);
				
				var renderChild = function(i) {
					var height = $(this).outerHeight();
					var col = 0;
					var addToCol = minIndex(column_matrix);
					var leftPos = Math.round((addToCol * width) * 10) / 10;
					var positionProps = { 
						'left'     : leftPos + '%',
						'top'      : column_matrix[addToCol] + 'px'
					};

					$(this)
						.css({
							'position' : 'absolute'
						})
						.stop();

					if ( settings['animate'] )
						$(this).animate(positionProps, settings['timeout'], settings['easing']);
					else
						$(this).css(positionProps);

					column_matrix[addToCol] += height;
				};

				$children
					.css({ 'overflow': 'hidden', 'zoom': '1' })
					.each(renderChild);

				$element.css({ 
					'position': 'relative',
					'height'  : Array.max(column_matrix) + 'px'
				});
			}

		});

		$(window).resize(_sm.resize);
		$element.addClass('sm-loaded');
		_sm.refresh();
	};

	function minIndex(arry) {
		var minValue = Math.min.apply(Math, arry);
		return $.inArray(minValue,arry);
	}

	function initialRange(num) {
		var arry = [];
		for ( var i=0; i < num; i++ )
			arry.push(0);
		return arry;
	}

	function childElementInfo(elem) {
		var width = $(elem).outerWidth();
		var parentWidth = $(elem).offsetParent().width();
		return {
			'width' : 100 * width / parentWidth,
			'num'   : Math.floor(parentWidth / width)
		};
	}

    $.fn.simplemasonry = function(options) {
		if ( typeof options == 'string') {
			var instance = $(this).data('simplemasonry');
			var args = Array.prototype.slice.call(arguments, 1);
			if ( instance[options] )
				return instance[options].apply(instance, args);
			return;
		} else {
			return this.each(function() {
				if (undefined == $(this).data('simplemasonry')) {
					var plugin = new $.simplemasonry(this, options);
					$(this).data('simplemasonry', plugin);
				}
			});
		}
    }

})(jQuery);