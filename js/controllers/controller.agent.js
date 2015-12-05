/**
 * Created by chen on 2015/10/21.
 */
iCloudController.controller("AgentManageController", ['$scope', '$grid', '$rootScope', function ($scope, $grid, $rootScope) {
    $grid.initial($scope, window.API.USER.GET_SUB_AGENTS);
}]);

iCloudController.controller("CreateAgentController", ['$scope', '$http', '$cookieStore', '$province', '$city', '$area',"$districts",
    function ($scope, $http, $cookieStore, $province, $city, $area, $districts) {
        $districts.get({adcode: "100000"}).success(function (data) {
            $scope.provinces = data[0].subdistricts;
        });

        $scope.select_p = function (id) {
            $districts.get({id: id}).success(function (data) {
                $scope.cities = data[0].subdistricts;
            });
        };
        $scope.select_c = function (id ){
            $districts.get({id: id}).success(function (data) {
                $scope.areas = data[0].subdistricts;
            });
        };

        $scope.select_p_live = function (id) {
            $districts.get({id: id}).success(function (data) {
                $scope.cities_live = data[0].subdistricts;
            });
        };
        $scope.select_c_live = function (id) {
            $districts.get({id: id}).success(function (data) {
                $scope.areas_live = data[0].subdistricts;
            });
        };
        $http.get([window.API.USER.SUB_USER_ROLES, "?key=", $cookieStore.get("key")].join(""))
            .success(function (data) {
                $scope.agent_grade = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name != "商户")
                        $scope.agent_grade.push(data[i]);
                }
                $scope.agent = {
                    "role": data[0].id
                };
            });

        //$http.get([window.API.USER.SUB_USER_SCOPES, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        //    $scope.agent.province = data[0].province_id;
        //});


        $scope.submit = function () {
            console.log($scope.agent);
            $http.post([window.API.USER.CREATE_AGENT, "?key=", $cookieStore.get("key")].join(""), $scope.agent).success(function (data) {
                alert(data.msg);
                $window.location.href = "#/main/agent-manage";
            });
        };
    }]);

iCloudController.controller("AgentInfoController", ['$scope', '$grid', '$http', '$cookieStore', '$window',
    function ($scope, $grid, $http, $cookieStore, $window) {
        var tel = get_param(location.href);
        $http.get([window.API.USER.GET_USER_INFO_BY_TEL, "?key=", $cookieStore.get("key"), "&tel=", tel].join("")).success(function (data) {
            $scope.agent = data;
        });
    }]);