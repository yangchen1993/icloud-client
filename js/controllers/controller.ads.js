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
        $scope.role=$cookieStore.get("role");
        //代理商投放
        $scope.dlTouFang=function(id){
            $.ajax({
                "url": $window.API.AD.PUT_AD_IN+"?key="+$.cookie("key").replace(/\"/g,"")+"&id="+id,
                "type":"POST",
                "dataType":"json",
                "data": {
                    "space_id": 2,
                },
                "success":function(data){
                    alert("投放成功");
                    $scope.refresh();
                }
            })
        }
        //上下架
        $scope.putAwayAd =function(id,way){
            $.ajax({
                "url": $window.API.AD.PUT_AD_UP+"?key="+ $.cookie("key").replace(/\"/g,"")+'&id='+id,
                "type":"PUT",
                "dataType":"json",
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
//        $http.get([ads_url, "get_media_ad?id=", ads_id, "&key=", $cookieStore.g
//
// et("key")].join("")).success(function (data) {
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

iCloudController.controller("CreateAdsController", ["$scope", "$http", "$category", function ($scope, $http, $category) {
    $category.get().success(function (data) {
        $scope.category = data;
        $scope.ads = {
            "id": data[0].id
        };
    })
}]);

iCloudController.controller("PutAdController", ["$scope", "$http","$window","$grid","$checkBox",function ($scope, $http,$window,$grid,$checkBox) {
    var ad_id = get_param(window.location.href);
    var sl_router=[];
    $grid.initial($scope, [$window.API.ROUTER.GET_CURRENT_USER_ROUTERS,].join(""),{"groups_id__isnull":"False"});
    $checkBox.enableCheck("table-ad");
    $scope.sjTouFang=function(){
        sl_router=[];
        var selector=angular.element("input:checked");
        if(selector.length==0){
            alert("请至少选择一个路由器");
            return;
        }
        for(var i=0;i<selector.length;i++){
            sl_router.push(selector[i].value);
        }
        //$http.get([$window.API.GROUP.GET_ROUTER_BY_GROUP,"?key=",$.cookie("key").replace(/\"/g,""),"&groups__id=",group_id].join("")).success(function(data){
        //
        //});
        //$http.get([$window.API.GROUP.GET_ROUTER_BY_GROUP,"?key=",$.cookie("key").replace(/\"/g,""),"&groups__id=",group_id].join("")).success(function(data){
        //    $scope.routers=data;
        //    console.log(data);
        //});
        //var c = angular.element("#table-ad :checkbox");
        //if((angular.element(":checked").length-1 )==0){
        //    alert("请至少选择一个店铺");
        //    return;
        //}
        //angular.forEach(c, function (v, k) {
        //    if (angular.element(v).prop("checked")) {
        //        group_id.push(angular.element(v).val());
        //    }
        //});
        console.log(sl_router);
        $http.post($window.API.AD.PUT_AD_IN+"?key="+$.cookie("key").replace(/\"/g,"")+"&id="+ad_id,{"space_id": 1, "router_ids": sl_router}).success(function(){
            alert("投放成功");
        })
    }
}]);
