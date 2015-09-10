/**
 * Created by lee on 2015/9/9.
 */


var iCloudController = angular.module("iCloudController", ["ngCookies"]);


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

            $auth.login(data)
        };


        $scope.permissions = function () {
            $http.get($window.host + "/api/permissions/", {"icloud_key": $cookieStore.get("icloud_key")})
        }

    }]);

