/**
 * Created by lee on 2015/9/9.
 */

var iCloudService = angular.module("iCloudService", ["ngCookies"]);


iCloudService.controller("$auth", ["$rootScope", "$http", "$cookies", "$window", "$timeout",
    function ($rootScope, $http, $cookies, $window, $timeout) {

        return {
            "login": function (data) {
                if (data.username && data.password) {
                    $http.post($window.login_url, data)
                        .success(function (data) {
                            $cookies.icloud_key = data.icloud_key;
                        })
                        .error(function (data) {
                            $rootScope
                        })
                }
            }
        }

    }]);