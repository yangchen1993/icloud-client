/**
 * Created by chen on 2015/9/15.
 */

iCloudController.controller("PaidlistingController", ["$scope", "$http", "$cookieStore", "$window", "$icloudGrid",
    function ($scope, $http, $cookieStore, $window, $icloudGrid) {
        $icloudGrid.setEnableSelect(true);
        $scope.paidlistingGrid = $icloudGrid.icloudGrid;
        $icloudGrid.extraParams.id=1;
        $icloudGrid.initialData($window.paidlisting_url);
    }]);