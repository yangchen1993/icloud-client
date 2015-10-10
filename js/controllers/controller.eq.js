/**
 * Created by chen on 2015/10/8.
 */
iCloudController.controller("EqManagementController", ['$scope', '$checkBox', function ($scope, $checkBox) {
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
    $checkBox.enableCheck("table-eq");

}]);

iCloudController.controller("VersionManagementController", ['$scope', function ($scope) {

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
iCloudController.controller("ReleaseConfController", ['$scope', function ($scope) {
    $scope.sele = function (data) {
        if (data == 1) $scope.status = 1;
        if (data == 2) $scope.status = 2;
        if (data == 3) $scope.status = 3;
    }
}]);

iCloudController.controller("BindingController", ['$scope', function ($scope) {

}]);
iCloudController.controller("InSalesController", ['$scope', function ($scope) {

}]);