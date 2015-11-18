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
        $scope.rechargeOrder = {
            amount: 1,
            channel: "alipay"
        };

        $scope.recharge = function (data) {
            var data_ = angular.copy(data);
            console.log(data_);
            if (data_.amount) {
                $http.post([$window.API.WALLET.RECHARGE, "?key=", $cookieStore.get("key")].join(""), data_)
                    .success(function (data) {

                    })
            }
        }

    }]);