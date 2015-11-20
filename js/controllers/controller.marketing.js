/**
 * Created by chen on 2015/11/17.
 */
iCloudController.controller("SmsTemplatesController", ["$scope", "$http", "$cookieStore", "$grid", "$window",
    function ($scope, $http, $cookieStore, $grid, $window) {
        $grid.initial($scope, $window.API.MARKETING.GET_CURRENT_USER_MSG_TEMPLATES);
        $scope.sendTemplate = function (id) {
            $window.location.href = ["#/main/sms-target?id=", id].join("");
        };
        $scope.removeTemplate = function (id) {
            if (confirm("确定删除?")) {
                $http.delete([$window.API.MARKETING.REMOVE_MSG_TEMPLATE, "?key=", $cookieStore.get("key"), "&id=", id].join(""))
                    .success(function (data) {
                        $scope.refresh();
                    })
            }
        }
    }]);

iCloudController.controller("NewSmsTemplateController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        $scope.createTemplate = function (data) {
            $http.post([window.API.MARKETING.NEW_MSG_TEMPLATE, "?key=", $cookieStore.get("key")].join(""), data)
                .success(function (data) {
                    $window.location.href = "#/main/sms-templates";
                })
        };
    }]);

iCloudController.controller("SmsTargetController", ["$scope", "$http", "$cookieStore", "$window", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $checkBox) {
        var getTargets = function () {
            $http.get([$window.API.MARKETING.GET_CURRENT_USER_MEMBERS, "?key=", $cookieStore.get("key")].join(""))
                .success(function (data) {
                    $scope.members = data;
                })
        };

        getTargets();

        $checkBox.enableCheck("sms-targets");
    }]);
