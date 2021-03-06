/**
 * Created by lee on 2015/10/15.
 */

iCloudController.controller("ShopManagementController", ["$scope", "$http", "$grid", "$window", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", "$blackWhite",
    function ($scope, $http, $grid, $window, $category, $province, $city, $area, $trades, $cookieStore) {
        var show_shop = function () {
            $http.get([window.API.GROUP.GET_CURRENT_USER_ROUTER_GROUPS, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
                $scope.shop = data.results;
            });
        };
        show_shop();
        $scope.see_routers = function (id) {
            $window.location.href = ["#/main/shop_management_routers?group_id=", id].join("");
        };
        $scope.editShopIndex = function (id) {
            $window.location.href = ["#/main/ourshop?group_id=", id].join("");
        };
        $scope.edit_shop = function (id) {
            $window.location.href = ["#/main/edit_shop?group_id=", id].join("");
        };
        $scope.delete_shop = function (id) {
            if (confirm("确定删除?")) {
                $http.delete([window.API.GROUP.REMOVE_GROUP, "?key=", $cookieStore.get("key"), "&id=", id].join("")).success(function (data) {
                    show_shop();
                })
            }
        }
    }]);

iCloudController.controller("CreateShopController", ["$scope", "$http", "$category", "$cookieStore", "$districts", "$map", "$q", "$window",
    function ($scope, $http, $category, $cookieStore, $districts, $map, $q, $window) {
        var map = $map.initial("lbsMapContainer");
        var changed_address = ["", "", "", "", ""];
        var getDistrcits = function () {
            $districts.get({adcode: "100000"})
                .success(function (data) {
                    $scope.provinces = data[0].subdistricts;
                })
        };

        getDistrcits();

        $scope.shop = {};

        var provinceWatcher = $scope.$watch('shop.province', function (data) {
            if (data) {
                $scope.cities = [];
                $scope.areas = [];
                $scope.districts = [];

                $districts.get({id: data})
                    .success(function (data) {
                        $scope.cities = data[0].subdistricts;
                    });


                var index_prov = _.findIndex($scope.provinces, {
                    id: data
                });

                changed_address[0] = "";
                changed_address[1] = "";
                changed_address[2] = "";
                changed_address[3] = "";
                changed_address[4] = "";

                if (index_prov != -1) {
                    changed_address[0] = $scope.provinces[index_prov].name;
                }

                map.getGeocoder(changed_address.join(""));
            }

        });


        var cityWatcher = $scope.$watch('shop.city', function (data) {
            if (data) {
                $scope.areas = [];
                $scope.districts = [];

                $districts.get({id: data})
                    .success(function (data) {
                        $scope.areas = data[0].subdistricts;
                    });


                var citiesPromise = function () {
                    return $q(function (resolve, reject) {
                        var i = setInterval(function () {
                            if ($scope.cities && $scope.cities.length > 0) {
                                clearInterval(i);
                                resolve($scope.cities)
                            }
                        }, 100)
                    })
                };


                citiesPromise().then(function (value) {
                    console.log("promise resolve");

                    var index_city = _.findIndex(value, {
                        id: data
                    });

                    changed_address[1] = "";
                    changed_address[2] = "";
                    changed_address[3] = "";
                    changed_address[4] = "";

                    if (index_city != -1) {
                        changed_address[1] = value[index_city].name;
                    }

                    console.log("city changed:", changed_address.join(""));

                    map.getGeocoder(changed_address.join(""));
                }, function () {
                    console.log("promise reject")
                })
            }
        });

        var areaWatcher = $scope.$watch('shop.area', function (data) {
            if (data) {
                $scope.districts = [];

                $districts.get({id: data})
                    .success(function (data) {
                        $scope.districts = data[0].subdistricts;
                    });

                var areasPromise = function () {
                    return $q(function (r, j) {
                        var i = setInterval(function () {
                            if ($scope.areas && $scope.areas.length > 0) {
                                clearInterval(i);
                                r($scope.areas);
                            }
                        }, 100)
                    })
                };

                areasPromise().then(function () {
                    console.log("promise resolve");
                    var index_area = _.findIndex($scope.areas, {
                        id: data
                    });

                    changed_address[2] = "";
                    changed_address[3] = "";
                    changed_address[4] = "";

                    if (index_area != -1) {
                        changed_address[2] = $scope.areas[index_area].name;
                    }

                    console.log("area changed:", changed_address.join(""));

                    map.getGeocoder(changed_address.join(""));
                })

            }
        });

        var distrcitLoadCompleted = false;


        var districtWatcher = $scope.$watch('shop.district', function (data) {
            if (data) {

                var districtPromise = function () {
                    return $q(function (r, j) {
                        var i = setInterval(function () {
                            if ($scope.districts && $scope.districts.length > 0) {
                                clearInterval(i);
                                r($scope.districts)
                            }
                        }, 100)
                    })
                };

                districtPromise().then(function () {
                    console.log("promise resolve");
                    var index_district = _.findIndex($scope.districts, {
                        id: data
                    });

                    changed_address[3] = "";
                    changed_address[4] = "";

                    if (index_district != -1) {
                        changed_address[3] = $scope.districts[index_district].name;
                    }

                    console.log("district changed:", changed_address.join(""));

                    map.getGeocoder(changed_address.join(""));

                    distrcitLoadCompleted = true;
                })
            }
        });

        var addressWather = $scope.$watch('shop.address', function (data) {
            if (data) {
                var addressPromise = function () {
                    return $q(function (r, j) {
                        var i = setInterval(function () {
                            clearInterval(i);
                            r();
                        }, 200)
                    })
                };

                addressPromise().then(function () {
                    changed_address[4] = "";

                    changed_address[4] = data;

                    console.log("address changed:", changed_address.join(""));
                })
            }
        });


        $category.get().success(function (data) {
                $scope.shop.category = data[0].name;
                $scope.category = data;
            })
            .error(function (data) {
                console.log(data);
            });

        function isImageFile(file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        }

        var imgData;
        $('input[type = "file"]').change(function () {
            var files;
            var img;
            files = $(this).prop('files');
            if (isImageFile(files[0]))
                this.url = URL.createObjectURL(files[0]);
            img = $('<img src="' + this.url + '" style="width:100%;height:100%">');
            $("#img_frame").html(img);
            img.cropper({
                aspectRatio: 120 / 72
            });

            $("#save").click(function () {
                imgData = img.cropper('getCroppedCanvas', {
                    width: 256
                }).toDataURL();
                console.log(imgData);
                $("#show_img").attr('src', imgData);
            });
        });

        $scope.submit = function (shop) {
            shop.img = imgData;
            $http.post([window.API.GROUP.NEW_GROUP, "?key=", $cookieStore.get("key")].join(""), shop).success(function (data) {
                    $window.location.href = "#/main/shop_management";
                })
                .error(function (data) {
                    $window.alert(data.msg);
                })
        }
    }]);

