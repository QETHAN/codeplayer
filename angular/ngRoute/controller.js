/**
 * Created by QETHAN on 13-12-6.
 */

var onePiece = angular.module('OnePiece',['ngRoute'], function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'view.html'
    }).
        when('/edit', {
            templateUrl: 'edit.html'
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