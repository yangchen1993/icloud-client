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
            self.pageSize = 20;
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
                    scope.headers = _.keys(data.results[0]);
                })
            };

            self.load = function () {
                self.restGet(self.urlWithDefaultParams());
            };
            self.currentSort = {};  // 当前的排序规则,true代表升序

            self.resetSort = function (key) {
                return _.mapObject(self.currentSort, function (v, k) {
                    if (k != key) {
                        return "";
                    } else {
                        return v
                    }
                })
            };

            scope.filtering = function (params) {

                params.key = $cookieStore.get("key");
                params.ordering = "id";
                params.pageSize = self.pageSize;
                params.page = 1;
                var url = [self.url, "?", $.param(params)].join("");
                self.restGet(url)
            };

            scope.sort = function (colName) {

                if (colName) {
                    if (_.isEmpty(self.currentSort)) {
                        self.currentSort[colName] = true;
                    } else {
                        self.currentSort = self.resetSort(colName);
                        self.currentSort[colName] = !self.currentSort[colName]
                    }

                    var ordering = "";
                    if (self.currentSort[colName]) {
                        ordering = colName;
                    } else {
                        ordering = ["-", colName].join("");
                    }
                    var url = self.restPage.current.replace(/(ordering=)(-?[a-z]+_?[a-z]*)/, ["ordering=", ordering
                    ].join(""));
                    scope.currentSort = self.currentSort;
                    self.restGet(url);
                }
            };

            scope.filter = function () {

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
                self.pageSize = newSize;
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

iCloudService.service("$uploadImg", ["$http", "$cookieStore", "$window",
    function ($http, $cookieStore, $window) {
        this.upload = function (scope, url) {

            var self = angular.copy({});
            self.defaultParams = function () {
                return {
                    "key": $cookieStore.get("key")
                }
            };
            self.url = url;
            self.urlWithDefaultParams = function () {
                var key = $cookieStore.get("key");
                if (key) {
                    return [self.url, "?", $.param(self.defaultParams)].join("")
                } else {
                    return self.url;
                }
            };
            var data = {
                img: $(".avatar-wrapper > img").cropper("getCroppedCanvas").toDataURL(),
                link: scope.ad_url,
                title: scope.ad_title,
                brief: scope.ad_brief,
                category: scope.selectId
            };
            $http.post([url, "?", $.param(self.defaultParams())].join(""), data)
                .success(function (data) {
                    alert("创建成功")
                }).error(function (data) {
                    console.log(data);
                })
        }
    }]);

iCloudService.service("$permissions", ["$http", "$window", "$q", "$cookieStore",
    function ($http, $window, $q, $cookieStore) {
        return {
            query: function () {
                var deferred = $q.defer();
                $http.get([$window.permissions_url, "?key=", $cookieStore.get("key")].join(""))
                    .success(function (data) {
                        deferred.resolve(data)
                    })
                    .error(function (data) {
                        deferred.reject(data)
                    });
                deferred.promise.then(function (data) {
                    console.log(1);
                    return data
                }, function (data) {
                    return data;
                })
            }
        }
    }]);