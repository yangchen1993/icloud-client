/**
 * Created by Jun on 2015/9/24.
 */

iCloudService.service("$uploadImg", ["$http", "$cookieStore", "$window",
    function ($http, $cookieStore, $window) {
        this.upload = function (scope, url) {

            var self = angular.copy({});
            self.defaultParams = function () {
                return {
                    "key": $cookieStore.get("key")
                }
            };
            self.url = url;
            self.urlWithDefaultParams = function () {
                var key = $cookieStore.get("key");
                if (key) {
                    return [self.url, "?", $.param(self.defaultParams)].join("")
                } else {
                    return self.url;
                }
            };
            var data = {
                img: $(".avatar-wrapper > img").cropper("getCroppedCanvas").toDataURL(),
                link: scope.ad_url,
                title: scope.ad_title,
                brief: scope.ad_brief,
                category: scope.selectId
            };
            $http.post([url, "?", $.param(self.defaultParams())].join(""), data)
                .success(function (data) {
                    alert("添加成功")
                }).error(function (data) {
                    console.log(data);
                })
        }
    }]);