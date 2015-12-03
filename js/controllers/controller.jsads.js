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


iCloudController.controller("OpenAreaController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {

    }]);

iCloudController.controller("JsCodeController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {

    }]);