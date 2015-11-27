/**
 * Created by chen on 2015/10/8.
 */
iCloudController.controller("EqManagementController", ['$scope', '$http', '$checkBox', '$grid', '$window', '$category', '$filter', '$province', '$city', '$area',
    function ($scope, $http, $checkBox, $grid, $window, $category, $filter, $province, $city, $area) {
        $scope.status = 1;
        $scope.route = function (num) {
            if (num == 1) {
                $scope.status = 1;
                angular.element("#use").checked = true;
            }
            else {
                $scope.status = 2;
                console.log(angular.element("#nouse1")[0].checked);
            }
        };
        $scope.login_type = {
            "0": "免认证",
            "1": "手机登录",
            "2": "微信登陆"
        };
        $checkBox.enableCheck("table-eq");
        $grid.initial($scope, window.API.ROUTER.GET_CURRENT_USER_ROUTERS);
        //行业类型
        var promise = $category.get();
        promise.success(function (data) {
            $scope.category = data;
        });
        $scope.eq_search = function (data) {
            var tmp = angular.copy(data);
            tmp.create_time_gte = $filter('date')(tmp.create_time_gte, 'yyyy-MM-dd HH:mm:ss');
            tmp.create_time_lte = $filter('date')(tmp.create_time_lte, 'yyyy-MM-dd HH:mm:ss');
            $scope.filtering(tmp);
            console.log(tmp);
        };
        $scope.eq_reset = function () {
            $scope.search.router_groups__name__icontains = "";
            $scope.search.router_groups__category = "选择行业";
            $scope.search.router_groups__trade__province = "省";
            $scope.search.router_groups__trade__city = "市";
            $scope.search.router_groups__trade__area = "区/县";
            $scope.search.mac__icontains = "";
            $scope.search.create_time_gte = "";
            $scope.search.create_time_lte = "";
        };
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

        $scope.see_router = function (id) {
            window.location.href = ["#/main/details?router_id=", id].join("");
        };

        $scope.removeRouter = function (id) {
            $http.delete([$window.API.ROUTER.REMOVE_ROUTER, "?key=", $cookieStore.get("key"), "&id=", id].join(""))
                .success(function (data) {
                    $window.alert(data.msg);
                })
        };

    }]);

iCloudController.controller("NewDeviceController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        $scope.saveDevice = function (device) {
            $http.post([$window.API.ROUTER.NEW_ROUTER, "?key=", $cookieStore.get("key")].join(""), device)
                .success(function (data) {
                    $window.alert(data.msg)
                })
                .error(function (data) {
                    $window.alert(data.msg)
                })
        }
    }]);

iCloudController.controller("EditDeviceController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        var id = get_param($window.location.href);
        $http.get([$window.API.ROUTER.GET_CURRENT_USER_ROUTERS, "?key=", $cookieStore.get("key"), "&id=", id].join(""))
            .success(function (data) {
                if (data.results.length > 0){
                    $scope.router = data.results[0]
                }
            });

        $scope.editRouter = function (router) {
            $http.put([$window.API.ROUTER.EDIT_ROUTER, "?key=", $cookieStore.get("key")].join(""), router)
                .success(function (data) {
                    $window.alert(data.msg)
                })
                .error(function (data) {
                    $window.alert(data.msg)
                })
        }

    }]);


iCloudController.controller("VersionManagementController", ['$scope', '$window', '$http', '$cookieStore', '$grid',
    function ($scope, $window, $http, $cookieStore, $grid) {
        $grid.initial($scope, $window.API.ROUTER.GET_ALL_VERSIONS, {"ordering": "-create_time"});

        $scope.role = $cookieStore.get("role");

        $scope.newVersionModal = function () {
            angular.element("form")[0].reset();
        };

        $scope.newVersion = function (e, data) {

            var data_ = angular.copy(data);

            var file_input = $(e.target[2]);
            var file = file_input[0].files;
            if (file.length == 0) {
                $window.alert("请选择文件");
                return false;
            }
            var formData = new FormData();

            formData.append("file", file[0]);
            formData.append("name", data_.name);
            formData.append("description", data_.description);
            var url = [$window.API.ROUTER.NEW_VERSION, '?key=', $cookieStore.get('key')].join("");
            $http.post(url, formData, {"headers": {"Content-Type": undefined}})
                .success(function (data) {
                    angular.element("#newVersionModal").modal("toggle");
                    $scope.refresh();
                })
                .error(function (data) {
                    $window.alert(transform_error_message(data.msg))
                })
        };

        $scope.remove = function (id) {
            if (confirm("确定删除?删除后无法恢复!")) {
                $http.delete([window.API.ROUTER.REMOVE_VERSION, "?id=", id, "&key=", $cookieStore.get("key")].join(""))
                    .finally(function () {
                        $scope.refresh();
                    })
            }
        }
    }]);

