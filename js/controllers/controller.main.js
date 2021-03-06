/**
 * Created by chen on 2015/10/31.
 */
iCloudController.controller("MainController", ["$scope", "$http", "$cookieStore", "$rootScope", function ($scope, $http, $cookieStore, $rootScope) {
    $http.get([window.API.USER.GET_CURRENT_USER_INFO, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        console.log(data);
        $scope.user = {
            "name": data.name,
            "identity": data.role_object.name
        };

        $cookieStore.put("role", data.role_object.name);
        $cookieStore.put("username",data.tel);  //获取商户账号

            if (data.role_object.name == "系统管理员") {
                $scope.auth_nav = false;
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
                $scope.adsType_nav = 2;
                $scope.js_ad_nav = true;
                $scope.urlReport = true;
                $scope.partition = true;
                $scope.partition_set = true;
                $rootScope.delegate_auths = 1;
                $scope.Message_nav = false; //实现发布系统功能
                $scope.sysMessage_nav = true;//实现发布系统功能
                $rootScope.update_ssid = false;
                $rootScope.isShow_balckwhite = false;
                $rootScope.deviceManage = {
                    "addRouterMenu": true,
                    "editRouterMenu": true,
                    "removeRouterMenu": true
                };
                $rootScope.putAdSearch = {
                    "showBusinessLabel": false,
                    "showShopLabel": false
                }
            }
            else if (data.role_object.name == "商户") {
                $scope.auth_nav = false;
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
                $scope.partition_info = true;
                $scope.adsType_nav = 1;
                $scope.create_ad=true; //应当为admin
                $scope.with_cash=true;
                $scope.Message_nav = true; //实现发布系统功能
                $scope.sysMessage_nav = false;//实现发布系统功能
                $rootScope.update_ssid = true;
                $rootScope.isShow_balckwhite = true;
                $rootScope.putAdSearch = {
                    "showBusinessLabel": false,
                    "showShopLabel": true
                }
            }
            else {
                $scope.auth_nav = false;
                $scope.account_nav = true;
                $scope.eq_nav = true;
                $scope.delivery_nav = true;
                $scope.delegated_nav = true;
                $scope.shop_nav = false;
                $scope.agent_nav = false;
                $scope.create_agent_nav = false;
                $scope.business_nav = true;
                $scope.helpfiles = true;
                $scope.create_business_nav = true;
                $scope.marketing_nav = false;
                $scope.wallet_nav = true;
                $scope.info_nav = true;
                $scope.adsType_nav = 2;
                $scope.partition = true;
                $scope.partition_info = true;
                $rootScope.delegate_auths = 0;
                $scope.Message_nav = true; //实现发布系统功能
                $scope.sysMessage_nav = false;//实现发布系统功能
                $scope.charge_system_function = true;
                $rootScope.update_ssid = false;
                $rootScope.isShow_balckwhite = false;
                $rootScope.putAdSearch = {
                    "showBusinessLabel": true,
                    "showShopLabel": false
                };
                $rootScope.adHitsAndBrowser = true;
            }
        });
    }]);