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
        //.state("main.functions", {
        //    url: "/functions",
        //    templateUrl: "template/center/functions.html",
        //    controller: "FunctionsController"
        //})
        //.state("main.permissions", {
        //    url: "/permissions",
        //    templateUrl: "template/center/permissions.html",
        //    controller: "PermissionController"
        //})
        .state("main.paid", {
            url: "/paid",
            templateUrl: "template/center/paid.html",
            controller: "PaidController"
        })
        .state("main.deliveries", {
            url: "/deliveries",
            templateUrl: "template/center/router/deliveries.html",
            controller: "DeliveriesController"
        })
        .state("main.delivery-new", {
            url: "/delivery-new",
            templateUrl: "template/center/router/delivery.new.html",
            controller: "CreateDeliveryController"
        })
        .state("main.delivery-details", {
            url: "/delivery-details",
            templateUrl: "template/center/router/delivery.details.html",
            controller: "DeliveryDetailsController"
        })
        .state("main.ads", {
            url: "/ads",
            templateUrl: "template/center/ads/ads.html",
            controller: "AdsController"
        })
        .state("main.create_ads", {
            url: "/create_ads",
            templateUrl: "template/center/ads/create_ads.html",
            controller: "CreateAdsController"
        })
        .state("main.put_ad", {
            url: "/put_ad",
            templateUrl: "template/center/ads/put_ad.html",
            controller: "PutAdController"
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
        .state("main.agent-manage", {
            url: "/agent-manage",
            templateUrl: "template/center/agent/agent-manage.html",
            controller: "AgentManageController"
        })
        .state("main.agent-info", {
            url: "/agent-info",
            templateUrl: "template/center/agent/agent-info.html",
            controller: "AgentInfoController"
        })
        .state("main.create-agent", {
            url: "/create-agent",
            templateUrl: "template/center/agent/create-agent.html",
            controller: "CreateAgentController"
        })
        .state("main.business-manage", {
            url: "/business-manage",
            templateUrl: "template/center/business/business-manage.html",
            controller: "BusinessManageController"
        })
        .state("main.business-info", {
            url: "/business-info",
            templateUrl: "template/center/business/business-info.html",
            controller: "BusinessInfoController"
        })
        .state("main.create-business", {
            url: "/create-business",
            templateUrl: "template/center/business/create-business.html",
            controller: "CreateBusinessController"
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
            templateUrl: "template/center/shop/ourshop.html",
            controller: "OurShopController"
        })
        .state("main.weixin_config", {
            url: "/weixin_config",
            templateUrl: "template/center/shop/weixin_config.html",
            controller: "WeiXinConfigController"
        })
        .state("main.wallet", {
            url: "/wallet",
            templateUrl: "template/center/wallet/wallet.html",
            controller: "WalletsController"
        })
        .state("main.recharge", {
            url: "/recharge",
            templateUrl: "template/center/wallet/recharge.html",
            controller: "RechargeController"
        })
        .state("main.trading-history", {
            url: "/trading-history",
            templateUrl: "template/center/wallet/trading.history.html",
            controller: "TradingHistoryController"
        })
        .state("main.sms-templates", {
            url: "/sms-templates",
            templateUrl: "template/center/marketing/sms-templates.html",
            controller: "SmsTemplatesController"
        })
        .state("main.new-sms-template", {
            url: "/new-sms-template",
            templateUrl: "template/center/marketing/new-sms-template.html",
            controller: "NewSmsTemplateController"
        })
        .state("main.sms-target", {
            url: "/sms-target",
            templateUrl: "template/center/marketing/sms-target.html",
            controller: "SmsTargetController"
        })
        .state("main.account-details", {
            url: "/account-details",
            templateUrl: "template/center/account/details.html",
            controller: "AccountDetailsController"
        })
});