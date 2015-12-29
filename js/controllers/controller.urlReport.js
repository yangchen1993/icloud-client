/**
 * Created by chen on 2015/12/29.
 */
iCloudController.controller("UrlReportController", ["$scope", "$http", function ($scope, $http) {
    var myCharts = echarts.init(document.getElementById("url"));
    var option = {
        title: {
            text: "访问次数",
            x:'center'
        },
        tooltip:{},
        xAxis: {
            name: "URL",
            data: ['www.baidu.com', 'm.taobao.com', 'm.jd.com','xxxx','xxxx','xxxxx','xxxxx']
        },
        yAxis: {
            name: "次数",
            type: "value"
        },
        series: [
            {
                name:"访问次数",
                type: "bar",
                data: [100, 200, 300,250,160,330,230]
            }
        ]
    };
    myCharts.setOption(option);
}]);
