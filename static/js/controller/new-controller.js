(function() {
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

  app = angular.module('presepasApp');
  app.controller('NewController', NewController);
  
}());