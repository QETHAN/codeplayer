/**
 * Created by QETHAN on 14-1-24.
 *
 * replace:false ==> <hello><div>Hi there</div></hello>
 *
 * transclude:false ==> 不嵌入这个标签之间的内容，（使用时），
 * 这个时候 就不要出现 ng-transclude 属性
 */
var appModule = angular.module('app',[]);
appModule.directive('hello', function(){
	return {
		restrict: 'E',
		template: '<div>Hi there</div>',
		replace: true
	}
});

appModule.directive('hello2', function(){
	return {
		restrict: 'E',
		template: '<div>Hi there <span ng-transclude></span></div>',
		transclude:false
	}
});