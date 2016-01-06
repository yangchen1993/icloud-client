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
iCloudFilter.filter('monitorBranches',function(){
    return function(input){
        if(input){
            return parseInt(input.length/70)+1;
        }
        else return 1;
    }
});
iCloudFilter.filter('monitorMultiple',function(){
    return function(input){
        if(input){
            return (parseInt(input.length/70)+1)*70;
        }
        else return 70;
    }
});
