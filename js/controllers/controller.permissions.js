/**
 * Created by lee on 2015/9/11.
 */

iCloudController.controller("PermissionController", ["$scope", "$http", "$cookieStore", "$window", "$icloudGrid",
    function ($scope, $http, $cookieStore, $window, $icloudGrid) {
        $icloudGrid.setEnableSelect(true);
        $scope.permissionsGrid = $icloudGrid.icloudGrid;
        $icloudGrid.initialData($window.permissions_url);
    }]);