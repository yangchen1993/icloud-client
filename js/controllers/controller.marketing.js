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

iCloudController.controller("SmsTargetController", ["$scope", "$http", "$cookieStore", "$window", "$checkBox", "$grid", "$q", "$filter",
    function ($scope, $http, $cookieStore, $window, $checkBox, $grid, $q, $filter) {
        $scope.selectedItems = {};
        $scope.selectedItemKeys = _.keys($scope.selectedItems);

        $scope.$watch("selectedItems", function () {
            $scope.selectedItemKeys = _.keys($scope.selectedItems);
        }, true);

        $grid.initial($scope, $window.API.MARKETING.GET_CURRENT_USER_MEMBERS);

        $checkBox.enableCheck($scope, "sms-targets");

        var template_id = get_param($window.location.href, "template_id");

        var numbers = [];
        $scope.add_tel = function (tel) {
            if (!tel) {
                $("#add_tel").collapse('hide');
            }
            else {
                var tel_list = tel.split(/[;；]/);
                numbers = tel_list;
            }
        };
        $scope.memberChecked = function (e, data) {
            if ($(e.target).prop("checked")) {
                $scope.selectedItems[data.id] = data;
            } else {
                delete $scope.selectedItems[data.id];
            }
        };

        $scope.pageLoadingCompleted = function () {

            var checkBoxPromise = function () {
                return $q(function (r, j) {

                    var count = 0;

                    var i = setInterval(function () {

                        var checkBoxes = angular.element("#sms-targets :checkbox");

                        if (checkBoxes.length > 0) {

                            clearInterval(i);

                            return r(checkBoxes);
                        }

                        if (count > 20) {
                            clearInterval(i);
                            j();
                        }

                        count++;
                    }, 200)
                });
            };

            checkBoxPromise().then(function (ck) {
                angular.forEach(ck, function (v, k) {
                    var id = angular.element(v).val();

                    if (_.has($scope.selectedItems, id)) {
                        angular.element(v).prop("checked", true);
                    }

                })
            })

        };

        $scope.checkAllCompleted = function () {
            var checkBoxes = angular.element("#sms-targets :checkbox");

            angular.forEach(checkBoxes, function (v, k) {
                var id = angular.element(v).val();
                var index = _.findIndex($scope.grid.results, {id: parseInt(id)});

                $scope.selectedItems[id] = $scope.grid.results[index]
            })

        };

        $scope.checkInverseCompleted = function () {
            var checkBoxes = angular.element("#sms-targets :checkbox");

            angular.forEach(checkBoxes, function (v, k) {
                var id = angular.element(v).val();

                if (angular.element(v).prop("checked")) {
                    var index = _.findIndex($scope.grid.results, {id: parseInt(id)});

                    if (index >= 0) {
                        $scope.selectedItems[id] = $scope.grid.results[index]
                    }
                } else {
                    delete $scope.selectedItems[id]
                }

            })

        };

        $scope.removeFromSelectedList = function (key) {
            var checkBoxes = angular.element("#sms-targets :checkbox");
            angular.forEach(checkBoxes, function (v, k) {
                if (angular.element(v).val() == $scope.selectedItems[key].id) {
                    angular.element(v).prop("checked", false);
                }
            });

            delete $scope.selectedItems[key];
        };

        $scope.clearSelectedList = function () {
            $scope.selectedItems = {};
        };

        $scope.send = function () {

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
        };

        $("#datetimepicker1").datetimepicker({
            format: "yyyy/MM/dd"
        });
        $("#datetimepicker2").datetimepicker({
            format: "yyyy-MM-dd"
        });
        $("#datetimepicker3").datetimepicker({
            format: "yyyy-MM-dd"
        });
        $("#datetimepicker4").datetimepicker({
            format: "yyyy-MM-dd"
        });

        $scope.search = function () {
            var tmp;
            tmp = {
                "create_time__gte": $filter('date')($("#datetimepicker1 input")[0].value, 'yyyy-MM-dd HH:mm:ss'),
                "create_time__lte": $filter('date')($("#datetimepicker2 input")[0].value, 'yyyy-MM-dd HH:mm:ss'),
                "modified_time__gte": $filter('date')($("#datetimepicker3 input")[0].value, 'yyyy-MM-dd HH:mm:ss'),
                "modified_time__lte": $filter('date')($("#datetimepicker4 input")[0].value, 'yyyy-MM-dd HH:mm:ss')
            };
            console.log(tmp);
            $scope.filtering(tmp);
        }
    }]);


