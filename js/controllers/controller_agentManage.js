/**
 * Created by chen on 2015/10/21.
 */
iCloudController.controller("AgentManageController", ['$scope', '$grid', function ($scope, $grid) {
    $grid.initial($scope, "http://192.168.0.91:8000/api/admin/agent/");
    $scope.see =function(user_id){
        $scope.$emit("send_agentId",user_id);
    }
}]);

iCloudController.controller("CreateAgentController", ['$scope', '$http', '$cookieStore', '$province', '$city', '$area', function ($scope, $http, $cookieStore, $province, $city, $area) {
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

    $scope.agent = {};
    $scope.check_tel =function(){
      if($scope.agent.tel.length!=11){
          alert("手机号码位数不正确，请重新输入！");
      }
    };
    $scope.check_password = function () {
        if ($scope.pass != $scope.agent.password)
            alert("两次输入密码不一致，请从新输入！");
    };
    $scope.check_idCard =function(){
        if($scope.agent.id_card.length!=16&&$scope.agent.id_card.length!=18){
            alert("身份证位数不正确，请从新输入！");
        }
    };
    var key = $cookieStore.get("key");
    $http.get(["http://192.168.0.91:8000/api/admin/agent/roles/", "?key=", key].join(""))
        .success(function (data) {
            $scope.agent_grade = data.msg;
            $scope.agent.role = data.msg[0];
        })
        .error(function (data) {
            console.log(data);
        });


    $http.get(["http://192.168.0.91:8000/api/users/getCurrentUser/", "?key=", key].join(""))
        .success(function (data) {
            var address = data;
            $scope.agent.province = address.province_id;

            //$scope.$watch("agent", function (newValues, oldValues) {
            //    console.log(newValues, oldValues);
            //        $city.get(newValues.province).success(function(data) {
            //            $scope.city1 = data;
            //            $scope.agent.city =address.city_id;
            //        });
            //    if(newValues.city){
            //        $area.get(newValues.city).success(function(data){
            //            $scope.area1 =data;
            //            $scope.agent.area =address.area_id;
            //        });
            //    }
            //},true);

            $scope.$watch("agent.province", function (data) {
                $city.get(data).success(function (data) {
                    $scope.city1 = data;
                    $scope.agent.city = address.city_id;
                });
            });
            $scope.$watch("agent.city", function (data) {
                if (data) {
                    $area.get(data).success(function (data) {
                        $scope.area1 = data;
                        $scope.agent.area = address.area_id;
                    });
                }
            })
        })
        .error(function (data) {
            console.log(data);
        });

    $scope.submit = function () {
        console.log($scope.agent);
        $http.post(["http://192.168.0.91:8000/api/admin/agent/", "?key=", key].join(""), $scope.agent).success(function(data){
            console.log(data);
        });
    };
}]);

iCloudController.controller("CreateBusinessController", ['$scope', '$http', '$cookieStore', '$province', '$city', '$area', function ($scope, $http, $cookieStore, $province, $city, $area) {
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

    $scope.business = {};
    $scope.check_tel =function(){
        if($scope.business.tel.length!=11){
            alert("手机号码位数不正确，请重新输入！");
        }
    };
    $scope.check_password = function () {
        if ($scope.pass != $scope.business.password)
            alert("两次输入密码不一致，请从新输入！");
    };
    $scope.check_idCard =function(){
        if($scope.business.id_card.length!=16&&$scope.business.id_card.length!=18){
            alert("身份证位数不正确，请从新输入！");
        }
    };
    var key = $cookieStore.get("key");
    $http.get(["http://192.168.0.91:8000/api/users/getCurrentUser/", "?key=", key].join(""))
        .success(function (data) {
            var address = data;
            $scope.business.province = address.province_id;
            $scope.$watch("business.province", function (data) {
                $city.get(data).success(function (data) {
                    $scope.city1 = data;
                    $scope.business.city = address.city_id;
                });
            });
            $scope.$watch("business.city", function (data) {
                if (data) {
                    $area.get(data).success(function (data) {
                        $scope.area1 = data;
                        $scope.business.area = address.area_id;
                    });
                }
            })
        })
        .error(function (data) {
            console.log(data);
        });
    $scope.submit = function () {
        $scope.business.role="商家";
        $http.post(["http://192.168.0.91:8000/api/admin/agent/", "?key=", key].join(""), $scope.business).success(function(data){
            console.log(data);
        });
    };


}]);
iCloudController.controller("AgentMessageController", ['$scope', '$grid','$http','$cookieStore', function ($scope, $grid,$http,$cookieStore) {
    $scope.$on("executeAgentId",function(e,agentId){
        $http.get(["http://192.168.0.91:8000/api/users/",agentId,"?key=",$cookieStore.get("key")].join("")).success(function(data){
            console.log(data);
            $scope.agent =data;
        })
    })
}]);

function sss(){
    alert("ddd");
}