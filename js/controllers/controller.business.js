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
            $window.location.href = ["#/main/shop_management_routers?id=", id].join("");
        };
        $scope.editShopIndex = function (id) {
            $window.location.href = ["#/main/ourshop?id=", id].join("");
        };
        $scope.edit_shop = function (id) {
            $window.location.href = ["#/main/edit_shop?shop_id=", id].join("");
        };
        $scope.delete_shop = function (id) {
            if (confirm("确定删除?")) {
                $http.delete([window.API.GROUP.REMOVE_GROUP, "?key=", $cookieStore.get("key"), "&id=", id].join("")).success(function (data) {
                    show_shop();
                })
            }
        }
    }]);

iCloudController.controller("CreateShopController", ["$scope", "$http", "$category", "$cookieStore", "$districts", "$map",
    function ($scope, $http, $category, $cookieStore, $districts, $map) {
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

        $scope.$watch('shop', function (newData, oldData) {
            if (newData && oldData) {

                if (newData.province && newData.province != oldData.province) {
                    $scope.cities = {};
                    $scope.areas = {};

                    $districts.get({id: newData.province})
                        .success(function (data) {
                            $scope.cities = data[0].subdistricts;
                        });

                    var index_prov = _.findIndex($scope.provinces, {
                        id: newData.province
                    });

                    if (index_prov != -1) {
                        changed_address[0] = $scope.provinces[index_prov].name;
                        changed_address[1] = "";
                        changed_address[2] = "";
                        changed_address[3] = "";
                        changed_address[4] = "";
                    }

                    map.getGeocoder(changed_address.join(""))

                }
                if (newData.city && newData.city != oldData.city) {
                    console.log(newData, oldData, "city changed");
                    $scope.areas = {};
                    $districts.get({id: newData.city})
                        .success(function (data) {
                            $scope.areas = data[0].subdistricts;
                        });

                    var index_city = _.findIndex($scope.cities, {
                        id: newData.city
                    });

                    if (index_city != -1) {
                        changed_address[1] = $scope.cities[index_city].name;
                        changed_address[2] = "";
                        changed_address[3] = "";
                        changed_address[4] = "";
                    }

                    map.getGeocoder(changed_address.join(""))
                }
                if (newData.area && newData.area != oldData.area) {
                    console.log(newData, oldData, "area changed");

                    var index_area = _.findIndex($scope.areas, {
                        id: newData.area
                    });

                    $districts.get({id: newData.area})
                        .success(function (data) {
                            $scope.districts = data[0].subdistricts;
                        });


                    if (index_area != -1) {
                        changed_address[2] = $scope.areas[index_area].name;
                        changed_address[3] = "";
                        changed_address[4] = ""
                    }

                    map.getGeocoder(changed_address.join(""))
                }

                if (newData.district && newData.district != oldData.district) {
                    console.log(newData, oldData, "district changed");
                    var index_district = _.findIndex($scope.districts, {
                        id: newData.district
                    });

                    if (index_area != -1) {
                        changed_address[3] = $scope.districts[index_district].name;
                        changed_address[4] = "";
                    }

                    map.getGeocoder(changed_address.join(""))
                }

                if (

                    newData.address != oldData.address) {
                    console.log(newData, oldData, "address changed");

                    changed_address[4] = newData.address;

                    map.getGeocoder(changed_address.join(""))
                }
            }
        }, true);

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
                    alert(data.msg);
                    location.href = "#/main/shop_management";
                })
                .error(function (data) {
                    alert(data.msg);
                })
        }
    }]);

