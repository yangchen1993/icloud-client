/**
 * Created by lee on 2015/9/11.
 */

iCloudController.controller("PermissionController", ["$scope", "$http", "$cookieStore", "$window", "$icloudGrid",
    function ($scope, $http, $cookieStore, $window, $icloudGrid) {
        var options = {
            gridOptions: {
                customFilter:{
                    id:"id__icontains",
                    name:"name__icontains"
                }
            }
        };

        var grid = $icloudGrid.initial($window.permissions_url, options);
        grid.setEnableSelect(true);
        $scope.permissionsGrid = grid.gridOptions;
    }]);