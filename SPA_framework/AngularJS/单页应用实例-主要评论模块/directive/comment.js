
let $ = require('jquery');
let angular = require('angular');
let app = angular.module('cptComment',[]);

app.directive('cptComment', () => {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            cptCommentCid: '@',
            cptCommentSet: '='
        },
        controller: ['$scope', ( $scope ) => {
            $scope.cid = $scope.cptCommentCid;
            $scope.settings = angular.extend({
                btnVal: '吐槽一下'
            }, $scope.cptCommentSet );

            $scope.commentList = ['Angularjs真是DD的'];
            $scope.hintText = '';
        }],
        template:
            `
                <div class="comment" data-cid="{{ cid }}">
                    <h3>向我吐槽\(^o^)/~：</h3>
                    <div>
                        <textarea cols="30" rows="10" placeholder="狠狠的吐槽一下吧~~~"></textarea>
                        <button class="btn" type="button">{{ settings.btnVal }}</button>
                        <span class="hint" ng-bind="hintText"></span>
                    </div>
                    <ul>
                        <li ng-repeat="data in commentList track by $index" ng-bind="data"></li>
                    </ul>
                </div>
            `,
        link: ( $scope, elem, attr, reCtrl ) => {
            console.log( $scope );
            let settings = $scope.settings;
            //箭头函数不能传递this指向，在这里就显得坑了
            elem.on('click', 'button', function(){
                let $this = $(this);
                let $textarea = $this.prev();
                let val = $textarea.val().trim();
                $scope.$apply( () => {
                    if( val.length < 5 ){
                        $scope.hintText = settings.btnVal + '不能小于5个字符哦~';
                    }else if( val.length > 500 ){
                        $scope.hintText = settings.btnVal + '吐槽不能大于500个字符哦~';
                    }else{
                        $scope.hintText = '';
                        $scope.commentList.unshift( val );
                        $textarea.val('');
                        return;
                    }
                    $textarea.focus();
                });
            });
        }
    };
});