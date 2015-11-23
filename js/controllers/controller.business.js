/**
 * Created by lee on 2015/10/15.
 */

iCloudController.controller("ShopManagementController", ["$scope", "$http", "$grid", "$window", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", "$blackWhite",
    function ($scope, $http, $grid, $window, $category, $province, $city, $area, $trades, $cookieStore) {
        var show_shop = function () {
            $http.get([window.API.GROUP.GET_CURRENT_USER_ROUTER_GROUPS, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
                $scope.shop = data.results;
                console.log(data);
            });
        };
        show_shop();
        $scope.see_routers = function (id) {
            $window.location.href = ["#/main/shop_management_routers?id=", id].join("");
        };
        $scope.editShopIndex = function (id) {
            $window.location.href = ["#/main/ourshop?id=", id].join("");
        };
        $scope.edit_shop = function (id) {
            $window.location.href = ["#/main/edit_shop?shop_id=", id].join("");
        };
        $scope.delete_shop = function (id) {
            if (confirm("确定删除?")) {
                $http.delete([window.API.GROUP.REMOVE_GROUP, "?key=", $cookieStore.get("key"), "&id=", id].join("")).success(function (data) {
                    show_shop();
                })
            }
        }
    }]);

iCloudController.controller("CreateShopController", ["$scope", "$http", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", "$window",
    function ($scope, $http, $category, $province, $city, $area, $trades, $cookieStore, $window) {
        $scope.shop = {};
        $category.get().success(function (data) {
            $scope.shop.category = data[0].name;
            $scope.category = data;
        })
            .error(function (data) {
                console.log(data);
            });
        $province.get().success(function (data) {
            $scope.province = data;
        });
        $scope.select_p = function (id) {
            $city.get(id).success(function (data) {
                $scope.city = data;
            })
        };
        $scope.select_c = function (id) {
            $area.get(id).success(function (data) {
                $scope.area = data;
            })
        }
        $scope.select_a = function (id) {
            $trades.get(id).success(function (data) {
                $scope.trades = data;
            })
        };
        $scope.submit = function (shop) {

            $http.post([window.API.GROUP.NEW_GROUP, "?key=", $cookieStore.get("key")].join(""), shop)
                .success(function (data) {
                    $window.location.href = "#/main/shop_management";
                })
                .error(function (data) {
                    $window.alert("创建失败");
                })
        }
    }]);

iCloudController.controller("EditShopController", ["$scope", "$http", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", function ($scope, $http, $category, $province, $city, $area, $trades, $cookieStore) {
    var id = get_param(window.location.href);
    $http.get([window.API.GROUP.GET_CURRENT_USER_ROUTER_GROUPS, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        for (var i = 0; i < data.count; i++) {
            if (data.results[i].id == id) {
                $scope.edit_shop = data.results[i];
            }
        }
        console.log($scope.edit_shop);
    });
    $category.get().success(function (data) {
        $scope.category = data;
    })
        .error(function (data) {
            console.log(data);
        });
    $province.get().success(function (data) {
        $scope.province = data;
        console.log($scope.province);
    });
    $scope.select_p = function (id) {
        console.log(id);
        $city.get(id).success(function (data) {
            $scope.city = data;
        })
    };
    $scope.select_c = function (id) {
        $area.get(id).success(function (data) {
            $scope.area = data;
        })
    };
    $scope.select_a = function (id) {
        $trades.get(id).success(function (data) {
            $scope.trades = data;
        })
    };
    $scope.submit = function (shop) {

        $http.put([window.API.GROUP.EDIT_GROUP, "?key=", $cookieStore.get("key")].join(""), shop)
            .success(function (data) {
                alert(data.msg);
                location.href = "#/main/shop_management";
            })
            .error(function (data) {
                console.log(data);
            })
    }
}]);

