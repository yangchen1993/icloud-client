/**
 * Created by chen on 2016/1/9.
 */
iCloudController.controller("TaoCanConfigController", ["$scope", "$http", "$cookieStore", function ($scope, $http, $cookieStore) {
    $scope.charge_page = 1;
    var get_packages = function () {
        $http.get([window.API.CHARGESYSTEM.GET_CURRENT_USER_PACKAGES, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
            $scope.packages = data;
        });
    };
    get_packages();
    $scope.checkeds = function (index, data) {
        if (!data) {
            switch (index) {
                case 1:
                    $scope.name = true;
                    break;
                case 2:
                    $scope.price = true;
                    break;
                case 3:
                    $scope.period = true;
                    break;
            }
        }
        else {
            switch (index) {
                case 1:
                    $scope.name = false;
                    break;
                case 2:
                    $scope.price = false;
                    break;
                case 3:
                    $scope.period = false;
                    break;
            }
        }
    };
    $scope.add_taocan = function () {
        if (!$scope.taocan.name || !$scope.taocan.price || !$scope.taocan.period) {
            alert("请填写正确的信息！")
        }
        else {
            $http.post([window.API.CHARGESYSTEM.NEW_PACKAGE, "?key=", $cookieStore.get("key")].join(""), $scope.taocan).success(function (data) {
                alert(data.msg);
                get_packages();
            });
        }
    };

    $scope.delete_taocan = function (id) {
        $http.delete([window.API.CHARGESYSTEM.REMOVE_PACKAGE, "?key=", $cookieStore.get("key"), "&id=", id].join("")).success(function (data) {
                alert(data.msg);
                get_packages();
            })
            .error(function (data) {
                console.log(data);
            })
    }
}]);

iCloudController.controller("UserRechargeController", ["$scope", "$http", "$cookieStore", function ($scope, $http, $cookieStore) {
    $scope.charge_page = 2;

    $http.get([window.API.CHARGESYSTEM.GET_CURRENT_USER_PACKAGES, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        console.log(data.results);
        var data_ = _.sortBy(data.results, 'price');
        $scope.packages = data_;
        $scope.moneyStyle = data_[0].id;
        $scope.surf_time = data_[0].period;
        $scope.pay_money = data_[0].price;
    });
    $scope.changesStyle = function (id, period, price) {
        $scope.moneyStyle = id;
        $scope.surf_time = period;
        $scope.pay_money = price;
    };
    //检查是否已存在此用户
    //$scope.checkout_tel = function(tel){
    //    if(tel){
    //        $http.get([window.API.CHARGESYSTEM.GET_PREPAID_MEMBERS_TEL,"?key=",$cookieStore.get("key"),"&phone=",tel].join("")).success(function(data){
    //                console.log(data.msg);
    //                if(data.msg == "无信息"){
    //                    alert("新用户请设置初始密码！");
    //                    $scope.show_createPass = true;
    //                    $scope.surf_pass = $scope.surf_passed =  parseInt(Math.random()*10000);
    //                    while($scope.surf_passed.toString().length != 4){
    //                        $scope.surf_pass = $scope.surf_passed =  parseInt(Math.random()*10000);
    //                    }
    //                }
    //            })
    //            .error(function(data){
    //                console.log(data);
    //            })
    //    }
    //    else{
    //        alert("充值号码不能为空");
    //    }
    //
    //};
    $scope.checked_pass = function () {
        if ($scope.surf_pass != $scope.surf_passed) {
            $scope.pass_msg = true;
        }
        else if ($scope.surf_pass == $scope.surf_passed) {
            $scope.pass_msg = false;
        }
    };
    $scope.recharge = function () {
        if ($scope.recharge_tel) {
            $http.get([window.API.CHARGESYSTEM.GET_PREPAID_MEMBERS_TEL, "?key=", $cookieStore.get("key"), "&phone=", $scope.recharge_tel].join("")).success(function (data) {
                console.log(data);
                if (data.msg == "无信息") {
                    var default_pass = parseInt(Math.random() * 10000);
                    while (default_pass.toString().length != 4) {
                        default_pass = parseInt(Math.random() * 10000);
                    }
                    var data_ = {};
                    data_.package_id = $scope.moneyStyle;
                    data_.phone = $scope.recharge_tel;
                    data_.password = CryptoJS.MD5(default_pass.toString()).toString();
                    $http.post([window.API.CHARGESYSTEM.NEW_CHARGE_HISTORY, "?key=", $cookieStore.get("key")].join(""), data_).success(function (data) {
                            alert(data.msg + "；新用户初始密码为：" + default_pass);
                            $scope.recharge_tel = ""
                        })
                        .error(function (data) {
                            alert(data.msg);
                        })
                }
                else {
                    var data_ = {};
                    data_.package_id = $scope.moneyStyle;
                    data_.phone = $scope.recharge_tel;
                    $http.post([window.API.CHARGESYSTEM.NEW_CHARGE_HISTORY, "?key=", $cookieStore.get("key")].join(""), data_).success(function (data) {
                            alert(data.msg);
                            $scope.recharge_tel = ""
                        })
                        .error(function (data) {
                            alert(data.msg)
                        })
                }
            });
            //var data = {};
            //data.package_id = $scope.moneyStyle;
            //data.phone = $scope.recharge_tel;
            //if($scope.surf_passed){
            //    console.log($scope.surf_passed);
            //    data.password = CryptoJS.MD5($scope.surf_passed.toString()).toString();
            //}
            //$http.post([window.API.CHARGESYSTEM.NEW_CHARGE_HISTORY, "?key=", $cookieStore.get("key")].join(""), data).success(function (data) {
            //        alert(data.msg);
            //        $scope.recharge_tel = "";
            //        $scope.show_createPass = false;
            //    })
            //    .error(function(data){
            //        alert(data.msg);
            //    })

        }
        else {
            alert("充值号码不能为空");
        }
    }
}]);

