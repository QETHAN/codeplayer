
/*
 * GET users listing.
 */

exports.list = function(req, res){
	var data = [
		{id:1,name:'aaa',age:22},
		{id:2,name:'bbb',age:33},
		{id:3,name:'ccc',age:24}
	];
  res.json(data);
};

exports.product = function(req, res){
	var data = [
		{title: 'Paint pots', description: 'Pots full of paint', price: 3.95},
		{title: 'Polka dots', description: 'Dots with polka', price: 2.95},
		{title: 'Pebbles', description: 'Just little rocks', price: 6.95}
	];
	res.send(req.query.callback+'('+JSON.stringify(data)+')');
}

exports.get = function(req, res){
	var user = {
		id:''+req.params.id,
		name: 'aaa'+req.params.id
	};
	res.json(user);
}
exports.save = function(req, res){
	console.log(req.body.name);
}