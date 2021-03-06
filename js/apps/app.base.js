/**
 * Created by lee on 2015/9/9.
 */

var iCloudApp = angular.module("iCloudApp", ["ui.router", "iCloudController", "iCloudService","iCloudFilter"]);


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
        .state("main.new-device", {
            url: "/new-device",
            templateUrl: "template/center/router/new-device.html",
            controller: "NewDeviceController"
        })
        .state("main.edit-device", {
            url: "/edit-device",
            templateUrl: "template/center/router/edit-device.html",
            controller: "EditDeviceController"
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
        .state("main.functions-manage", {
            url: "/functions-manage",
            templateUrl: "template/center/business/functions-manage.html",
            controller: "FunctionsManageController"
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
        .state("main.customers-list", {
            url: "/customers-list",
            templateUrl: "template/center/marketing/customers-list.html",
            controller: "CustomersListController"
        })
        .state("main.customers-flow", {
            url: "/customers-flow",
            templateUrl: "template/center/marketing/customers-flow.html",
            controller: "CustomersFlowController"
        })
        .state("main.customers-loyalty", {
            url: "/customers-loyalty",
            templateUrl: "template/center/marketing/customers-loyalty.html",
            controller: "CustomersLoyaltyController"
        })
        .state("main.customers-lost", {
            url: "/customers-lost",
            templateUrl: "template/center/marketing/customers-lost.html",
            controller: "CustomersLostController"
        })
        .state("main.sms-target", {
            url: "/sms-target",
            templateUrl: "template/center/marketing/sms-target.html",
            controller: "SmsTargetController"
        })
        .state("main.customers", {
            url: "/customers",
            templateUrl: "template/center/marketing/customers.html",
            controller: "CustomersController"
        })
        .state("main.onlines", {
            url: "/onlines",
            templateUrl: "template/center/marketing/onlines.html",
            controller: "OnlinesController"
        })
        .state("main.account-details", {
            url: "/account-details",
            templateUrl: "template/center/account/details.html",
            controller: "AccountDetailsController"
        })

        .state("main.personal-info", {
            url: "/personal-info",
            templateUrl: "template/center/personal/info.html",
            controller: "PersonalInfoController"
        })
        .state("main.personal-safe", {
            url: "/personal-safe",
            templateUrl: "template/center/personal/safe.html",
            controller: "PersonalSafeController"
        })
        //以下代码实现发布系统功能.
        .state("main.msgsystem-message",{
            url: "/msgsystem-message",
            templateUrl: "template/center/msgsystem/message.html",
            controller: "MessageController"
        })
        //新增"发布中心"，并在发布中心下新增"消息中心".
        .state("main.msgsystem-msglist",{
            url: "/msgsystem-msglist",
            templateUrl: "template/center/msgsystem/history.html",
            controller: "MessageController"
        })
        //"新消息发布"界面.
        .state("main.msgsystem-new",{
            url: "/msgsystem-new",
            templateUrl: "template/center/msgsystem/new.html",
            controller: "MessageController"
        })
        //"内容详情"界面
         .state("main.msgsystem-detail",{
            url: "/msg-detail",
            templateUrl: "template/center/msgsystem/detail.html",
            controller: "MessageDetailController"
        })
        //"更新消息"界面
        .state("main.msgsystem-edit",{
            url: "/msgsystem-edit",
            templateUrl: "template/center/msgsystem/edit.html",
            controller: "MessageEditController"
        })
        .state("main.white-space", {
            url: "/white-space",
            templateUrl: "template/center/jsads/white-space.html",
            controller: "WhiteSpaceController"
        })
        .state("main.open-area", {
            url: "/open-area",
            templateUrl: "template/center/jsads/open-area.html",
            controller: "OpenAreaController"
        })
        .state("main.js-code", {
            url: "/js-code",
            templateUrl: "template/center/jsads/js-code.html",
            controller: "JsCodeController"
        })
        .state("main.help-files", {
            url: "/help-files",
            templateUrl: "template/center/help-files.html",
            controller: "FileController"
        })
        .state("main.taocanConfig", {
            url: "/taocanConfig",
            templateUrl: "template/center/chargeSystem/taocanConfig.html",
            controller: "TaoCanConfigController"
        })
        .state("main.userRecharge", {
            url: "/userRecharge",
            templateUrl: "template/center/chargeSystem/userRecharge.html",
            controller: "UserRechargeController"
        })
        .state("main.rechargeDetails", {
            url: "/rechargeDetails",
            templateUrl: "template/center/chargeSystem/rechargeDetails.html",
            controller: "RechargeDetailsController"
        })
        .state("main.userList", {
            url: "/userList",
            templateUrl: "template/center/chargeSystem/userList.html",
            controller: "UserListController"
        })
        .state("main.urlReport", {
            url: "/urlReport",
            templateUrl: "template/center/urlReport/urlReport.html",
            controller: "UrlReportController"
        })
        .state("main.create-ad", {
            url:"/create-ad",
            templateUrl:"template/center/ad_income_partition/create-ad.html",
            controller:"CreateAdController"
        })
        .state("main.with-cash", {
            url: "/with-cash",
            templateUrl: "template/center/ad_income_partition/with-cash.html",
            controller: "WithCashController"

        })
        .state("main.ad-partition-flow-create", {
            url: "/ad-partition-flow-create",
            templateUrl: "template/center/ad_income_partition/create_ad_flow.html",
            controller: "CreateAdFlowController"
        })
        .state("main.ad-partition-flow-list", {
            url: "/ad-partition-flow-list",
            templateUrl: "template/center/ad_income_partition/ad_flow_details.html",
            controller: "AdFlowListController"
        })
        .state("main.ad-partition-flow-agent-list", {
            url: "/ad-partition-flow-agent-list",
            templateUrl: "template/center/ad_income_partition/ad_flow_agent_details.html",
            controller: "AdFlowAgentListController"
        })
        .state("main.ad-partition-flow-agent-income", {
            url: "/ad-partition-flow-agent-income",
            templateUrl: "template/center/ad_income_partition/ad_flow_agent_income_details.html",
            controller: "AdFlowAgentIncomeController"
        })
        .state("main.ad-flow-agent-income-withdraw", {
            url: "/ad-flow-agent-income-withdraw",
            templateUrl: "template/center/ad_income_partition/withdraw_cash.html",
            controller: "AdFlowIncomeWithdrawController"
        })
        .state("main.ad-flow-agent-income-withdraw-log", {
            url: "/ad-flow-agent-income-withdraw-log",
            templateUrl: "template/center/ad_income_partition/withdraw_logs.html",
            controller: "AdFlowIncomeWithdrawLogController"
        })
        .state("main.ad-flow-ratio", {
            url: "/ad-flow-ratio",
            templateUrl: "template/center/ad_income_partition/set_ratio.html",
            controller: "AdFlowRatioController"
        })
});