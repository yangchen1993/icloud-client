/**
 * Created by lee on 2015/9/11.
 */

var iCloudController = angular.module("iCloudController", []);


iCloudController.controller("BaseController", ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.$on('sendData', function (e, newscope) {
        $timeout(function () {
            $scope.$broadcast('executeData', newscope);
        }, 100)
    });
    $scope.$on('sendRouters', function (e, newscope) {
        $timeout(function () {
            $scope.$broadcast('executeRouters', newscope);
        }, 100)
    })
}]);