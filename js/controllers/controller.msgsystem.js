iCloudController.controller("MessageController", ["$scope", "$http", "$cookieStore", "$window", "$grid",
    function ($scope, $http, $cookieStore, $window, $grid) {
        $grid.initial($scope, $window.API.MSGSYSTEM.GET_ALL);

        $scope.addMessage = function (data) {
            $http.post([$window.API.MSGSYSTEM.ADD_MESSAGE, "?key=", $cookieStore.get("key")].join(""), data)
            .success(function(msg) {
                if (msg.msg == "添加成功") {
                    window.location.href = "#/main/history"
                }
                else{
                    alert(msg.msg);
                }
            })
            .error(function (msg) {
                alert("未知错误");
            });
        }
        $scope.deleteMessage = function (id) {
            var _this = $(this);
            if (confirm('确认要删除吗？')) {
                $http.delete(window.API.MSGSYSTEM.DELETE_MESSAGE + '?key=' + $.cookie("key").replace(/\"/g, "") + '&id=' + id)
                    .success(function () {
                    _this.parent().parent().remove();
                    console.log('删除成功');
                    $scope.refresh();
                });
            }
        };
        $scope.see_detail = function (id) {
            window.location.href = "#/main/msg-detail?id=" + id;
        };
    }]);


iCloudController.controller("MessageDetailController", ["$scope", "$http", "$cookieStore", "$window", "$grid",
    function ($scope, $http, $cookieStore, $window, $grid) {
        var id = get_param($window.location.href, "id");
        var getDetailInfo = function () {
            $http.get([$window.API.MSGSYSTEM.DETAIL_MESSAGE, "?key=", $cookieStore.get("key"), "&id=", id].join(""))
                .success(function (data) {
                    //data.info = data.info.replace('\n','\r');
                    //data.info = data.info.replaceAll(" ","&nbsp;");
                    $scope.detail = data;
                    //data.info = data.info.replaceAll(" ;","abc;")
                })
        };
        getDetailInfo();
 }]);



