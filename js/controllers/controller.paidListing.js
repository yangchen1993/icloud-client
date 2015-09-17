/**
 * Created by chen on 2015/9/15.
 */

iCloudController.controller("PaidlistingController", ["$scope", "$http", "$cookieStore", "$window", "$icloudGrid",
    function ($scope, $http, $cookieStore, $window, $icloudGrid) {
        var options = {
            gridOptions: {
                customFilter: {
                    id: "id__icontains",
                    bid_price: "bid_price__icontains"
                }
            }
        };

        var grid = $icloudGrid.initial($window.paidlisting_url, options);
        grid.setEnableSelect(true);
        $scope.paidlistingGrid = grid.gridOptions;

    }]);