/**
 * Created by chen on 2015/11/16.
 */
iCloudController.controller("AccountDetailsController", ["$scope", "$http", "$grid", "$window", function ($scope, $http, $grid, $window) {
    $grid.initial($scope, $window.API.ACCOUNT.GET_CURRENT_USER_ROUTERS);
}]);
