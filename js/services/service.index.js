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

        var service = {
            icloudGrid: {
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
                multiSelect: false,
                onRegisterApi: function (gridApi) {
                    var self = service;
                    $rootScope.gridApi = gridApi;
                    $rootScope.gridApi.core.on.sortChanged($rootScope, function (grid, sortColumns) {
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
                        self.restGet(self.replaceUrl())
                    });

                    $rootScope.gridApi.core.on.filterChanged($rootScope, function () {
                        console.log(this.grid);
                    });

                    $rootScope.gridApi.pagination.on.paginationChanged($rootScope, function (newPage, pageSize) {
                        self.paginationOptions.pageSize = pageSize;
                        self.paginationOptions.page = newPage;
                        self.restGet(self.replaceUrl());
                    });
                }
            },
            paginationOptions: {
                pageSize: 20,
                page: 1,
                ordering: "id"
            },
            extraParams: {
                key: $cookieStore.get("key")
            },
            restGet: function (url) {
                var self = this;
                $http.get(url)
                    .success(function (data) {
                        $rootScope.restPage = data;
                        self.icloudGrid.data = data.results;
                        self.icloudGrid.totalItems = data.count;
                    })
                    .error(function (data) {
                        console.log(data)
                    })
            },
            restDelete: function (url) {
            },
            restUpdate: function (url) {
            },
            restAdd: function (url) {
            },
            queryString: function () {
                var self = this;
                return [$.param(self.paginationOptions), "&", $.param(self.extraParams)].join("")
            },
            replaceUrl: function () {
                var self = this;
                var url = $rootScope.restPage.current;
                return url.replace(/(\?)(.*)/, ['$1', self.queryString()].join(""))
            },
            setEnableSelect: function (v) {
                var self = this;
                self.icloudGrid.enableRowSelection = v;
                self.icloudGrid.enableSelectAll = v;
                self.icloudGrid.multiSelect = v;
            },
            initialData: function (url) {
                var self = this;
                self.restGet([url, "?", self.queryString()].join(""));
            }
        };

        return service
    }]);