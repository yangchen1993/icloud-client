/**
 * Created by chen on 2015/10/21.
 */
iCloudController.controller("AgentManageController", ['$scope', '$grid', '$rootScope', function ($scope, $grid, $rootScope) {
    $grid.initial($scope, window.API.USER.GET_SUB_AGENTS);
}]);

iCloudController.controller("CreateAgentController", ['$scope', '$http', '$cookieStore', '$province', '$city', '$area', "$districts", "$window",
    function ($scope, $http, $cookieStore, $province, $city, $area, $districts, $window) {
        $districts.get({adcode: "100000"}).success(function (data) {
            $scope.provinces = data[0].subdistricts;
        });

        $scope.select_p = function (id) {
            $districts.get({id: id}).success(function (data) {
                $scope.cities = data[0].subdistricts;
            });
        };
        $scope.select_c = function (id) {
            $districts.get({id: id}).success(function (data) {
                $scope.areas = data[0].subdistricts;
            });
        };

        $scope.select_scopeP = function (id) {
            $districts.get({id: id}).success(function (data) {
                $scope.scope_cities = data[0].subdistricts;
            });
        };
        $scope.select_scopeC = function (id) {
            $districts.get({id: id}).success(function (data) {
                $scope.scope_areas = data[0].subdistricts;
            });
        };
        $scope.select_scopeA = function (id) {
            $districts.get({id: id}).success(function (data) {
                $scope.scope_districts = data[0].subdistricts;
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
        //$scope.agent_role = function(id){
        //    console.log(id);
        //};
        $scope.$watch("agent.role", function (newData, oldData) {

            var index = _.findIndex($scope.agent_grade, {
                id: newData
            });

            var roleName = -1;

            if (index > 0) {
                roleName = $scope.agent_grade[index].name;
            }

            if (roleName == '省级代理商') {
                $scope.isCity = false;
                $scope.isArea = false;
                $scope.isDistrict = false;
            }
            else if (roleName == '市级代理商') {
                $scope.isCity = true;
                $scope.isArea = false;
                $scope.isDistrict = false;
            }
            else if (roleName == '区级代理商') {
                $scope.isCity = true;
                $scope.isArea = true;
                $scope.isDistrict = false;
            }
            else if (roleName == '商圈代理商') {
                $scope.isCity = true;
                $scope.isArea = true;
                $scope.isDistrict = true;
            }

        });
        //$http.get([window.API.USER.SUB_USER_SCOPES, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        //    $scope.agent.province = data[0].province_id;
        //});


        $scope.submit = function () {
            $http.post([window.API.USER.CREATE_AGENT, "?key=", $cookieStore.get("key")].join(""), $scope.agent)
                .success(function (data) {
                    $window.location.href = "#/main/agent-manage";
                })
                .error(function (data) {
                    $window.alert(data.msg);
                });
        };
    }]);

iCloudController.controller("AgentInfoController", ['$scope', '$grid', '$http', '$cookieStore', '$window',
    function ($scope, $grid, $http, $cookieStore, $window) {
        var tel = get_param(location.href, "unique");
        $http.get([$window.API.USER.GET_USER_INFO_BY_TEL, "?key=", $cookieStore.get("key"), "&unique=", tel].join(""))
            .success(function (data) {
                $scope.agent = data;
            })
            .error(function (data) {
                $window.alert(data.msg)
            });
    }]);