/**
 * Created by lee on 2015/9/9.
 */


iCloudService.service("$auth", ["$rootScope", "$http", "$cookieStore", "$window", "$timeout",
    function ($rootScope, $http, $cookieStore, $window, $timeout) {

        $rootScope.errorMsg = "";

        var resetErrorMsg = function () {
            $rootScope.errorMsg = ""
        };

        return {
            "login": function (data) {
                if (data.username && data.password) {
                    $http.post($window.API.USER.LOGIN, data)
                        .success(function (data) {
                            $cookieStore.put("key", data.key);
                            $window.location.href = "#/main/personal-info";
                        })
                        .error(function (data) {
                            $rootScope.errorMsg = data;

                            // 3秒钟后重置错误信息
                            $timeout(function () {
                                resetErrorMsg()
                            }, 3000)
                        })
                }
            },
            "logout": function () {
                $http.get($window.API.USER.LOGOUT + "?key=" + $cookieStore.get("key"))
                    .success(function (data) {
                        clearInterval(window.time_self);
                        clearInterval(window.request_router);
                        $cookieStore.remove("key");
                        $window.location.href = "#/login";
                    })
                    .error(function (data) {
                    });
            }
        }

    }]);