iCloudController.controller("EditShopController", ["$scope", "$http", "$category", "$province", "$city", "$area", "$trades", "$cookieStore","$districts","$map", function ($scope, $http, $category, $province, $city, $area, $trades, $cookieStore,$districts,$map) {
    var id = get_param(window.location.href);
    $http.get([window.API.GROUP.GET_CURRENT_USER_ROUTER_GROUPS, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        for (var i = 0; i < data.count; i++) {
            if (data.results[i].id == id) {
                $scope.edit_shop = data.results[i];
            }
        }
        console.log($scope.edit_shop);
    });
    $category.get().success(function (data) {
            $scope.category = data;
        })
        .error(function (data) {
            console.log(data);
        });

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

    $scope.$watch('edit_shop', function (newData, oldData) {
        if (newData && oldData) {

            if (newData.province && newData.province != oldData.province) {
                $scope.cities = {};
                $scope.areas = {};

                $districts.get({id: newData.province})
                    .success(function (data) {
                        $scope.cities = data[0].subdistricts;
                    });

                var index_prov = _.findIndex($scope.provinces, {
                    id: newData.province
                });

                if (index_prov != -1) {
                    changed_address[0] = $scope.provinces[index_prov].name;
                    changed_address[1] = "";
                    changed_address[2] = "";
                    changed_address[3] = "";
                    changed_address[4] = "";
                }

                map.getGeocoder(changed_address.join(""))

            }
            if (newData.city && newData.city != oldData.city) {
                console.log(newData, oldData, "city changed");
                $scope.areas = {};
                $districts.get({id: newData.city})
                    .success(function (data) {
                        $scope.areas = data[0].subdistricts;
                    });

                var index_city = _.findIndex($scope.cities, {
                    id: newData.city
                });

                if (index_city != -1) {
                    changed_address[1] = $scope.cities[index_city].name;
                    changed_address[2] = "";
                    changed_address[3] = "";
                    changed_address[4] = "";
                }

                map.getGeocoder(changed_address.join(""))
            }
            if (newData.area && newData.area != oldData.area) {
                console.log(newData, oldData, "area changed");

                var index_area = _.findIndex($scope.areas, {
                    id: newData.area
                });

                $districts.get({id: newData.area})
                    .success(function (data) {
                        $scope.districts = data[0].subdistricts;
                    });


                if (index_area != -1) {
                    changed_address[2] = $scope.areas[index_area].name;
                    changed_address[3] = "";
                    changed_address[4] = ""
                }

                map.getGeocoder(changed_address.join(""))
            }

            if (newData.district && newData.district != oldData.district) {
                console.log(newData, oldData, "district changed");
                var index_district = _.findIndex($scope.areas, {
                    id: newData.area
                });

                if (index_area != -1) {
                    changed_address[3] = $scope.districts[index_district].name;
                    changed_address[4] = "";
                }

                map.getGeocoder(changed_address.join(""))
            }

            if (newData.address && newData.address != oldData.address) {
                console.log(newData, oldData, "address changed");

                changed_address[4] = newData.address;

                map.getGeocoder(changed_address.join(""))
            }
        }
    }, true);
    //$province.get().success(function (data) {
    //    $scope.province = data;
    //    console.log($scope.province);
    //});
    //$scope.select_p = function (id) {
    //    console.log(id);
    //    $city.get(id).success(function (data) {
    //        $scope.city = data;
    //    })
    //};
    //$scope.select_c = function (id) {
    //    $area.get(id).success(function (data) {
    //        $scope.area = data;
    //    })
    //};
    //$scope.select_a = function (id) {
    //    $trades.get(id).success(function (data) {
    //        $scope.trades = data;
    //    })
    //};
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
            console.log(imgData);
            $("#show_img").attr('src', imgData);
        });
    });

    $scope.submit = function (shop) {
        shop.img = imgData;
        $http.put([window.API.GROUP.EDIT_GROUP, "?key=", $cookieStore.get("key")].join(""), shop).success(function (data) {
                alert(data.msg);
                location.href = "#/main/shop_management";
            })
            .error(function (data) {
                console.log(data);
            })
    }
}]);


