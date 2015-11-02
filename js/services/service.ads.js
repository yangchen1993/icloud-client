/**
 * Created by Jun on 2015/9/24.
 */

iCloudService.service("$uploadImg", ["$http", "$cookieStore", "$window",
    function ($http, $cookieStore, $window) {
        this.upload = function (url, data) {
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
            var img = $(".avatar-wrapper > img").cropper("getCroppedCanvas", {width: 227, height: 403});
            data.img = img.localName === "canvas" ? img.toDataURL() : "";


            if (data.hasOwnProperty("id")) {
                $http.put([url, "edit_media_ads/", "?", $.param(self.defaultParams())].join(""), data)
                    .success(function (data) {
                        alert("更新成功")
                    }).error(function (data) {
                        console.log(data);
                    })
            } else {
                $http.post([url,"new_media_ads/", "?", $.param(self.defaultParams())].join(""), data)
                    .success(function (data) {
                        alert("添加成功")
                    }).error(function (data) {
                        console.log(data);
                    })
            }


        }
    }]);

iCloudService.service("$MyDelete", ['$http', '$cookieStore', '$window', function ($http, $cookieStore, $window) {
    var key = $cookieStore.get("key");
    this.init = function (url, id) {
        $http.delete([url, id, "/?key=", key].join("")).success(function (data) {
            alert("删除成功");
            location.reload();
        }).error(function (data) {
            console.log(data);
        })
    }
}]);