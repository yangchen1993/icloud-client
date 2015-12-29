/**
 * Created by dujun on 2015/12/23.
 */
var component = $(".component>div");//组件
var pageArea = $("");//页面中部展示区
var editArea = $(".editArea");//编辑区
var editTemp = $(".editTemp")
var conmponentItem = $("");
var haveData = '';
var ad_id = get_param(window.location.href, "ad_id");

function showSlider(id) {
    var slider = new Swiper("#" + id + " .swiper-container", {
        pagination: '.pagination',
        autoplay: 3000,
        continuous: true,
        hashnav: true,
        loop: true,
        grabCursor: true,
        paginationClickable: true
    })
}
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
    $(document).ready(function () {
        $('div[data-edit-id=' + id + ']' + ' .wback').on('change', function () {
            $("#" + id + " .text-content").css("background", $(this).val());
            console.log($('[data-item-id=' + id + ']' + ' .wback').val());
        });
        $('div[data-edit-id=' + id + ']' + ' .wcolor').on('change', function () {
            $("#" + id + " .text-content").css("color", $(this).val());
            console.log($('[data-item-id=' + id + ']' + ' .wcolor').val());
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
                    setLink = 'javascript:;';
                } else {
                    setLink = 'http://' + setLink;
                }
                $('#' + id + ' .img .img').html("");
                $('#' + id + ' .img .img').append('<a href="' + setLink + '"><img style="width:100%;" src="' + imgPostUrl + '"></a>');
            });

        });
    });

}
function editSlider(id, type) {
    var imgBox = [];
    $('div[data-edit-id=' + id + '] #upload-img0').change(function () {
        //$("#slider-edit-img").removeClass("fade").css("display","block");
        var upInput = $(this);
        console.log($(this));
        var files;
        var file;
        var img;
        files = $(this).prop('files');
        if (files.length > 0) {
            file = files[0];
            if (isImageFile(file)) {
                if (this.url) {
                    this.url = ''; // Revoke the old one
                }
                this.url = URL.createObjectURL(file);
            }
        }
        var img = $('<img src="' + this.url + '">');
        $('#slider-edit-img0  .modal-body').html(img);
        $("#slider-edit-img0").modal();
        $("#slider-edit-img0").on("hidden.bs.modal", function () {
            upInput.val("");
        });
        img.cropper({
            aspectRatio: 2
        });
        var imgData = "";
        $('#slider-edit-img0  .save').on('click', function () {
            $("#slider-edit-img0").modal("hide");
            upInput.val("");
            console.log("0");
            imgData = img.cropper('getCroppedCanvas', {
                width: 320
            }).toDataURL();
            upInput.val("");
            $.post(window.API.CMS.POST_IMG + '?key=' + $.cookie("key").replace(/\"/g, ""), {img: imgData}).success(function (data) {
                var imgPostUrl = data.link;
                imgBox.push('<img  src="' + imgPostUrl + '">');
                $('div[data-edit-id=' + id + '] .edit0').html(
                    '<div  class="img-box form-inline">' +
                    '<div class="img-for-edit">' +
                    '<img  src="' + imgPostUrl + '">' +
                    '</div>' +
                    '<div class="link"><div>图片链接</div><div>' +
                    '<input type="text" class="form-control links" placeholder="如:idianjia.com">'
                );
            });
        });
    })

    $('div[data-edit-id=' + id + '] #upload-img1').change(function () {
        //$("#slider-edit-img").removeClass("fade").css("display","block");
        var upInput = $(this);
        console.log($(this));
        var files;
        var file;
        var img;
        files = $(this).prop('files');
        if (files.length > 0) {
            file = files[0];
            if (isImageFile(file)) {
                if (this.url) {
                    this.url = ''; // Revoke the old one
                }
                this.url = URL.createObjectURL(file);
            }
        }
        var img = $('<img src="' + this.url + '">');
        $('#slider-edit-img1  .modal-body').html(img);
        $("#slider-edit-img1").modal();
        $("#slider-edit-img1").on("hidden.bs.modal", function () {
            upInput.val("");
        });
        img.cropper({
            aspectRatio: 2
        });
        var imgData = "";
        $('#slider-edit-img1  .save').on('click', function () {
            $("#slider-edit-img1").modal("hide");
            upInput.val("");
            console.log("1");
            imgData = img.cropper('getCroppedCanvas', {
                width: 320
            }).toDataURL();
            upInput.val("");
            $.post(window.API.CMS.POST_IMG + '?key=' + $.cookie("key").replace(/\"/g, ""), {img: imgData}).success(function (data) {
                var imgPostUrl = data.link;
                imgBox.push('<img  src="' + imgPostUrl + '">');
                console.log(imgBox);
                $('div[data-edit-id=' + id + '] .edit1').html(
                    '<div  class="img-box form-inline">' +
                    '<div class="img-for-edit">' +
                    '<img  src="' + imgPostUrl + '">' +
                    '</div>' +
                    '<div class="link"><div>图片链接</div><div>' +
                    '<input type="text" class="form-control links" placeholder="如:idianjia.com">'
                );
            });
        });
    })

    $('div[data-edit-id=' + id + '] #upload-img2').change(function () {
        //$("#slider-edit-img").removeClass("fade").css("display","block");
        var upInput = $(this);
        console.log($(this));
        var files;
        var file;
        var img;
        files = $(this).prop('files');
        if (files.length > 0) {
            file = files[0];
            if (isImageFile(file)) {
                if (this.url) {
                    this.url = ''; // Revoke the old one
                }
                this.url = URL.createObjectURL(file);
            }
        }
        var img = $('<img src="' + this.url + '">');
        $('#slider-edit-img2  .modal-body').html(img);
        $("#slider-edit-img2").modal();
        $("#slider-edit-img2").on("hidden.bs.modal", function () {
            upInput.val("");
        });
        img.cropper({
            aspectRatio: 2
        });
        var imgData = "";
        $('#slider-edit-img2  .save').on('click', function () {
            $("#slider-edit-img2").modal("hide");
            upInput.val("");
            console.log("2");
            imgData = img.cropper('getCroppedCanvas', {
                width: 320
            }).toDataURL();
            upInput.val("");
            $.post(window.API.CMS.POST_IMG + '?key=' + $.cookie("key").replace(/\"/g, ""), {img: imgData}).success(function (data) {
                var imgPostUrl = data.link;
                imgBox.push('<img  src="' + imgPostUrl + '">');
                console.log(imgBox);
                $('div[data-edit-id=' + id + '] .edit2').html(
                    '<div  class="img-box form-inline">' +
                    '<div class="img-for-edit">' +
                    '<img  src="' + imgPostUrl + '">' +
                    '</div>' +
                    '<div class="link"><div>图片链接</div><div>' +
                    '<input type="text" class="form-control links" placeholder="如:idianjia.com">'
                );
            });
        });
    });
    $("#enter").click(function () {
        $("#" + id + " .swiper-wrapper").html("");
        $("#" + id + " .script").remove();
        var div = "";
        for (var i = 0; i < imgBox.length; i++) {
            var link = $('div[data-edit-id=' + id + '] .edit' + i + ' .links').val();
            div = div + "<div class='swiper-slide'><a href='http://" + link + "'>" + imgBox[i] + "</a></div>";
        }
        console.log(div);
        $("#" + id + " .swiper-wrapper").html(div);
        //var slider=new Swiper("#"+id+" .swiper-container",{
        //    pagination: '.pagination',
        //    autoplay: 3000,
        //    continuous: true,
        //"pagination: '#"+id+" .pagination',"+
        //    hashnav: true,
        //    loop:true,
        //    grabCursor: true,
        //    paginationClickable: true
        //'pagination: '+'"#'+id+' .pagination",'+
        //"hashnav:true,"+
        //})
        $("#" + id + " .slider").append(
            "<div class='script'>" +
            '<script>' +
            'var slider=new Swiper("#' + id + ' .swiper-container",{' +
            "autoplay: 4000," +
            "continuous: true," +
            "loop:true," +
            "grabCursor: true," +
            "paginationClickable: true" +
            "})" +
            '</script>' +
            "</div>"
        );
        imgBox = [];
    });
}
function testeditSlider(id, type) {
    var imgBox = [];
    var a = 0;
    $('div[data-edit-id=' + id + '] #upload-img').change(function () {
        //$('#slider-edit-img .save').attr('id','t'+a);
        //$("#slider-edit-img").removeClass("fade").css("display","block");
        var upInput = $(this);
        console.log($(this));
        var files;
        var file;
        var img;
        files = $(this).prop('files');
        if (files.length > 0) {
            file = files[0];
            if (isImageFile(file)) {
                if (this.url) {
                    this.url = ''; // Revoke the old one
                }
                this.url = URL.createObjectURL(file);
            }
        }
        var img = $('<img src="' + this.url + '">');
        $('#slider-edit-img .modal-body').html(img);
        $("#slider-edit-img").modal();
        $("#slider-edit-img").on("hidden.bs.modal", function () {
            upInput.val("");
        });
        img.cropper({
            aspectRatio: 2
        });
        var imgData = "";
        console.log(img.size() + "第一次");
        $('#slider-edit-img #t' + a).on('click', function () {
            $("#slider-edit-img").modal("hide");
            console.log(a);
            a++;
            //imgData = img.cropper('getCroppedCanvas', {
            //    width: 320
            //}).toDataURL();
            //imgBox=[];
            //upInput.val("");
            //$.post(window.API.CMS.POST_IMG + '?key=' + $.cookie("key").replace(/\"/g, ""), {img: imgData}).success(function (data) {
            //    var imgPostUrl = data.link;
            //    imgBox.push('<img  src="' + imgPostUrl + '">');
            //    console.log(imgBox);
            //    for(var i=0;i<imgBox.length;i++){
            //        $('div[data-edit-id=' + id + '] .img-edit-box-show').append(
            //            '<div  class="img-box form-inline">'+
            //            '<div class="img-for-edit">'+
            //            imgBox[i]+
            //            '</div>'+
            //            '<div class="link"><div>图片链接</div><div>'+
            //            '<input type="text" class="form-control" placeholder="不加http://">'+
            //            '</div></div><div class="close">&times</div></div>'
            //        );
            //    }
            //});
        });
    });
    $("#enter").click(function () {
        var div = "";
        for (var i = 0; i < imgBox.length; i++) {
            console.log(i);
            div = div + "<div class='swiper-slide'>" + imgBox[i] + "</div>";
        }
        $("#" + id + " .swiper-wrapper").html(div);
        showSlider(id);
    });
}
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
            case 'slider':
                editSlider(id, type);
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
        bbmap(mapId, user.j, user.w);
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
        case 'slider':
            addEditItem(id, type);
            break;
        case 'picmenu':
            addEditItem(id, type);
            break;
        default:
            break;
    }

}
if (!ad_id) {
    console.log("新建");
    $('.ad-active').text('新建广告');
    $('#save-ad').click(function () {
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
        $.ajax({
            url: window.API.AD.NEW_AD + '?key=' + $.cookie("key").replace(/\"/g, ""),
            type: "POST",
            "dataType": "json",
            'contentType': 'application/json;charset=utf-8',
            "data": JSON.stringify({
                "category_id": $(".category").val().split(':')[1],
                "items": items,
                "title": $("#ad_title").val()
            }),
            success: function (data) {
                window.location.href = "#/main/ads";
            }
        });

    });

} else {
    console.log("编辑");
    $('.ad-active').text('编辑广告');
//        带了ID表示编辑  http://host:port/api/ads/get_ad_info/?key=token&id=1
    $.get(window.API.AD.GET_AD_INFO + '?key=' + $.cookie("key").replace(/\"/g, "") + '&id=' + ad_id).success(function (data) {
        console.log(data);
        $(".category").val('number:' + data.category_id);
        $("#ad_title").val(data.title);
        for (var i = 0; i < data.cms_ids.length; i++) {
            for (var j = 0; j < data.cms.length; j++) {
                if (data.cms[j].component_id == data.cms_ids[i]) {
                    console.log('----');
                    console.log(data.cms[j].component_id);
                    $('#drag').append(data.cms[j].div);
                    switch (data.cms[j].content_type) {
                        case 'text':
                            addEditItem(data.cms[j].component_id, data.cms[j].content_type);
                            break;
                        case 'img':
                            addEditItem(data.cms[j].component_id, data.cms[j].content_type);
                            break;
                        case 'slider':
                            addEditItem(data.cms[j].component_id, data.cms[j].content_type);
                            break;
                        case 'picmenu':
                            addEditItem(data.cms[j].component_id, data.cms[j].content_type);
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    });

    $('#save-ad').click(function () {
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
        $.ajax({
            url: window.API.AD.EDIT_AD + '?key=' + $.cookie("key").replace(/\"/g, "") + '&id=' + ad_id,
            type: "PUT",
            "dataType": "json",
            'contentType': 'application/json;charset=utf-8',
            "data": JSON.stringify({
                "category_id": $(".category").val().split(':')[1],
                "items": items,
                "title": $("#ad_title").val().toString()
            }),
            success: function (data) {
                alert('更新成功');
                window.location.href = "/#/main/ads"
            }
        });
    });
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
$('#drag').dragsort({
    dragSelector: "li",
    dragBetween: true,
    dragEnd: function () {
    },
    placeHolderTemplate: "<li><div class='placeHolder'>松开手放到此处</div></li>",
    scrollSpeed: 5
});