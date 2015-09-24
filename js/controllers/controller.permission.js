/**
 * Created by lee on 2015/9/11.
 */

iCloudController.controller("PermissionController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        var grid = $grid.initial($scope, $window.permissions_url);
        $checkBox.enableCheck("table-permissions");
    }]);


iCloudController.controller("FunctionsController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox", "$permissions",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox, $permissions) {
        $grid.initial($scope, $window.functions_url);
        $checkBox.enableCheck("table-functions");

        $scope.functionModal = {
            title: "添加新功能",
            data: {
                name: "",
                id: ""
            }
        };

        console.log($permissions.query());

        $scope.newFunction = function (data) {

        }

    }]);