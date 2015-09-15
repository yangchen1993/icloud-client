/**
 * Created by chen on 2015/9/15.
 */

iCloudController.controller("PaidlistingController", ["$scope", "$http", "$cookieStore", "$window", "$icloudGrid",
    function ($scope, $http, $cookieStore, $window, $icloudGrid) {

        console.log(
            $icloudGrid.initial({
                "gridOptions": {
                    "name": "1234"
                }
            })
        )
    }]);