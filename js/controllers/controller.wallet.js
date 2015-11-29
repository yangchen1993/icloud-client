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
        $scope.active = 0;

        $scope.rechargeOrder = {
            amount: 1,
            channel: "alipay_pc_direct"
        };

        $scope.recharge = function (data) {
            if(angular.element("#zhifubao").prop('checked')==true)
            {
                var data_ = angular.copy(data);
                console.log(data_);
                if (data_.amount) {
                    $http.post([$window.API.WALLET.RECHARGE, "?key=", $cookieStore.get("key")].join(""), data_)
                        .success(function (data) {
                            pingppPc.createPayment(data, function (result, msg) {
                                console.log(result);
                                if (result == "success") {
                                    console.log(msg);
                                } else if (result == "fail") {
                                    console.log(msg);
                                } else if (result == "cancel") {
                                    console.log(msg);
                                }
                            })
                        })
                }
            }
            else{
                alert("请先选择支付方式")
            }
        }
    }]);

iCloudController.controller("TradingHistoryController", ["$scope", "$http", "$window", "$grid",
    function ($scope, $http, $window, $grid) {
        $grid.initial($scope, $window.API.WALLET.TRADING_HISTORY);
    }]);