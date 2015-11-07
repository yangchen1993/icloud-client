/**
 * Created by lee on 2015/9/9.
 */

//window.host = "http://192.168.0.112/api/";
window.HOST = "http://mb.idianjia.cn:8801/api/";

window.API = {
    "USER": {
        "LOGIN": [window.HOST, "users/login/"].join(""), // 登录

        "LOGOUT": [window.HOST, "users/logout/"].join(""), // 登出

        "GET_CURRENT_USER_INFO": [window.HOST, "users/get_current_user_info/"].join(""), // 获取当前用户信息

        "GET_SUB_USERS": [window.HOST, "users/get_sub_users/"].join(""), // 获取下属用户

        "REGISTER": [window.HOST, "users/register/"].join("") // 注册
    },

    "AD": {
        "GET_CURRENT_USER_ADS": [window.HOST, "ads/get_current_user_ads/"].join(""), // 获取当前用户的广告

        "GET_AD_INFO": [window.HOST, "ads/get_ad_info/"].join(""), // 获取广告详细信息

        "NEW_AD": [window.HOST, "ads/new_ad/"].join(""), // 新建广告

        "EDIT_AD": [window.HOST, "ads/edit_ad/"].join(""), // 编辑广告

        "REMOVE_AD": [window.HOST, "ads/remove_ad/"].join("") // 删除广告
    },

    "SYSTEM": {
        "GET_CATEGORIES": [window.HOST, "categories/get_categories/"].join(""), // 获取所有行业

        "NEW_CATEGORY": [window.HOST, "categories/new_category/"].join(""), // 新增行业

        "GET_PROVINCES": [window.HOST, "cities/get_provinces/"].join(""), // 获取所有的省

        "GET_CITIES_BY_PROVINCE": [window.HOST, "cities/get_cities_by_province/"].join(""), // 根据省获取市

        "GET_AREAS_BY_CITY": [window.HOST, "cities/get_areas_by_city/"].join(""), // 根据市获取区

        "GET_TRADES": [window.HOST, "cities/get_trades/"].join("") // 按照省市区获取商圈
    },

    "ROUTER": {
        "GET_ALL_ROUTERS": [window.HOST, "routers/get_all_routers/"].join(""), // 获取所有路由器

        "GET_ALL_VERSIONS": [window.HOST, "routers/versions/get_all_versions/"].join(""), // 获取所有的固件

        "GET_ROUTERS_BY_GROUP": [window.HOST, "routers/get_routers_by_group/"].join(""), // 根据组获取路由器

        "NEW_VERSION": [window.HOST, "routers/versions/new_version/"].join(""), // 发布新固件

        "REMOVE_VERSION": [window.HOST, "routers/versions/remove_version/"].join(""), // 发布新固件

        "ROUTER_UNBIND": [window.HOST, "routers/unbind/"].join(""), // 路由器解绑

        "ROUTER_BIND": [window.HOST, "routers/bind/"].join(""), // 路由器绑定

        "NEW_BLACK_WHITE": [window.HOST, "blackwhite/new_black_white/"], // 新建黑白名单

        "GET_ROUTER_BLACK_WHITES": [window.HOST, "blackwhite/get_router_black_whites"].join(""), // 获取路由器的黑白名单

        "SET_ENABLE_BLACK_WHITES": [window.HOST, "blackwhite/enable/"].join(""), // 启用黑白名单

        "REMOVE_BLACK_WHITE": [window.HOST, "blackwhite/remove_black_white"].join(""), // 删除黑白名单

        "GET_ROUTER_SETUP": [window.HOST, "setups/get_router_setup/"].join(""), // 获取路由器设置

        "EDIT_ROUTER_SETUP": [window.HOST, "setups/edit_router_setup/"].join("") // 修改路由器设置


    },

    "GROUP": {
        "GET_CURRENT_USER_ROUTER_GROUPS": [window.HOST, "groups/get_current_user_router_groups/"].join(""), // 获取当前用户的路由器分组
        "NEW_GROUP": [window.HOST, "groups/new_group/"].join("") // 新建路由器分组

    },


    "CMS": {
        "NEW_RESOURCES": [window.HOST, "resources/new_resource/"].join(""), // 新建资源, 供CMS使用

        "REMOVE_RESOURCE": [window.HOST, "resources/remove_resource/"].join("") // 删除资源， 供CMS使用
    }
};


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