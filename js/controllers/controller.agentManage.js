/**
 * Created by chen on 2015/10/21.
 */
iCloudController.controller("AgentManageController", ['$scope', '$grid', '$rootScope',function ($scope, $grid, $rootScope) {
    setTimeout(function(){
        $scope.isAgent = $rootScope.isAgent;
        $grid.initial($scope, window.API.USER.GET_SUB_USERS);
    },500);

}]);

iCloudController.controller("CreateAgentController", ['$scope', '$http', '$cookieStore', '$province', '$city', '$area',
    function ($scope, $http, $cookieStore, $province, $city, $area) {
        var province = $province.get();
        province.success(function (data) {
            $scope.province1 = data;
        });
        $scope.select_p = function (index) {
            var city = $city.get(index);
            city.success(function (data) {
                $scope.city1 = data;
            })
        };
        $scope.select_c = function (index) {
            var area = $area.get(index);
            area.success(function (data) {
                $scope.area1 = data;
            })
        };
        province.success(function (data) {
            $scope.province2 = data;
        });
        $scope.select_p_live = function (index) {
            var city = $city.get(index);
            city.success(function (data) {
                $scope.city2 = data;
            })
        };
        $scope.select_c_live = function (index) {
            var area = $area.get(index);
            area.success(function (data) {
                $scope.area2 = data;
            })
        };
        $http.get([window.API.USER.SUB_USER_ROLES,"?key=",$cookieStore.get("key")].join(""))
            .success(function (data) {
                $scope.agent_grade =[];
                for(var i=0;i<data.length;i++){
                    if(data[i].name !="商家")
                    $scope.agent_grade.push(data[i]);
                }
                $scope.agent = {
                    "role": data[0].id
                    };
            });

        $http.get([window.API.USER.SUB_USER_SCOPES,"?key=",$cookieStore.get("key")].join("")).success(function(data){
            $scope.agent.province = data[0].province_id;
        });

        //$http.get([$window.agent_url, "get_current_user/", "?key=", key].join(""))
        //    .success(function (data) {
        //        var address = data;
        //        $scope.agent.province = address.province_id;
        //        $scope.$watch("agent.province", function (data) {
        //            $city.get(data).success(function (data) {
        //                $scope.city1 = data;
        //                $scope.agent.city = address.city_id;
        //            });
        //        });
        //        $scope.$watch("agent.city", function (data) {
        //            if (data) {
        //                $area.get(data).success(function (data) {
        //                    $scope.area1 = data;
        //                    $scope.agent.area = address.area_id;
        //                });
        //            }
        //        })
        //    })
        //    .error(function (data) {
        //        console.log(data);
        //    });

        $scope.submit = function () {
            console.log($scope.agent);
            $http.post([window.API.USER.CREATE_AGENT,"?key=", $cookieStore.get("key")].join(""), $scope.agent).success(function (data) {
                alert(data.msg);
                location.href = "#/main/agent_manage";
            });
        };
    }]);

iCloudController.controller("CreateBusinessController", ['$scope', '$http', '$cookieStore', '$province', '$city', '$area', '$window',
    function ($scope, $http, $cookieStore, $province, $city, $area, $window) {
        var province = $province.get();
        province.success(function (data) {
            $scope.province1 = data;
        });
        $scope.select_p = function (index) {
            var city = $city.get(index);
            city.success(function (data) {
                $scope.city1 = data;
            })
        };
        $scope.select_c = function (index) {
            var area = $area.get(index);
            area.success(function (data) {
                $scope.area1 = data;
            })
        };
        //
        //$scope.business = {};
        //$scope.check_tel = function () {
        //    if ($scope.business.tel.length != 11) {
        //        alert("手机号码位数不正确，请重新输入！");
        //    }
        //};
        //$scope.check_password = function () {
        //    if ($scope.pass != $scope.business.password)
        //        alert("两次输入密码不一致，请从新输入！");
        //};
        //$scope.check_idCard = function () {
        //    if ($scope.business.id_card.length != 16 && $scope.business.id_card.length != 18) {
        //        alert("身份证位数不正确，请从新输入！");
        //    }
        //};
        //$http.get([$window.current_user_url, "?key=", $cookieStore.get("key")].join(""))
        //    .success(function (data) {
        //        var address = data;
        //        $scope.business.province = address.province_id;
        //        $scope.$watch("business.province", function (data) {
        //            $city.get(data).success(function (data) {
        //                $scope.city1 = data;
        //                $scope.business.city = address.city_id;
        //            });
        //        });
        //        $scope.$watch("business.city", function (data) {
        //            if (data) {
        //                $area.get(data).success(function (data) {
        //                    $scope.area1 = data;
        //                    $scope.business.area = address.area_id;
        //                });
        //            }
        //        })
        //    })
        //    .error(function (data) {
        //        console.log(data);
        //    });

        $http.get([window.API.USER.SUB_USER_ROLES,"?key=",$cookieStore.get("key")].join(""))
            .success(function (data) {
                console.log(data);
                for(var i=0;i<data.length;i++)
                if(data[i].name = "商家"){
                    $scope.business = {
                        "role":data[i].id
                    }
                }
            });
        $scope.submit = function () {
            console.log($scope.business);
            $http.post([window.API.USER.CREATE_AGENT, "?key=",$cookieStore.get("key")].join(""), $scope.business).success(function (data) {
                alert(data.msg);
                location.href = "#/main/agent_manage";
            });
        };


    }]);
iCloudController.controller("AgentMessageController", ['$scope', '$grid', '$http', '$cookieStore', '$window',
    function ($scope, $grid, $http, $cookieStore, $window) {
        $scope.$on("executeAgentId", function (e, agentId) {
            $http.get([$window.current_user_url, agentId, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
                console.log(data);
                $scope.agent = data;
            })
        })
    }]);