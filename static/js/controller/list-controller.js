(function() {
  var ListController = function($scope, $http, $log, $window) {

    var ctrl = this;

    ctrl.showLoading = true;

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

  var app = angular.module('presepasApp');
  app.controller('ListController', ListController);

}());