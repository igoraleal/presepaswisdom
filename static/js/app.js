'use strict';

var app = angular.module('presepasApp', 
 ['ngRoute']).
config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
    when('/random', {
      templateUrl: '/partials/wisdom.html',
      controller: 'MainController'
    }).
    when('/new', {
      templateUrl: '/partials/new.html',
      controller: 'NewController'
    }).
    when('/list', {
      templateUrl: '/partials/list.html',
      controller: 'ListController'
    }).
    otherwise({
      redirectTo: '/random'
    });
  }]);

app.directive('ngConfirmClick', [
  function(){
    return {
      link: function (scope, element, attr) {
        var msg = attr.ngConfirmClick || "Are you sure?";
        var clickAction = attr.confirmedClick;
        element.bind('click',function (event) {
          if ( window.confirm(msg) ) {
            scope.$eval(clickAction)
          }
        });
      }
    };
  }])
