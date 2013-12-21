/**
 * Created by QETHAN on 13-12-6.
 */

var onePiece = angular.module('OnePiece',['ngRoute'], function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'view.html'
    }).
        when('/edit/:index', {
            templateUrl: 'edit.html',
            controller: 'EditCtrl'
        }).
        when('/hello/:message/:index', {
            templateUrl: 'hello.html',
            controller: 'GreetingCtrl'
        }).
        otherwise({
            redirectTo: '/'
        })
});

onePiece.controller('OnePieceCtrl', function($scope){
    $scope.friends = [
        {
        name: "Naruto",
        power: 90
        },
        {
            name: '卡卡西',
            power: 80
        }
    ];
});

onePiece.controller('EditCtrl', function($scope, $routeParams){
    $scope.index = $routeParams.index;
});

onePiece.controller('GreetingCtrl', function($scope, $routeParams) {
    $scope.greeting = $routeParams.message;
    $scope.index = $routeParams.index;
});