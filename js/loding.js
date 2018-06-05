var imgList = [
    'img/bj01.png',
    'img/logo01.png',
    'img/music.png'
]

function load(data,that) {
    var list = data,
        maxLen = data.length,
        maxlen1 = 14,
        len = 0,
        len1 = 0;
    that.num01 = len+'%';
    that.classNum01 = len1;
    var timer1 = setInterval(function () {
        var starImg = new Image();
        starImg.src = data[len];
        starImg.onload = function () {
            len++;
            len1 = parseInt(maxlen1*(len/maxLen));
        }
        if(len/maxLen<1){
            that.num01 = parseInt(len/maxLen*100)+'%';
            that.classNum01 = len1;
        }else{
            that.num01 = '100%';
            that.classNum01 = 14;
            setTimeout(function () {
                that.status = 1;
            },500);
            clearInterval(timer1);
        }
    },100)
}