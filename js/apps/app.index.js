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
});