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
                            $cookieStore.put("key", data.key);
                            $window.location.href = "#/main";
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
                $http.get($window.logout_url + "?key=" + $cookieStore.get("key"))
                    .success(function (data) {
                        $window.location.href = "#/login";
                    })
                    .error(function (data) {
                    });
            }
        }

    }]);

iCloudService.service("$grid", ["$rootScope", "$http", "$cookieStore",
    function ($rootScope, $http, $cookieStore) {
        var defaultParams = function () {
            return {
                key: $cookieStore.get("key"),
                ordering: "id",
                page: 1,
                pageSize: 20
            };
        };

        this.initial = function (scope, url) {
            scope.pageSizes = [20, 30, 40, 50];
            scope.pageSize = 20;

            var self = angular.copy({});
            self.url = url;
            self.defaultParams = defaultParams();
            self.urlWithDefaultParams = function () {
                var key = $cookieStore.get("key");
                if (key) {
                    return [self.url, "?", $.param(self.defaultParams)].join("")
                } else {
                    return self.url;
                }
            };

            self.urlWithParams = function (params) {
                params = params || {};
                return [self.restPage.current, "&", $.param(params)].join("");
            };

            self.replacePageNumber = function (newPage) {
                return self.restPage.current.replace(/page=(\d)+/, ["page=", newPage].join(""))
            };

            self.replacePageSize = function (newSize) {
                return self.restPage.current.replace(/pageSize=(\d)+/, ["pageSize=", newSize].join(""))
            };

            self.restPage = {};

            self.restGet = function (url) {
                $http.get(url).success(function (data) {
                    self.restPage = scope.grid = scope.pagination = data;
                    scope.headers = data.results[0].keys;
                })
            };

            self.load = function () {
                self.restGet(self.urlWithDefaultParams());
            };

            scope.sort = function () {

            };

            scope.pageNumberChanged = function (newPage) {

                var page = newPage;
                if (scope.pagination) {
                    if (parseInt(newPage) < 1) {
                        scope.pagination.pageNumber = 1;
                        page = 1
                    }
                    if (parseInt(newPage) > scope.pagination.totalPage) {
                        scope.pagination.pageNumber = scope.pagination.totalPage;
                        page = scope.pagination.totalPage
                    }

                    self.restGet(self.replacePageNumber(page))
                }
            };

            scope.pageSizeChanged = function (newSize) {
                console.log(newSize);
                self.restGet(self.replacePageSize(newSize))
            };

            scope.pre = function () {
                if (self.restPage && self.restPage.previous) {
                    self.restGet(self.restPage.previous);
                } else {
                    return false;
                }
            };
            scope.next = function () {
                if (self.restPage && self.restPage.next) {
                    self.restGet(self.restPage.next);
                } else {
                    return false;
                }
            };
            scope.first = function () {
                if (self.restPage.pageNumber != 1) {
                    self.restGet(self.replacePageNumber(1))
                }
            };
            scope.last = function () {
                if (self.restPage.pageNumber != self.restPage.totalPage) {
                    self.restGet(self.replacePageNumber(self.restPage.totalPage))
                }
            };
            scope.refresh = function () {
                self.restGet(self.restPage.current)
            };

            self.load();

            return self
        };

    }]);

iCloudService.service("$checkBox", ["$rootScope",
    function ($rootScope) {
        this.enableCheck = function (tableId) {
            $rootScope.checkAll = function () {
                var selector = ["#", tableId, " :checkbox"].join("");
                var checkBoxes = angular.element(selector);
                angular.forEach(checkBoxes, function (v, k) {
                    angular.element(v).prop("checked", true)
                })
            };
            $rootScope.checkInverse = function () {
                var selector = ["#", tableId, " :checkbox"].join("");
                var checkBoxes = angular.element(selector);
                angular.forEach(checkBoxes, function (v, k) {
                    angular.element(v).prop("checked", !angular.element(v).prop("checked"))
                })
            }
        }
    }]);