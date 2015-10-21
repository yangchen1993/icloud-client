/**
 * Created by lee on 2015/10/21.
 */

iCloudService.service("$blackWhite", ["$http", "$cookieStore",
    function ($http, $cookieStore) {

        this.get = function (router_id, is_black, content_type) {
            is_black = is_black || false;
            content_type = content_type || undefined;
            var params = {
                "key": $cookieStore.get("key"),
                "router_id__in": router_id,
                "is_black": false
            };

            if (content_type != undefined) {
                params.content_type = content_type;
            }

            if (is_black) {
                params.is_black = true;
            }

            return $http.get([$window.router_policy_url, "?", $.param(params)].join(""))
        }
    }]);