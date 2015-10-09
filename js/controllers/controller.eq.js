/**
 * Created by chen on 2015/10/8.
 */
iCloudController.controller("EqManagementController", ['$scope','$checkBox', function ($scope,$checkBox) {
    $scope.chazhao = function () {
        var data = prompt("请输入查找内容", "");
        if (data) {
            alert("dvasv");
        }
    }
    $checkBox.enableCheck("table-eq");
}])

iCloudController.controller("VersionManagementController", ['$scope', function ($scope) {

}])

iCloudController.controller("FirmwareUpdateController", ['$scope','$checkBox', function ($scope,$checkBox) {
    $scope.update = function () {
        if (confirm("升级过程中路由器将会停止运行，升级完成后路由器将自动重启。请确认是否升级所选路由器固件版本？")) {

        }
    }
    $scope.chazhao = function () {
        var data = prompt("请输入查找内容", "");
        if (data) {
            alert("dvasv");
        }
    }
    $checkBox.enableCheck("table-fireware");
}])

iCloudController.controller("DetailsController", ['$scope', function ($scope) {
    $scope.jiebang =function(){
        if(confirm("解除绑定后，该设备将停止运行，请确定是否需解除绑定")){

        }
    }
}])

iCloudController.controller("IdentifyConfController", ['$scope', function ($scope) {
    $scope.sele = function (data) {
        if (data == 1) $scope.status = 1;
        if (data == 2) $scope.status = 2;
        if (data == 3) $scope.status = 3;
    }
}])

iCloudController.controller("BindingController", ['$scope', function ($scope) {

}])