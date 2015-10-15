/**
 * Created by lee on 2015/10/15.
 */

iCloudController.controller("ShopManagementController", ["$scope", "$http", "$window", "$category", "$province", "$city", "$area",
    function ($scope, $http, $window, $category, $province, $city, $area) {
        var promise = $category.get();
        promise.success(function (data) {
            $scope.category = data.results;
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

    }]);