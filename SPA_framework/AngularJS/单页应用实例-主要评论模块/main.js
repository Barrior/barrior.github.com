define(function(require, exports, module){
    //style
    require('./test.less');

    let angular = require('angular');
    require('angular-route');
    require('./page/index-page');
    require('./page/invoice-page');
    require('./directive/comment-dir');

    let app = angular.module('app',['ngRoute', 'pageIndex', 'pageInvoice', 'cptComment']);

    app.config(['$routeProvider', ( $routeProvider ) => {
        $routeProvider
            .when('/index', {
                template: '<h1>首页{{ info }}</h1>',
                controller:  'ctrlIndex'
            })
            .when('/invoice', {
                template: '<h1>发票管理{{ info }}</h1>',
                controller:  'ctrlInvoice'
            })
            .when('/', {
                redirectTo: '/index'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

});