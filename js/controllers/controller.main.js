/**
 * Created by chen on 2015/10/31.
 */
iCloudController.controller("MainController", ["$scope", "$http", "$cookieStore", function ($scope, $http, $cookieStore) {
    $http.get([window.user_url, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        console.log(data.role.name);
        if(data.role.name=="系统管理员"){
            $scope.auth_nav = true;
            $scope.ads_nav = true;
            $scope.account_nav = true;
            $scope.eq_nav = true;
            $scope.shop_nav = true;
            $scope.agent_nav = true;
        }
        else if (data.role.name == "商家") {
            $scope.auth_nav = false;
            $scope.ads_nav = true;
            $scope.account_nav = true;
            $scope.eq_nav = false;
            $scope.shop_nav = true;
            $scope.agent_nav = false;
        }
        else{
            $scope.auth_nav = false;
            $scope.ads_nav = false;
            $scope.account_nav = true;
            $scope.eq_nav = false;
            $scope.shop_nav = true;
            $scope.agent_nav = true;
        }
    });
}]);