/**
 * Created by chen on 2015/9/16.
 */

iCloudController.controller("wemediaController", ["$scope", "$http", "$cookieStore", "$window", "$uploadImg",
    function ($scope, $http, $cookieStore, $window, $uploadImg) {
        $scope.uploadImg = function () {
            // todo: 验证广告内容是否符合要求 scope.ad
            $uploadImg.upload($scope, $window.wemedia_url);
        }
    }]);
