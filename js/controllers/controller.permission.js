/**
 * Created by lee on 2015/9/11.
 */

iCloudController.controller("PermissionController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox) {
        $grid.initial($scope, $window.permissions_url);
        $checkBox.enableCheck($scope, "table-permissions");
    }]);


iCloudController.controller("FunctionsController", ["$scope", "$http", "$cookieStore", "$window", "$grid", "$checkBox", "$permissions",
    function ($scope, $http, $cookieStore, $window, $grid, $checkBox, $permissions) {
        $grid.initial($scope, $window.functions_url);
        $checkBox.enableCheck($scope, "table-functions");

        $scope.functionModal = {
            title: "添加新功能",
            data: {
                name: "",
                id: ""
            }
        };
        $scope.newFunctionsModal = function (isNew, p) {
            if (isNew) {
                $permissions.promise().then(function (data) {
                    $scope.functionModal.data.permissions = data.results;
                })
            } else {
                $scope.functionModal.data = p;
            }
        }
    }]);