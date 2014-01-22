/**
 * Created by QETHAN on 14-1-22.
 */

var appMoudule = angular.module('app',[]);
appMoudule.directive('ngbkFocus', function(){
	return {
		link: function(scope,element,attrs,controller){
			console.log(attrs);
			element[0].focus();
		}
	}
});
function SomeController($scope) {
	$scope.message = {text: 'nothing2 clicked yet'};

	$scope.clickUnfocused = function() {
		$scope.message = {text:'unfocused button clicked'};
	}

	$scope.clickFocused = function() {
		$scope.message.text = 'focused button clicked';
	}
}
