//音频播放
function audioAutoPlay(id){
    var audio = document.getElementById(id);
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
    }, false);
}
//音乐开启
function music(){
    //音乐
    var music = 0;
    var musicOpen = true;
    var musicTween = setInterval(function() {
        music += 2;
        $('#music').css('transform', "rotate(" + music + "deg)");
        if(music == 360) {
            music = 0;
        }
    }, 10);
    $('#music').on('touchstart', function() {
        if(musicOpen == true) {
            musicOpen = false;
            clearInterval(musicTween);
            $('#bg')[0].pause();
        } else {
            musicOpen = true;
            musicTween = setInterval(function() {
                music += 2;
                $('#music').css('transform', "rotate(" + music + "deg)");
                if(music == 360) {
                    music = 0;
                }
            }, 10);
            $('#bg')[0].play();
        }
    });
}
var baseUrl = 'https://haotaitai.hengdikeji.com';
//post请求
function Post(url, data, fun) {
    $.post(
        baseUrl+url,
        data,
        function (data) {
            if(typeof fun == 'function'){
                fun(data)
            }
        },
        'json'
    )
}
//get请求
function Get(url, data, fun) {
    $.get(
        baseUrl+url,
        data,
        function (data) {
            if(typeof fun == 'function'){
                fun(data)
            }
        },
        'json'

    )
}
//axios get请求
function axiosGet(url, params, fun) {
    axios({
        method:'get',
        baseURL:baseUrl,
        url:url,
        params:params
    }).then(res=>{
        if (typeof fun == 'function') {
            fun(res)
        }
    }).catch(error=>{
        if(typeof fun == 'function') {
            fun(error)
        }
    })
}
//axios post请求
function axiosPost(url, data, fun) {
    axios({
        method:'post',
        baseURL:baseUrl,
        url:url,
        header:'application/json',
        data:data
    }).then(res=>{
        if(typeof fun == 'function') {
            fun(res);
        }
    }).catch(error=>{
        if(typeof fun == 'function') {
            fun(error)
        }
    })
}