iCloudController.controller("FirmwareUpdateController", ['$scope', '$checkBox', function ($scope, $checkBox) {
    $scope.update = function () {
        if (confirm("升级过程中将会重启路由器，请确定是否需要升级？")) {

        }
    };
    $scope.chazhao = function () {
        var data = prompt("请输入查找内容", "");
        if (data) {
            alert("dvasv");
        }
    };
    $checkBox.enableCheck("table-fireware");
}]);

iCloudController.controller("DetailsController", ['$scope', '$http', '$cookieStore',"$timeout","$q", function ($scope, $http, $cookieStore,$timeout,$q) {
    var router_id = get_param(window.location.href);
    console.log(router_id);
    $scope.modify_ssid = function (ssid) {
        var data = prompt("当前WIFI名称：" + ssid);
        if (data) {
            var key = $cookieStore.get("key");
            $http.put([window.API.ROUTER.ROUTERS_SSID,"?key=", key,"&id=", router_id].join(""), {"ssid": data});
        }
    };
    //放行设置
    var reload_blackwihit = function () {
        $scope.type = ["MAC", "域名"];
        $http.get([window.API.ROUTER.GET_ROUTER_BLACK_WHITES, "?key=", $cookieStore.get("key"), "&router=", router_id].join("")).success(function (data) {
            $scope.policy = data.results;
            for (var i = 0; i < data.results.length; i++) {
                if (data.results[i].is_black) {
                    $scope.policy[i].is_black = "黑名单";
                }
                else {
                    $scope.policy[i].is_black = "白名单";
                }
            }
        });
    };
    reload_blackwihit();
    $scope.router = {
        "is_black": "1"
    };
    $scope.router1 = {
        "is_black": "1"
    };
    $scope.add_mac = function (data) {
        data.router = router_id;
        data.content_type = "0";
        data.enable = "1";
        $http.post([window.API.ROUTER.NEW_BLACK_WHITES, "?key=", $cookieStore.get("key")].join(""), data).success(function (data) {
            alert("添加成功");
            reload_blackwihit();
        })
            .error(function (data) {
                alert(data.msg);
            })
    };
    $scope.add_domain = function (data) {
        data.router = router_id;
        data.content_type = "1";
        data.enable = "1";
        $http.post([window.API.ROUTER.NEW_BLACK_WHITES, "?key=", $cookieStore.get("key")].join(""), data).success(function (data) {
            alert("添加成功");
            reload_blackwihit();
        })
            .error(function (data) {
                alert(data.msg);
            })
    };
    $scope.delete = function (id) {
        var ids = [id];
        console.log(ids);
        $http.delete([window.API.ROUTER.REMOVE_BLACK_WHITES, "?key=", $cookieStore.get("key"), "&ids=", ids.join()].join("")).success(function (data) {
            alert("删除成功");
            reload_blackwihit();
        })
    };
    $scope.filter = {
        "content_type": "",
        "is_black": ""
    };
    $scope.blackwhite_filter = function (data) {
        var filter = angular.copy(data);
        filter.router = router_id;
        $http.get([window.API.ROUTER.GET_ROUTER_BLACK_WHITES, "?key=", $cookieStore.get("key"), "&", $.param(filter)].join("")).success(function (data) {
            $scope.policy = data.results;
            for (var i = 0; i < data.results.length; i++) {
                if (data.results[i].is_black) {
                    $scope.policy[i].is_black = "黑名单";
                }
                else {
                    $scope.policy[i].is_black = "白名单";
                }
            }
        })
    };
    //路由基本信息
    $http.get([window.API.ROUTER.GET_ROUTER_SETUP, "?key=", $cookieStore.get("key"), "&router_id=", router_id].join("")).success(function (data) {
        console.log(data);
        $scope.routers_all = data;

        //路由器实时信息
        //var routerStatusTimeout = $timeout(function ss() {
        //    $http.get([window.API.WIFICAT.STATUS, "?key=", $cookieStore.get("key"), "&router_mac=", data.router.mac].join("")).success(function (data) {
        //        console.log(data);
        //        if (data.msg == "Router offline") {
        //            $scope.wificat = {
        //                "operatingStatus":{
        //                    "accessNumber":"未连接",
        //                    "MemUsaged":"未连接",
        //                    "cpuUtil":"未连接"
        //                },
        //                "basicInformation":{
        //                    "softwareVersion":"未连接"
        //                },
        //                "wanStatus":{
        //                    "wanip":"未连接",
        //                    "speedUp":"未连接",
        //                    "speedDown":"未连接"
        //                }
        //            };
        //            $scope.upTime = "未连接"
        //        }
        //        else{
        //            $scope.wificat = data;
        //            $scope.upTime = parseInt(data.basicInformation.upTime / 60);
        //        }
        //    })
        //        .error(function(data){
        //            console.log("失败");
        //        })
        //}, 3000);
        //$scope.$on("$destroy",function(){
        //    $interval.cancel(routerStatusTimeout);
        //});


        //function ss(){
        //    $http.get([window.API.WIFICAT.STATUS, "?key=", $cookieStore.get("key"), "&router_mac=", data.router.mac].join("")).success(function (data) {
        //        console.log("成功");
        //        setTimeout(ss(),3000);
        //
        //    })
        //        .error(function(data){
        //            console.log("失败");
        //            setTimeout(ss(),3000);
        //        })
        //}
        //
        //ss();


        //默认认证方式
        if (data.login_type == "手机号认证") {
            $scope.login_type=1;
        }
        else if (data.login_type == "微信认证") {
            $scope.login_type=2;
        }
        else if(data.login_type == "免认证") {
            $scope.login_type=3;
        }else{
            ;
        }
        //默认认证时间
        if (data.auth_period <= 60) {
            $scope.identify_time = {
                "hour": 0,
                "minute": data.auth_period,
                "num": data.auth_limit_times
            };
        }
        else {
            $scope.identify_time = {
                "hour": parseInt(data.auth_period / 60),
                "minute": data.auth_period % 60,
                "num": data.auth_limit_times
            };
        }
    });
    var loginType;
    $scope.changeLoginType = function () {
        //var identify_type = "";
        //if ($scope.isActive_phone == 1) {
        //    identify_type="手机号认证";
        //    $scope.isActive_weixin=0;
        //}else if ($scope.isActive_weixin == 1) {
        //    identify_type="微信认证";
        //    $scope.isActive_phone=0;
        //}else{
        //    identify_type="免认证";
        //}
        console.log($scope.login_type);
        if($scope.login_type==1){
            loginType="手机号认证";
        }else if($scope.login_type==2){
            loginType="微信认证";
        }else{
            loginType="";
        }
        $http.put([window.API.ROUTER.EDIT_ROUTER_SETUP, "?key=", $cookieStore.get("key"), "&router=", router_id].join(""), {"login_type": loginType});
    };
    $scope.identify_submit = function (data) {
        console.log(data);
        var times = parseInt(data.hour) * 60 + parseInt(data.minute);
        console.log(times);
        $http.put([window.API.ROUTER.EDIT_ROUTER_SETUP, "?key=", $cookieStore.get("key"), "&router=", router_id].join(""), {
            "auth_period": times,
            "auth_limit_times": data.num
        }).success(function (data) {
            alert(data.msg);
        })
    };

    $scope.weixin_load = function () {
        location.href = ["#/main/weixin_config?routergroup_id=", shop_id].join("");
    }

}]);

