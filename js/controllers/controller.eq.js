/**
 * Created by chen on 2015/10/8.
 */
iCloudController.controller("EqManagementController", ['$scope', '$checkBox', '$grid', '$window', '$category', '$filter', '$province', '$city', '$area',
    function ($scope, $checkBox, $grid, $window, $category, $filter, $province, $city, $area) {
        $scope.chazhao = function () {
            var data = prompt("请输入查找内容", "");
            if (data) {
                alert("dvasv");
            }
        };
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
        $grid.initial($scope, $window.all_routers_url);
        var promise = $category.get();
        promise.success(function (data) {
            $scope.category = data.results;
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
            //$scope.category = data.results;
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

    }]);

iCloudController.controller("VersionManagementController", ['$scope', '$window', '$http', '$cookieStore', '$grid',
    function ($scope, $window, $http, $cookieStore, $grid) {
        $grid.initial($scope, $window.version_url, {"ordering": "-create_time"});

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
            var url = [$window.version_url, '?key=', $cookieStore.get('key')].join("");
            $http.post(url, formData, {"headers": {"Content-Type": undefined}})
                .success(function (data) {
                    angular.element("#newVersionModal").modal("toggle");
                    $scope.refresh();
                })
                .error(function (data) {
                    $window.alert(data.msg)
                })
        };

        $scope.remove = function (id) {
            if (confirm("确定删除?删除后无法恢复!")) {
                $http.delete([window.version_url, id, "/", "?key=", $cookieStore.get("key")].join(""))
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

iCloudController.controller("DetailsController", ['$scope', function ($scope) {
    $scope.jiebang = function () {
        if (confirm("解除绑定后，该设备将停止运行，请确定是否需解除绑定")) {

        }
    }
}]);

iCloudController.controller("IdentifyConfController", ['$scope', function ($scope) {
    $scope.sele = function (data) {
        if (data == 1) $scope.status = 1;
        if (data == 2) $scope.status = 2;
        if (data == 3) $scope.status = 3;
    }
}]);

iCloudController.controller("ReleaseConfController", ['$scope', '$grid', function ($scope, $grid) {
    $grid.initial($scope, window.all_routers_url);
}]);

iCloudController.controller("BindingController", ['$scope', function ($scope) {

}]);
iCloudController.controller("InSalesController", ['$scope', function ($scope) {

}]);