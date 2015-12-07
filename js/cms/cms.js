var component = $(".component>div");//组件
var pageArea = $("");//页面中部展示区
var editArea = $(".editArea");//编辑区
var editTemp = $(".editTemp")
var conmponentItem = $("");
var haveData = '';
var ourShop = get_param(window.location.href);
function editText(id, type) {
    $('.color').minicolors({
        animationSpeed: 50,
        animationEasing: 'swing',
        change: null,
        changeDelay: 0,
        control: 'hue',
        hide: false,
        hideSpeed: 100,
        inline: false,
        letterCase: 'lowercase',
        opacity: false,
        position: 'bottom left',
        show: null,
        showSpeed: 100,
        theme: 'bootstrap'
    });
    $('div[data-edit-id=' + id + ']' + ' .edit-title').val($('#' + id + ' .text-title').text());
    -
        $(document).ready(function () {
            $('div[data-edit-id=' + id + ']' + ' .wback').on('change', function () {
                $('#' + id + ' .text-title').css("background", $(this).val());
                console.log($('[data-item-id=' + id + ']' + ' .wback').val());
            });
            $('div[data-edit-id=' + id + ']' + ' .wcolor').on('change', function () {
                $('#' + id + ' .text-title').css("color", $(this).val());
                console.log($('[data-item-id=' + id + ']' + ' .wcolor').val());
            });
            $('div[data-edit-id=' + id + ']' + ' .edit-title').on('keyup', function () {
                $('#' + id + ' .text-title').text($(this).val());
            });
            $('div[data-edit-id=' + id + ']' + ' .txtarea').attr('id', 'txtarea');

            CKEDITOR.document.getById('txtarea').setHtml(
                $("#" + id + " .text-content").text()
            );

            CKEDITOR.replace('txtarea', {
                toolbar: [
                    ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink']
                ]
            });
            CKEDITOR.instances["txtarea"].on("instanceReady", function () {
                this.document.on("keyup", function () {
                    validateText();
                });
            });
        });
    function validateText() {
        var numText = CKEDITOR.instances.txtarea.getData();
        var numCounter = numText.length;
        $('div[data-edit-id=' + id + ']' + ' .text-count').text(3000 - numCounter);
        $("#" + id + " .text-content").html(numText);
    }

    $(document).ready(function () {
        validateText();
    });
}
function isImageFile(file) {
    if (file.type) {
        return /^image\/\w+$/.test(file.type);
    } else {
        return /\.(jpg|jpeg|png|gif)$/.test(file);
    }
}
function editImg(id, type) {
    $('div[data-edit-id=' + id + ']' + ' #showImg').attr('src', $('#' + id + ' .img .img img').attr('src'));
    //$('div[data-edit-id='+id+']'+' .img-cropper img').attr('src',$('#'+id+' .img .img img').attr('src'));
    if ($('#' + id + ' .img>a').attr('href')) {
        $('div[data-edit-id=' + id + ']' + ' .img-link').val($('#' + id + ' .img a').attr('href').split('//')[1]);
    }
    $('div[data-edit-id=' + id + ']' + ' input[type="file"]').change(function () {
        var files;
        var file;
        var img;
        $('div[data-edit-id=' + id + ']' + ' .img-cropper').css('display', 'block');
        files = $(this).prop('files');

        if (files.length > 0) {
            file = files[0];

            if (isImageFile(file)) {
                if (this.url) {
                    URL.revokeObjectURL(this.url); // Revoke the old one
                }

                this.url = URL.createObjectURL(file);
            }
        }
        img = $('<img src="' + this.url + '">');
        $('div[data-edit-id=' + id + ']' + ' .img-cropper').html(img);
        img.cropper();
        var imgData;
        $('.saveImg').on('click', function () {
            imgData = img.cropper('getCroppedCanvas', {
                width: 640
            }).toDataURL();
            $('div[data-edit-id=' + id + ']' + ' #showImg').attr('src', imgData);
            //上传图片
            $.post(window.API.CMS.POST_IMG + '?key=' + $.cookie("key").replace(/\"/g, ""), {img: imgData}).success(function (data) {
                var imgPostUrl = data.link;
                var setLink = $('div[data-edit-id=' + id + ']' + ' .img-link').val();
                console.log(setLink);
                if (!setLink) {
                    setLink = imgPostUrl;
                } else {
                    setLink = 'http://' + setLink;
                }
                $('#' + id + ' .img .img').html("");
                $('#' + id + ' .img .img').append('<a href="' + setLink + '"><img style="width:100%;" src="' + imgPostUrl + '"></a>');
            });

        });
    });

}
function editAdress(id, type) {
    $('div[data-edit-id=' + id + ']' + ' .form-control').val($('#' + id + ' .dizhi').text());
    $('div[data-edit-id=' + id + ']' + ' .form-control').on('keyup', function () {
        $('#' + id + ' .dizhi').text($(this).val())
    })
}
function editMap(id, type) {
    var editMapId = addId();
    $('div[data-edit-id=' + id + ']' + ' .dmap').attr('id', editMapId);
    if($(id).attr("data-address")){
        freshMap(id,editMapId,$(id).attr("data-address").split(","));
    }else{
        freshMap(id,editMapId,"");
    }
}

