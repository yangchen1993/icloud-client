/**
 * Created by lee on 2015/10/15.
 */

iCloudController.controller("ShopManagementController", ["$scope", "$http", "$window", "$category", "$province", "$city", "$area", "$trades", "$cookieStore",
    function ($scope, $http, $window, $category, $province, $city, $area, $trades, $cookieStore) {
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
                    angular.element("#storeModal").modal("toggle");
                    group = {};
                })
                .error(function (data) {
                    $window.alert(transform_error_message(data.msg));
                })
        };

        var group_list = function () {
            $http.get([$window.routers_groups_url,"own/" ,"?key=", $cookieStore.get("key")].join(""))
                .success(function (data) {
                    $scope.group_pages = data;
                })
        };

        group_list();

    }]);