iCloudController.controller("IdentifyConfController", ['$scope', function ($scope) {
    $scope.sele = function (data) {
        if (data == 1) $scope.status = 1;
        if (data == 2) $scope.status = 2;
        if (data == 3) $scope.status = 3;
    }
}]);

iCloudController.controller("ReleaseConfController", ['$scope', '$grid', '$cookieStore', '$http', '$checkBox', '$filter', '$category', '$province', '$city', '$area', function ($scope, $grid, $cookieStore, $http, $checkBox, $filter, $category, $province, $city, $area) {
    $checkBox.enableCheck("table-eq");
    var promise = $category.get();
    promise.success(function (data) {
        $scope.category = data;
    });
    $scope.eq_search = function (data) {
        var tmp = angular.copy(data);
        tmp.create_time__gte = $filter('date')(tmp.create_time__gte, 'yyyy-MM-dd HH:mm:ss');
        tmp.create_time__lte = $filter('date')(tmp.create_time__lte, 'yyyy-MM-dd HH:mm:ss');
        $scope.filtering(tmp);
        console.log(tmp);
    };
    $scope.eq_reset = function () {
        $scope.search.groups__name__icontains = "";
        $scope.search.groups__category = "选择行业";
        $scope.search.groups__trade__province = "省";
        $scope.search.groups__trade__city = "市";
        $scope.search.groups__trade__area = "区/县";
        $scope.search.mac__icontains = "";
        $scope.search.create_time__gte = "";
        $scope.search.create_time__lte = "";
    };
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
    var idBox = [];
    $grid.initial($scope, window.API.ROUTER.GET_CURRENT_USER_ROUTERS);
    $scope.conf = function () {
        idBox = [];
        var selector = ["#table-eq", " :checkbox"].join("");
        var checkBoxes = angular.element(selector);
        angular.forEach(checkBoxes, function (v, k) {
            if (angular.element(v)[0].checked) {
                idBox.push(angular.element(v)[0].value);
            }
        });
        if (idBox == "") {
            alert("请选择需要设置的路由器！");
            $scope.is_modal = false;
        }
        else {
            console.log(idBox);
            $scope.is_modal = true;
            var white_mac = 0;
            var white_domain = 0;
            var black_mac = 0;
            var black_domain = 0;
            var key = $cookieStore.get("key");
            $http.get([window.release_url, "?key=", key, "&router_id__in=", idBox].join("")).success(function (data) {
                console.log(data);
                for (var i = 0; i < data.count; i++) {
                    if (data.results[i].is_black) {
                        if (data.results[i].content_type == 0)
                            black_mac++;
                        if (data.results[i].content_type == 1)
                            black_domain++;
                    }
                    else {
                        if (data.results[i].content_type == 0)
                            white_mac++;
                        if (data.results[i].content_type == 1)
                            white_domain++;
                    }
                }
                $scope.white_mac = white_mac;
                $scope.white_domain = white_domain;
                $scope.black_mac = black_mac;
                $scope.black_domain = black_domain;
            })
        }
    };
    $scope.conf_s = function (mac) {

        $scope.is_modal = true;
        var white_mac = 0;
        var white_domain = 0;
        var black_mac = 0;
        var black_domain = 0;
        var key = $cookieStore.get("key");
        $http.get([window.release_url, "?key=", key, "&router_id__in=", idBox].join("")).success(function (data) {
            console.log(data);
            for (var i = 0; i < data.count; i++) {
                if (data.results[i].is_black) {
                    if (data.results[i].content_type == 0)
                        black_mac++;
                    if (data.results[i].content_type == 1)
                        black_domain++;
                }
                else {
                    if (data.results[i].content_type == 0)
                        white_mac++;
                    if (data.results[i].content_type == 1)
                        white_domain++;
                }
            }
            $scope.white_mac = white_mac;
            $scope.white_domain = white_domain;
            $scope.black_mac = black_mac;
            $scope.black_domain = black_domain;
        })
    };
    $scope.mac_open = function (bool) {
        var key = $cookieStore.get("key");
        var postdata = {
            "router_ids": idBox,
            "content_type": 0,
            "is_black": bool,
            "enable": true
        };
        $http.put([window.release_enable_url, "?key=", key].join(""), postdata)
    };
    $scope.mac_down = function (bool) {
        var key = $cookieStore.get("key");
        var postdata = {
            "router_ids": idBox,
            "content_type": 0,
            "is_black": bool,
            "enable": false
        };
        $http.put([window.release_enable_url, "?key=", key].join(""), postdata)
    };
    $scope.domain_open = function (bool) {
        var key = $cookieStore.get("key");
        var postdata = {
            "router_ids": idBox,
            "content_type": 1,
            "is_black": bool,
            "enable": true
        };
        $http.put([window.release_enable_url, "?key=", key].join(""), postdata)
    };
    $scope.domain_down = function (bool) {
        var key = $cookieStore.get("key");
        var postdata = {
            "router_ids": idBox,
            "content_type": 1,
            "is_black": bool,
            "enable": false
        };
        $http.put([window.release_enable_url, "?key=", key].join(""), postdata)
    };
    $scope.addMac = function (bool) {
        var data = prompt("请输入设备MAC码，如：00:00:00:00", "");
        if (data) {
            var postdata = {
                "router_ids": idBox,
                "content": data,
                "content_type": 0,
                "is_black": bool,
                "enable": true
            };
            console.log(postdata);
            var key = $cookieStore.get("key");
            $http.post([window.release_enable_url, "?key=", key].join(""), postdata);
        }

    };
    $scope.addDomain = function (bool) {
        var data = prompt("请输入域名，如：http://www.baidu.com", "");
        if (data) {
            var postdata = {
                "router_ids": idBox,
                "content": data,
                "content_type": 1,
                "is_black": bool,
                "enable": true
            };
            console.log(postdata);
            var key = $cookieStore.get("key");
            $http.post([window.release_enable_url, "?key=", key].join(""), postdata);
        }
    }
}]);

