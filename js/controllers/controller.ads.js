/**
 * Created by chen on 2015/9/16.
 */
//加载广告列表
iCloudController.controller("AdsController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        $grid.initial($scope, [$window.API.AD.GET_CURRENT_USER_ADS,].join(""));
        $checkBox.enableCheck("table-wemedia");
        $scope.send = function (data) {
            $window.location.href = ["#main/wemedia_edit?id=", data.id].join("")
        };
        $scope.sendindex = function (index) {
            $scope.number = index;
        };
        $scope.editAds = function (id) {
            $window.location.href = ["#/main/create_ads?id=", id].join("");
        };
        $scope.deleteAds = function (id) {
            var _this = $(this);
            if (confirm('确认要删除吗？')) {
                $http.delete(window.API.AD.REMOVE_AD + '?key=' + $.cookie("key").replace(/\"/g, "") + '&id=' + id).success(function () {
                    _this.parent().parent().remove();
                    console.log('删除成功');
                    $scope.refresh();
                });
            }
        };
        $scope.role = $cookieStore.get("role");
        //代理商投放
        $scope.dlTouFang = function (id) {
            $http.post([$window.API.AD.PUT_AD_IN, "?key=", $cookieStore.get("key"), "&id=", id].join(""), {"space_id": 2})
                .success(function (data) {
                    $scope.refresh();
                })
                .error(function (data) {
                    $window.alert(data.msg)
                })

        };
        //上下架
        $scope.putAwayAd = function (id, way) {
            $.ajax({
                "url": $window.API.AD.PUT_AD_UP + "?key=" + $.cookie("key").replace(/\"/g, "") + '&id=' + id,
                "type": "PUT",
                "dataType": "json",
                "data": {
                    "status": way,
                    "comments": "failed reason"
                },
                "success": function (data) {
                    alert("操作成功");
                    $scope.refresh();
                }
            });
        };

        $scope.takeOffAd = function (ad_id) {
            $http.delete([$window.API.AD.PUT_AD_DOWN, "?key=", $cookieStore.get("key"), "&id=", ad_id].join(""))
                .success(function (data) {
                    $scope.refresh();
                })
                .error(function (data) {
                    $window.alert(data.msg);
                })
        }
    }]);

iCloudController.controller("CreateAdsController", ["$scope", "$http", "$category", function ($scope, $http, $category) {
    $category.get().success(function (data) {
        $scope.category = data;
        $scope.ads = {
            "id": data[0].id
        };
    })
}]);

iCloudController.controller("PutAdController", ["$scope", "$http", "$window", "$grid", "$checkBox", "$category", "$cookieStore",
    function ($scope, $http, $window, $grid, $checkBox, $category, $cookieStore) {
        var ad_id = get_param(window.location.href);
        var sl_router = [];
        $grid.initial($scope, [$window.API.ROUTER.GET_CURRENT_USER_ROUTERS,].join(""), {"groups_id__isnull": "False"});
        $checkBox.enableCheck("table-ad");
        $scope.sjTouFang = function () {
            sl_router = [];
            var selector = angular.element("input:checked");
            if (selector.length == 0) {
                alert("请至少选择一个路由器");
                return;
            }
            for (var i = 0; i < selector.length; i++) {
                sl_router.push(selector[i].value);
            }
            $http.post($window.API.AD.PUT_AD_IN + "?key=" + $.cookie("key").replace(/\"/g, "") + "&id=" + ad_id, {
                    "space_id": 1,
                    "router_ids": sl_router
                })
                .success(function () {
                    alert("投放成功");
                })
                .error(function (data) {
                    $window.alert(data.msg)
                })
        };

        $scope.search = {
            "groups__name__contains": "",
            "groups_category": "",
            "mac_contains": ""
        };

        $category.get()
            .success(function (data) {
                $scope.categories = data;
            })
            .error(function (data) {
                console.log(data)
            });

        var getSubUser = function () {
            $http.get([$window.API.USER.GET_SUB_BUSINESSES, "?key=", $cookieStore.get("key"), "&page_size=unlimited"].join(""))
                .success(function (data) {
                    $scope.subBusinesses = data;
                })
        };

        getSubUser();

        $scope.routerSearch = function () {
            var businessCheckbox = angular.element(".business :checkbox");

            console.log(businessCheckbox.length);

            var checkedBusinesses = [];
            angular.forEach(businessCheckbox, function (c) {
                if ($(c).prop("checked")){
                    checkedBusinesses.push($(c).val());
                }
            });

            $scope.filtering
        };
    }]);
