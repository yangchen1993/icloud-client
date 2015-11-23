/**
 * Created by lee on 2015/9/9.
 */

//window.HOST = "http://192.168.2.103:8801/api/";
window.HOST = "http://mb.idianjia.cn:8801/api/";
window.HOST_WIFICAT = "http://112.124.125.145/";

window.API = {
    "USER": {
        "LOGIN": [window.HOST, "users/login/"].join(""), // 登录

        "LOGOUT": [window.HOST, "users/logout/"].join(""), // 登出

        "GET_CURRENT_USER_INFO": [window.HOST, "users/get_current_user_info/"].join(""), // 获取当前用户信息

        "GET_USER_INFO_BY_TEL": [window.HOST, "users/get_user_info_by_tel/"].join(""),

        "GET_SUB_USERS": [window.HOST, "users/get_sub_users/"].join(""), // 获取下属用户

        "REGISTER": [window.HOST, "users/register/"].join(""), // 注册

        "SUB_USER_ROLES": [window.HOST, "users/sub_user_roles/"].join(""),  //请求代理商可创建的代理商级别

        "CREATE_AGENT": [window.HOST, "users/new_user/"].join("")  //创建代理商
    },

    "SYSTEM": {
        "GET_CATEGORIES": [window.HOST, "categories/get_categories/"].join(""), // 获取所有行业

        "NEW_CATEGORY": [window.HOST, "categories/new_category/"].join(""), // 新增行业

        "GET_PROVINCES": [window.HOST, "cities/get_provinces/"].join(""), // 获取所有的省

        "GET_CITIES_BY_PROVINCE": [window.HOST, "cities/get_cities_by_province/"].join(""), // 根据省获取市

        "GET_AREAS_BY_CITY": [window.HOST, "cities/get_areas_by_city/"].join(""), // 根据市获取区

        "GET_TRADES": [window.HOST, "cities/get_trades/"].join("") // 按照省市区获取商圈
    },
    "WALLET": {
        "GET_CURRENT_USER_WALLET_INFO": [window.HOST, "wallets/get_current_user_wallet/"].join(""), // 获取当前用户的钱包信息

        "RECHARGE": [window.HOST, "wallets/recharge/"].join(""), // 充值

        "TRADING_HISTORY": [window.HOST, "tradings/get_current_user_tradings/"].join("") // 获取当前用户的交易记录
    },

    "ROUTER": {
        "GET_ALL_ROUTERS": [window.HOST, "routers/get_all_routers/"].join(""), // 获取所有路由器

        "GET_ROUTER_INFO_BY_MAC": [window.HOST, "routers/get_router_info_by_mac/"].join(""), // 根据MAC获取路由器信息

        "GET_CURRENT_USER_ROUTERS": [window.HOST, "routers/get_current_user_routers/"].join(""), //获取当前用户路由

        "GET_ALL_VERSIONS": [window.HOST, "routers/versions/get_all_versions/"].join(""), // 获取所有的固件

        "GET_ROUTERS_BY_GROUP": [window.HOST, "routers/get_routers_by_group/"].join(""), // 根据组获取路由器

        "NEW_VERSION": [window.HOST, "routers/versions/new_version/"].join(""), // 发布新固件

        "REMOVE_VERSION": [window.HOST, "routers/versions/remove_version/"].join(""), // 发布新固件

        "ROUTER_UNBIND": [window.HOST, "routers/unbind/"].join(""), // 路由器解绑

        "ROUTER_BIND": [window.HOST, "routers/bind/"].join(""), // 路由器绑定

        "NEW_BLACK_WHITES": [window.HOST, "blackwhites/new_black_white/"].join(""), // 新建黑白名单

        "GET_ROUTER_BLACK_WHITES": [window.HOST, "blackwhites/get_router_black_whites/"].join(""), // 获取路由器的黑白名单

        "SET_ENABLE_BLACK_WHITES": [window.HOST, "blackwhites/enable/"].join(""), // 启用黑白名单

        "REMOVE_BLACK_WHITES": [window.HOST, "blackwhites/remove_black_white/"].join(""), // 删除黑白名单

        "GET_ROUTER_SETUP": [window.HOST, "setups/get_router_setup/"].join(""), // 获取路由器设置

        "EDIT_ROUTER_SETUP": [window.HOST, "setups/edit_router_setup/"].join(""), // 修改路由器设置

        "GET_CURRENT_USER_DELIVERIES": [window.HOST, "deliveries/get_current_user_deliveries/"].join(""), // 获取当前用户的路由器发货信息

        "REMOVE_DELIVERY": [window.HOST, "deliveries/remove_delivery/"].join(""), // 删除路由器发货信息

        "NEW_DELIVERY": [window.HOST, "deliveries/new_delivery/"].join(""), // 新建路由器发货信息

        "ROUTERS_SSID": [window.HOST, "routers/ssid/"].join("") //设置路由器SSID

    },

    "GROUP": {
        "GET_CURRENT_USER_ROUTER_GROUPS": [window.HOST, "groups/get_current_user_router_groups/"].join(""), // 获取当前用户的路由器分组

        "NEW_GROUP": [window.HOST, "groups/new_group/"].join(""), // 新建路由器分组

        "REMOVE_GROUP": [window.HOST, "groups/remove_group/"].join(""), // 删除路由器分组

        "EDIT_GROUP": [window.HOST, "groups/edit_group/"].join("") // 删除路由器分组
    },


    "CMS": {
        "NEW_RESOURCES": [window.HOST, "resources/new_resource/"].join(""), // 新建资源, 供CMS使用

        "REMOVE_RESOURCE": [window.HOST, "resources/remove_resource/"].join(""),// 删除资源， 供CMS使用

        "GET_DATA": [window.HOST, "ourshop/get_ourshop_by_group/"].join(""),

        "PUT_DATA": [window.HOST, "ourshop/edit_ourshop/"].join(""),

        "SEND_DATA": [window.HOST, "ourshop/new_ourshop/"].join(""),

        "POST_IMG": [window.HOST, "resources/new_img_resource/"].join("")
    },


    "AD": {
        "GET_CURRENT_USER_ADS": [window.HOST, "ads/get_current_user_ads/"].join(""), // 获取当前用户的广告

        "GET_AD_INFO": [window.HOST, "ads/get_ad_info/"].join(""), // 获取广告详细信息

        "NEW_AD": [window.HOST, "ads/new_ad/"].join(""), // 新建广告

        "EDIT_AD": [window.HOST, "ads/edit_ad/"].join(""), // 编辑广告

        "REMOVE_AD": [window.HOST, "ads/remove_ad/"].join(""),// 删除广告

        "PUT_AD_IN": [window.HOST,"audits/new_audit/"].join(""),

        "PUT_AD_UP":[window.HOST,"audits/edit_audit/"].join("")
    },
    "WIFICAT": {
        "STATUS": [window.HOST_WIFICAT, "routers/status/"].join("") //路由器实时信息
    },


    "WEIXIN": {
        "NEW_WECHAT": [window.HOST, "wechat/new_wechat/"].join(""),
        "GET_WECHAT": [window.HOST, "wechat/get_wechat/"].join(""),
        "EDIT_WECHAT": [window.HOST, "wechat/edit_wechat/"].join("")
    },


    "MARKETING": {
        "NEW_SMS_TEMPLATE": [window.HOST, "sms_templates/new_sms_template/"].join(""), // 新建群发短信模板
        "REMOVE_SMS_TEMPLATE": [window.HOST, "sms_templates/remove_sms_template/"].join(""), // 删除群发短信模板
        "SEND_SMS_TEMPLATE": [window.HOST, "sms_templates/send_sms_template/"].join(""), // 发送短信
        "GET_CURRENT_USER_SMS_TEMPLATES": [window.HOST, "sms_templates/get_current_user_sms_templates/"].join(""), // 获取当前用户的群发模板
        "GET_CURRENT_USER_MEMBERS": [window.HOST, "sms_targets/get_current_user_members/"].join(""),
        "GET_WECHAT": [window.HOST, "wechat/get_wechat/"].join(""),
        "EDIT_WECHAT": [window.HOST, "wechat/edit_wechat/"].join("")
    },

    "ACCOUNT": {
        "GET_CURRENT_USER_ROUTERS": [window.HOST, "account/get_current_user_routers/"].join(""),
        "GET_CURRENT_USER_TOTAL_CASH": [window.HOST, "account/get_current_user_total_cash/"].join("")
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

var get_param = function (href) {
    var search_start = href.indexOf("=");
    return href.slice(search_start + 1);
};

var replaceString = function (str, start, end, rep) {
    var replaceStartIndex = str.indexOf(start);
    var replaceEndIndex = str.substring(replaceStartIndex).indexOf(end)
};