iCloudController.controller("BindingController", ['$scope', function ($scope) {

}]);

iCloudController.controller("InSalesController", ['$scope', function ($scope) {

}]);

iCloudController.controller("DeliveriesController", ["$scope", "$http", "$window", "$cookieStore", "$grid",
    function ($scope, $http, $window, $cookieStore, $grid) {
        $grid.initial($scope, $window.API.ROUTER.GET_CURRENT_USER_DELIVERIES);

        $scope.removeDelivery = function (id) {
            if (confirm("确定删除?")) {
                $http({
                    method: "DELETE",
                    url: [$window.API.ROUTER.REMOVE_DELIVERY, "?key=", $cookieStore.get("key"), "&id=", id].join("")
                }).success(function (data) {
                    $scope.refresh();
                }).error(function (data) {
                    $scope.refresh();
                })
            }
        };
        $scope.toDeliveryDetails = function (id) {
            $window.location.href = ["#/main/delivery-details?deliveryID=", id].join("");
        }
    }]);

iCloudController.controller("CreateDeliveryController", ["$scope", "$http", "$window", "$cookieStore", "$grid",
    function ($scope, $http, $window, $cookieStore, $grid) {
        var checkRouterIsExists = function (mac) {
            if (!_.has($scope.deviceDeliveryList, mac)) {
                $http.get([$window.API.ROUTER.GET_CURRENT_USER_UNUSED_ROUTER_INFO, "?key=", $cookieStore.get("key"), "&mac=", mac, "&"].join(""))
                    .success(function (data) {
                        $scope.deviceDeliveryList[data.mac] = data;
                        $scope.deviceMacs = _.keys($scope.deviceDeliveryList);
                    })
                    .error(function (data) {
                        $scope.checkRouterIsExistsErrorInfo = data.msg;
                    });
            }else{
                $window.alert("该设备已在列表中");
            }
        };

        var checkReceiver = function (receiver) {
            $http.get([$window.API.USER.GET_USER_INFO_BY_TEL, "?key=", $cookieStore.get("key"), "&tel=", receiver].join(""))
                .success(function (data) {
                    $scope.receiverInfo = data;
                })
                .error(function (data) {
                    $scope.receiverInfo = "";
                })
        };

        $scope.deviceDeliveryList = {};

        $scope.addDeviceToDeliveryList = function (data) {
            var data_ = angular.copy(data);
            if (data_) {
                checkRouterIsExists(data_);
            }
        };
        $scope.checkReceiver = function (tel) {
            if (tel) {
                checkReceiver(tel);
            }
        };
        $scope.removeDevice = function (mac) {
            if (_.has($scope.deviceDeliveryList, mac)) {
                delete $scope.deviceDeliveryList[mac];
                $scope.deviceMacs = _.keys($scope.deviceDeliveryList);
            }
        };
        $scope.createDeviceDelivery = function () {
            var data = {
                receiver: $scope.receiverInfo.id,
                address: $scope.addressDetail,
                deviceMacs: $scope.deviceMacs
            };
            $http.post([$window.API.ROUTER.NEW_DELIVERY, "?key=", $cookieStore.get("key")].join(""), data)
                .success(function (data) {
                    $window.alert(data.msg)
                })
                .error(function (data) {
                    $window.alert(data.msg)
                })
        };
    }]);

iCloudController.controller("DeliveryDetailsController", ["$scope", "$http", "$window", "$cookieStore", "$grid",
    function ($scope, $http, $window, $cookieStore, $grid) {
        var deliveryID = get_param($window.location.href);
        var getDeliveryInfo = function () {
            $http.get([$window.API.ROUTER.GET_CURRENT_USER_DELIVERIES, "?key=", $cookieStore.get("key"), "&id=", deliveryID].join(""))
                .success(function (data) {
                    if (data.results.length == 1) {
                        $scope.deliveryInfo = data.results[0];
                    } else {
                        $scope.deliveryInfo = ""
                    }
                })
        };

        getDeliveryInfo();
    }]);

