let angular = require('angular');
let app = angular.module('pageInvoice', []);

app.controller('ctrlInvoice', ['$scope', ( $scope ) => {

    $scope.info = ' - 我是发票管理控制器';

}]);