iCloudController.controller("ShopManagementRoutersController", ["$scope", "$window", "$http", "$category", "$province", "$city", "$area", "$trades", "$cookieStore", function ($scope, $window, $http, $category, $province, $city, $area, $trades, $cookieStore) {
    var shop_id = get_param($window.location.href);
    $scope.see_routers_details = function (id) {
        $window.location.href = ["#/main/routers_details?router=", id].join("");
    };
    var show_bindRouters = function () {
        $http.get([window.API.ROUTER.GET_ROUTERS_BY_GROUP, "?key=", $cookieStore.get("key"), "&group_id=", shop_id].join("")).success(function (data) {
            $scope.shop_routers = data.results;
        });
    };
    show_bindRouters();

    var show_selectRouters = function () {
        $scope.router = [];
        $http.get([window.API.ROUTER.GET_CURRENT_USER_ROUTERS, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
            var unbingRouters = [], k = 0;
            for (var i = 0; i < data.results.length; i++) {
                if (data.results[i].router_groups == null) {
                    unbingRouters[k] = data.results[i];
                    k++;
                }
            }
            $scope.router = unbingRouters;
        });
    };
    show_selectRouters();

    var bind = function () {
        $http.put([window.API.ROUTER.ROUTER_BIND, "?key=", $cookieStore.get("key")].join(""), {
            "group": shop_id,
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
    var router_id = get_param($window.location.href);
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
        $window.location.href = ["#/main/shop_management_routers?id=", shop_id].join("")
    };

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
            reload_blackwhite();
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
    };
    $scope.delete = function (id) {
        var ids = [id];
        console.log(ids);
        $http.delete([window.API.ROUTER.REMOVE_BLACK_WHITES, "?key=", $cookieStore.get("key"), "&ids=", ids.join()].join("")).success(function (data) {
            alert("删除成功");
            reload_blackwhite();
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

        var timer;

        //路由器实时信息
        var routerStatus = function () {
            $http.get([window.API.WIFICAT.STATUS, "?key=", $cookieStore.get("key"), "&router_mac=", data.router.mac].join("")).success(function (data) {
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
            $scope.login_type = 1;
        }
        else if (data.login_type == "微信认证") {
            $scope.login_type = 2;
        }
        else if (data.login_type == "免认证") {
            $scope.login_type = 3;
        } else {
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
        console.log(num);
        if (num == 1) {
            loginType = "手机号认证";
        } else if (num == 2) {
            loginType = "微信认证";
        } else {
            loginType = "";
        }
        $http.put([window.API.ROUTER.EDIT_ROUTER_SETUP, "?key=", $cookieStore.get("key"), "&router=", router_id].join(""), {"login_type": loginType}).success(function (data) {
                alert(data.msg);
            })
            .error(function (data) {
                alert(data.msg)
            });
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
            .error(function (data) {
                alert(data.msg);
            })
    };

    $scope.weixin_load = function () {
        location.href = ["#/main/weixin_config?router_id=", router_id].join("");
    }

}]);

iCloudController.controller("WeiXinConfigController", ["$scope", "$http", "$cookieStore", function ($scope, $http, $cookieStore) {
    var router_id = get_param(location.href);
    $http.get([window.API.WEIXIN.GET_WECHAT, "?key=", $cookieStore.get("key")].join("")).success(function (data) {
        console.log(data);
        $scope.weixin = data;
    });
    $scope.submit = function (weixin) {
        console.log(weixin);
        $http.post([window.API.WEIXIN.NEW_WECHAT, "?key=", $cookieStore.get("key")].join(""), weixin).success(function (data) {
                alert(data.msg);
                location.href = ["#/main/details?router_id=", router_id].join("");
            })
            .error(function (data) {
                alert(data.msg);
            })
    };
    $scope.routerDetails = function () {
        location.href = ["#/main/details?router_id=", router_id].join("");
    }
}]);


iCloudController.controller("BusinessManageController", ["$scope", "$http", "$cookieStore", "$window", "$grid",
    function ($scope, $http, $cookieStore, $window, $grid) {
        $grid.initial($scope, window.API.USER.GET_SUB_BUSINESSES);
    }]);

iCloudController.controller("BusinessInfoController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        var tel = get_param($window.location.href);
        $http.get([window.API.USER.GET_USER_INFO_BY_TEL, "?key=", $cookieStore.get("key"), "&tel=", tel].join("")).success(function (data) {
            $scope.business = data;
        });
    }]);


iCloudController.controller("CreateBusinessController", ["$scope", "$http", "$cookieStore", "$window", "$province", "$city", "$area","$districts",
    function ($scope, $http, $cookieStore, $window, $province, $city, $area, $districts) {

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

        $scope.submit = function () {
            console.log($scope.business);
            $http.post([window.API.USER.CREATE_BUSINESS, "?key=", $cookieStore.get("key")].join(""), $scope.business)
                .success(function (data) {
                    alert(data.msg);
                    location.href = "#/main/agent_manage";
                }).error(function (data) {
                $window.alert(data.msg)
            });
        };
    }]);
