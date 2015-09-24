/**
 * Created by chen on 2015/9/16.
 */
iCloudController.controller("WeMediaController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        var grid = $grid.initial($scope, $window.wemedia_url);
        $checkBox.enableCheck("table-wemedia");
    }]);


iCloudController.controller("WeMediaEditController", ["$scope", "$http", "$cookieStore", "$window", "$uploadImg", "mySend",
    function ($scope, $http, $cookieStore, $window, $uploadImg, $mySend) {
        console.log($mySend.ads.title);
        $http.get("http://192.168.0.112/api/business/category/?key=cc8e704e-9427-403a-835e-2cbfb1ff3115").success(function (data) {
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



