/**
 * Created by chen on 2015/9/16.
 */
//加载广告列表
iCloudController.controller("AdsController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox", "$MyDelete",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox, $MyDelete) {
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
        $scope.deleteAds = function (id){
            var _this=$(this);
            if(confirm('确认要删除吗？')){
                $http.delete(window.API.AD.REMOVE_AD+'?key='+ $.cookie("key").replace(/\"/g,"")+'&id='+id).success(function(){
                    _this.parent().parent().remove();
                    console.log('删除成功');
                });
            }
        }
    }]);


//iCloudController.controller("WeMediaEditController", ["$scope", "$http", "$cookieStore", "$window", "$uploadImg", "$category",
//    function ($scope, $http, $cookieStore, $window, $uploadImg, $category) {
//        var get_param = function (href, param_name) {
//            var search_start = href.indexOf("?");
//            href = href.slice(search_start + 1);
//            var param_list = href.split("&");
//            var result = "";
//            $.each(param_list, function (index, value) {
//                if (value) {
//                    var tmp = value.split("=");
//                    if (tmp[0] == param_name) {
//                        result = tmp[1];
//                    }
//                }
//            });
//            return result
//        };
//        var ads_id = get_param($window.location.href, "id");
//        $http.get([ads_url, "get_media_ad?id=", ads_id, "&key=", $cookieStore.get("key")].join("")).success(function (data) {
//            $scope.adToEdit = data;
//        });
//        var promise = $category.get();
//        promise.success(function (data) {
//            $scope.ad_category = data.results;
//        });
//        $scope.uploadImg = function (data) {
//            $uploadImg.upload($window.ads_url, data);
//        }
//    }]);

iCloudController.controller("CreateAdsController",["$scope","$http","$category",function($scope,$http,$category){
    $category.get().success(function(data){
        $scope.category = data;
        $scope.ads = {
            "id":data[0].id
        };
    })
}]);

iCloudController.controller("PaidController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        $grid.initial($scope, $window.paidlisting_url);
        $checkBox.enableCheck("table-paidlisting");
    }]);
