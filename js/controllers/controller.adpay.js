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
            if (!data) {
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
                    case 4:
                        $scope.ad_name = true;
                        break;
                    case 5:
                        $scope.ad_url = true;
                        break;
                    case 6:
                        $scope.ad_platform = true;
                        break;
                }
            }
            else {
                switch (index) {
                    case 1:
                        $scope.name = false;
                        break;
                    case 2:
                        $scope.url = false;
                        break;
                    case 3:
                        $scope.platform = false;
                        break;
                    case 4:
                        $scope.ad_name = false;
                        break;
                    case 5:
                        $scope.ad_url = false;
                        break;
                    case 6:
                        $scope.ad_platform = false;
                        break;
                }
            }
        };

        $scope.UpdateAd = function (data) {
            $http.update([window.API.CREATE_AD.UPDATE_AD_PLATFORM,
                "?key=", $cookieStore.get("key"), data].join("")).success(function (data) {
                    alert('修改成功！');
                })
                .error(function (data) {
                    console.log(data);
                })

        };

        $scope.GetUpdateObject = function(data){
            $scope.ad=data;
        };

        $scope.DeleteAd = function (id) {
            if (confirm('确认要删除吗？')) {
                $http.delete([window.API.CREATE_AD.DELETE_AD_PLATFORM, "?key=", $cookieStore.get("key"), '&id=', id].join("")).success(function (data) {
                    console.log(id + "删除成功");
                    $grid.initial($scope, window.API.CREATE_AD.GET_AD_PLATFORM);
                });
            }
        };
    }]);

iCloudController.controller("WithCashController", ["$scope", "$grid", "$http", "$cookieStore",
    function ($scope, $grid, $http, $cookieStore) {
        var data = $grid.initial($scope, window.API.WITH_CASH.GET_USER_BALANCE);
        console.log(data);
    }]);