iCloudController.controller("ShopManagementRoutersController", ["$scope", "$window", "$http", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", function ($scope, $window, $http, $category, $province, $city, $area, $trades, $cookieStore) {
    var shop_id = get_param($window.location.href);
    $scope.see_routers_details = function (id) {
        $window.location.href = ["#/main/routers_details?router=", id].join("");
    };
    var show_bindRouters = function () {
        $http.get([window.API.ROUTER.GET_ROUTERS_BY_GROUP, "?key=", $cookieStore.get("key"), "&group_id=", shop_id].join("")).success(function (data) {
            $scope.shop_routers = data.results;
        });
    };
    show_bindRouters();

    var show_selectRouters = function () {
        $http.get([window.API.ROUTER.GET_CURRENT_USER_ROUTERS, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
            var unbingRouters = [], k = 0;
            for (var i = 0; i < data.results.length; i++) {
                if (data.results[i].router_groups == null) {
                    unbingRouters[k] = data.results[i];
                    k++;
                }
            }
            $scope.router = unbingRouters;
        });
    };
    show_selectRouters();

    var bind = function () {
        $http.put([window.API.ROUTER.ROUTER_BIND, "?key=", $cookieStore.get("key")].join(""), {
            "group": shop_id,
            "router": $scope.bind_router
        }).success(function (data) {
            alert(data.msg);
            show_bindRouters();
            show_selectRouters();
        })
    };

    $scope.bind_submit = function () {
        bind();
    };

    $scope.unbind_submit = function (mac) {
        $http.delete([window.API.ROUTER.ROUTER_UNBIND, "?key=", $cookieStore.get("key"), "&mac=", mac].join("")).success(function (data) {
            alert(data.msg);
            show_bindRouters();
            show_selectRouters();
        })
    }
}]);

