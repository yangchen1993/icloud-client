/**
 * Created by lee on 2015/11/29.
 */

iCloudController.controller("PersonalInfoController", ["$scope", "$http", "$cookieStore", "$window", "$districts", "$map",
    function ($scope, $http, $cookieStore, $window, $districts, $map) {

        /*var lsbMap = new AMap.Map('lbsMapContainer', {
         resizeEnable: true,
         zoom: 16,
         dragEnable: false
         });

         var getGeocoder = function (keywords) {
         lsbMap.plugin(["AMap.Geocoder"], function () {
         var geocoder = new AMap.Geocoder({
         radius: 1000 //范围，默认：500
         });

         geocoder.getLocation(keywords, function (status, result) {
         addMarker(result.geocodes[0]);
         lsbMap.setFitView();
         })
         });
         };

         var addMarker = function (data) {

         var marker = new AMap.Marker({
         map: lsbMap,
         position: [data.location.getLng(), data.location.getLat()]
         });
         var infoWindow = new AMap.InfoWindow({
         content: data.formattedAddress,
         offset: {x: 0, y: -30}
         });
         marker.on("mouseover", function(e) {
         infoWindow.open(lsbMap, marker.getPosition());
         });
         };*/

        var map = $map.initial("lbsMapContainer");

        var getCurrentUserInfo = function () {
            $http.get([$window.API.USER.GET_CURRENT_USER_INFO, "?key=", $cookieStore.get("key")].join(""))
                .success(function (data) {
                    $scope.userInfoReadOnly = data;
                    $scope.userInfo = angular.copy(data);
                    $scope.isEdit = false;

                    var location = [data.province, data.city, data.area].join("");

                    map.getGeocoder(location)

                })
                .error(function (data) {
                    $window.alert(data.msg)
                })
        };

        $scope.isEdit = false;

        getCurrentUserInfo();

        $scope.editInfo = function () {
            $scope.isEdit = true;
        };

        $scope.cancelEditInfo = function () {
            $scope.userInfo = angular.copy($scope.userInfoReadOnly);
            $scope.isEdit = false;
        };

        var changed_address = ["", "", "", ""];

        $scope.$watch('userInfo', function (newData, oldData) {
            if (newData && oldData) {

                if (newData.province != oldData.province) {
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
                    }

                    map.getGeocoder(changed_address.join(""))

                }
                if (newData.city != oldData.city) {
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
                    }

                    map.getGeocoder(changed_address.join(""))
                }
                if (newData.area != oldData.area) {
                    console.log(newData, oldData, "area changed");

                    var index_area = _.findIndex($scope.areas, {
                        id: newData.area
                    });

                    if (index_area != -1) {
                        changed_address[2] = $scope.areas[index_area].name;
                        changed_address[3] = ""
                    }

                    map.getGeocoder(changed_address.join(""))
                }
                if (newData.address_additional != oldData.address_additional) {
                    console.log(newData, oldData, "address_additional changed");

                    changed_address[3] = newData.address_additional;

                    map.getGeocoder(changed_address.join(""))
                }
            }
        }, true);


        $scope.saveInfo = function (data) {
            $http.put([$window.API.USER.EDIT_CURRENT_USER_INFO, "?key=", $cookieStore.get("key")].join(""), data)
                .success(function (data) {
                    getCurrentUserInfo();
                })
                .error(function () {
                    $window.alert(transform_error_message(data.msg));
                })
        };

        $districts.get({"adcode": 100000})
            .success(function (data) {
                $scope.provinces = data[0].subdistricts;
                console.log($scope.provinces)
            });


        /*lsbMap.plugin(['AMap.Geolocation'], function () {
         var geolocation = new AMap.Geolocation({
         enableHighAccuracy: true,//是否使用高精度定位，默认:true
         timeout: 10000,          //超过10秒后停止定位，默认：无穷大
         maximumAge: 0,           //定位结果缓存0毫秒，默认：0
         convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
         showButton: true,        //显示定位按钮，默认：true
         buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
         buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
         showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
         showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
         panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
         zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
         markerOptions: {
         map: lsbMap,
         draggable: true,
         cursor: 'move',
         raiseOnDrag: true
         }
         });

         lsbMap.addControl(geolocation);

         geolocation.getCurrentPosition();

         AMap.event.addListener(geolocation, 'complete', function (data) {
         console.log(data);
         });//返回定位信息
         AMap.event.addListener(geolocation, 'error', function (data) {
         console.log(data);
         });
         });*/


    }]);

iCloudController.controller("PersonalSafeController", ["$scope", "$http", "$cookieStore", "$window",
    function ($scope, $http, $cookieStore, $window) {
        $scope.changePwd = {
            oldPassword: "",
            newPassword: "",
            repeatPassword: ""
        };

        $scope.changePassword = function () {
            var data = angular.copy($scope.changePwd);

            if (!data.newPassword || !data.repeatPassword || !data.oldPassword) {
                $window.alert("密码不能为空");
                return false;
            }

            if (data.newPassword !== data.repeatPassword) {
                $window.alert("两次输入的密码不一致");
                return false;
            }

            data.oldPassword = CryptoJS.SHA1(data.oldPassword).toString();
            data.newPassword = CryptoJS.SHA1(data.newPassword).toString();

            delete data.repeatPassword;

            $http.put([$window.API.USER.CHANGE_CURRENT_USER_PASSWORD, "?key=", $cookieStore.get("key")].join(""), data)
                .success(function (data) {
                    $window.alert(data.msg)
                })
                .error(function (data) {
                    $window.alert(transform_error_message(data.msg))
                })
        }
    }]);