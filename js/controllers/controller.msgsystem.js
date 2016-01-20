iCloudController.controller("MessageController", ["$scope", "$http", "$cookieStore", "$window", "$grid",
    function ($scope, $http, $cookieStore, $window, $grid) {
        $grid.initial($scope, $window.API.MSGSYSTEM.GET_ALL, {"ordering": "-create_time"});

        $scope.addMessage = function (data) {
            $http.post([$window.API.MSGSYSTEM.ADD_MESSAGE, "?key=", $cookieStore.get("key")].join(""), data)
            .success(function(msg) {
                if (msg.msg == "添加成功") {
                    alert("消息发送成功");
                    window.location.href = "#/main/msgsystem-msglist"
                }
                else{
                    alert("数据填写不完整");
                }
            })
            .error(function (msg) {
                alert("添加失败");
            });
        }

        $scope.toEditPage = function (id) {
            window.location.href = "#/main/msgsystem-edit?id=" + id
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


iCloudController.controller("MessageDetailController", ["$scope", "$http", "$cookieStore", "$window", "$rootScope", "$sce",
    function ($scope, $http, $cookieStore, $window, $rootScope, $sce) {
        var id = get_param($window.location.href, "id");
        var getUnreadMsgCount = function (nextUrl) {
            $http.get([$window.API.MSGSYSTEM.GET_UNREAD_COUNT, "?key=", $cookieStore.get("key")].join(""))
                .success(function (data) {
                    $rootScope.unread_count = data.count;  // 因其他controller需要更新此值，所以采用$rootScope
                    if(nextUrl){
                        window.location.href = nextUrl;
                    }
                });
        };
        function getLineCount(str){
            if(/\n/.test(str)){
                return str.match(/\n/g).length;
            }
            return 0;
        };
        var getDetailInfo = function () {
            $http.get([$window.API.MSGSYSTEM.DETAIL_MESSAGE, "?key=", $cookieStore.get("key"), "&id=", id].join(""))
                .success(function (data) {
                    $scope.detail = data;
                    var lines = getLineCount(data.info);
                    var length = data.info.length;
                    var msgInfo = document.getElementById("msgInfoId");
                    var lengthLines = length/msgInfo.cols;
                    msgInfo.rows = lines + 1 + lengthLines;
                    getUnreadMsgCount();  //点击详情时，需要更新未读消息数
                })
        };
        getDetailInfo();
 }]);

iCloudController.controller("MessageEditController", ["$scope", "$http", "$cookieStore", "$window", "$grid",
    function ($scope, $http, $cookieStore, $window, $grid) {
        var id = get_param($window.location.href, "id");
        $http.get([$window.API.MSGSYSTEM.DETAIL_MESSAGE, "?key=", $cookieStore.get("key"), "&id=", id].join(""), {"ordering": "-create_time"})
            .success(function (data) {
                $scope.message = data;
                $scope.roles = [{ value:'2,3,4,5', name: '代理商' },
                    { value:'6', name: '商户' },
                    { value:'2,3,4,5,6', name: '所有人' }
                ];

                if (data.read_role == "代理商"){
                    $scope.message.read_role = $scope.roles[0];
                }
                else if (data.read_role == "商户"){
                    $scope.message.read_role = $scope.roles[1];
                }
                else{
                    $scope.message.read_role = $scope.roles[2];
                }

            });

        $scope.editMessage = function (message) {
            $http.put([$window.API.MSGSYSTEM.EDIT_MESSAGE, "?key=", $cookieStore.get("key")].join(""), message)
                .success(function (data) {
                    alert("修改成功");
                    window.location.href = "#/main/msgsystem-msglist"
                })
                .error(function (data) {
                    $window.alert(data.msg);
                })
        }
 }]);
