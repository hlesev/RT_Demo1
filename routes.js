
module.exports = function(app, io, tracer){
	
	app.get('/', function(req, res){
		res.render('monitor');
	});
	
	io.sockets.on('connect', function(client) {

		console.log( "Connected: " + client.id );
	
		client.on('disconnect', function() {
			console.log( "Disconnect: " + client.id );
		});
	});
	
	io.sockets.on('connection', function(socket) 
	{
		socket.on('ready-to-render', function(data)
		{
			var imgWidth = data.width;
			var imgHeight = data.height;
			
			console.log( data.lightScale );
			
			tracer.smallpt(imgWidth, imgHeight, data.samples, data.lightScale, function(err, image, par){
				console.log(image);
				
				var jsonImg = JSON.stringify(image);	
				socket.emit('render-result', jsonImg);
			});

		});
		
	});
	
}