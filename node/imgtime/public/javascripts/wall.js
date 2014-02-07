/**
 * Created by QETHAN on 14-2-7.
 */
document.ready(function(){

	var imgs = document.querySelectorAll('img');
	var srcData = [];
	for(var i=0;i<imgs.length;i++) {
		srcData.push(imgs[i].src);
	}

	var socket = io.connect('http://localhost:3000');
	socket.on('hello',function(data){
		console.log('socket connect');
	});
	socket.on('pull', function (data) {
		socket.emit('pullRequest',{'status':'pullRequest'});
	});

	socket.on('pushnew',function(data){
		console.log('-------->new'+data[0].path);
		srcData.unshift(data[0].path);
		srcData.pop();

		for(var i=0;i<imgs.length;i++) {
			console.log(srcData[i]);
			imgs[i].src = srcData[i];
		}
	});

});
