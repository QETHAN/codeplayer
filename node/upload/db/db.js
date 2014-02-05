/**
 * Created by QETHAN on 14-2-4.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/imgdb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('yeah---------->');
});

var imgSchema = mongoose.Schema({
	name: {type: String},
	path: {type: String},
	year: {type: String},
	month: {type: String},
	date: {type: String},
	time: {type: String},
  createAt: {type: Date}
});

var imgModel = exports.imgModel = mongoose.model('imgModel',imgSchema);

//查找想通过图片

exports.findSameImg = function(name,res,next) {
	imgModel.find({'name':name},function(err,imgs){
		if(err) {
			console.log(err);
		}
		if(imgs.length) {
			res.json({code:201});
			return;
		}
		res.json({code:200});
	});
}

//分页  每一天 为一个数据单元，为每天分页
exports.page = function(pagenum,size,cb) {
	imgModel.find({},{},{skip:(pagenum-1)*size,limit:size,sort:{'createAt':-1}}, function(err,results){
		if(err) throw err;
		if(results.length) {
			console.log(results);
			cb(results);
		} else {
			cb(null);
		}
	});
}

//每天为单位的数据
exports.date = function(cb) {
	var imgs = [];
	imgModel.find().distinct('date',function(err,dates){
		if(err) throw err;
		console.log(dates);
		dates.forEach(function(item,index){
			console.log(item);
			imgModel.find({'date':item},{},{sort:{'createAt':-1}},function(err,data){
				var json = {};
				json[item] = data;
				imgs.push(json);
				if(imgs.length==dates.length) {
					cb(imgs);
				}
			});
		});
	});
}