function editMenu(id, type) {

}

//通用删除
function addEditItem(id, type) {
    var _edit = $('#' + id + ' .edit');
    _edit.on('click', function () {
        $('.editArea *').remove();
        $('.editArea').show();
        var editItem = $('.edit-items .' + type).html();
        editArea.append('<a class="close" style="margin-top:10px;margin-right:10px;" href="javascript:;" onclick="$(this).parent().hide()">&times;</a><div class="' + type + '" data-edit-id="' + id + '">' + editItem + '</div>');
        //文字功能
        switch (type) {
            case 'text':
                editText(id, type);
                break;
            case 'img':
                editImg(id, type);
                break;
            case 'address':
                editAdress(id, type);
                break;
            case 'map':
                editMap(id, type);
                break;
            case 'menu':
                editMenu(id, type);
                break;
            default :
                break;
        }

    });
    $('#' + id + ' .delete').on('click', function () {
        if (confirm('点击确认将移除该组件,无法恢复')) {
            $('#' + id).remove();
            if ($('.editArea .' + type)) {
                $('.editArea .' + type).remove();
            }
            //数组移除id为id的项
        }
    });
}
$.get(window.API.GROUP.GET_CURRENT_USER_ROUTER_GROUPS + '?key=' + $.cookie("key").replace(/\"/g, "")+"&id="+ourShop).success(function (data) {
    var area=data.results[0].province_object.name+data.results[0].city_object.name+data.results[0].area_object.name+data.results[0].district_object.name;
    console.log(area);
    $('span[data-first-area="userShopArea"]').text(area);
});

$.get(window.API.CMS.GET_DATA + '?key=' + $.cookie("key").replace(/\"/g, "") + '&group_id=' + ourShop).success(function (data) {
    if (data) {
        console.log(data);
        for (var i = 0; i < data.cms_ids.length; i++) {
            for (var j = 0; j <= data.cms.length; j++) {
                if (data.cms[j].component_id == data.cms_ids[i]) {
                    $('#drag').append(data.cms[j].div);
                    switch (data.cms[j].content_type) {
                        case 'text':
                            addEditItem(data.cms[j].component_id, data.cms[j].content_type);
                            break;
                        case 'img':
                            addEditItem(data.cms[j].component_id, data.cms[j].content_type);
                            break;
                        case 'map':
                            addEditItem(data.cms[j].component_id, data.cms[j].content_type);
                            break;
                        case 'address':
                            addEditItem(data.cms[j].component_id, data.cms[j].content_type);
                            break;
                        case 'menu':
                            addEditItem(data.cms[j].component_id, data.cms[j].content_type);
                    }
                    break;
                }
            }
        }
        //for(var i=0;i<data.cms.length;i++){
        //    $('#drag').append(data.cms[i].div);
        //    switch(data.cms[i].content_type){
        //        case 'text':
        //            addEditItem(data.cms[i].component_id,data.cms[i].content_type);
        //            break;
        //        case 'img':
        //            addEditItem(data.cms[i].component_id,data.cms[i].content_type);
        //            break;
        //        case 'map':
        //            addEditItem(data.cms[i].component_id,data.cms[i].content_type);
        //            break;
        //        case 'address':
        //            addEditItem(data.cms[i].component_id,data.cms[i].content_type);
        //            break;
        //    }
        //}
        $('#savePage').html('更新页面');
        haveData = true;
    } else {
        console.log('可以新建');
    }
});

//生成新Id
function addId() {
    var num = Math.random();
    var newId = 'd' + '' + num.toString().replace(".", '');
    return newId;
}

//编辑函数
function addItem(id, type) {
    //            获取组件模板

    if (type == 'map') {
        var mapId = addId();
        var mapArea = '<div class="map" id="' + mapId + '"></div>'
        var edit = '<div class="deledit"><span class="edit">编辑</span><span class="delete">删除</span></div>';
        $('#drag').append('<li data-type="map" class="item-list" id="' + id + '">' + mapArea + edit + '</li>');
        loadMap(mapId);
    } else {
        var itemTemp = $('.template .' + type).html();
        var edit = '<div class="deledit"><span class="edit">编辑</span><span class="delete">删除</span></div>';
        $('#drag').append('<li class="item-list" data-type="' + type + '" id="' + id + '"><div class="' + type + '">' + itemTemp + edit + '</div></li>');
    }

    switch (type) {
        case 'text':
            addEditItem(id, type);
            break;
        case 'img':
            addEditItem(id, type);
            break;
        case 'menu':
            addEditItem(id, type);
            break;
        case 'map':
            addEditItem(id, type);
            break;
        case 'address':
            addEditItem(id, type);
            break;
        case 'menu':
            addEditItem(id, type);
            break;
        default:
            break;
    }

}

