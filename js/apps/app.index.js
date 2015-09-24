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
});