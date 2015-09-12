/**
 * Created by lee on 2015/9/11.
 */

iCloudController.controller("TopController", ["$scope", "$http", "$auth",
    function ($scope, $http, $auth) {
        $scope.logout = function () {
            $auth.logout();
        }
    }]);