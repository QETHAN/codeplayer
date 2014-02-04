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