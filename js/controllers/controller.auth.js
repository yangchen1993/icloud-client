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

            var data_ = angular.copy(data);

            if (!data_.username) {
                $scope.errorMsg = "用户名不能为空";
                console.log($scope.errorMsg);
                return false
            }

            if (!data_.password) {
                $scope.errorMsg = "密码不能为空";
                console.log($scope.errorMsg);
                return false
            }


            data_.password = CryptoJS.SHA1(data_.password).toString();

            $auth.login(data_);
        };

        $scope.enterEvent = function (e) {
            if (e.keyCode === 13){
                $scope.login($scope.auth);
            }
        }
    }]);

iCloudController.controller("TopController", ["$scope", "$http", "$auth", "$cookieStore",
    function ($scope, $http, $auth, $cookieStore) {
        $scope.logout = function () {
            $auth.logout();
        };
    }]);