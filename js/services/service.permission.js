/**
 * Created by Jun on 2015/9/24.
 */


iCloudService.service("$permissions", ["$http", "$window", "$q", "$cookieStore",
    function ($http, $window, $q, $cookieStore) {
        return {
            promise: function () {
                var deferred = $q.defer();
                $http.get([$window.permissions_url, "?key=", $cookieStore.get("key")].join(""))
                    .success(function (data) {
                        deferred.resolve(data)
                    })
                    .error(function (data) {
                        deferred.reject(data)
                    });
                return deferred.promise
            }
        }
    }]);