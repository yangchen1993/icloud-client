/**
 * Created by lee on 2015/11/29.
 */

iCloudController.controller("PersonalInfoController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        var getCurrentUserInfo = function () {
            $http.get([$window.API.USER.GET_CURRENT_USER_INFO, "?key=", $cookieStore.get("key")].join(""))
                .success(function (data) {
                    $scope.userInfoReadOnly = data;
                    $scope.userInfo = angular.copy(data);
                    $scope.isEdit = false;
                })
                .error(function (data) {
                    $window.alert(data.msg)
                })
        };

        $scope.isEdit = false;

        getCurrentUserInfo();

        $scope.editInfo = function () {
            $scope.isEdit = true;
        };

        $scope.cancelEditInfo = function () {
            $scope.userInfo = angular.copy($scope.userInfoReadOnly);
            $scope.isEdit = false;
        };


        $scope.saveInfo = function (data) {
            $http.put([$window.API.USER.EDIT_CURRENT_USER_INFO, "?key=", $cookieStore.get("key")].join(""), data)
                .success(function (data) {
                    getCurrentUserInfo();
                })
                .error(function () {
                    $window.alert(transform_error_message(data.msg));
                })
        }
    }]);

iCloudController.controller("PersonalSafeController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        $scope.changePwd = {
            oldPassword: "",
            newPassword: "",
            repeatPassword: ""
        };

        $scope.changePassword = function () {
            var data = angular.copy($scope.changePwd);

            if (!data.newPassword || !data.repeatPassword || !data.oldPassword) {
                $window.alert("密码不能为空");
                return false;
            }

            if (data.newPassword !== data.repeatPassword) {
                $window.alert("两次输入的密码不一致");
                return false;
            }

            data.oldPassword = CryptoJS.SHA1(data.oldPassword).toString();
            data.newPassword = CryptoJS.SHA1(data.newPassword).toString();

            delete data.repeatPassword;

            $http.put([$window.API.USER.CHANGE_CURRENT_USER_PASSWORD, "?key=", $cookieStore.get("key")].join(""), data)
                .success(function (data) {
                    $window.alert(data.msg)
                })
                .error(function (data) {
                    $window.alert(transform_error_message(data.msg))
                })
        }
    }]);