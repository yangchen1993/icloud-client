/**
 * Created by dawson on 2016/1/11.
 */
iCloudController.controller("CreateAdController",["$cope","$grid","$http","$cookieStore",
    function($scope,$grid,$http,$cookieStore){g
        $grid.initial($scope,window.API.CREATE_AD.GET_AD_PLATFORM);

        $scope.create_ad = function(data){
            $http.post([$window.API.CREATE_AD.CREATE_AD_PLATFORM,"?key=", $cookieStore.get("key")].join(""),data).success(function(data){
                console.log(data.msg);
            })
                .error(function(data){
                    alert(data.msg)
                })

        };

        $scope.search = function(data){
            $http.get([window.API.CREATE_AD.GET_AD_PLATFORM, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
                console.log(data);
                $scope.grid = data;
            });
        };
}]);