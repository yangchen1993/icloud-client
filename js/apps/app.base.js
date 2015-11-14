/**
 * Created by lee on 2015/9/9.
 */

var iCloudApp = angular.module("iCloudApp", ["ui.router", "iCloudController", "iCloudService"]);


iCloudApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/login");

    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "template/login.html",
            controller: "IndexController"
        })
        .state("main", {
            url: "/main",
            templateUrl: "template/main.html",
            controller:"MainController"
        })
        .state("main.functions", {
            url: "/functions",
            templateUrl: "template/center/functions.html",
            controller: "FunctionsController"
        })
        .state("main.permissions", {
            url: "/permissions",
            templateUrl: "template/center/permissions.html",
            controller: "PermissionController"
        })
        .state("main.paid", {
            url: "/paid",
            templateUrl: "template/center/paid.html",
            controller: "PaidController"
        })
        .state("main.ads", {
            url: "/ads",
            templateUrl: "template/center/ads.html",
            controller: "AdsController"
        })
        .state("main.device_delivery", {
            url: "/device_delivery",
            templateUrl: "template/center/router/device_delivery.html",
            controller: "DeviceDeliveryController"
        })
        .state("main.new_delivery", {
            url: "/new_delivery",
            templateUrl: "template/center/router/new_delivery.html",
            controller: "CreateDeviceDeliveryController"
        })
        .state("main.wemedia", {
            url: "/wemedia",
            templateUrl: "template/center/wemedia.html",
            controller: "WeMediaController"
        })
        .state("main.wemedia_edit", {
            url: "/wemedia_edit",
            templateUrl: "template/center/wemedia_edit.html",
            controller: "WeMediaEditController"
        })
        .state("main.eq_management", {
            url: "/eq_management",
            templateUrl: "template/center/router/eq_management.html",
            controller: "EqManagementController"
        })
        .state("main.shop_management", {
            url: "/shop_management",
            templateUrl: "template/center/shop/shop_management.html",
            controller: "ShopManagementController"
        })
        .state("main.version_manage", {
            url: "/version_management",
            templateUrl: "template/center/router/version_manage.html",
            controller: "VersionManagementController"
        })
        .state("main.firmware_update", {
            url: "/firmware_update",
            templateUrl: "template/center/router/firmware_update.html",
            controller: "FirmwareUpdateController"
        })
        .state("main.details", {
            url: "/details",
            templateUrl: "template/center/router/details.html",
            controller: "DetailsController"
        })
        .state("main.identify_conf", {
            url: "/identify_conf",
            templateUrl: "template/center/router/identify_conf.html",
            controller: "IdentifyConfController"
        })
        .state("main.binding", {
            url: "/binding",
            templateUrl: "template/center/router/binding.html",
            controller: "BindingController"
        })
        .state("main.release_conf", {
            url: "/release_conf",
            templateUrl: "template/center/router/release_conf.html",
            controller: "ReleaseConfController"
        })
        .state("main.agent_manage", {
            url: "/agent_manage",
            templateUrl: "template/center/agent_manage/eq_manage.html",
            controller: "AgentManageController"
        })
        .state("main.create_agent", {
            url: "/create_agent",
            templateUrl: "template/center/agent_manage/create_agent.html",
            controller: "CreateAgentController"
        })
        .state("main.create_business", {
            url: "/create_business",
            templateUrl: "template/center/agent_manage/create_business.html",
            controller: "CreateBusinessController"
        })
        .state("main.agent_message", {
            url: "/agent_message",
            templateUrl: "template/center/agent_manage/agent_message.html",
            controller: "AgentMessageController"
        })
        .state("main.create_shop", {
            url: "/create_shop",
            templateUrl: "template/center/shop/create_shop.html",
            controller: "CreateShopController"
        })
        .state("main.edit_shop", {
            url: "/edit_shop",
            templateUrl: "template/center/shop/edit_shop.html",
            controller: "EditShopController"
        })
        .state("main.shop_management_routers", {
            url: "/shop_management_routers",
            templateUrl: "template/center/shop/shop_management_routers.html",
            controller: "ShopManagementRoutersController"
        })
        .state("main.routers_details", {
            url: "/routers_details",
            templateUrl: "template/center/shop/routers_details.html",
            controller: "RoutersDetailsController"
        })
        .state("main.ourshop", {
            url: "/ourshop",
            templateUrl: "template/center/ourshop.html",
            controller: "OurShopController"
        })
        .state("main.weixin_config", {
            url: "/weixin_config",
            templateUrl: "template/center/shop/weixin_config.html",
            controller: "WeiXinConfigController"
        })
});