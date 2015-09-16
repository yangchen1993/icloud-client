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


iCloudService.service("$icloudGrid", ["$rootScope", "$http", "uiGridConstants", "$cookieStore",
    function ($rootScope, $http, uiGridConstants, $cookieStore) {

        var defaultPaginationOptions = {
            pageSize: 20,
            ordering: "id"
        };

        var defaultExtraParams = {
            key: $cookieStore.get("key"),
            page: 1
        };


        var defaultGridOptions = {
            paginationPageSizes: [20, 30, 40, 50],
            paginationPageSize: 20,
            useExternalPagination: true,
            useExternalSorting: true,
            enableRowSelection: false,
            enableSelectAll: false,
            enableFiltering: true,
            useExternalFiltering: true,
            selectionRowHeaderWidth: 35,
            showGridFooter: true,
            multiSelect: false
        };

        var checkOptions = function (options) {
            return {
                gridOptions: options.hasOwnProperty("gridOptions") ? options.gridOptions : {},
                paginationOptions: options.hasOwnProperty("paginationOptions") ? options.paginationOptions : {},
                extraParams: options.hasOwnProperty("extraParams") ? options.extraParams : {}
            }
        };


        var nullOptions = {
            gridOptions: {},
            paginationOptions: {},
            extraParams: {}
        };

        var self = angular.copy(nullOptions);

        self.queryString = function () {
            return [$.param(self.paginationOptions), "&", $.param(self.extraParams)].join("")
        };

        self.replaceUrl = function (url, replace) {
            if (url.indexOf("\?") >= 0) {
                return url.replace(/(\?)(.*)/, ["$1", replace].join(""))
            } else {
                return [url, "?", replace].join("")
            }
        };

        self.restGet = function (url) {
            $http.get(url)
                .success(function (data) {
                    self.restPage = data;
                    self.gridOptions.data = data.results;
                    self.gridOptions.totalItems = data.count;
                })
                .error(function (data) {
                    console.log(data)
                })
        };

        self.restDelete = function (url) {
        };
        self.restUpdate = function (url) {
        };
        self.restAdd = function (url) {
        };

        self.setEnableSelect = function (v) {
            self.gridOptions.enableRowSelection = v;
            self.gridOptions.enableSelectAll = v;
            self.gridOptions.multiSelect = v;
        };

        this.initial = function (url, options) {
            options = options || {};
            options = checkOptions(options);
            self.gridOptions = angular.extend(options.gridOptions, defaultGridOptions);
            self.paginationOptions = angular.extend(options.paginationOptions, defaultPaginationOptions);
            self.extraParams = angular.extend(options.extraParams, defaultExtraParams);
            self.restGet(self.replaceUrl(url, self.queryString()));
            self.gridOptions.onRegisterApi = function (gridApi) {
                gridApi.core.on.sortChanged($rootScope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        self.paginationOptions.ordering = "id";
                    } else {
                        var field = sortColumns[0].field;
                        if (sortColumns[0].sort.direction == uiGridConstants.ASC) {
                            self.paginationOptions.ordering = field;
                        } else {
                            self.paginationOptions.ordering = ["-", field].join("");
                        }
                    }
                    self.restGet(self.replaceUrl(self.restPage.current, self.queryString()))
                });

                gridApi.core.on.filterChanged($rootScope, function () {
                    console.log(this.grid);
                });

                gridApi.pagination.on.paginationChanged($rootScope, function (newPage, pageSize) {
                    self.paginationOptions.pageSize = pageSize;
                    self.extraParams.page = newPage;
                    self.restGet(self.replaceUrl(self.restPage.current, self.queryString()));
                    console.log(self)
                });
            };

            return self;
        };

    }]);