iCloudController.controller("EditShopController", ["$scope", "$http", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", "$districts", "$map", "$q", "$window",
    function ($scope, $http, $category, $province, $city, $area, $trades, $cookieStore, $districts, $map, $q, $window) {
        var id = get_param($window.location.href, "group_id");
        $http.get([$window.API.GROUP.GET_CURRENT_USER_ROUTER_GROUPS, "?key=", $cookieStore.get("key"), "&id=", id].join(""))
            .success(function (data) {
                $scope.edit_shop = data.results[0];

            });
        $category.get().success(function (data) {
                $scope.category = data;
            })
            .error(function (data) {
                console.log(data);
            });

        var map = $map.initial("lbsMapContainer");
        var changed_address = ["", "", "", "", ""];
        var getDistricts = function () {
            $districts.get({adcode: "100000"})
                .success(function (data) {
                    $scope.provinces = data[0].subdistricts;
                })
        };

        getDistricts();

        $scope.edit_shop = {
            "province_id": "",
            "city_id": "",
            "area_id": "",
            "district_id": ""
        };

        var provinceWatcher = $scope.$watch('edit_shop.province', function (data) {
            if (data) {
                $scope.cities = [];
                $scope.areas = [];
                $scope.districts = [];

                $districts.get({id: data})
                    .success(function (data) {
                        $scope.cities = data[0].subdistricts;
                    });


                var index_prov = _.findIndex($scope.provinces, {
                    id: data
                });

                changed_address[0] = "";
                changed_address[1] = "";
                changed_address[2] = "";
                changed_address[3] = "";
                changed_address[4] = "";

                if (index_prov != -1) {
                    changed_address[0] = $scope.provinces[index_prov].name;
                }

                map.getGeocoder(changed_address.join(""));
            }

        });


        var cityWatcher = $scope.$watch('edit_shop.city', function (data) {
            if (data) {
                $scope.areas = [];
                $scope.districts = [];

                $districts.get({id: data})
                    .success(function (data) {
                        $scope.areas = data[0].subdistricts;
                    });


                var citiesPromise = function () {
                    return $q(function (resolve, reject) {
                        var i = setInterval(function () {
                            if ($scope.cities && $scope.cities.length > 0) {
                                clearInterval(i);
                                resolve($scope.cities)
                            }
                        }, 100)
                    })
                };


                citiesPromise().then(function (value) {
                    console.log("promise resolve");

                    var index_city = _.findIndex(value, {
                        id: data
                    });

                    changed_address[1] = "";
                    changed_address[2] = "";
                    changed_address[3] = "";
                    changed_address[4] = "";

                    if (index_city != -1) {
                        changed_address[1] = value[index_city].name;
                    }

                    console.log("city changed:", changed_address.join(""));

                    map.getGeocoder(changed_address.join(""));
                }, function () {
                    console.log("promise reject")
                })
            }
        });

        var areaWatcher = $scope.$watch('edit_shop.area', function (data) {
            if (data) {
                $scope.districts = [];

                $districts.get({id: data})
                    .success(function (data) {
                        $scope.districts = data[0].subdistricts;
                    });

                var areasPromise = function () {
                    return $q(function (r, j) {
                        var i = setInterval(function () {
                            if ($scope.areas && $scope.areas.length > 0) {
                                clearInterval(i);
                                r($scope.areas);
                            }
                        }, 100)
                    })
                };

                areasPromise().then(function () {
                    console.log("promise resolve");
                    var index_area = _.findIndex($scope.areas, {
                        id: data
                    });

                    changed_address[2] = "";
                    changed_address[3] = "";
                    changed_address[4] = "";

                    if (index_area != -1) {
                        changed_address[2] = $scope.areas[index_area].name;
                    }

                    console.log("area changed:", changed_address.join(""));

                    map.getGeocoder(changed_address.join(""));
                })

            }
        });

        var districtLoadCompleted = false;


        var districtWatcher = $scope.$watch('edit_shop.district', function (data) {
            if (data) {

                var districtPromise = function () {
                    return $q(function (r, j) {
                        var i = setInterval(function () {
                            if ($scope.districts && $scope.districts.length > 0) {
                                clearInterval(i);
                                r($scope.districts)
                            }
                        }, 100)
                    })
                };

                districtPromise().then(function () {
                    console.log("promise resolve");
                    var index_district = _.findIndex($scope.districts, {
                        id: data
                    });

                    changed_address[3] = "";
                    changed_address[4] = "";

                    if (index_district != -1) {
                        changed_address[3] = $scope.districts[index_district].name;
                    }

                    console.log("district changed:", changed_address.join(""));

                    map.getGeocoder(changed_address.join(""));

                    districtLoadCompleted = true;
                })
            }
        });

        var addressWather = $scope.$watch('edit_shop.address', function (data) {
            if (data) {

                var addressPromise = function () {
                    return $q(function (j, c) {
                        var i = setInterval(function () {
                            if (districtLoadCompleted) {
                                clearInterval(i);
                                j()
                            }
                        }, 200)
                    })
                };

                addressPromise.then(function () {
                    changed_address[4] = "";

                    changed_address[4] = data;

                    console.log("address changed:", changed_address.join(""));
                })
            }
        });

        function isImageFile(file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        }

        var imgData;
        $('input[type = "file"]').change(function () {
            var files;
            var img;
            files = $(this).prop('files');
            if (isImageFile(files[0]))
                this.url = URL.createObjectURL(files[0]);
            img = $('<img src="' + this.url + '" style="width:100%;height:100%">');
            $("#img_frame").html(img);
            img.cropper({
                aspectRatio: 120 / 72
            });

            $("#save").click(function () {
                imgData = img.cropper('getCroppedCanvas', {
                    width: 640
                }).toDataURL();
                $("#show_img").attr('src', imgData);
            });
        });

        $scope.submit = function (shop) {
            shop.img = imgData;
            $http.put([window.API.GROUP.EDIT_GROUP, "?key=", $cookieStore.get("key")].join(""), shop).success(function (data) {
                    $window.location.href = "#/main/shop_management";
                })
                .error(function (data) {
                    $window.alert(data.msg);
                })
        }
    }]);


