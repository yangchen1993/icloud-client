/**
 * Created by chen on 2015/9/16.
 */
//加载广告列表
iCloudController.controller("AdsController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        $grid.initial($scope, [$window.API.AD.GET_CURRENT_USER_ADS,].join(""));
        $checkBox.enableCheck($scope, "table-wemedia");
        $scope.sendindex = function (index) {
            $scope.number = index;
        };
        $scope.editAds = function (id) {
            $window.location.href = ["#/main/create_ads?ad_id=", id].join("");
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
    });
}]);

iCloudController.controller("PutAdController", ["$scope", "$http", "$window", "$grid", "$checkBox", "$category", "$cookieStore","$rootScope",
    function ($scope, $http, $window, $grid, $checkBox, $category, $cookieStore,$rootScope) {
        var ad_id = get_param(window.location.href, "ad_id");
        $grid.initial($scope, $window.API.ROUTER.GET_CURRENT_USER_ROUTERS, {"groups_id__isnull": "False"});
        $scope.sjTouFang = function () {
            var data = getPutConditions();

            if ($cookieStore.get("role") == "商户") {
                data.ad_space_id = 1
            }
            if ($cookieStore.get("role") != "商户" && $cookieStore.get("role") != "系统管理员") {
                data.ad_space_id = 2
            }

            $http.post([$window.API.AD.PUT_AD_IN, "?key=", $cookieStore.get("key") + "&id=", ad_id].join(""), data)
                .success(function () {
                    alert("投放成功");
                })
                .error(function (data) {
                    $window.alert(data.msg)
                })
        };

        $category.get()
            .success(function (data) {
                $scope.categories = data;
            })
            .error(function (data) {
                console.log(data)
            });

        var getSubUsers = function () {
            $http.get([$window.API.USER.GET_SUB_BUSINESSES, "?pageSize=unlimited&key=", $cookieStore.get("key")].join(""))
                .success(function (data) {
                    $scope.subBusinesses = data;
                })
        };

        (function(){
            $http.get([$window.API.GROUP.GET_CURRENT_USER_ROUTER_GROUPS, "?pageSize=unlimited&key=", $cookieStore.get("key")].join(""))
                .success(function (data) {
                    $scope.subShop = data;
                })
        })();

        var getPutConditions = function () {
            var businessCheckbox = angular.element(".business :checkbox");

            var shopCheckbox = angular.element(".shop :checkbox");

            var categoryCheckbox = angular.element(".category :checkbox");

            var checkedBusinesses = [];
            var checkedCategory = [];
            var checkedShop = [];
            angular.forEach(businessCheckbox, function (c) {
                if ($(c).prop("checked")) {
                    checkedBusinesses.push($(c).val());
                }
            });

            angular.forEach(categoryCheckbox, function (c) {
                if ($(c).prop("checked")) {
                    checkedCategory.push($(c).val())
                }
            });

            angular.forEach(shopCheckbox, function (s) {
                if ($(s).prop("checked")) {
                    checkedShop.push($(s).val())
                }
            });

            var data = {};


            if (checkedBusinesses.length > 0) {
                data.user__id__in = checkedBusinesses.join(",")
            }
            if (checkedCategory.length > 0) {
                data.groups__category__in = checkedCategory.join(",");
            }
            if (checkedShop.length > 0) {
                data.groups__id__in = checkedShop.join(",");
            }


            if($rootScope.delegate_auths==1){
                data.delegated = "True"
            }


            if($rootScope.delegate_auths==0){
                console.log($rootScope.delegate_auths);
                data.delegated = "False"
            }


            return data;
        };

        getSubUsers();

        $scope.routerSearch = function () {
            $scope.postFiltering(getPutConditions())
        };
    }]);
