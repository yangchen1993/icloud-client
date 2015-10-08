/**
 * Created by chen on 2015/10/8.
 */
iCloudController.controller("EqManagementController", ['$scope', function ($scope) {
    $scope.chazhao = function () {
        var data = prompt("请输入查找内容", "");
        if (data) {
            alert("dvasv");
        }
    }
}])

iCloudController.controller("VersionManagementController", ['$scope', function ($scope) {

}])

iCloudController.controller("FirmwareUpdateController", ['$scope', function ($scope) {
   $scope.update =function(){
       if(confirm("升级过程中路由器将会停止运行，升级完成后路由器将自动重启。请确认是否升级所选路由器固件版本？")){

       }
   }
}])

iCloudController.controller("DetailsController", ['$scope', function ($scope) {

}])