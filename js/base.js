/**
 * Created by lee on 2015/9/9.
 */

//window.host = "http://mb.idianjia.cn:8000";
window.host = "http://192.168.0.112";

window.media_host = "http://mb.idianjia.cn:10000";

window.login_url = [window.host, "/api/users/login/"].join("");

window.logout_url = [window.host, "/api/users/logout/"].join("");

window.register_url = [window.host, "/api/users/register/"].join("");

window.permissions_url = [window.host, "/api/permissions/"].join("");

window.paidlisting_url = [window.host, "/api/bid/"].join("");

window.wemedia_url = [window.host, "/api/ads/"].join("");

window.functions_url = [window.host, "/api/functions/"].join("");

window.requestcategory = [window.host, "/api/business/category/"].join("");

window.all_routers_url = [window.host, "/api/routers/"].join("");

window.province_url = [window.host, "/api/system/cities/province/"].join("");

window.city_url = [window.host, "/api/system/cities/city/"].join("");

window.area_url = [window.host, "/api/system/cities/area/"].join("");

window.version_url = [window.host, "/api/routers/versions/"].join("");

window.release_url = [window.host, "/api/business/policies/"].join("");

window.release_enable_url = [window.host, "/api/business/policies/enable/"].join("");

window.routers_groups_url = [window.host, "/api/routers/groups/"].join("");

var transform_error_message = function (msg) {
    if (_.isObject(msg)) {
        _.forEach()
    }
    return msg
};