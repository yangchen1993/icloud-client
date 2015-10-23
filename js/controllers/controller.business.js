/**
 * Created by lee on 2015/10/15.
 */

iCloudController.controller("ShopManagementController",
    [
        "$scope",
        "$http",
        "$window",
        "$category",
        "$province",
        "$city",
        "$area",
        "$trades",
        "$cookieStore",
        "$blackWhite",
        function ($scope,
                  $http,
                  $window,
                  $category,
                  $province,
                  $city,
                  $area,
                  $trades,
                  $cookieStore,
                  $blackWhite) {

            var pre_id = undefined;
            var promise = $category.get();
            promise.success(function (data) {
                $scope.categories = data.results;
            });

            var province = $province.get();
            province.success(function (data) {
                $scope.province1 = data;
            });
            $scope.select_p = function (index) {
                var city = $city.get(index);
                city.success(function (data) {
                    $scope.city1 = data;
                })
            };
            $scope.select_c = function (index) {
                var area = $area.get(index);
                area.success(function (data) {
                    $scope.area1 = data;
                })
            };
            $scope.select_area = function (index) {
                var trades = $trades.get(index);
                trades.success(function (data) {
                    $scope.trades = data;
                })
            };

            $scope.saveGroups = function (group) {
                var key = $cookieStore.get("key");
                var group_ = angular.copy(group);
                $http.post([$window.routers_groups_url, "?key=", key].join(""), group_)
                    .success(function (data) {
                        console.log(data);
                        angular.element("#group-modal").modal("toggle");
                        group = {};
                    })
                    .error(function (data) {
                        $window.alert(transform_error_message(data.msg));
                    })
            };


            var groupList = function (url) {
                $http.get(url)
                    .success(function (data) {
                        $scope.group_pages = data;
                    })
            };

            var routerList = function (url) {
                $http.get(url)
                    .success(function (data) {
                        $scope.router_pages = data;
                    })
                    .error(function (data) {
                        $window.alert("加载路由器列表失败")
                    })

            };

            $scope.showRouter = function (group_id) {
                if (pre_id != group_id) {
                    var params = {
                        "key": $cookieStore.get("key"),
                        "group_id": group_id
                    };
                    var url = [$window.all_routers_url, "get_router_by_group/", "?", $.param(params)].join("");

                    routerList(url);
                    pre_id = group_id;
                }
            };
            $scope.setupModal = function (router_id) {
                $scope.auth = "1";
                $scope.setup = {auth_limit_times: "0", hours: 0, mins: 0};
                $http.get([$window.router_setup_url, "?key=", $cookieStore.get("key"), "&router_id__in=", router_id].join(""))
                    .success(function (data) {
                        var setup = data.results;
                        var loginWayCheckBox = $(".login-way");
                        console.log(loginWayCheckBox);
                        if (setup.length === 0) {
                            $scope.auth = "0";
                            $scope.setup = {
                                router_ids: [router_id],
                                login_type: "",
                                auth_limit_times: "0",
                                hours: 1,
                                mins: 0
                            };
                            angular.forEach(loginWayCheckBox, function (value, key) {
                                $(value).prop("checked", true);
                            })
                        } else {
                            $scope.auth = "1";
                            console.log(setup[0]);
                            var tmp = setup[0];
                            angular.forEach(loginWayCheckBox, function (value, key) {
                                if (_.contains(tmp.login_type.split(";"), $(value).val())) {
                                    $(value).prop("checked", true);
                                }
                            });
                            $scope.setup = angular.extend($scope.setup, {
                                auth_limit_times: tmp.auth_limit_times.toString(),
                                hours: parseInt(tmp.auth_period.substring(0, 2)),
                                mins: parseInt(tmp.auth_period.substring(3, 5)),
                                router_id: tmp.router_id
                            });
                        }
                    })
            };

            $scope.saveSetup = function (setup) {
                var setup_ = angular.copy(setup);
                var way = [];
                var loginWayCheckBox = $(":checkbox");
                angular.forEach(loginWayCheckBox, function (value, key) {
                    if ($(value).prop("checked")) {
                        way.push($(value).val())
                    }
                });
                setup_.login_type = way.join(";");
                setup_.auth_period = [setup_.hours, setup_.mins, "00"].join(":");
                delete setup_.hours;
                delete setup_.mins;
                $http.post([$window.router_setup_url, "?key=", $cookieStore.get("key")].join(""), setup_)
                    .success(function (data) {
                        $window.alert(data.msg);
                        angular.element("#router-login-setup-modal").modal("toggle");
                    })
            };

            var whiteListCheckBox = angular.element(".white-list-checkbox");
            var blackListCheckBox = angular.element(".black-list-checkbox");
            $scope.BlackWhiteModal = function (router_id) {
                $scope.router_id = router_id;

                $blackWhite.get(router_id).success(function (data) {
                    $scope.whiteList = data.results;
                });

                $blackWhite.get(router_id, true).success(function (data) {
                    $scope.blackList = data.results;
                });

                angular.forEach(whiteListCheckBox, function (value, key) {
                    $(value).prop("checked", true);
                })

            };

            $scope.createBlackWhite = function (content, is_black) {
                is_black = is_black || false;

                var data = {
                    "content": content,
                    "is_black": 0,
                    "enable": 1,
                    "router_id": $scope.router_id
                };

                if (is_black) {
                    data.is_black = 1;
                }

                $http.post([$window.router_policy_url, "?key=", $cookieStore.get("key")].join(""), data)
                    .success(function (data) {
                        if (is_black) {
                            $blackWhite.get($scope.router_id, true).success(function (data) {
                                $scope.blackList = data.results;
                            })
                        } else {
                            $blackWhite.get($scope.router_id).success(function (data) {
                                $scope.whiteList = data.results;
                            });
                        }
                    })
            };

            $scope.destroyBlackWhite = function (id, is_black) {
                is_black = is_black || false;

                $http.delete([$window.router_policy_url, id, "/", "?key=", $cookieStore.get("key")].join(""))
                    .success(function (data) {
                        if (is_black) {
                            $blackWhite.get($scope.router_id, true).success(function (data) {
                                $scope.blackList = data.results;
                            });
                        } else {
                            $blackWhite.get($scope.router_id).success(function (data) {
                                $scope.whiteList = data.results;
                            });
                        }
                    })
            };

            $scope.filteringBlackWhite = function (is_black) {
                is_black = is_black || false;
                if (is_black) {
                    var blackCheckedContentType = [];
                    angular.forEach(blackListCheckBox, function (value, kye) {
                        var $value = angular.element(value);
                        if ($value.prop("checked")) {
                            blackCheckedContentType.push($value.val())
                        }
                    });
                    if (blackCheckedContentType.length == blackListCheckBox.length) {
                        $blackWhite.get($scope.router_id, true).success(function (data) {
                            $scope.blackList = data.results;
                        })
                    }
                }
            };

            $scope.groupEditModal = function () {

            };

            $scope.groupDestroy = function () {

            };
            $scope.routerDetail = function () {

            };

            $scope.routerUnbind = function () {

            };

            groupList([$window.routers_groups_url, "own/", "?key=", $cookieStore.get("key")].join(""));

        }]);