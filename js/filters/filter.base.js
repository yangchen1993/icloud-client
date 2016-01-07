/**
 * Created by chen on 2016/1/6.
 */
var iCloudFilter = angular.module("iCloudFilter",[]);

iCloudFilter.filter('monitorWords',function(){
    return function(input){
        if(input){
            return input.length;
        }
        else return 0;
    }
});
