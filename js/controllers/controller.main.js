/**
 * Created by chen on 2015/10/31.
 */
iCloudController.controller("MainController", ["$scope", "$http", "$cookieStore", "$rootScope", function ($scope, $http, $cookieStore, $rootScope) {
    $http.get([window.API.USER.GET_CURRENT_USER_INFO, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        console.log(data);
        $scope.user = {
            "name": data.name,
            "identity": data.role.name
        };

        $cookieStore.put("role", data.role.name);

        if (data.role.name == "系统管理员") {
            $scope.auth_nav = false;
            $scope.ads_nav = false;
            $scope.account_nav = true;
            $scope.eq_nav = true;
            $scope.delivery_nav = true;
            $scope.version_nav = true;
            $scope.shop_nav = false;
            $scope.agent_nav = true;
            $scope.create_agent_nav = true;
            $scope.business_nav = true;
            $scope.create_business_nav = true;
            $scope.marketing_nav = false;
            $scope.wallet_nav = false;
            $rootScope.isShow_balckwhite = false;
            $rootScope.deviceManage = {
                "addRouterMenu": true,
                "editRouterMenu": true,
                "removeRouterMenu": true
            }
        }
        else if (data.role.name == "商户") {
            $scope.auth_nav = false;
            $scope.ads_nav = true;
            $scope.account_nav = true;
            $scope.eq_nav = true;
            $scope.delivery_nav = false;
            $scope.shop_nav = true;
            $scope.agent_nav = false;
            $scope.create_agent_nav = false;
            $scope.business_nav = false;
            $scope.create_business_nav = false;
            $scope.marketing_nav = true;
            $scope.wallet_nav = true;
            $scope.info_nav = true;
            $rootScope.isShow_balckwhite = true;
        }
        else {
            $scope.auth_nav = false;
            $scope.ads_nav = true;
            $scope.account_nav = true;
            $scope.eq_nav = true;
            $scope.delivery_nav = true;
            $scope.shop_nav = false;
            $scope.agent_nav = false;
            $scope.create_agent_nav = false;
            $scope.business_nav = true;
            $scope.create_business_nav = true;
            $scope.marketing_nav = false;
            $scope.wallet_nav = true;
            $scope.info_nav = true;
            $rootScope.isShow_balckwhite = false;
        }
    });
}]);