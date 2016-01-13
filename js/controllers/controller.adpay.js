/**
 * Created by dawson on 2016/1/11.
 */
iCloudController.controller("CreateAdController", ["$scope", "$grid", "$http", "$cookieStore",
    function ($scope, $grid, $http, $cookieStore) {

        var a = $grid.initial($scope, window.API.CREATE_AD.GET_AD_PLATFORM);
        console.log(a);

        $scope.create_ad = function (data) {
            console.log(data);
            $http.post([window.API.CREATE_AD.CREATE_AD_PLATFORM, "?key=", $cookieStore.get("key")].join(""), data).success(function (data) {
                    console.log(data.msg);
                })
                .error(function (data) {
                    console.log(data.msg);
                })

        };

        $scope.search = function (data) {
            $http.get([window.API.CREATE_AD.GET_AD_PLATFORM, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
                console.log(data);

            });
        };

        $scope.checks = function (index, data) {
            console.log(index, data);
            if (!data)
                switch (index) {
                    case 1:
                        $scope.name = true;
                        break;
                    case 2:
                        $scope.url = true;
                        break;
                    case 3:
                        $scope.platform = true;
                        break;
                }

        }


    }]);