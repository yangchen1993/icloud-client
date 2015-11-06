/**
 * Created by lee on 2015/10/15.
 */

iCloudController.controller("ShopManagementController", ["$scope", "$http", "$grid", "$window", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", "$blackWhite",
    function ($scope, $http, $grid, $window, $category, $province, $city, $area, $trades, $cookieStore, $blackWhite) {
        $http.get([groups_own,"?key=",$cookieStore.get("key")].join("")).success(function(data){
            console.log(data.results);
            $scope.shop = data.results;
        });
        $scope.see_routers = function(id){
            $window.location.href = ["#/main/shop_management_routers?id=",id].join("");
        }
    }]);

iCloudController.controller("CreateShopController", ["$scope", "$http", "$category","$province","$city","$area","$trades","$cookieStore", function ($scope, $http, $category,$province,$city,$area,$trades,$cookieStore) {
    $scope.shop = {};
    $category.get().success(function (data) {
        $scope.shop.category = data.results[0].name;
        $scope.category=data.results;
    })
        .error(function (data) {
            console.log(data);
        });
    $province.get().success(function(data){
        $scope.province = data;
    });
    $scope.select_p = function(id){
        $city.get(id).success(function(data){
            $scope.city = data;
        })
    };
    $scope.select_c = function(id){
        $area.get(id).success(function(data){
            $scope.area = data;
        })
    }
    $scope.select_a = function(id){
        $trades.get(id).success(function(data){
            $scope.trades = data;
        })
    };
    $scope.submit = function(shop){

        $http.post([window.new_group,"?key=",$cookieStore.get("key")].join(""),shop).success(function(data){
            alert(data.msg);
        })
            .error(function(data){
                console.log(data);
            })
    }
}]);

iCloudController.controller("ShopManagementRoutersController", ["$scope","$window","$http", "$category","$province","$city","$area","$trades","$cookieStore", function ($scope,$window, $http, $category,$province,$city,$area,$trades,$cookieStore) {
    var get_param = function(href){
        var search_start = href.indexOf("=");
        return href.slice(search_start+1);
    };
    var shop_id = get_param($window.location.href);
    $scope.see_routers_details = function(id){
        $window.location.href = ["#/main/routers_details?routers_id=",id].join("");
    };

    $http.get([window.get_router_by_group_url,"?key=",$cookieStore.get("key"),"&group_id=",shop_id].join("")).success(function(data){
        $scope.shop_routers = data.results;
        console.log(data.results)
    });
}]);

iCloudController.controller("RoutersDetailsController",["$scope","$http","$cookieStore","$window",function($scope,$http,$cookieStore,$window){
    var get_param = function (href) {
        var search_start = href.indexOf("=");
        return href.slice(search_start+1);
    };
    var routers_id = get_param($window.location.href);

    $scope.type = ["MAC","域名"];
    $http.get([get_router_policies,"?key=",$cookieStore.get("key"),"&router=",routers_id].join("")).success(function(data){
        console.log(data);
        $scope.policy = data.results;
        for(var i=0;i<data.results.length;i++){
            if(data.results[i].is_black){
                $scope.policy[i].is_black = "黑名单";
            }
            else{
                $scope.policy[i].is_black = "白名单";
            }
        }
    });
    $scope.router = {
        "is_black":"1"
    };
    $scope.router1 = {
        "is_black":"1"
    };
    $scope.add_mac = function(data){
        data.router = routers_id;
        data.content_type = "0";
        data.enable = "1";
        $http.post([new_policy_url,"?key=",$cookieStore.get("key")].join(""),data).success(function(data){
            alert("添加成功")
        })
    };
    $scope.add_domain = function(data){
        data.router = routers_id;
        data.content_type = "1";
        data.enable = "1";
        $http.post([new_policy_url,"?key=",$cookieStore.get("key")].join(""),data).success(function(data){
            alert("添加成功")
        })
    };
    $scope.delete = function(id){
        var ids = [id];
        console.log(ids);
        $http.delete([window.delete_policy,"?key=",$cookieStore.get("key")].join(""),ids).success(function(data){
            console.log(data);
        })
    }
}]);