iCloudController.controller("RoutersDetailsController", ["$scope", "$http", "$cookieStore", "$window", "$interval", function ($scope, $http, $cookieStore, $window, $interval) {
    var router_id = get_param($window.location.href);
    //放行设置
    var reload_blackwhite = function () {
        $scope.type = ["MAC", "域名"];
        $http.get([window.API.ROUTER.GET_ROUTER_BLACK_WHITES, "?key=", $cookieStore.get("key"), "&router=", router_id].join("")).success(function (data) {
            console.log(data);
            $scope.policy = data.results;
            for (var i = 0; i < data.results.length; i++) {
                if (data.results[i].is_black) {
                    $scope.policy[i].is_black = "黑名单";
                }
                else {
                    $scope.policy[i].is_black = "白名单";
                }
            }
        });
    };
    reload_blackwhite();
    $scope.router = {
        "is_black": "1"
    };
    $scope.router1 = {
        "is_black": "1"
    };
    $scope.add_mac = function (data) {
        data.router = router_id;
        data.content_type = "0";
        data.enable = "1";
        $http.post([window.API.ROUTER.NEW_BLACK_WHITES, "?key=", $cookieStore.get("key")].join(""), data).success(function (data) {
            alert("添加成功");
            reload_blackwhite();
        })
    };
    $scope.add_domain = function (data) {
        data.router = router_id;
        data.content_type = "1";
        data.enable = "1";
        $http.post([window.API.ROUTER.NEW_BLACK_WHITES, "?key=", $cookieStore.get("key")].join(""), data).success(function (data) {
            alert("添加成功");
            reload_blackwhite();
        })
    };
    $scope.delete = function (id) {
        var ids = [id];
        console.log(ids);
        $http.delete([window.API.ROUTER.REMOVE_BLACK_WHITES, "?key=", $cookieStore.get("key"), "&ids=", ids.join()].join("")).success(function (data) {
            alert("删除成功");
            reload_blackwhite();
        })
    };
    $scope.filter = {
        "content_type": "",
        "is_black": ""
    };
    $scope.blackwhite_filter = function (data) {
        var filter = angular.copy(data);
        filter.router = router_id;
        $http.get([window.API.ROUTER.GET_ROUTER_BLACK_WHITES, "?key=", $cookieStore.get("key"), "&", $.param(filter)].join("")).success(function (data) {
            $scope.policy = data.results;
            for (var i = 0; i < data.results.length; i++) {
                if (data.results[i].is_black) {
                    $scope.policy[i].is_black = "黑名单";
                }
                else {
                    $scope.policy[i].is_black = "白名单";
                }
            }
        })
    };
    //路由基本信息
    var shop_id;
    $http.get([window.API.ROUTER.GET_ROUTER_SETUP, "?key=", $cookieStore.get("key"), "&router_id=", router_id].join("")).success(function (data) {
        console.log(data);
        shop_id = data.router.router_groups.id;
        //路由器实时信息
        var routerStatusInterval = $interval(function () {
            $http.get([window.API.WIFICAT.STATUS, "?key=", $cookieStore.get("key"), "&router_mac=", data.router.mac].join("")).success(function (data) {
                console.log(data.msg);
                if (data.msg == "Router offline") {
                    $scope.wificat = {
                        "operatingStatus": {
                            "accessNumber": "未连接",
                            "MemUsaged": "未连接",
                            "cpuUtil": "未连接"
                        },
                        "basicInformation": {
                            "softwareVersion": "未连接"
                        },
                        "wanStatus": {
                            "wanip": "未连接",
                            "speedUp": "未连接",
                            "speedDown": "未连接"
                        }
                    };
                    $scope.upTime = "未连接"
                }
                else {
                    $scope.wificat = data;
                    $scope.upTime = parseInt(data.basicInformation.upTime / 60);
                }
            });
        }, 1000);
        $scope.$on("$destroy", function () {
            $interval.cancel(routerStatusInterval);
        });

        //默认认证方式
        if (data.login_type == "手机号认证") {
            $scope.isActive_phone = 1;
            $scope.isActive_weixin = 0;
        }
        else if (data.login_type == "微信认证") {
            $scope.isActive_phone = 0;
            $scope.isActive_weixin = 1;
        }
        else if (data.login_type == "手机号认证;微信认证") {
            $scope.isActive_phone = 1;
            $scope.isActive_weixin = 1;
        }
        else {
            $scope.isActive_phone = 0;
            $scope.isActive_weixin = 0;
        }
        //默认认证时间
        if (data.auth_period <= 60) {
            $scope.identify_time = {
                "hour": 0,
                "minute": data.auth_period,
                "num": data.auth_limit_times
            };
        }
        else {
            $scope.identify_time = {
                "hour": parseInt(data.auth_period / 60),
                "minute": data.auth_period % 60,
                "num": data.auth_limit_times
            };
        }
    });
    $scope.identify_type = function () {
        var identify_type = [];
        if ($scope.isActive_phone == 1) {
            identify_type.push("手机号认证");
        }
        if ($scope.isActive_weixin == 1) {
            identify_type.push("微信认证");
        }
        console.log(identify_type);
        $http.put([window.API.ROUTER.EDIT_ROUTER_SETUP, "?key=", $cookieStore.get("key"), "&router=", router_id].join(""), {"login_type": identify_type.join(";")});
    };
    $scope.identify_submit = function (data) {
        console.log(data);
        var times = parseInt(data.hour) * 60 + parseInt(data.minute);
        console.log(times);
        $http.put([window.API.ROUTER.EDIT_ROUTER_SETUP, "?key=", $cookieStore.get("key"), "&router=", router_id].join(""), {
            "auth_period": times,
            "auth_limit_times": data.num
        }).success(function (data) {
            alert(data.msg);
        })
    };

    $scope.weixin_load = function () {
        location.href = ["#/main/weixin_config?routergroup_id=", shop_id].join("");
    }

}]);

iCloudController.controller("WeiXinConfigController", ["$scope", "$http", "$cookieStore", function ($scope, $http, $cookieStore) {
    var routergroup_id = get_param(window.location.href);
    $scope.submit = function (weixin) {
        $http.post([window.API.WEIXIN.NEW_WECHAT, "?key=", $cookieStore.get("key")].join(""), weixin).success(function (data) {
            alert(data.msg);
        });
    };
    $http.get([window.API.WEIXIN.GET_WECHAT, "?key=", $cookieStore.get("key"), "&routergroup_id=", routergroup_id].join("")).success(function (data) {
        $scope.weixin_edit = data;
    });
    $scope.submit1 = function (weixin) {
        $http.put([window.API.WEIXIN.EDIT_WECHAT, "?key=", $cookieStore.get("key")].join(""), weixin).success(function (data) {
            alert(data.msg);
        });
    }
}]);