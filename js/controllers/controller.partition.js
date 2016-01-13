/**
 * Created by tubin on 2016/01/12.
 */
iCloudController.controller("CreateAdFlowController", ['$scope', '$http', '$cookieStore', "$window",
    function ($scope, $http, $cookieStore, $window) {

        $http.get([window.API.PARTITION.GET_ACCESSED_ADS_ROUTERS, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
            $scope.ads = data.data;
            $scope.selected=$scope.ads[0].id;//如果想要第一个值

            $scope.ad_flow = {
                "ad_id": data.data[0].id,
                "pv": 0,
                "uv": 0,
                "income": 0
            };
        });
        $scope.select_a = function (id) {
            $scope.ad_flow.ad_id=id;
        };
        $scope.submit = function () {
            if($scope.ad_flow.ad_id=='' || $scope.ad_flow.pv<=0 || $scope.ad_flow.uv<=0 || $scope.ad_flow.income<=0){
                alert("请正确填写信息！");
                return;
            };
            $http.post([window.API.PARTITION.ACCESSED_AD_CREATE_AD_FLOW_ROUTERS, "?key=", $cookieStore.get("key")].join(""), $scope.ad_flow)
                .success(function (data) {
                    alert(data.msg);
                    $window.location.href = "#/main/ad-partition-flow-list";
                })
                .error(function (data) {
                    $window.alert(data.msg);
                });
        };
    }]);

iCloudController.controller("AdFlowListController", ['$scope', '$http', '$cookieStore', "$window", '$grid', '$filter',
    function ($scope, $http, $cookieStore, $window, $grid, $filter) {

        $http.get([window.API.PARTITION.GET_ACCESSED_ADS_ROUTERS, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
            $scope.ads = data.data;
            $scope.selected=$scope.ads[0].id;//如果想要第一个值
            $scope.ad_url=$scope.ads[0].url
            $scope.search = {
                "ad_id": $scope.ads[0].id
            };
        });
        $grid.initial($scope, window.API.PARTITION.GET_ACCESSED_ADS_FLOW_INFO_ROUTERS);
        $scope.select_a = function (id) {
            $scope.search.ad_id=id;
            for(var i=0,l=$scope.ads.length;i<l;i++){
                if($scope.ads[i].id==id)
                {
                    $scope.ad_url=$scope.ads[i].url;
                    return;
                }
            }

        };

        $scope.search_a = function (data) {
            var tmp = angular.copy(data);
            tmp.start_date__gte = $filter('date')(tmp.start_date__gte, 'yyyy-MM-dd');
            tmp.end_date__lte = $filter('date')(tmp.end_date__lte, 'yyyy-MM-dd');
            $scope.filtering(tmp);
            console.log(tmp);
        };
    }]);

iCloudController.controller("AdFlowAgentListController", ['$scope', '$http', '$cookieStore', "$window", '$grid', '$filter',
    function ($scope, $http, $cookieStore, $window, $grid, $filter) {

        var ad_id = get_param(window.location.href, "ad_id");
        var date = get_param(window.location.href, "date");
        var income = get_param(window.location.href, "income");
        var url = get_param(window.location.href, "url");
        $scope.income=income;
        $scope.url=url;
        $grid.initial($scope, window.API.PARTITION.AD_INCOME_PARTITION_ADS_AGENT_ROUTERS,{'ad_id':ad_id,'date':date});
    }]);

iCloudController.controller("AdFlowAgentIncomeController", ['$scope', '$http', '$cookieStore', "$window", '$grid',
    function ($scope, $http, $cookieStore, $window, $grid) {

        $scope.date_list=[{'id':1,'name':'昨天'},{'id':2,'name':'最近一周'},{'id':3,'name':'最近一个月'},{'id':4,'name':'最近三个月'},{'id':5,'name':'最近半年'}];
        $scope.selected=$scope.date_list[0].id;//如果想要第一个值
        $scope.search = {
            "date_type": $scope.date_list[0].id
        };
        $grid.initial($scope, window.API.PARTITION.AD_INCOME_PARTITION_ADS_AGENT_FLOW_INCOME_LIST_ROUTERS,{'date_type':$scope.search.date_type});

        $scope.search_b=function () {
            $http.get([window.API.PARTITION.AD_INCOME_PARTITION_ADS_AGENT_FLOW_INCOME_ROUTERS, "?key=", $cookieStore.get("key")+"&date_type="+$scope.search.date_type].join("")).success(function (data) {
                //$scope.income_info = data;
                if(data)
                    $scope.income_info = data;
                else
                    $scope.income_info={'incomes':0,'pvs':0,'uvs':0,'nums':0};
            });
        };
        $scope.select_a = function (id) {
            $scope.search.date_type=id;
            $scope.search_b();
            var tmp = angular.copy($scope.search);
            tmp.date_type = $scope.search.date_type;
            $scope.filtering(tmp);
            console.log(tmp);
        };
        $scope.search_b();

    }]);

iCloudController.controller("AdFlowIncomeWithdrawController", ['$scope', '$http', '$cookieStore', "$window", '$grid',
    function ($scope, $http, $cookieStore, $window, $grid) {
        $scope.cash=0
        $grid.initial($scope, window.API.PARTITION.AD_INCOME_WITHDRAW_LOG_ROUTERS);

        $scope.withdraw=function () {
            $http.post([window.API.PARTITION.AD_INCOME_WITHDRAW_CREATE_ROUTERS, "?key=", $cookieStore.get("key")].join(""),{'cash':$scope.cash}).success(function (data) {
                alert(data.msg);
                if(data.result==0){
                    $grid.initial($scope, window.API.PARTITION.AD_INCOME_WITHDRAW_LOG_ROUTERS);
                };
            });
        };
    }]);

iCloudController.controller("AdFlowIncomeWithdrawLogController", ['$scope', '$http', '$cookieStore', "$window", '$grid',
    function ($scope, $http, $cookieStore, $window, $grid) {
        $grid.initial($scope, window.API.PARTITION.AD_INCOME_ADMIN_ROUTERS);

        $scope.withdraw=function (id) {
            $http.post([window.API.PARTITION.AD_INCOME_ADMIN_SURE_WITHDRAW_ROUTERS, "?key=", $cookieStore.get("key")].join(""),{'id':id}).success(function (data) {
                alert(data.msg);
                if(data.result==0){
                    $grid.initial($scope, window.API.PARTITION.AD_INCOME_ADMIN_ROUTERS);
                };
            });
        };
    }]);