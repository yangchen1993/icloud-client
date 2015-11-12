var component=$(".component>div");//组件
var pageArea=$("");//页面中部展示区
var editArea=$(".editArea");//编辑区
var editTemp=$(".editTemp")
var conmponentItem=$("");
var ourShop=get_param(window.location.href);
//生成新Id
function addId(){
    var num=Math.random();
    var newId='d'+''+num.toString().replace(".",'');
    return newId;
}
//编辑函数
function addItem(id,type){
    //            获取组件模板
    if(type=='map'){
        var mapId=addId();
        var mapArea='<div class="map" id="'+mapId+'"></div>'
        var edit='<div class="deledit"><span class="edit">编辑</span><span class="delete">删除</span></div>';
        $('#drag').append('<li data-type="map" class="item-list" id="'+id+'">'+mapArea+edit+'</li>');
        bbmap(mapId,user.j,user.w);
    }else{
        var itemTemp=$('.template .'+type).html();
        var edit='<div class="deledit"><span class="edit">编辑</span><span class="delete">删除</span></div>';
        $('#drag').append('<li class="item-list" data-type="'+type+'" id="'+id+'"><div class="'+type+'">'+itemTemp+edit+'</div></li>');
    }

    //通用删除
    function addEditItem(){
        var _edit=$('#'+id+' .edit');
        _edit.on('click',function(){
            $('.editArea *').remove();
            var editItem=$('.edit-items .'+type).html();
            editArea.append('<div class="'+type+'" data-edit-id="'+id+'">'+editItem+'</div>');
            //文字功能
            (function(){
                $('.color').minicolors({
                    animationSpeed: 50,
                    animationEasing: 'swing',
                    change: null,
                    changeDelay: 0,
                    control: 'hue',
                    defaultValue: '',
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
                $(document).ready(function(){
                    $('div[data-edit-id='+id+']'+' .wback').on('blur',function(){
                        $('#'+id+' .text-title').css("background",$(this).val());
                        console.log($('[data-item-id='+id+']'+' .wback').val());
                    });
                    $('div[data-edit-id='+id+']'+' .wcolor').on('blur',function(){
                        $('#'+id+' .text-title').css("color",$(this).val());
                        console.log($('[data-item-id='+id+']'+' .wcolor').val());
                    });
                    $('div[data-edit-id='+id+']'+' .edit-title').on('keyup',function(){
                        $('#'+id+' .text-title').text($(this).val());
                    });
                    $('div[data-edit-id='+id+']'+' .txtarea').attr('id','txtarea');
                    CKEDITOR.replace( 'txtarea',{
                        toolbar :
                            [
                                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink']
                            ]
                    });
                    CKEDITOR.instances["txtarea"].on("instanceReady", function () {
                        this.document.on("keyup", function(){
                            validateText();
                        });
                    });
                });
                function validateText(){
                    var numText=CKEDITOR.instances.txtarea.getData();
                    var numCounter=numText.length;
                    $('div[data-edit-id='+id+']'+' .text-count').text(3000-numCounter);
                    $("#"+id+" .text-content").html(numText);
                }
                $(document).ready(function(){
                    validateText();
                });
            })();




        });
        $('#'+id+' .delete').on('click',function(){
            if(confirm('点击确认将移除该组件,无法恢复')){
                $('#'+id).remove();
                if($('.editArea .'+type)){
                    $('.editArea .'+type).remove();
                }
                //数组移除id为id的项
            }
        });
    }
    switch(type){
        case 'text':
            addEditItem();
            break;
        case 'img':
            addEditItem();
            break;
        default:
            break;
    }
}

//组件添加先做成点击添加咯，后面再改成拖动吧^_^
component.on('click',function(){
    var _this=$(this);
    var componentId=_this.attr('id');
    //判断是否存在ID,不存在ID的表示功能暂时未添加
    if(componentId){
        var id=addId();
        var thisType=componentId.split('-')[1];
        addItem(id,thisType);
    }else{
        alert('组件正在开发中,感谢使用！');
    }
    console.log(thisType+'组件的ID为:'+id);
});

$('#savePage').click(function(){
    var component=$('.item-list');
    var length=component.length;
    var items=[];
    for(var i=0;i<length;i++){
        items.push({'component_id':$(component[i]).attr("id"),'content_type':$(component[i]).attr("data-type"),'div':$(component[i]).parent().html()});
    }
    console.log(items);
//            $.post('http://192.168.10.200/api/cms/new_cms/?key=ee60934d-2838-4892-b1d9-6a630b993f13',{'items':items},{"dataType":"json"});
    $.ajax({
        url:"http://192.168.10.200/api/ourshop/new_ourshop/?key=d6b55c1f-0e5b-4354-b686-2b2e0256d38b",
        type:"POST",
        "dataType":"json",
        'contentType':'application/json;charset=utf-8',
        "data":JSON.stringify({"group_id":ourShop,"items":items}),
        success:function (data) {
            console.log('上传成功'+data);
        }
    });
});
$('input[type="file"]').change(function(){
//            var reader = new FileReader();
//            reader.onprogress=function(){
//                console.log("onprogress");
//            }
    console.log($(this).val());
    $('#myModal').modal('show');
//            $('#imgsss').attr('src',url);
});
var user={
    userId:'b0d9abc8-d416-4b1d-b9d4-2bc82e48f774',
    address:'四川省成都市锦江区',
    telephone:18780283005,
    j:104.06792346,
    w:30.67994285,
//            经度、纬度
}

var t=$('.dod2 > img').cropper();
$('.save').click(function(){
    var URL='http://192.168.10.200/api/resources/new_img_resource/?key='+user.userId;
    var imgData=$('.dod2 > img').cropper('getCroppedCanvas', {
        width:640
    }).toDataURL();
    $.post(URL,{img:imgData}).success(function(data){
        console.log(data);
        var imgUrl=data.link;
        $('#drag').append('<li><a href="'+imgUrl+'"><img style="width:100%;" src="'+imgUrl+'"></a></li>');
        $('#showImg').attr('src',imgUrl);
    });

});
function bbmap(id,j,w){
    var map = new BMap.Map(id);
    var point = new BMap.Point(j,w);
    //var point = new BMap.Point(104.06792346,30.67994285);
    map.centerAndZoom(point, 18);
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中
}

$('#drag').dragsort({
    dragSelector: "li",
    dragBetween: true,
    dragEnd: function(){
    },
    placeHolderTemplate: "<li><div class='placeHolder'>松开手放到此处</div></li>",
    scrollSpeed: 5
});
$(function() {
    $('.lunbo').unslider({
        speed: 500,               //  The speed to animate each slide (in milliseconds)
        delay: 5000,              //  The delay between slide animations (in milliseconds)
        complete: function() {},  //  A function that gets called after every slide animation
        keys: true,               //  Enable keyboard (left, right) arrow shortcuts
        dots: true,               //  Display dot navigation
        fluid: false              //  Support responsive design. May break non-responsive designs
    });
});