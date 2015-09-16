/**
 * Created by chen on 2015/9/15.
 */

iCloudController.controller("PaidlistingController", ["$scope", "$http", "$cookieStore", "$window", "$icloudGrid",
    function ($scope, $http, $cookieStore, $window, $icloudGrid) {

        var grid = $icloudGrid.initial($window.paidlisting_url);
        grid.setEnableSelect(false);
        $scope.paidlistingGrid = grid.gridOptions;

    }]);