
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
	limit: 10000000,
	defer: true //enable event
}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'html')));

var whitelist = ['http://127.0.0.1:63342', 'http://example2.com'];

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.all('*', function(req, res, next) {
	if(whitelist.indexOf(req.headers.origin) != -1) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
	}
	next();
});

app.get('/', routes.index);
app.get('/drag',function(req,res){
	console.log('------>drag');
	res.sendfile('./html/drag-upload-img.html');
});

app.post('/upload', function(req,res){
	var form = new formidable.IncomingForm();
	var MAX_UPLOAD_SIZE = 20;
	form.uploadDir = 'uploads/';
	form.keepExtensions = true;

	form.on('file',function(field,file){
		fs.rename(file.path,form.uploadDir+"/"+file.name);
	});
	form.on('progress',function(bytesReceived,bytesExpected){
		if (bytesReceived > MAX_UPLOAD_SIZE) {
			console.log('### ERROR: FILE TOO LARGE');
			return;
		}
		console.log(((bytesReceived / bytesExpected)*100)+"% uploaded");
	});
	form.on('end',function(){
		console.log(req.files);
		res.send("done");
	});
	form.parse(req);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
