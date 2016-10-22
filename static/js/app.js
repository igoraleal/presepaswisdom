'use strict';

  var app = angular.module('presepasApp', []);

(function() {
  var MainController = function($scope, $http, $log, $window) {

  	var ctrl = this;
  	this.showLoading = true;

  	var sucessoGetSabedoria = function(response) {
  		ctrl.showLoading = false;
  		$scope.sabedoria = response.data.text;
  		$scope.current = response.data.code;
  	}

  	var erroGetSabedoria = function(response) {
  		$scope.sabedoria = "Erro ao buscar sabedoria. :(";
  		ctrl.showLoading = false;
  	}

  	var baseEndpointsUrl = "https://"+$window.location.host+"/_ah/api/presepasendpoints/v1/wisdom";

  	this.getSabedoria = function() {
  		$scope.sabedoria =  "";
  		ctrl.showLoading = true;
  		var url = baseEndpointsUrl+"/random";
  		if ($scope.current) {
  			url = url + "?current="+$scope.current;
  		}

  		$http.get(url).then(sucessoGetSabedoria, erroGetSabedoria);
  		
  	}

  	this.getSabedoria(null);

  };

  app.controller('MainController', MainController);

}());