/**
 * Created by chen on 2015/11/17.
 */
iCloudController.controller("SmsTemplatesController", ["$scope", "$http", "$cookieStore", "$grid", "$window",
    function ($scope, $http, $cookieStore, $grid, $window) {
        $grid.initial($scope, $window.API.MARKETING.GET_CURRENT_USER_SMS_TEMPLATES);
        $scope.sendTemplate = function (id) {
            $window.location.href = ["#/main/sms-target?template_id=", id].join("");
        };
        $scope.removeTemplate = function (id) {
            if (confirm("确定删除?")) {
                $http.delete([$window.API.MARKETING.REMOVE_SMS_TEMPLATE, "?key=", $cookieStore.get("key"), "&id=", id].join(""))
                    .success(function (data) {
                        $scope.refresh();
                    })
            }
        }
    }]);

iCloudController.controller("NewSmsTemplateController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        $scope.createTemplate = function (data) {
            $http.post([window.API.MARKETING.NEW_SMS_TEMPLATE, "?key=", $cookieStore.get("key")].join(""), data)
                .success(function (data) {
                    $window.location.href = "#/main/sms-templates";
                })
                .error(function (data) {
                    $window.alert(transform_error_message(data.msg))
                })
        };
    }]);

iCloudController.controller("SmsTargetController", ["$scope", "$http", "$cookieStore", "$window", "$checkBox",
    function ($scope, $http, $cookieStore, $window, $checkBox) {
        var getTargets = function () {
            $http.get([$window.API.MARKETING.GET_CURRENT_USER_MEMBERS, "?key=", $cookieStore.get("key"), "&pageSize=unlimited"].join(""))
                .success(function (data) {
                    $scope.members = data;
                })
        };

        getTargets();

        $checkBox.enableCheck("sms-targets");

        var template_id = get_param($window.location.href, "template_id");

        $scope.send = function () {
            var numbers = [];
            var c = angular.element("#sms-targets :checkbox");
            angular.forEach(c, function (v, k) {
                if (angular.element(v).prop("checked")) {
                    numbers.push(angular.element(v).val())
                }
            });
            var data = {
                "template_id": template_id,
                "phone_numbers": numbers
            };

            $http.post([$window.API.MARKETING.SEND_SMS_TEMPLATE, "?key=", $cookieStore.get("key")].join(""), data)
                .success(function (data) {
                    $window.alert(data.msg);
                })
                .error(function (data) {
                    $window.alert(data.msg);
                })
        }
    }]);


iCloudController.controller("CustomersController", ["$scope", "$http", "$cookieStore", "$window", "$grid",
    function ($scope, $http, $cookieStore, $window, $grid) {
        console.log($grid.initial($scope, $window.API.MARKETING.GET_CURRENT_USER_MEMBERS));

    }]);

iCloudController.controller("CustomersListController", ['$scope', function ($scope) {

}]);

iCloudController.controller("CustomersFlowController", ['$scope', '$timeout', function ($scope, $timeout) {
    $timeout(function () {
        angular.element('a[href="#now"]').click(function (e) {
            e.preventDefault();
        });
        angular.element('a[href="#day"]').click(function (e) {
            e.preventDefault();
        });
        angular.element('a[href="#month"]').click(function (e) {
            e.preventDefault();
        });
    }, 1000);
    var myCharts = echarts.init(document.getElementById("echarts"));
    option = {
        backgroundColor: '#fff',
        legend: {
            data: ['连接数', '进店数', '过客量']
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            name: '小时',
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
        },
        yAxis: {
            name: '人数',
            type: 'value'
        },
        series: [
            {
                name: '连接数',
                type: "line",
                data: [1, 2, 3, 4, 5, 6, 5, 4, 5, 6, 7, 3, 2, 5, 7, 6, 5, 4, 3, 2, 1, 6, 5, 4, 6]
            },
            {
                name: '进店数',
                type: "line",
                data: [45, 12, 22, 12, 47, 15, 12, 11, 15, 12, 32, 12, 14, 15, 16, 31, 55, 14, 25, 12, 62, 41, 51]
            },
            {
                name: '过客量',
                type: "line",
                data: [55, 45, 65, 74, 52, 65, 52, 32, 95, 41, 51, 24, 55, 74, 84, 52, 62, 35, 12, 45, 12, 54, 12, 56, 49, 44, 55]
            }
        ]
    };
    myCharts.setOption(option);
}]);

iCloudController.controller("CustomersLoyaltyController", ['$scope', '$grid', function ($scope, $grid) {
    $grid.initial(($scope, window.API));
    var myCharts = echarts.init(document.getElementById("charts"));
    option = {
        title: {
            text: "用户忠诚度占比"
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        tooltip: {
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            y: "50px",
            data: ["1-2次", "3-5次", "6-9次", "10-14次", "15次以上"]
        },
        series: [
            {
                y: "220px",
                name: "用户忠诚度",
                type: "pie",
                center: ["50%", "60%"],
                radius: "55%",
                data: [
                    {name: "1-2次", value: 100},
                    {name: "3-5次", value: 89},
                    {name: "6-9次", value: 66},
                    {name: "10-14次", value: 54},
                    {name: "15次以上", value: 33}
                ]
            }
        ]
    };
    myCharts.setOption(option);
    myCharts.on('click', function () {
        $("#table_yc").css("display", "table");
    });
    $scope.send_SMS = function () {
        $scope.SMS_table = true;
    }
}]);

iCloudController.controller("CustomersLostController", ['$scope', '$grid', function ($scope, $grid) {
    $grid.initial(($scope, window.API));
    var myCharts = echarts.init(document.getElementById("charts"));
    option = {
        title: {
            text: "用户流失占比"
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        tooltip: {
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            y: "50px",
            data: ["一周以上", "半月以上", "一月以上", "三月以上", "半年以上"]
        },
        series: [
            {
                y: "220px",
                name: "用户忠诚度",
                type: "pie",
                center: ["50%", "60%"],
                radius: "55%",
                data: [
                    {name: "一周以上", value: 100},
                    {name: "半月以上", value: 89},
                    {name: "一月以上", value: 66},
                    {name: "三月以上", value: 54},
                    {name: "半年以上", value: 33}
                ]
            }
        ]
    };
    myCharts.setOption(option);
    myCharts.on('click', function () {
        $("#table_yc").css("display", "table");
    });
    $scope.send_SMS = function () {
        $scope.SMS_table = true;
    }
}]);