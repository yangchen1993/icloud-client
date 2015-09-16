/**
 * Created by lee on 2015/9/11.
 */

iCloudController.controller("TopController", ["$scope", "$http", "$auth", "$cookieStore",
    function ($scope, $http, $auth,$cookieStore) {
        $scope.logout = function () {
            $cookieStore.remove("key");
            $auth.logout();
        }
    }]);