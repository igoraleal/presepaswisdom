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

  var NewController = function($scope, $http, $log, $window) {

    var ctrl = this;
    
    var baseEndpointsUrl = "https://"+$window.location.host+"/_ah/api/presepasendpoints/v1/wisdom";

    var url = baseEndpointsUrl+"/new";

    var sucessoPostSabedoria = function(response) {
      ctrl.showLoading = false;
      ctrl.message = "Sabedoria salva com sucesso.";
      ctrl.wisdom = "";
    }

    var erroPostSabedoria = function(response) {
      $scope.sabedoria = "Erro ao buscar sabedoria. :(";
      ctrl.showLoading = false;
      ctrl.message = "Erro ao salvar sabedoria..";
    }

    this.postSabedria = function() {
      ctrl.showLoading = true;
      ctrl.message = "";
      var data = {"text" : ctrl.wisdom};

      $http.post(url, data).then(sucessoPostSabedoria, erroPostSabedoria);
    }

    

  };

    var ListController = function($scope, $http, $log, $window) {

    var ctrl = this;

    var sucessoGetSabedoria = function(response) {
      ctrl.showLoading = false;
      ctrl.sabedorias = response.data.items;
    }

    var erroGetSabedoria = function(response) {
      ctrl.message = "Erro ao buscar lista de sabedorias. :(";
      ctrl.showLoading = false;
      $log.log("Erro");
    }

    var sucessoDeleteSabedoria = function(response) {
      ctrl.showLoading = false;
      $log.log("Apagado com sucesso");
      ctrl.getAll();
    }

    var erroDeleteSabedoria = function(response) {
      ctrl.showLoading = false;
      $log.log("Erro ao apagar.");
      $log.log(response);
    }
    
    var baseEndpointsUrl = "https://"+$window.location.host+"/_ah/api/presepasendpoints/v1/wisdom";

    var url = baseEndpointsUrl+"/list";
    var urlDelete = baseEndpointsUrl+"/delete";

    ctrl.getAll = function() {
      $http.get(url).then(sucessoGetSabedoria, erroGetSabedoria);
    }

    ctrl.delete = function(code) {
      ctrl.showLoading = true;
      var data = {"code" : code};
      $http.post(urlDelete, data).then(sucessoDeleteSabedoria, erroDeleteSabedoria);
    }

    ctrl.getAll();

  };

  app.controller('MainController', MainController);
  app.controller('NewController', NewController);
   app.controller('ListController', ListController);

}());