/**
 * Created by QETHAN on 14-1-24.
 */
var app = angular.module('guthub',['guthub.directives','guthub.services']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
			when('/', {
				controller: 'listCtrl',
				resolve: {
					recipes: function(MultiRecipeLoader) {
						return MultiRecipeLoader();
					}
				},
				templateUrl: '/views/list.html'
			})
}]);