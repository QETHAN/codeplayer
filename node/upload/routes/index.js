
/*
 * GET home page.
 */
var formidable = require('formidable');
var fs = require('fs');
var db = require('../db/db');
var moment = require('moment');

exports.index = function(req, res){
  res.render('index', { title: '随图' });
};

exports.list = function(req,res){
//	db.page(1,10,function(data){
//		res.locals.data = data;
//		res.render('list');
//	});
	db.date(function(data){
		res.locals.data = data;
		res.render('list');
	});
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
			var createAt = new Date(Date.parse(file.lastModifiedDate));
			//保存到mongo
			var img = new db.imgModel({'name':file.name,'path':file.name,'year':createAt.getFullYear(),'month':createAt.getMonth()+1,'date':createAt.getDate(),'time':createAt.getHours()+':'+(createAt.getMinutes()>9?createAt.getMinutes():'0'+createAt.getMinutes()),'createAt':createAt});
			img.save(function(err,img){
				if(err) {
					console.log(err);
					return;
				}
			});
		});
	});
};

exports.page = function(req,res){
	db.page(1,10,function(data){
		res.locals.data = data;
		res.render('list');
	});
	db.date(function(data){
		res.send(data);
	});
}

exports.date = function(req,res){
	db.date(function(data){
		res.send(data);
	});
}