/**
 * Created by lee on 2015/9/9.
 */

window.HOST = "http://localhost:8000/api/";
//window.HOST = "http://dev.idianjia.com:8000/api/";
window.HOST_WIFICAT = "http://r.idianjia.com/ws/";

window.API = {

    "USER": {
        "LOGIN": [window.HOST, "users/login/"].join(""), // 登录

        "LOGOUT": [window.HOST, "users/logout/"].join(""), // 登出

        "GET_CURRENT_USER_INFO": [window.HOST, "users/get_current_user_info/"].join(""), // 获取当前用户信息

        "EDIT_CURRENT_USER_INFO": [window.HOST, "users/edit_current_user_info/"].join(""), //修改当前用户信息

        "CHANGE_CURRENT_USER_PASSWORD": [window.HOST, "users/change_current_user_password/"].join(""), //修改当前用户的密码

        "GET_USER_INFO_BY_TEL": [window.HOST, "users/get_user_info_by_tel/"].join(""),

        "GET_SUB_AGENTS": [window.HOST, "users/get_sub_agents/"].join(""), // 获取代理商

        "GET_SUB_BUSINESSES": [window.HOST, "users/get_sub_businesses/"].join(""),

        "REGISTER": [window.HOST, "users/register/"].join(""), // 注册

        "SUB_USER_ROLES": [window.HOST, "users/sub_user_roles/"].join(""),  //请求代理商可创建的代理商级别

        "SUB_USER_SCOPES": [window.HOST, "users/sub_user_scopes/"].join(""),

        "CREATE_AGENT": [window.HOST, "users/new_agent/"].join(""),  //创建代理商

        "CREATE_BUSINESS": [window.HOST, "users/new_business/"].join(""), // 新建商户

        "REMOVE_BUSINESS": [window.HOST, "users/remove_business/"].join("")  //删除商户
    },

    "SYSTEM": {
        "GET_CATEGORIES": [window.HOST, "categories/get_categories/"].join(""), // 获取所有行业

        "NEW_CATEGORY": [window.HOST, "categories/new_category/"].join(""), // 新增行业

        "GET_PROVINCES": [window.HOST, "cities/get_provinces/"].join(""), // 获取所有的省

        "GET_CITIES_BY_PROVINCE": [window.HOST, "cities/get_cities_by_province/"].join(""), // 根据省获取市

        "GET_AREAS_BY_CITY": [window.HOST, "cities/get_areas_by_city/"].join(""), // 根据市获取区

        "GET_TRADES": [window.HOST, "cities/get_trades/"].join(""), // 按照省市区获取商圈

        "GET_DISTRICTS": [window.HOST, "districts/get_districts/"].join("")
    },

    "WALLET": {
        "GET_CURRENT_USER_WALLET_INFO": [window.HOST, "wallets/get_current_user_wallet/"].join(""), // 获取当前用户的钱包信息

        "RECHARGE": [window.HOST, "wallets/recharge/"].join(""), // 充值

        "TRADING_HISTORY": [window.HOST, "tradings/get_current_user_tradings/"].join("") // 获取当前用户的交易记录
    },

    "ROUTER": {
        "NEW_ROUTER": [window.HOST, "routers/new_router/"].join(""), // 新增路由器

        "REMOVE_ROUTER": [window.HOST, "routers/remove_router/"].join(""), //删除路由器

        "EDIT_ROUTER": [window.HOST, "routers/edit_router/"].join(""), // 编辑路由器

        "GET_ALL_ROUTERS": [window.HOST, "routers/get_all_routers/"].join(""), // 获取所有路由器

        "GET_CURRENT_USER_UNUSED_ROUTER_INFO": [window.HOST, "routers/get_current_user_unused_router_info"].join(""),

        "GET_UNUSED_ROUTER_INFO_BY_MAC": [window.HOST, "routers/get_unused_router_info_by_mac/"].join(""), // 根据MAC获取路由器信息

        "GET_CURRENT_USER_ROUTERS": [window.HOST, "routers/get_current_user_routers/"].join(""), //获取当前用户路由

        "GET_ALL_VERSIONS": [window.HOST, "versions/get_all_versions/"].join(""), // 获取所有的固件

        "GET_ROUTERS_BY_GROUP": [window.HOST, "routers/get_routers_by_group/"].join(""), // 根据组获取路由器

        "NEW_VERSION": [window.HOST, "versions/new_version/"].join(""), // 发布新固件

        "REMOVE_VERSION": [window.HOST, "versions/remove_version/"].join(""), // 发布新固件

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

        "ROUTERS_SSID": [window.HOST, "routers/ssid/"].join(""), //设置路由器SSID

        "ROUTERS_DELEGATE": [window.HOST, "routers/delegate/"].join(""),    //托管路由器

        "ROUTERS_UNDELEGATE": [window.HOST, "routers/undelegate/"].join("")     //取消已托管的路由器
    },

    "GROUP": {
        "GET_CURRENT_USER_ROUTER_GROUPS": [window.HOST, "groups/get_current_user_router_groups/"].join(""), // 获取当前用户的路由器分组

        "NEW_GROUP": [window.HOST, "groups/new_group/"].join(""), // 新建路由器分组

        "REMOVE_GROUP": [window.HOST, "groups/remove_group/"].join(""), // 删除路由器分组

        "EDIT_GROUP": [window.HOST, "groups/edit_group/"].join(""), // 删除路由器分组

        "GET_ROUTER_BY_GROUP": [window.HOST, "routers/get_current_user_routers/"].join(""),//获取当前店铺所有路由器

        "GET_GUESTS_FLOW": [window.HOST, "groups/get_guests_flow/"].join("")
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

        "PUT_AD_IN": [window.HOST, "audits/new_audit/"].join(""),

        "PUT_AD_UP": [window.HOST, "audits/edit_audit/"].join(""),

        "PUT_AD_DOWN": [window.HOST, "audits/remove_audit/"].join(""),

        "GET_SHOP_AD": [window.HOST, "audits/audit_status/"].join(""),

        "": [window.HOST, "adspaces/get_ad_spaces/"].join("")
    },

    "WIFICAT": {
        "STATUS": [window.HOST_WIFICAT, "routers/status/"].join(""), //路由器实时信息

        "IS_ONLINE": [window.HOST_WIFICAT, "routers/online_status/"].join(""), //路由器在线状态

        "REBOOT": [window.HOST_WIFICAT, "reboot/"].join("")//路由器重启
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

        "GET_SMS_TARGETS": [window.HOST, "sms_targets/get_current_user_members/"].join(""),

        "GET_WECHAT": [window.HOST, "wechat/get_wechat/"].join(""),

        "EDIT_WECHAT": [window.HOST, "wechat/edit_wechat/"].join(""),

        "GET_CURRENT_USER_MEMBERS": [window.HOST, "members/get_current_user_members/"].join(""),

        "GET_CURRENT_HOUR_INFO": [window.HOST, "hourdata/get_current_hour_info/"].join(""), //每小时店铺客流情况

        "GET_CURRENT_DAY_INFO": [window.HOST, "daydata/get_current_day_info/"].join(""),  //每天店铺客流情况

        "GET_MONTH_INFO": [window.HOST, "monthdata/get_month_info/"].join(""), //每月店铺客流情况

        "GET_GUESTS_LOYALTY": [window.HOST, "memberlog/get_guests_loyalty/"].join("")  //用戶忠誠度
    },

    "JSADS": {
        "GET_JS_WHITE_URLS": [window.HOST, "js_white_url/get_js_white_urls/"].join(""),

        "NEW_JS_WHITE_URL": [window.HOST, "js_white_url/new_js_white_url/"].join(""),

        "REMOVE_JS_WHITE_URL": [window.HOST, "js_white_url/remove_js_white_url/"].join(""),

        "JS_PUT_AREA": [window.HOST, "js_put_area/new_put_area/"].join(""),//新增开放地区

        "REMOVE_PUT_AREA": [window.HOST, "js_put_area/remove_put_area/"].join(""),//删除开放地区

        "GET_PUT_AREA": [window.HOST, "js_put_area/get_put_areas/"].join(""),//获取开放地区

        "EDIT_AD_CODE": [window.HOST, "js_ad_code/edit_ad_code/"].join(""), //新增JS代码

        "GET_AD_CODE": [window.HOST, "js_ad_code/get_ad_code"].join("")//获取JS代码

    },

    "ACCOUNT": {
        "GET_CURRENT_USER_ROUTERS": [window.HOST, "account/get_current_user_routers/"].join(""),

        "GET_CURRENT_USER_TOTAL_CASH": [window.HOST, "account/get_current_user_total_cash/"].join("")
    },

    "URLREPORT":{
        "GET_URL_COLLECT_RULE":[window.HOST,"url_analyze_rule/get_all_url_collect_rules/"].join(""),
        "CREATE_URL_COLLECT_RULE":[window.HOST,"url_analyze_rule/create_url_collect_rule/"].join("")

    },

    "CREATE_AD": {
        "CREATE_AD_PLATFORM": [window.HOST, "accessed_ad/create_ads/"].join(""),
        "GET_AD_PLATFORM": [window.HOST, "accessed_ad/get_ads/"].join(""),
        "UPDATE_AD_PLATFORM":[window.HOST,"accessed_ad/update_ads/"].join(""),
        "DELETE_AD_PLATFORM":[window.HOST,"accessed_ad/delete_ads/"].join("")
    },

    "WITH_CASH": {
        //"CREATE_WITH_CASH":[window.HOST,""].join(""),

        "GET_USER_BALANCE": [window.HOST, "ad_agent_income/get_agent_income/"].join("")
    },

    "PARTITION": {
        "GET_ACCESSED_ADS_ROUTERS": [window.HOST, "accessed_ad/get_ads/"].join(""),
        "GET_ACCESSED_ADS_FLOW_INFO_ROUTERS": [window.HOST, "ad_income_partition/get_flow_info/"].join(""),
        "ACCESSED_AD_CREATE_AD_FLOW_ROUTERS": [window.HOST, "ad_income_partition/create_ad_flow/"].join(""),
        "AD_INCOME_PARTITION_ADS_AGENT_ROUTERS": [window.HOST, "ad_income_partition_ads_agent/get_flow_data_by_admin/"].join(""),
        "AD_INCOME_PARTITION_ADS_AGENT_FLOW_INCOME_ROUTERS": [window.HOST, "ad_income_partition_ads_agent/get_current_user_flow_income/"].join(""),
        "AD_INCOME_PARTITION_ADS_AGENT_FLOW_INCOME_LIST_ROUTERS": [window.HOST, "ad_income_partition_ads_agent/get_current_user_flow_income_list/"].join(""),
        "AD_INCOME_WITHDRAW_CREATE_ROUTERS": [window.HOST, "ad_income_withdraw/create_withdraw_cash/"].join(""),
        "AD_INCOME_WITHDRAW_LOG_ROUTERS": [window.HOST, "ad_income_withdraw/get_withdraw_cash_log/"].join(""),
        "AD_INCOME_ADMIN_ROUTERS": [window.HOST, "ad_income_admin/get_withdraw_cash_log/"].join(""),
        "AD_INCOME_ADMIN_SURE_WITHDRAW_ROUTERS": [window.HOST, "ad_income_admin/sure_withdraw_cash/"].join(""),
        "AD_INCOME_ADMIN_MODIFY_AGENT_INCOME_ROUTERS": [window.HOST, "ad_income_partition/modify_agent_income/"].join(""),
        "AD_INCOME_ADMIN_RATIO_ROUTERS": [window.HOST, "ad_income_partition/get_income_ratio/"].join(""),
        "AD_INCOME_ADMIN_RATIO_SET_ROUTERS": [window.HOST, "ad_income_partition/set_income_ratio/"].join(""),
        "GET_ACCESSED_ADS_FLOW_INFO_BY_AD_ID_ROUTERS": [window.HOST, "ad_income_partition/get_flow_by_ad_id/"].join(""),

    },

    "MSGSYSTEM": {
        "GET_ALL": [window.HOST, "message/get_all/"].join(""),  //获取历史系统消息
        "ADD_MESSAGE": [window.HOST, "message/add/"].join(""),
        "DELETE_MESSAGE": [window.HOST, "message/delete/"].join(""),
        "DETAIL_MESSAGE": [window.HOST, "message/get_detail/"].join(""),
        "EDIT_MESSAGE": [window.HOST, "message/modified/"].join(""),
        "GET_UNREAD_COUNT": [window.HOST, "message/get_unread_count/"].join(""),
        "GET_PREVIOUS_ID": [window.HOST, "message/get_previous/"].join(""),
        "GET_NEXT_ID": [window.HOST, "message/get_next/"].join(""),
    },
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

var get_param = function (href, paraName) {
    var index = href.indexOf("?");

    var search = href.substring(index + 1);

    var result = "";

    angular.forEach(search.split("&"), function (value) {

        var t = value.split("=");

        if (t.length > 0) {
            if (t[0] == paraName) {
                result = t[1]
            }
        }

    });

    return result;
};

var replaceString = function (str, start, end, rep) {
    var replaceStartIndex = str.indexOf(start);
    var replaceEndIndex = str.substring(replaceStartIndex).indexOf(end);

    if (replaceEndIndex >= 0) {
        return str.replace(str.substr(replaceStartIndex, replaceEndIndex), rep)
    } else {
        return str.replace(str.substring(replaceStartIndex), rep)
    }

};
