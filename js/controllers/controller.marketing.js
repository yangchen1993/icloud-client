/**
 * Created by chen on 2015/11/17.
 */
iCloudController.controller("BulkSMSController",["$scope","$http","$cookieStore",function($scope,$http,$cookieStore){
    $http.get([window.API.MARKETING.GET_SMS,"?key=",$cookieStore.get("key")].join("")).success(function(data){
       console.log(data);
        $scope.SMS = data;
    });
    $scope.send_SMS = function(id){
        location.href = ["#/main/select_SMS_man?id=",id].join("");
    }
}]);

iCloudController.controller("CreateSMSController",["$scope","$http","$cookieStore","$category",function($scope,$http,$cookieStore,$category){
    $category.get().success(function(data){
        $scope.category = data;
        $scope.SMS ={
            "category" : data[0].id
            };
    });
    $scope.create_SMS = function(SMS){
        $http.post([window.API.MARKETING.NEW_SMS,"?key=",$cookieStore.get("key")].join(""),SMS).success(function(data){
            console.log(data);
        })
    };
}]);

iCloudController.controller("SelectSMSManController",["$scope","$http","$cookieStore",function($scope,$http,$cookieStore){

}]);
