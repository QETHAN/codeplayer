
/*
 * GET home page.
 */
var formidable = require('formidable');
var fs = require('fs');
var db = require('../db/db');

exports.index = function(req, res){
  res.render('index', { title: '随图' });
};

exports.list = function(req,res){
	res.render('list');
};

exports.upload = function(req,res){

	var tmp_path = req.files.file.path;
	var MAX_UPLOAD_SIZE = 2 * 1024 * 1024;//上传大小
	var file = req.files.file;
	var UPLOAD_DIR = 'uploads/'+file.name;

	//移动文件
	fs.rename(tmp_path, UPLOAD_DIR, function(err){
		if(err) throw err;

		//删除临时文件
		fs.unlink(tmp_path, function(){
			if(err) throw err;
			console.log('File uploaded to: ' + UPLOAD_DIR + ' - ' + req.files.file.size + ' bytes');

			//保存到mongo
			var img = new db.imgModel({'name':file.name,'path':file.name,'createAt':file.lastModifiedDate});
			img.save(function(err,img){
				if(err) {
					console.log(err);
					return;
				}
			});
		});
	});
};