/**
 * Created by QETHAN on 14-1-22.
 */
angular.module('app',['ngResource']);

function GetController($scope,$http) {
	$http({method: 'GET', url: '/users'}).
			success(function(data, status, headers, config) {
				console.log(data);
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
}

function ResController($scope,$http,$resource) {
	var User = $resource('/user/:userId', {userId:'@id'});
	var user = User.get({userId:123}, function() {
		user.abc = true;
		user.$save();
	});
}