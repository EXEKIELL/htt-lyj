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