//组件添加先做成点击添加咯，后面再改成拖动吧^_^
component.on('click', function () {
    var _this = $(this);
    var componentId = _this.attr('id');
    //判断是否存在ID,不存在ID的表示功能暂时未添加
    if (componentId) {
        var id = addId();
        var thisType = componentId.split('-')[1];
        addItem(id, thisType);
    } else {
        alert('组件正在开发中,感谢使用！');
    }
    console.log(thisType + '组件的ID为:' + id);
});

$('#savePage').click(function () {
    var component = $('.item-list');
    var length = component.length;
    var items = [];
    console.log(items + '----');
    for (var i = 0; i < length; i++) {
        console.log($(component[i]).prop("outerHTML"));
        items.push({
            'component_id': $(component[i]).attr("id"),
            'content_type': $(component[i]).attr("data-type"),
            'div': $(component[i]).prop("outerHTML")
        });

    }
    console.log(items);
//            $.post('http://192.168.10.200/api/cms/new_cms/?key=ee60934d-2838-4892-b1d9-6a630b993f13',{'items':items},{"dataType":"json"});

    if (haveData) {
        $.ajax({
            url: window.API.CMS.PUT_DATA + '?key=' + $.cookie("key").replace(/\"/g, "") + '&group_id=' + ourShop,
            type: "PUT",
            "dataType": "json",
            'contentType': 'application/json;charset=utf-8',
            "data": JSON.stringify({"group_id": ourShop, "items": items}),
            success: function (data) {
                alert('上传成功');
            }
        });
    } else {
        $.ajax({
            url: window.API.CMS.SEND_DATA + '?key=' + $.cookie("key").replace(/\"/g, "") + '&group_id=' + ourShop,
            type: "POST",
            "dataType": "json",
            'contentType': 'application/json;charset=utf-8',
            "data": JSON.stringify({"group_id": ourShop, "items": items}),
            success: function (data) {
                alert('上传成功');
            }
        });
    }

});
var user = {
    userId: 'b0d9abc8-d416-4b1d-b9d4-2bc82e48f774',
    address: '四川省成都市锦江区',
    telephone: 18780283005,
    area: [104.06792346,30.67994285]
//            经度、纬度
}

var t = $('.dod2 > img').cropper();
$('.saveImg').click(function () {
    //var URL='http://192.168.10.200/api/resources/new_img_resource/?key='+user.userId;
    var imgData = $('.dod2 > img').cropper('getCroppedCanvas', {
        width: 640
    }).toDataURL();
    $.post(URL, {img: imgData}).success(function (data) {
        console.log(data);
        var imgUrl = data.link;
        $('#drag').append('<li><a href="' + imgUrl + '"><img style="width:100%;" src="' + imgUrl + '"></a></li>');
        $('#showImg').attr('src', imgUrl);
    });
    alert('点击了额');

});
function loadMap(id){
    var map = new AMap.Map(id,{
        resizeEnable: true,
        zoom: 13
    });
    AMap.plugin('AMap.Geocoder',function() {
        var geocoder = new AMap.Geocoder({
            city: "010"//城市，默认：“全国”
        });
        var marker = new AMap.Marker({
            map: map,
            bubble: true
        })
    });
}
function freshMap(id,editMapId,tlnglat) {
    var map = new AMap.Map(editMapId,{
        resizeEnable: true,
        zoom: 13,
        center: tlnglat
    });
    AMap.plugin('AMap.Geocoder',function(){
        var geocoder = new AMap.Geocoder({
            city: "010"//城市，默认：“全国”
        });
        var marker = new AMap.Marker({
            map:map,
            bubble:true
        })
        map.on('click',function(e){
            marker.setPosition(e.lnglat);
            geocoder.getAddress(e.lnglat,function(status,result){
                if(status=='complete'){
                    var area_position=[e.lnglat.q,e.lnglat.A];
                    console.log(area_position);
                    marker = new AMap.Marker({
                        position:area_position,
                        map: new AMap.Map(id,{resizeEnable: true,zoom:18, center:area_position})
                    });
                    $("#"+id).attr("data-address",area_position);
                }
            });
        });

    });
    // 将标注添加到地图中
}

$('#drag').dragsort({
    dragSelector: "li",
    dragBetween: true,
    dragEnd: function () {
    },
    placeHolderTemplate: "<li><div class='placeHolder'>松开手放到此处</div></li>",
    scrollSpeed: 5
});
$(function () {
    $('.lunbo').unslider({
        speed: 500,               //  The speed to animate each slide (in milliseconds)
        delay: 5000,              //  The delay between slide animations (in milliseconds)
        complete: function () {
        },  //  A function that gets called after every slide animation
        keys: true,               //  Enable keyboard (left, right) arrow shortcuts
        dots: true,               //  Display dot navigation
        fluid: false              //  Support responsive design. May break non-responsive designs
    });
});