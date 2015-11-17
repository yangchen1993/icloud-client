/**
 * Created by chen on 2015/10/31.
 */
iCloudController.controller("MainController", ["$scope", "$http", "$cookieStore", function ($scope, $http, $cookieStore) {
    $http.get([window.API.USER.GET_CURRENT_USER_INFO, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        $scope.user = {
            "name":data.legal_person_name,
            "identity": data.role.name
        };
        if(data.role.name=="系统管理员"){
            $scope.auth_nav = true;
            $scope.ads_nav = true;
            $scope.account_nav = true;
            $scope.eq_nav = true;
            $scope.shop_nav = true;
            $scope.agent_nav = true;
            $scope.marketing_nav = false;
        }
        else if (data.role.name == "商家") {
            $scope.auth_nav = false;
            $scope.ads_nav = true;
            $scope.account_nav = true;
            $scope.eq_nav = true;
            $scope.shop_nav = true;
            $scope.agent_nav = false;
            $scope.marketing_nav = true;
        }
        else{
            $scope.auth_nav = false;
            $scope.ads_nav = true;
            $scope.account_nav = true;
            $scope.eq_nav = true;
            $scope.shop_nav = false;
            $scope.agent_nav = true;
            $scope.marketing_nav = true;
        }
    });
}]);