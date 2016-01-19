/**
 * Created by lee on 2015/9/9.
 */


iCloudController.controller("IndexController", ["$scope", "$http", "$window", "$auth", "$cookieStore",
    function ($scope, $http, $window, $auth, $cookieStore) {

        $scope.auth = {
            "username": "",
            "password": ""
        };

        $scope.login = function (data) {

            var data_ = angular.copy(data);

            if (!data_.username) {
                $scope.errorMsg = "用户名不能为空";
                console.log($scope.errorMsg);
                return false
            }

            if (!data_.password) {
                $scope.errorMsg = "密码不能为空";
                console.log($scope.errorMsg);
                return false
            }


            data_.password = CryptoJS.SHA1(data_.password).toString();

            $auth.login(data_);
        };

        $scope.enterEvent = function (e) {
            if (e.keyCode === 13){
                $scope.login($scope.auth);
            }
        }
    }]);

iCloudController.controller("TopController", ["$scope", "$http", "$auth", "$cookieStore", "$window", "$rootScope",
    function ($scope, $http, $auth, $cookieStore, $window, $rootScope) {
        var role = $cookieStore.get('role');
        $scope.show_bell = true;
        if(role == "系统管理员"){
            $scope.show_bell = false;
        }

        $scope.logout = function () {
            $auth.logout();
        };
        //点击铃铛按钮
        $scope.goToMsgList = function () {
            getUnreadMsgCount("/#/main/msgsystem-message");
        };

        var getUnreadMsgCount = function (nextUrl) {
            $http.get([$window.API.MSGSYSTEM.GET_UNREAD_COUNT, "?key=", $cookieStore.get("key")].join(""))
                .success(function (data) {
                    $rootScope.unread_count = data.count;  // 因其他controller需要更新此值，所以采用$rootScope
                    if(nextUrl){
                        window.location.href = nextUrl;
                    }
                });
        };
        getUnreadMsgCount();
    }]);