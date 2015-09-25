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
            var img = $(".avatar-wrapper > img").cropper("getCroppedCanvas").toDataURL();
            if (img) {
                data.img = img;
            }

            if (data.hasOwnProperty("id")) {
                $http.put([url, "?", $.param(self.defaultParams())].join(""), data)
                    .success(function (data) {
                        alert("更新成功")
                    }).error(function (data) {
                        console.log(data);
                    })
            } else {
                $http.post([url, "?", $.param(self.defaultParams())].join(""), data)
                    .success(function (data) {
                        alert("添加成功")
                    }).error(function (data) {
                        console.log(data);
                    })
            }


        }
    }]);

iCloudService.service("$MyDelete", ['$http', '$cookieStore', function ($http, $cookieStore) {
    var key = $cookieStore.get("key");
    this.init = function (url, id) {
        $http.delete([url, id, "/?key=", key].join("")).success(function (data) {
            alert("删除成功");
        }).error(function (data) {
            console.log(data);
        })
    }
}])