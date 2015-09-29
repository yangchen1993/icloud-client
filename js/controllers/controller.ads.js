/**
 * Created by chen on 2015/9/16.
 */
iCloudController.controller("AdsController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox", "$MyDelete",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox, $MyDelete) {
        var grid = $grid.initial($scope, $window.wemedia_url);
        $checkBox.enableCheck("table-wemedia");
        $scope.send = function (data) {
            $scope.$emit('sendData', data);
        };
        $scope.sendindex=function(index){
            $scope.number=index;
        }
        //删除自媒体广告
        $scope.delete = function (id) {
            $MyDelete.init(window.wemedia_url, id);
        }
        //下架
        $scope.under = function (id) {

        }
    }]);


iCloudController.controller("WeMediaEditController", ["$scope", "$http", "$cookieStore", "$window", "$uploadImg", "$category",
    function ($scope, $http, $cookieStore, $window, $uploadImg, $category) {
        $scope.$on('executeData', function (e, data) {
            $scope.adToEdit = data;
        });
        var promise = $category.get();
        promise.success(function (data) {
            $scope.ad_category = data.results;
        });
        $scope.uploadImg = function (data) {
            $uploadImg.upload($window.wemedia_url, data);
        }
    }]);


iCloudController.controller("PaidController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        $grid.initial($scope, $window.paidlisting_url);
        $checkBox.enableCheck("table-paidlisting");
    }]);
