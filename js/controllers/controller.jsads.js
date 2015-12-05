/**
 * Created by Administrator on 2015/12/3.
 */
iCloudController.controller("WhiteSpaceController", ['$scope', '$http', '$cookieStore', '$window', "$grid",
    function ($scope, $http, $cookieStore, $window, $grid) {
        $grid.initial($scope, $window.API.JSADS.GET_JS_WHITE_URLS);


        $scope.newDomain = function () {
            $http.post([$window.API.JSADS.NEW_JS_WHITE_URL, "?key=", $cookieStore.get("key")].join(""), {url: $scope.domain})
                .success(function (data) {
                    $scope.refresh()
                })
                .error(function (data) {
                    $window.alert(data)
                })
        };

        $scope.removeDomain = function (id) {
            $http.delete([$window.API.JSADS.REMOVE_JS_WHITE_URL, "?key=", $cookieStore.get("key"), "&id=", id].join(""))
                .success(function (data) {
                    $scope.refresh()
                })
                .error(function (data) {
                    $window.alert(data)
                })
        }


    }]);


iCloudController.controller("OpenAreaController", ["$scope", "$http", "$cookieStore", "$window","$districts","$grid",
    function ($scope, $http, $cookieStore, $window, $districts ,$grid) {
        $grid.initial($scope,window.API.JSADS.GET_PUT_AREA);

        $districts.get({"adcode":"100000"}).success(function(data){
            $scope.provinces = data[0].subdistricts;
        });

        $scope.select_p = function(id){
            $districts.get({"id":id}).success(function(data){
                $scope.citys = data[0].subdistricts;
            })
        };
        $scope.select_c = function(id){
            $districts.get({"id":id}).success(function(data){
                $scope.areas = data[0].subdistricts;
            })
        };
        $scope.select_a = function(id){
            $districts.get({"id":id}).success(function(data){
                $scope.trades = data[0].subdistricts;
            })
        };
        $scope.put_area = function(ids){
            console.log(ids);
            $http.post([window.API.JSADS.JS_PUT_AREA,"?key=",$cookieStore.get("key")].join(""),ids).success(function(data){
                alert(data.msg);
            })
                .error(function(data){
                    alert(data.msg);
                })
        };
        $scope.delete_area = function(){
            $http.delete([window.API.JSADS.REMOVE_PUT_AREA,"?key=",$cookieStore.get("key")].join("")).success(function(data){
                alert(data.msg);
            })
                .error(function(data){
                    alert(data.msg);
                })
        }
    }]);

iCloudController.controller("JsCodeController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {

    }]);