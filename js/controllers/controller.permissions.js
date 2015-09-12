/**
 * Created by lee on 2015/9/11.
 */

iCloudController.controller("PermissionController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        var permission_list = function (url) {
            $http.get(url)
                .success(function (data) {
                    $scope.permissions_page = data;
                })
                .error(function () {

                })
        };
        permission_list([
            $window.permissions_url, "?key=", $cookieStore.get("key"), "&ordering=id&page_size=100"].join(""));

    }]);