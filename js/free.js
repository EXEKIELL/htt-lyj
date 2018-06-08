//加载
function upLoading(){
    var html = '';
    html += '<div id="popLoading"><img src="img/loading-1.gif" /></div>';
    $('body').append(html);
}
function closeLoading(){
    $('#popLoading').remove();
}
function showBigImg(src){
    $('#imgShow').remove();
    var html = '';
    html += '<div id="imgShow" class="winFlex"><img src="'+src+'" /></div>';
    $('body').append(html);
    $('#imgShow').one('click',function(){
        $(this).remove();
    });

}
function upImg(id,index,imgBox)
{
    //上传图片
    var _upFile = document.getElementById(id);
    _upFile.addEventListener("change", function() {

        if(_upFile.files.length === 0) {
            alert("3")
            return;
        }
        var oFile = _upFile.files[0];
        //if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return; }

        /*  if(oFile.size>5*1024*1024){
         message(myCache.par.lang,{cn:"照片上传：文件不能超过5MB!请使用容量更小的照片。",en:"证书上传：文件不能超过100K!"})

         return;
         }*/
        if(!new RegExp("(jpg|jpeg|png)+", "gi").test(oFile.type)) {
            alert("照片上传：文件类型必须是JPG、JPEG、PNG");
            return;
        }
        upLoading();
        var reader = new FileReader();
        reader.onload = function(e) {
            var base64Img = e.target.result;
            //压缩前预览

            //--执行resize。
            var _ir = ImageResizer({
                resizeMode: "auto",
                dataSource: base64Img,
                dataSourceType: "base64",
                maxWidth: 714 //允许的最大宽度
                ,
                maxHeight: 1334 //允许的最大高度。
                ,
                onTmpImgGenerate: function(img) {

                },
                success: function(resizeImgBase64, canvas){
                    closeLoading();
                    //赋值到隐藏域传给后台
                    // $('#imgOne').val(resizeImgBase64.substr(22));
                    imgBox[index].img = resizeImgBase64;
                    console.log(App.fImgList);
                },
                debug: true
            });

        };
        reader.readAsDataURL(oFile);
    }, false);
}
$(function(){

})