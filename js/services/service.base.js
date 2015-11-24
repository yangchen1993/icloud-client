/**
 * Created by Jun on 2015/9/24.
 */
var iCloudService = angular.module("iCloudService", ["ngCookies"]);

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

        this.initial = function (scope, url, options) {
            options = options || {};
            scope.pageSizes = [20, 30, 40, 50];
            scope.pageSize = 20;

            var self = angular.copy({});
            self.pageSize = 20;
            self.url = url;
            self.defaultParams = defaultParams();

            if (!_.isEmpty(options)) {
                angular.forEach(_.keys(options), function (value, key) {
                    if (_.has(self.defaultParams, value)) {
                        self.defaultParams[value] = options[value]
                    }
                })
            }

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
                return replaceString(self.restPage.current, "page=", "&", ["page=", newPage].join(""));
            };

            self.replacePageSize = function (newSize) {
                return replaceString(self.restPage.current, "pageSize=", "&", ["pageSize=", newSize].join(""));
            };

            self.restPage = {};

            self.restGet = function (url) {
                $http.get(url).success(function (data) {
                    self.restPage = scope.grid = scope.pagination = data;
                    console.log(scope.grid);
                })
            };

            self.load = function () {
                self.restGet(self.urlWithDefaultParams());
            };
            self.currentSort = {};

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
                self.restGet(url);
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
                    var url = replaceString(self.restPage.current, "ordering=", "&", ["ordering=", ordering].join(""));
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
                    angular.element(v).prop("checked", !angular.element(v).prop("checked"));

                })
            }
        }
    }]);

iCloudService.service("$category", ['$http', '$cookieStore', function ($http, $cookieStore) {
    this.get = function () {
        return $http.get([window.API.SYSTEM.GET_CATEGORIES, "?key=", $cookieStore.get("key")].join(""));
    }
}]);

iCloudService.service("$province", ['$http', '$cookieStore', function ($http, $cookieStore) {
    this.get = function () {
        return $http.get([window.API.SYSTEM.GET_PROVINCES, "?key=",  $cookieStore.get("key")].join(""));
    }
}]);
iCloudService.service("$city", ['$http', '$cookieStore', function ($http, $cookieStore) {
    this.get = function (data) {
        return $http.get([window.API.SYSTEM.GET_CITIES_BY_PROVINCE, "?key=", $cookieStore.get("key"), "&province=", data].join(""));
    }
}]);
iCloudService.service("$area", ['$http', '$cookieStore', function ($http, $cookieStore) {
    this.get = function (data) {
        return $http.get([window.API.SYSTEM.GET_AREAS_BY_CITY, "?key=", $cookieStore.get("key"), "&city=", data].join(""));
    }
}]);
iCloudService.service("$trades", ["$http", "$cookieStore", "$window", function ($http, $cookieStore, $window) {
    this.get = function (data) {
        return $http.get([$window.API.SYSTEM.GET_TRADES, "?key=", $cookieStore.get("key"), "&area=", data].join(""));
    }
}]);
