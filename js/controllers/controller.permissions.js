/**
 * Created by lee on 2015/9/11.
 */

iCloudController.controller("PermissionController", ["$scope", "$http", "$cookieStore", "$window", "$icloudGrid",
    function ($scope, $http, $cookieStore, $window, $icloudGrid) {
        var grid = $icloudGrid.initial($window.permissions_url);
        grid.setEnableSelect(true);
        console.log(grid);
        $scope.permissionsGrid = grid.gridOptions;
    }]);