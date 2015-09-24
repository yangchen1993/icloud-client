/**
 * Created by chen on 2015/9/15.
 */

iCloudController.controller("PaidController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        $grid.initial($scope, $window.paidlisting_url);
        $checkBox.enableCheck("table-paidlisting");
    }]);