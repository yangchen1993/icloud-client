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
        url:"http://192.168.10.200/api/cms/new_cms/?key=ee60934d-2838-4892-b1d9-6a630b993f13",
        type:"POST",
        "dataType":"json",
        'contentType':'application/json;charset=utf-8',
        "data":JSON.stringify({"items":items}),
        success:function (data) {

        },
        error:function(data){

        }
    })
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
    telephone:18780283005
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
//        组件id生成器
function addId(){
    var date=(new Date()).getTime();
    var num=Math.random();
    var newId='d'+''+num.toString().replace(".",'');
    return newId;
}
//        添加组件
var n=1
$('.component>div').on('click',function(){
    var ids=$(this).attr('id');
    if(ids){
        var thisType=ids.split('-')[1];
        console.log(thisType);
    }else{
        console.log('ids未定义');
    }
    var id=addId();
    console.log(id+'--->'+n);
    n++;
//            获取组件模板
    if(thisType=='map'){
        var mapId=addId();
        var mapArea='<div class="map" id="'+mapId+'"></div>'
        var edit='<div class="deledit"><span class="edit">编辑</span><span class="delete">删除</span></div>';
        $('#drag').append('<li data-type="map" class="item-list" id="'+id+'">'+mapArea+edit+'</li>');
        bbmap(mapId);
    }else{
        var a=$('.template .'+thisType).html();
        var edit='<div class="deledit"><span class="edit">编辑</span><span class="delete">删除</span></div>';
        $('#drag').append('<li class="item-list" data-type="'+thisType+'" id="'+id+'"><div class="'+thisType+'">'+a+edit+'</div></li>');
    }
    $('#'+id+' .delete').on('click',function(){
        if(confirm('点击确认将移除该组件,无法恢复')){
            console.log(id);
            $(this).parent().parent().remove();
        }
    });
});
function bbmap(id){
//                console.log(id);
//            setTimeout(function(){
//                //设置地图中心点。center除了可以为坐标点以外，还支持城市名
//                map.setCenter("成都");
//                //2秒后将视图切换到指定的缩放等级，中心点坐标不变
//                map.setZoom(10);
//            }, 2000);
    var map = new BMap.Map(id);
    var point = new BMap.Point(104.06792346,30.67994285);
    map.centerAndZoom(point, 18);
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中
}
//        $('#dj-img').on('click',function(){
//            var id=addId();
//            console.log(id);
////            获取组件模板
//            var a=$('.lunbos').html();
//            $('#drag').append('<li id="'+id+'">'+a+'</li>');
//        });

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
$('.btn-modular').click(function(){
    var tt=$(this).next('.dj-template').html();
    $('#drag').append('<li>'+tt+'</li>');
});
// 百度地图API功能


function removeThis(){
    console.log($(this).val());
}