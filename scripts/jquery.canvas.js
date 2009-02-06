(function($) {
	
	
	var exCanvas = $('<canvas>')[0]; // Create a blank empty canvas not on the page to test features with.
	$.support.fillText = $.isFunction(exCanvas.getContext('2d').fillText);
	$.support.CanvasText = $.browser.mozilla;
	
	$.fn.getContext = function() {
		return this[0].getContext('2d');
	}
	
	
	$.fn.drawShape = function() {
		ctx = this.getContext();
		var args = arguments;
		ctx.beginPath();
		
		ctx.moveTo(args[0][0],args[0][1]);
		
		$.each(args, function() {
			ctx.lineTo(this[0], this[1]);
		})
		
		ctx.fill();
	}
	
	$.fn.fillText = function(text, x, y) {
		ctx = this.getContext();
		if($.support.fillText) {
			ctx.fillText(text, x, y);
		} else {
			if($.support.CanvasText) {
				ctx.translate(x, y);
				ctx.mozDrawText(text)
				ctx.translate(-x, -y);
			} else {
				var canvasOffset = this.offset();
				var div = $('<div>'+text+'</div>').insertAfter(this);
				this.next().css({
						position: 'absolute',
						left: canvasOffset.left + x,
						top: canvasOffset.top + y
					});
			}
		}
	}
	
	
	
	
})(jQuery);