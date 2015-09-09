/**
 * Created by lee on 2015/9/9.
 */

var myApp = angular.module("myApp", ["ui.router"]);


myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/login");

    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "template/login.html"
        })
});