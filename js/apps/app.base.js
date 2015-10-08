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
            templateUrl: "template/main.html"
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
        .state("main.eq_management",{
            url:"/eq_management",
            templateUrl:"template/center/rooter/eq_management.html",
            controller:"EqManagementController"
        })
        .state("main.shop_management",{
            url:"/shop_management",
            templateUrl:"template/center/shop/shop_management.html",
            controller:"ShopManagementController"
        })
        .state("main.version_manage",{
            url:"/version_management",
            templateUrl:"template/center/rooter/version_manage.html",
            controller:"VersionManagementController"
        })
        .state("main.firmware_update",{
            url:"/firmware_update",
            templateUrl:"template/center/rooter/firmware_update.html",
            controller:"FirmwareUpdateController"
        })
        .state("main.details",{
            url:"/details",
            templateUrl:"template/center/rooter/details.html",
            controller:"DetailsController"
        })
});