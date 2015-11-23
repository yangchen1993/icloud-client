/**
 * Created by chen on 2015/11/16.
 */
iCloudController.controller("AccountDetailsController", ["$scope", "$http", "$grid", "$window", "$cookieStore",
    function ($scope, $http, $grid, $window, $cookieStore) {
        $grid.initial($scope, $window.API.ACCOUNT.GET_CURRENT_USER_ROUTERS);

        var getTotalCash = function () {
            $http.get([$window.API.ACCOUNT.GET_CURRENT_USER_TOTAL_CASH, "?key=", $cookieStore.get("key")].join(""))
                .success(function (data) {
                    $scope.totalCash = data.total_cash;
                })
        };

        getTotalCash();
    }]);
