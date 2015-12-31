/**
 * Created by chen on 2015/12/29.
 */
iCloudController.controller("UrlReportController", ["$scope", "$http", "$cookieStore", "$districts", function ($scope, $http, $cookieStore, $districts) {
    var echartsUrls = [];
    var echartsNums = [];
    $http.get([window.API.URLREPORT.GET_URL_COLLECT_RULE, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        console.log(data);
        for(var i=0;i<data.charts.length;i++){
            echartsUrls[i] = data.charts[i].url;
            echartsNums[i] = data.charts[i].num;
        }
        $scope.urlRuleName = data.rules;
        $scope.watch_id = function (newData) {
            for (var i = 0; i < data.rules.length; i++) {
                if (data.rules[i].id == newData) {
                    $scope.urlRule = data.rules[i];
                    $scope.addUrlList = data.rules[i].filter_urls;
                    $("#datetimepicker1 input")[0].value = data.rules[i].start_time;
                    $("#datetimepicker2 input")[0].value = data.rules[i].end_time;
                }
            }
        };
    });

    $("#datetimepicker1").datetimepicker({
        format: "yyyy-MM-dd HH:mm:ss"
    });
    $("#datetimepicker2").datetimepicker({
        format: "yyyy-MM-dd HH:mm:ss"
    });
    (function () {
        $districts.get({adcode: "100000"})
            .success(function (data) {
                $scope.provinces = data[0].subdistricts;
            })
    })();
    $scope.select_p = function (data) {
        $districts.get({id: data})
            .success(function (data) {
                $scope.cities = data[0].subdistricts;
            });
    };
    $scope.select_c = function (data) {
        $districts.get({id: data})
            .success(function (data) {
                $scope.areas = data[0].subdistricts;
            });
    };

    $scope.addUrlList = [];
    $scope.add_url = function () {
        $scope.addUrlList.push($scope.addUrl);
        console.log($scope.addUrlList.length)
    };
    $scope.removeUrl = function(){
        for(var i=0;i<$scope.addUrlList.length;i++)
        if($scope.urlRule.filter_urls == $scope.addUrlList[i]){
            $scope.addUrlList.splice(i,1);
        }
        console.log($scope.addUrlList);
    };

    $scope.search_submit = function (data) {
        if($scope.urlId){
            data.id = $scope.urlId;
        }
        data.filter_urls = $scope.addUrlList;
        data.start_time = $("#datetimepicker1 input")[0].value;
        data.end_time = $("#datetimepicker2 input")[0].value;
        data.time_range = 0;
        console.log(data);
        $http.post([window.API.URLREPORT.CREATE_URL_COLLECT_RULE, "?key=", $cookieStore.get("key")].join(""), data).success(function (data) {
            console.log(data.data);
            for(var i=0;i<data.data.length;i++){
                echartsUrls[i] = data.data[i].url;
                echartsNums[i] = data.data[i].num;
            }
            console.log(echartsUrls);
            refash_echarts();
        })
    };

    var refash_echarts = function(){
        setTimeout(function(){
            var myCharts = echarts.init(document.getElementById("url"));
            var option = {
                title: {
                    text: "访问次数",
                    x: 'center'
                },
                tooltip: {},
                xAxis: {
                    name: "URL",
                    data: echartsUrls
                },
                yAxis: {
                    name: "次数",
                    type: "value"
                },
                series: [
                    {
                        name: "访问次数",
                        type: "bar",
                        data: echartsNums
                    }
                ]
            };
            myCharts.setOption(option);
        },1000);
    }
    refash_echarts();



}]);
