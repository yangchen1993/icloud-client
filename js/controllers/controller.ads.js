/**
 * Created by chen on 2015/9/16.
 */
iCloudController.controller("AdsController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        var grid = $grid.initial($scope, $window.wemedia_url);
        $checkBox.enableCheck("table-wemedia");
        $scope.send = function () {
            $scope.$emit('sendData');
        }
    }]);


iCloudController.controller("WeMediaEditController", ["$scope", "$http", "$cookieStore", "$window", "$uploadImg", "$category",
    function ($scope, $http, $cookieStore, $window, $uploadImg, $category) {
        $scope.$on('executeData', function () {
            console.log($scope.p.title);
        });
        var promise = $category.get();
        promise.success(function (data) {
            $scope.ad_category = data.results;
        });
        $scope.uploadImg = function () {
            if ($scope.ad_title == null || $scope.ad_url == null || $scope.selectId == null || angular.element("#avatarInput").val() == null) {
                alert("信息填写不完整")
            }
            else {
                $uploadImg.upload($scope, $window.wemedia_url);
            }
        }
    }]);


iCloudController.controller("PaidController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        $grid.initial($scope, $window.paidlisting_url);
        $checkBox.enableCheck("table-paidlisting");
    }]);