iCloudController.controller("ShopManagementRoutersController", ["$scope", "$window", "$http", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", function ($scope, $window, $http, $category, $province, $city, $area, $trades, $cookieStore) {
    var group_id = get_param($window.location.href, "group_id");
    $scope.see_routers_details = function (id) {
        $window.location.href = ["#/main/routers_details?router_id=", id].join("");
    };
    var show_bindRouters = function () {
        var router_list;
        $http.get([window.API.ROUTER.GET_ROUTERS_BY_GROUP, "?key=", $cookieStore.get("key"), "&group_id=", group_id].join("")).success(function (data) {
            router_list = data.results;
            for(var i=0;i<data.count;i++){
                (function(i){
                    $http.get([window.API.WIFICAT.IS_ONLINE, "?router_mac=", data.results[i].mac].join(""))
                        .success(function (data) {
                            router_list[i].online_status = data.online_status;
                        })
                })(i);
            }
        $scope.shop_routers = router_list;
        });


    };
    show_bindRouters();

    var show_selectRouters = function () {
        $scope.router = [];
        $http.get([window.API.ROUTER.GET_CURRENT_USER_ROUTERS, "?key=", $cookieStore.get("key"), "&pageSize=unlimited&groups__id__isnull=True"].join("")).success(function (data) {
            $scope.router = data;
        });
    };
    show_selectRouters();

    var bind = function () {
        $http.put([window.API.ROUTER.ROUTER_BIND, "?key=", $cookieStore.get("key")].join(""), {
            "group": group_id,
            "router": $scope.bind_router
        }).success(function (data) {
                alert(data.msg);
                show_bindRouters();
                show_selectRouters();
            })
            .error(function (data) {
                alert(data.msg);
            })
    };

    $scope.bind_submit = function () {
        bind();
    };

    $scope.unbind_submit = function (mac) {
        $http.delete([window.API.ROUTER.ROUTER_UNBIND, "?key=", $cookieStore.get("key"), "&mac=", mac].join("")).success(function (data) {
            alert(data.msg);
            show_bindRouters();
            show_selectRouters();
        })
    }
}]);

