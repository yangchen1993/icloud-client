/**
 * Created by lee on 2015/9/9.
 */

var iCloudService = angular.module("iCloudService", ["ngCookies"]);


iCloudService.service("$auth", ["$rootScope", "$http", "$cookieStore", "$window", "$timeout",
    function ($rootScope, $http, $cookieStore, $window, $timeout) {

        $rootScope.errorMsg = "";

        var resetErrorMsg = function () {
            $rootScope.errorMsg = ""
        };

        return {
            "login": function (data) {
                if (data.username && data.password) {
                    $http.post($window.login_url, data)
                        .success(function (data) {
                            $rootScope.authMsg = data;
                            $cookieStore.put("icloud_key", data.icloud_key);
                        })
                        .error(function (data) {
                            $rootScope.errorMsg = data;

                            // 3秒钟后重置错误信息
                            $timeout(function () {
                                resetErrorMsg()
                            }, 3000)
                        })
                }
            }
        }

    }]);