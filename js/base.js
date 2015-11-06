/**
 * Created by lee on 2015/9/9.
 */

//window.host = "http://192.168.0.112";
window.host = "http://mb.idianjia.cn:8801";

window.media_host = "http://mb.idianjia.cn:10000";

window.login_url = [window.host, "/api/users/login/"].join("");

window.logout_url = [window.host, "/api/users/logout/"].join("");

window.register_url = [window.host, "/api/users/register/"].join("");

window.permissions_url = [window.host, "/api/permissions/"].join("");

window.paidlisting_url = [window.host, "/api/bid/"].join("");

window.ads_url = [window.host, "/api/ads/"].join("");

window.functions_url = [window.host, "/api/functions/"].join("");

window.requestcategory = [window.host, "/api/category/"].join("");

window.all_routers_url = [window.host, "/api/routers/get_all_routers/"].join("");

window.province_url = [window.host, "/api/cities/province/"].join("");

window.city_url = [window.host, "/api/cities/city/"].join("");

window.area_url = [window.host, "/api/cities/area/"].join("");

window.trade_url = [window.host, "/api/cities/trades/"].join("");

window.version_url = [window.host, "/api/routers/versions/"].join("");

window.release_url = [window.host, "/api/business/policies/"].join("");

window.release_enable_url = [window.host, "/api/business/policies/enable/"].join("");

window.routers_groups_url = [window.host, "/api/groups/"].join("");

window.router_setup_url = [window.host, "/api/business/setup/"].join("");

window.user_url = [window.host, "/api/users/get_current_user/"].join("");

window.groups_own = [window.host,"/api/groups/get_router_groups/"].join("");

window.new_group = [window.host,"/api/groups/new_group/"].join("");

window.agent_url = [window.host, "/api/admin/agent/"].join();

window.get_router_by_group_url = [window.host, "/api/routers/get_routers_by_group/"].join("");

window.new_policy_url = [window.host, "/api/policy/new_policy/"].join("");

window.get_router_policies = [window.host, "/api/policy/get_router_policies"].join("");

window.delete_policy = [window.host ,"/api/policy/delete_policy/"].join("");
var transform_error_message = function (msg) {
    if (_.isObject(msg)) {
        var message = "";
        _.each(_.keys(msg), function (value, key) {
            message += msg[value] + "\n";
        });
        return message
    }
    return msg
};