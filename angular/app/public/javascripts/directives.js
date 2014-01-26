/**
 * Created by QETHAN on 14-1-24.
 */
var directives = angular.module('guthub.directives',[]);


directives.directive('butterbar',['$rootScope',function($rootScope){
	return {
		link: function(scope,element,attrs) {
			element.addClass('hide');
		}
	}
}]);

directives.directive('focus',function(){
	return {
		link: function(scope,element,attrs) {
			element[0].focus();
		}
	}
});



