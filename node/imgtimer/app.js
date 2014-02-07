
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var db = require('./db/db.js');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.bodyParser({
//	limit: 10000000,
//	defer: true //enable event
//}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
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
app.get('/hello',routes.list);
app.get('/checkSameImg/:name', checkSameNameImg);
app.post('/imgtimer', routes.upload);
app.get('/page/:pagenum/last/:lastid',routes.page);
app.get('/date',routes.date);

//如果有同名的图片，就提醒修改图片名字
function checkSameNameImg(req,res) {
	console.log('-------------->check start');
	db.findSameImg(req.param('name'),res);
}
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
