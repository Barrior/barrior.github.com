let angular = require('angular');
let app = angular.module('pageIndex', []);

app.controller('ctrlIndex', ['$scope', ( $scope ) => {

    $scope.info = ' - 我是首页控制器';

}]);