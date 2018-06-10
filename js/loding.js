var imgList = [
    'img/bj01.png',
    'img/bj02.png',
    'img/bj03.png',
    'img/bj04.png',
    'img/bj04_1.png',
    'img/bj05.png',
    'img/bj06.png',
    'img/bj07.png',
    'img/bj07_1.png',
    'img/bj08.png',
    'img/bj09.png',
    'img/bj10.png',
    'img/bj11.png',
    'img/bj12_1.png',
    'img/bj12_2.png',
    'img/bj12-3.png',
    'img/bj13.png',
    'img/bj14.png',
    'img/bj15.png',
    'img/bj16.png',
    'img/bj16_1.png',
    'img/bj17.png',
    'img/bj18.png',
    'img/logo01.png',
    'img/music.png',
    'img/button01.png',
    'img/button02.png',
    'img/button03.png',
    'img/button04.png',
    'img/button05.png',
    'img/button07.png',
    'img/button08.png',
    'img/button09.png',
    'img/button10.png',
    'img/button11.png',
    'img/button12.png',
    'img/button13.png',
    'img/button14.png',
    'img/button15.png',
    'img/button16.png',
    'img/button17.png',
    'img/button18.png',
    'img/button19.png',
    'img/button20.png',
    'img/bj_GW-1211.png',
    'img/bj_GW-1362.png',
    'img/bj_GW-1572.png',
    'img/nav01.png',
    'img/nav01_sel.png',
    'img/nav02.png',
    'img/nav02_sel.png',
    'img/allrule1.png',
    'img/allrule2.png',
    'img/allrule3.png',
    'img/allrule4.png',
    'img/balloon01.png',
    'img/balloon02.png',
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