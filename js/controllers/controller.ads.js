/**
 * Created by chen on 2015/9/16.
 */
iCloudController.controller("AdsController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox", "$MyDelete",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox, $MyDelete) {
        $grid.initial($scope, [$window.ads_url, "get_media_ads/"].join(""));
        $checkBox.enableCheck("table-wemedia");
        $scope.send = function (data) {
            $window.location.href = ["#main/wemedia_edit?id=", data.id].join("")
        };
        $scope.sendindex = function (index) {
            $scope.number = index;
        };
        //删除自媒体广告
        $scope.delete = function (id) {
            $MyDelete.init(window.ads_url, id);
        };
        //下架
        $scope.under = function (id) {

        }
    }]);


iCloudController.controller("WeMediaEditController", ["$scope", "$http", "$cookieStore", "$window", "$uploadImg", "$category",
    function ($scope, $http, $cookieStore, $window, $uploadImg, $category) {
        var get_param = function (href, param_name) {
            var search_start = href.indexOf("?");
            href = href.slice(search_start + 1);
            var param_list = href.split("&");
            var result = "";
            $.each(param_list, function (index, value) {
                if (value) {
                    var tmp = value.split("=");
                    if (tmp[0] == param_name) {
                        result = tmp[1];
                    }
                }
            });
            return result
        };
        var ads_id = get_param($window.location.href, "id");
        $http.get([ads_url, "get_media_ad?id=", ads_id, "&key=", $cookieStore.get("key")].join("")).success(function (data) {
            $scope.adToEdit = data;
        });
        var promise = $category.get();
        promise.success(function (data) {
            $scope.ad_category = data.results;
        });
        $scope.uploadImg = function (data) {
            $uploadImg.upload($window.ads_url, data);
        }
    }]);


iCloudController.controller("PaidController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        $grid.initial($scope, $window.paidlisting_url);
        $checkBox.enableCheck("table-paidlisting");
    }]);
