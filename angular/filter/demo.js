/**
 * Created by QETHAN on 13-12-6.
 */

var myApp = angular.module('MyApp',[]);

myApp.controller('Ctrl', function($scope){
    $scope.text = 'Hello Kitty';
});

myApp.filter('clean', function(){
    return function(str,seperator) {
        return str.toLowerCase().replace(/\s+/g, seperator || '-');
    }
});