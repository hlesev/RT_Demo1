$(function(){
	
	var socket = io();
	
	var imgW = 200;
	var imgH = 200;
	var imgS = 1;
	
	$( "#btnStartRender" ).click(function() {
		socket.emit('ready-to-render', {
			 width: imgW,
        	 height: imgH,
        	 samples: imgS,
			 lightScale: 1.0
		})
	});
	
	var lightScaleChanged = function() {
		  socket.emit('ready-to-render', {
			 width: imgW,
        	 height: imgH,
        	 samples: imgS,
			 lightScale: lsSlider.getValue()
		})
     };

	var lsSlider = $('.slider').slider()
		.on('slideStop', lightScaleChanged ).data('slider');

	socket.on('render-result', function(data)
	{
		var imgObj = JSON.parse(data);
		
		var context = document.getElementById("RTCanvas").getContext("2d"); 
		var id = context.createImageData(imgW,imgH);
		
		var pixID = 0;
		var bufID = 0;
		for(var y=0; y<imgH; ++y)
		{
			for( var x=0; x<imgW; ++x )
			{
				for( var i=0; i<3; ++i )
				{
					id.data[pixID++] = imgObj[bufID++];
				}
				id.data[pixID++] = 255;
			}
		}
		
		var newCanvas = $("<canvas>")
			.attr("width", imgW)
			.attr("height", imgH)[0];
		
		newCanvas.getContext("2d").putImageData(id, 0, 0);

		context.scale(2.0, 2.0);
		context.drawImage(newCanvas, 0, 0);
		context.scale(0.5, 0.5);
	});

});
