/**
 * Created by QETHAN on 13-12-6.
 */

var myApp = angular.module('MyApp', []);

myApp.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});