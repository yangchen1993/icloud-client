/**
 * Created by chen on 2015/9/16.
 */

iCloudController.controller("wemediaController", ["$scope", "$http", "$cookieStore", "$window","$uploadImg",
    function ($scope, $http, $cookieStore, $window,$uploadImg) {
        $scope.uploadImg=function() {
            var ad_title = angular.element("#ad_title").val();
            var ad_url = angular.element("#ad_url").val();
            $uploadImg.initial($window.wemedia_url, ad_title, ad_url);
        }
}])