iCloudController.controller("RoutersDetailsController", ["$scope", "$http", "$cookieStore", "$window", "$timeout", function ($scope, $http, $cookieStore, $window, $timeout) {
    var router_id = get_param($window.location.href, "router_id");
    //放行设置
    var reload_blackwhite = function () {
        $scope.type = ["MAC", "域名"];
        $http.get([window.API.ROUTER.GET_ROUTER_BLACK_WHITES, "?key=", $cookieStore.get("key"), "&router=", router_id].join("")).success(function (data) {
            console.log(data);
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
    reload_blackwhite();

    $scope.goToShopManagement = function () {
        $window.location.href = ["#/main/shop_management_routers?group_id=", $scope.group_id].join("")
    };

    $scope.router = {
        "is_black": "0"
    };
    $scope.router1 = {
        "is_black": "0"
    };
    $scope.add_mac = function (data) {
        data.router = router_id;
        data.content_type = "0";
        data.enable = "1";
        $http.post([window.API.ROUTER.NEW_BLACK_WHITES, "?key=", $cookieStore.get("key")].join(""), data).success(function (data) {
                alert("添加成功");
                reload_blackwhite();
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
                reload_blackwhite();
            })
            .error(function (data) {
                alert(data.msg);
            })
    };
    $scope.delete = function (id) {
        var ids = [id];
        $http.delete([window.API.ROUTER.REMOVE_BLACK_WHITES, "?key=", $cookieStore.get("key"), "&ids=", ids.join()].join("")).success(function (data) {
                alert("删除成功");
                reload_blackwhite();
            })
            .error(function (data) {
                alert(data.msg);
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

        $scope.group_id = data.router.router_groups.id;

        var timer;

        //路由器实时信息
        var routerStatus = function () {
            $http.get([window.API.WIFICAT.STATUS, "?router_mac=", data.router.mac].join("")).success(function (data) {
                    $scope.wificat = data;
                    $scope.upTime = parseInt(data.basicInformation.upTime / 60);
                    timer = $timeout(function () {
                        routerStatus();
                    }, 3000)
                })
                .error(function (data) {
                    $scope.error_msg = data.msg;
                });
        };
        routerStatus();

        $scope.$on('$destroy', function () {
            $timeout.cancel(timer)
        });


        //默认认证方式
        if (data.login_type == "手机号认证") {
            $scope.login_types = 1;
        }
        else if (data.login_type == "微信认证") {
            $scope.login_types = 2;
        }
        else if (data.login_type == "收费认证") {
            $scope.login_types = 3;
        }
        else if (data.login_type == "免认证") {
            $scope.login_types = 4;
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

    $timeout(function () {
        angular.element('a[href="#home"]').click(function (e) {
            e.preventDefault();
        });
        angular.element('a[href="#profile"]').click(function (e) {
            e.preventDefault();
        });
    }, 1000);

    var loginType;
    $scope.changeLoginType = function (num) {
        if (num == 1) {
            loginType = "手机号认证";
        }
        else if (num == 2) {
            loginType = "微信认证";
        }
        else if (num == 3) {
            loginType = "收费认证";
        }
        else {
            loginType = "";
        }
        $http.put([window.API.ROUTER.EDIT_ROUTER_SETUP, "?key=", $cookieStore.get("key"), "&router=", router_id].join(""), {"login_type": loginType}).success(function (data) {
                alert(data.msg);
            $scope.login_types = num
            })
            .error(function (data) {
                alert(data.msg)
            });
    };
    $scope.identify_submit = function (data) {
        var times = parseInt(data.hour) * 60 + parseInt(data.minute);
        console.log(times);
        $http.put([window.API.ROUTER.EDIT_ROUTER_SETUP, "?key=", $cookieStore.get("key"), "&router=", router_id].join(""), {
            "auth_period": times,
            "auth_limit_times": data.num
        }).success(function (data) {
                $window.alert(data.msg);
            })
            .error(function (data) {
                $window.alert(data.msg);
            })
    };

    $scope.weixin_load = function () {
        $window.location.href = ["#/main/weixin_config?group_id=", $scope.group_id].join("");
    };

}]);

iCloudController.controller("WeiXinConfigController", ["$scope", "$http", "$cookieStore", function ($scope, $http, $cookieStore) {
    var group_id = get_param(location.href, "group_id");
    $http.get([window.API.WEIXIN.GET_WECHAT, "?group_id=", group_id, "&key=", $cookieStore.get("key")].join("")).success(function (data) {
        $scope.weixin = data;
    });
    $scope.submit = function (weixin) {
        $http.post([window.API.WEIXIN.NEW_WECHAT, "?key=", $cookieStore.get("key")].join(""), weixin).success(function (data) {
                alert(data.msg);
                $window.location.href = ["#/main/details?router_id=", router_id].join("");

            })
            .error(function (data) {
                alert(data.msg);
                $window.location.href = ["#/main/details?router_id=", router_id].join("");

            })
    };
    $scope.routerDetails = function () {
        $window.location.href = ["#/main/details?router_id=", router_id].join("");
    }
}]);


iCloudController.controller("BusinessManageController", ["$scope", "$http", "$cookieStore", "$window", "$grid",
    function ($scope, $http, $cookieStore, $window, $grid) {
        function customers_flow(){
            $grid.initial($scope, window.API.USER.GET_SUB_BUSINESSES);
        }
        customers_flow();
        $scope.delete_shanghu = function(id){
            if(confirm("删除商户后，商户所属路由自动回归，商户不能再登录云平台，是否继续？")){
                if(confirm("您真的要删除此用户吗？")){
                    $http.delete([window.API.USER.REMOVE_BUSINESS,"?key=",$cookieStore.get("key"),"&id=",id].join("")).success(function(data){
                        alert(data.msg);
                        customers_flow();
                    })
                        .error(function(data){
                            alert(data.msg);
                        })
                }
            }

        };

        $scope.search = function(){
            var data_ = {};
            data_.username = $scope.tel;
            $scope.filtering(data_);
        };

        $scope.surf = function(username){
            location.href = ["#/main/functions-manage","?username=",username].join("")
        }
    }]);

iCloudController.controller("FunctionsManageController",["$scope","$http","$cookieStore",function($scope,$http,$cookieStore){
    $scope.username = get_param(location.href,"username");
    $http.get([window.API.CHARGESYSTEM.GET_ALL_FUNCTIONS,"?key=",$cookieStore.get("key")].join("")).success(function(data){
        console.log(data);
        $scope.data_ = data.results;
    });

    $http.get([window.API.CHARGESYSTEM.GET_ALL_FUNCTIONS,"?key=",$cookieStore.get("key"),"&user__username=",$scope.username].join("")).success(function(data){
        console.log(data.results);
        var ids = _.pluck(data.results,'id');
        $scope.isOpen = function(id){
            var isExit = _.indexOf(ids,id);
            if(isExit != -1){
                return "取消";
            }
            else {
                return "开通";
            }
        }
    });
    $scope.submit = function(id,index){
        console.log($("#isOpen"+index).html());
        if($("#isOpen"+index).html() == "开通"){
            $http.put([window.API.CHARGESYSTEM.OPEN_FUNCTION_TO_USER,"?key=",$cookieStore.get("key"),"&id=",id].join(""),{"username":$scope.username}).success(function(data){
                alert(data.msg);
                location.reload();
            })
        }
        else if($("#isOpen"+index).html() == "取消"){
            $http.put([window.API.CHARGESYSTEM.CLOSE_FUNCTION_TO_USER,"?key=",$cookieStore.get("key"),"&id=",id].join(""),{"username":$scope.username}).success(function(data){
                alert(data.msg);
                location.reload();
            })
        }
    }
}]);

iCloudController.controller("BusinessInfoController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        var unique = get_param($window.location.href, "unique");
        $http.get([window.API.USER.GET_USER_INFO_BY_TEL, "?key=", $cookieStore.get("key"), "&unique=", unique].join("")).success(function (data) {
            $scope.business = data;
        });
    }]);


iCloudController.controller("CreateBusinessController", ["$scope", "$http", "$cookieStore", "$window", "$province", "$city", "$area", "$districts",
    function ($scope, $http, $cookieStore, $window, $province, $city, $area, $districts) {

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

        $scope.submit = function () {
            $http.post([window.API.USER.CREATE_BUSINESS, "?key=", $cookieStore.get("key")].join(""), $scope.business)
                .success(function (data) {
                    alert(data.msg);
                    $window.location.href = "#/main/business-manage";
                })
                .error(function (data) {
                    $window.alert(data.msg)
                })
        };
    }]);
