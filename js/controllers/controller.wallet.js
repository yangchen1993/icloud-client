/**
 * Created by lee on 2015/11/17.
 */

iCloudController.controller("WalletsController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        var getWalletInfo = function () {
            $http.get([$window.API.WALLET.GET_CURRENT_USER_WALLET_INFO, "?key=", $cookieStore.get("key")].join(""))
                .success(function (data) {
                    $scope.walletInfo = data;
                })
        };

        getWalletInfo();

    }]);

iCloudController.controller("RechargeController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        $scope.recharge = function (amount) {
            $http.post([$window.API.WALLET.RECHARGE, "?key=", $cookieStore.get("key")].join(""), {amount: amount})
                .success(function (data) {

                })
        }

    }]);