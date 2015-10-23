/**
 * Created by lee on 2015/9/9.
 */


iCloudController.controller("IndexController", ["$scope", "$http", "$window", "$auth", "$cookieStore",
    function ($scope, $http, $window, $auth, $cookieStore) {

        $scope.auth = {
            "username": "",
            "password": ""
        };

        $scope.login = function (data) {
            if (!data.username) {
                $scope.errorMsg = "用户名不能为空";
                console.log($scope.errorMsg);
                return false
            }

            if (!data.password) {
                $scope.errorMsg = "密码不能为空";
                console.log($scope.errorMsg);
                return false
            }


            data.password = CryptoJS.SHA1(data.password).toString();

            $auth.login(data);
        };
    }]);

iCloudController.controller("TopController", ["$scope", "$http", "$auth", "$cookieStore",
    function ($scope, $http, $auth, $cookieStore) {
        $scope.logout = function () {
            $cookieStore.remove("key");
            $auth.logout();
        };
    }]);