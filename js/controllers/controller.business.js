/**
 * Created by lee on 2015/10/15.
 */

iCloudController.controller("ShopManagementController", ["$scope", "$http", "$grid", "$window", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", "$blackWhite",
    function ($scope, $http, $grid, $window, $category, $province, $city, $area, $trades, $cookieStore, $blackWhite) {
        $http.get([window.API.GROUP.GET_CURRENT_USER_ROUTER_GROUPS, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
            console.log(data.results);
            $scope.shop = data.results;
        });
        $scope.see_routers = function (id) {
            $window.location.href = ["#/main/shop_management_routers?id=", id].join("");
        }
    }]);

iCloudController.controller("CreateShopController", ["$scope", "$http", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", function ($scope, $http, $category, $province, $city, $area, $trades, $cookieStore) {
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

        $http.post([window.API.GROUP.NEW_GROUP, "?key=", $cookieStore.get("key")].join(""), shop).success(function (data) {
            alert(data.msg);
        })
            .error(function (data) {
                console.log(data);
            })
    }
}]);

iCloudController.controller("ShopManagementRoutersController", ["$scope", "$window", "$http", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", function ($scope, $window, $http, $category, $province, $city, $area, $trades, $cookieStore) {
    var get_param = function (href) {
        var search_start = href.indexOf("=");
        return href.slice(search_start + 1);
    };
    var shop_id = get_param($window.location.href);
    $scope.see_routers_details = function (id) {
        $window.location.href = ["#/main/routers_details?routers_id=", id].join("");
    };

    $http.get([window.API.ROUTER.GET_ROUTERS_BY_GROUP, "?key=", $cookieStore.get("key"), "&group_id=", shop_id].join("")).success(function (data) {
        $scope.shop_routers = data.results;
    });
    $http.get([window.API.ROUTER.GET_CURRENT_USER_ROUTERS,"?key=",$cookieStore.get("key")].join("")).success(function(data){
        console.log(data.results[0].ssid+"("+data.results[0].mac+")");
        //$scope.router = data.results[0].ssid+"("+data.results[0].mac+")";
        $scope.router = data.results;
        console.log(data.results);
    });
    //$scope.bang_submit = function(){
    //    $http.post([window.API.ROUTER.ROUTER_BIND,"?key=",$cookieStore.get("key")].join(""),{""})
    //}
}]);

iCloudController.controller("RoutersDetailsController", ["$scope", "$http", "$cookieStore", "$window", function ($scope, $http, $cookieStore, $window) {
    var get_param = function (href) {
        var search_start = href.indexOf("=");
        return href.slice(search_start + 1);
    };
    var router_id = get_param($window.location.href);
    //放行设置
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
            alert("添加成功")
        })
    };
    $scope.add_domain = function (data) {
        data.router = router_id;
        data.content_type = "1";
        data.enable = "1";
        $http.post([window.API.ROUTER.NEW_BLACK_WHITES, "?key=", $cookieStore.get("key")].join(""), data).success(function (data) {
            alert("添加成功")
        })
    };
    $scope.delete = function (id) {
        var ids = [id];
        console.log(ids);
        $http.delete([window.API.ROUTER.REMOVE_BLACK_WHITES, "?key=", $cookieStore.get("key"), "&ids=", ids.join()].join("")).success(function (data) {
            alert("删除成功");
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
    $http.get([window.API.ROUTER.GET_ROUTER_SETUP, "?key=", $cookieStore.get("key"), "&router_id=", router_id].join("")).success(function (data) {
        console.log(data);
        //路由器实时信息
        $http.get([window.API.WIFICAT.ONLINE_STATUS,"?key=",$cookieStore.get("key"),"&router_mac=",data.router.mac].join("")).success(function(data){
            console.log(data);
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
                "num":data.auth_limit_times
            };
        }
        else {
            $scope.identify_time = {
                "hour": parseInt(data.auth_period / 60),
                "minute": data.auth_period % 60,
                "num":data.auth_limit_times
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

}]);