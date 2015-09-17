/**
 * Created by lee on 2015/9/11.
 */

iCloudController.controller("PermissionController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        $grid.initial($scope, $window.permissions_url);
        $checkBox.enableCheck("table-permissions");
    }]);