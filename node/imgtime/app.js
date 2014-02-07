
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var path = require('path');
var db = require('./db/db.js');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){
	socket.on('new',function(data){
		socket.broadcast.emit('pull',{'status':'new'});
	});
	socket.on('pullRequest',function(data){
		routes.new(socket);
	});
	socket.emit('hello', { hello: 'world' });
});

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
app.use(express.cookieParser());
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
app.post('/imgtime', routes.upload);
app.get('/page/:pagenum/last/:lastid',routes.page);
//app.get('/wall',routes.wall);

//如果有同名的图片，就提醒修改图片名字
function checkSameNameImg(req,res) {
	console.log('-------------->check start');
	db.findSameImg(decodeURIComponent(req.param('name')),res);
}

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});