iCloudController.controller("RechargeDetailsController", ["$scope", "$http", "$cookieStore", "$grid", "$filter", function ($scope, $http, $cookieStore, $grid, $filter) {
    $scope.charge_page = 3;
    $("#datetimepicker1").datetimepicker({
        format: "yyyy-MM-dd 00:00:00"
    });
    $("#datetimepicker2").datetimepicker({
        format: "yyyy-MM-dd 00:00:00"
    });
    $grid.initial($scope, window.API.CHARGESYSTEM.GET_CURRENT_USER_CHARGE_HISTORY);
    $scope.cancel = function (id, time) {
        console.log($filter('date')(time, 'yyyy-MM-dd') + " " + $filter('date')(new Date(), 'yyyy-MM-dd'));
        if ($filter('date')(time, 'yyyy-MM-dd') == $filter('date')(new Date(), 'yyyy-MM-dd')) {
            $http.delete([window.API.CHARGESYSTEM.CANCEL_CHARGE_HISTORY, "?key=", $cookieStore.get("key"), "&id=", id].join("")).success(function (data) {
                    alert(data.msg);
                    $scope.refresh();
                })
                .error(function (data) {
                    console.log(data);
                })
        }
        else {
            alert("已超过作废时间，不能作废！");
        }
    };
    $scope.search = function () {
        var data_ = {};
        data_.prepaid_member__phone = $scope.tel;
        data_.create_time__gte = $("#datetimepicker1 input")[0].value;
        data_.create_time__lte = $("#datetimepicker2 input")[0].value;
        $scope.filtering(data_);
    };

}]);

iCloudController.controller("UserListController", ["$scope", "$http", "$cookieStore", "$grid", function ($scope, $http, $cookieStore, $grid) {
    $scope.charge_page = 4;
    $("#datetimepicker1").datetimepicker({
        format: "yyyy-MM-dd 00:00:00"
    });
    $("#datetimepicker2").datetimepicker({
        format: "yyyy-MM-dd 00:00:00"
    });
    $("#datetimepicker3").datetimepicker({
        format: "yyyy-MM-dd 00:00:00"
    });
    $("#datetimepicker4").datetimepicker({
        format: "yyyy-MM-dd 00:00:00"
    });

    $grid.initial($scope, window.API.CHARGESYSTEM.GET_CURRENT_USER_PREPAID_MEMBERS);
    $scope.userID = function (id) {
        $scope.id_ = id;
    };
    $scope.save_pass = function (id) {
        if ($scope.surf_newPass == $scope.surf_newPassed)
            $http.put([window.API.CHARGESYSTEM.RESET_PASSWORD, "?key=", $cookieStore.get("key")].join(""), {
                "id": $scope.id_,
                "password": CryptoJS.MD5($scope.surf_newPassed).toString()
            }).success(function (data) {
                alert(data.msg);
                $("#myModal").modal('hide');
                $scope.surf_newPass = "";
                $scope.surf_newPassed = "";
            });
        else
            alert("密码不一致，请重新输入！");
    };

    $scope.search = function () {
        var data_ = {};
        data_.phone = $scope.tel;
        data_.charge_history__modified_time__gte = $("#datetimepicker1 input")[0].value;
        data_.charge_history__modified_time__lte = $("#datetimepicker2 input")[0].value;
        data_.expire_time__gte = $("#datetimepicker3 input")[0].value;
        data_.expire_time__lte = $("#datetimepicker4 input")[0].value;
        $scope.filtering(data_);
    }
}]);
