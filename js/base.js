/**
 * Created by lee on 2015/9/9.
 */

//window.host = "http://192.168.0.112/api/";
window.host = "http://mb.idianjia.cn:8801/api/";

window.media_host = "http://mb.idianjia.cn:10000";

window.user_url = [window.host, "users/"].join("");

window.login_url = [window.host, "login/"].join("");

window.logout_url = [window.host, "users/logout/"].join("");

window.register_url = [window.host, "users/register/"].join("");

window.current_user_url = [window.host, "users/get_current_user/"].join("");

window.permissions_url = [window.host, "permissions/"].join("");

window.paidlisting_url = [window.host, "bid/"].join("");

window.ads_url = [window.host, "ads/"].join("");

window.functions_url = [window.host, "functions/"].join("");

window.requestcategory = [window.host, "category/"].join("");

window.all_routers_url = [window.host, "routers/get_all_routers/"].join("");

window.province_url = [window.host, "cities/province/"].join("");

window.city_url = [window.host, "cities/city/"].join("");

window.area_url = [window.host, "cities/area/"].join("");

window.trade_url = [window.host, "cities/trades/"].join("");

window.version_url = [window.host, "routers/versions/"].join("");

window.release_url = [window.host, "business/policies/"].join("");

window.release_enable_url = [window.host, "business/policies/enable/"].join("");

window.routers_groups_url = [window.host, "groups/"].join("");

window.router_setup_url = [window.host, "business/setup/"].join("");

window.groups_own = [window.host, "groups/get_router_groups/"].join("");

window.new_group = [window.host, "groups/new_group/"].join("");

window.agent_url = [window.host, "admin/agent/"].join("");

window.get_router_by_group_url = [window.host, "routers/get_routers_by_group/"].join("");

window.new_policy_url = [window.host, "policy/new_policy/"].join("");

window.get_router_policies = [window.host, "policy/get_router_policies"].join("");

window.delete_policy = [window.host, "policy/delete_policy/"].join("");
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