iCloudController.controller("CustomersController", ["$scope", "$http", "$cookieStore", "$window", "$grid",
    function ($scope, $http, $cookieStore, $window, $grid) {
        console.log($grid.initial($scope, $window.API.MARKETING.GET_CURRENT_USER_MEMBERS));

    }]);

iCloudController.controller("CustomersListController", ['$scope', function ($scope) {

}]);

iCloudController.controller("CustomersFlowController", ['$scope', '$timeout', '$http', '$cookieStore', '$filter', function ($scope, $timeout, $http, $cookieStore, $filter) {
    $("#datetimepicker1").datetimepicker({
        format: "yyyy-MM-dd"
    });
    $("#datetimepicker2").datetimepicker({
        format: "yyyy-MM-dd"
    });
    $scope.search = function () {
        console.log($("#datetimepicker1 input")[0].value + "到" + $("#datetimepicker2 input")[0].value);

        duibi($("#datetimepicker1 input")[0].value, $("#datetimepicker2 input")[0].value);
        function duibi(a, b) {
            var arr = a.split("-");
            var starttime = new Date(arr[0], arr[1], arr[2]);
            var starttimes = starttime.getTime();

            var arrs = b.split("-");
            var lktime = new Date(arrs[0], arrs[1], arrs[2]);
            var lktimes = lktime.getTime();

            if (starttimes >= lktimes) {
                alert('开始时间大于离开时间，请检查');
                return false;
            }
            else
                return true;
        }
    };
    //每小时店铺客流情况
    var myDate = new Date();
    var today_time = $filter('date')(myDate, 'yyyy-MM-dd 00:00:00');
    var tomorrow_time = $filter('date')(new Date(myDate.setDate(myDate.getDate() + 1)), 'yyyy-MM-dd 00:00:00');
    var allX = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'];
    var onlineData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var comeInData = angular.copy(onlineData);
    var passData = angular.copy(onlineData);
    var myCharts_now = echarts.init(document.getElementById("echarts_now"));
    var inlineDatas = 0;
    var comeInDatas = 0;
    var passDatas = 0;

    $http.get([window.API.MARKETING.GET_CURRENT_HOUR_INFO, "?key=", $cookieStore.get("key"), "&page=1&time_range_end__lt=", tomorrow_time, "&time_range_start__gte=", today_time].join("")).success(function (data) {
        console.log(data);
        for (var i = 0; i < data.count; i++) {
            var start = new Date(data.results[i].time_range_start).getHours();
            var end = new Date(data.results[i].time_range_end).getHours();

            var x = start + "-" + end;

            var index = _.indexOf(allX, x);

             onlineData[index] = data.results[i].online;
            if(i==data.count-1) $scope.now_inline = data.results[i].online;
             comeInData[index] = data.results[i].stay;
             passData[index] = data.results[i].passing;
             inlineDatas = data.results[i].online + inlineDatas;
             comeInDatas = data.results[i].stay + comeInDatas;
             passDatas = data.results[i].passing + passDatas;
        }
        $scope.inline = inlineDatas;
        $scope.comein = comeInDatas;
        $scope.pass = passDatas;
        $scope.dates = 0;
        option_now = {
            backgroundColor: '#fff',
            legend: {
                data: ['在线数', '进店数', '过客量']
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
                boundaryGap: false,
                data: allX
            },
            yAxis: {
                name: '人数',
                type: 'value'
            },
            series: [
                {
                    name: '在线数',
                    type: "line",
                    data: onlineData
                    //data:['1','2','1','3','1','2','3','9','11','12','8','9','11','12','7','13','21','19','18','15','13','10','5','1']
                },
                {
                    name: '进店数',
                    type: "line",
                    data: comeInData
                    //data:['0','1','3','2','4','3','4','11','21','22','19','22','23','25','17','12','17','17','16','24','13','8','5','1']
                },
                {
                    name: '过客量',
                    type: "line",
                    data: passData
                    //data:['12','14','15','14','15','7','13','15','19','18','22','45','33','46','57','58','67','84','57','36','26','32','14','16']
                }
            ]
        };
        myCharts_now.setOption(option_now);
    });


    //每天店铺客流情况
    $http.get([window.API.MARKETING.GET_CURRENT_DAY_INFO, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        console.log(data);
    });
    var myCharts_day = echarts.init(document.getElementById("echarts_day"));
    option_day = {
        backgroundColor: '#fff',
        title: {
            text: "按日期客流量变化"
        },
        legend: {
            data: ['在线数', '进店数', '过客量']
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
            name: '日',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        yAxis: {
            name: '人数',
            type: 'value'
        },
        series: [
            {
                name: '在线数',
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
    myCharts_day.setOption(option_day);

    var myCharts1_day = echarts.init(document.getElementById("echarts1_day"));
    option1_day = {
        backgroundColor: '#fff',
        title: {
            text: "按日新老客户变化"
        },
        legend: {
            data: ['新客户', '老客户']
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
            name: '日',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        yAxis: {
            name: '人数',
            type: 'value'
        },
        series: [
            {
                name: '新客户',
                type: "bar",
                data: [1, 2, 3, 4, 5, 6, 5, 4, 5, 6, 7, 3, 2, 5, 7, 6, 5, 4, 3, 2, 1, 6, 5, 4, 6]
            },
            {
                name: '老客户',
                type: "bar",
                data: [45, 12, 22, 12, 47, 15, 12, 11, 15, 12, 32, 12, 14, 15, 16, 31, 55, 14, 25, 12, 62, 41, 51]
            }
        ]
    };
    myCharts1_day.setOption(option1_day);

    //每月店铺客流情况
    $http.get([window.API.MARKETING.GET_MONTH_INFO, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        console.log(data);
    });
    var myCharts_month = echarts.init(document.getElementById("echarts_month"));
    option_month = {
        backgroundColor: '#fff',
        title: {
            text: "按月客流量变化"
        },
        legend: {
            data: ['在线数', '进店数', '过客量']
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
            name: '月',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
            name: '人数',
            type: 'value'
        },
        series: [
            {
                name: '在线数',
                type: "line",
                data: [1, 2, 3, 4, 5, 6, 5, 4, 5, 6, 7, 3, 2, 5, 7, 6, 5, 4, 3, 2, 1, 6, 5, 4, 6]
            },
            {
                name: '进店数',
                type: "line",
                data: [45, 12, 22, 12, 47, 15, 12, 11, 15, 88, 32, 12, 14, 15, 16, 31, 55, 14, 25, 12, 62, 41, 51]
            },
            {
                name: '过客量',
                type: "line",
                data: [55, 45, 65, 74, 52, 65, 52, 32, 95, 41, 51, 24, 55, 74, 84, 52, 62, 35, 12, 45, 12, 54, 12, 56, 49, 44, 55]
            }
        ]
    };
    myCharts_month.setOption(option_month);

    var myCharts1_month = echarts.init(document.getElementById("echarts1_month"));
    option1_month = {
        backgroundColor: '#fff',
        title: {
            text: "按月新老客户变化"
        },
        legend: {
            data: ['新客户', '老客户']
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
            name: '月',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
            name: '人数',
            type: 'value'
        },
        series: [
            {
                name: '新客户',
                type: "bar",
                data: [1, 2, 3, 4, 5, 6, 5, 4, 5, 6, 7, 3, 2, 5, 7, 6, 5, 4, 3, 2, 1, 6, 5, 4, 6]
            },
            {
                name: '老客户',
                type: "bar",
                data: [45, 12, 22, 12, 47, 15, 12, 11, 15, 12, 32, 12, 14, 15, 16, 31, 55, 14, 25, 12, 62, 41, 51]
            }
        ]
    };
    myCharts1_month.setOption(option1_month);
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