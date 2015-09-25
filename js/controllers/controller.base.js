/**
 * Created by lee on 2015/9/11.
 */

var iCloudController = angular.module("iCloudController", []);


iCloudController.controller("BaseController", ["$scope",
    function ($scope) {
        $scope.$on('sendData',function(e){
            $scope.$broadcast('executeData');
        })
    }]);