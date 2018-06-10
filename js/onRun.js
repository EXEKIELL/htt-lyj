var App = new Vue({
    el:'#app',
    data:{
        token:'',
        u_id:'',
        s_id:{
            s_id_1:'',//至尊购
            s_id_2:'',//超值购
            s_id_3:'',//换新购
            s_id_4:'',//免费购
        },
        orderId:{
            orderId_1:'',//至尊购
            orderId_2:'',//超值购
            orderId_3:'',//换新购
            orderId_4:'',//免费购
        },
        start:[],//活动开始
        end:[],
        //状态控制
        status:1, //页面状态：0-加载页面、1-首页
        shop_type:0,//购物类型状态: 0-首页、1-至尊购、2-超值购、3-换新购、4-免费购、5-活动规则
        subPage:0,//内页流程步骤控制：
        aa:true,
        statusNum:{
          Num_1:0,//至尊购订单状态
          Num_2:0,//超值购订单状态
          Num_3:0,//换新购订单状态
          Num_4:0,//免费购订单状态
        },
        //加载页参数：
        num01:'0%',
        classNum01:0,
        //首页参数
        btns:[
            {class:'button01 rotateInDownLeft',img:'img/button01.png'},
            {class:'button02 rotateInDownRight',img:'img/button02.png'},
            {class:'button03 rotateInUpLeft',img:'img/button03.png'},
            {class:'button04 rotateInUpRight',img:'img/button04.png'},
            {class:'button05 bounceIn',img:'img/button05.png'}
        ],
        // 通用弹窗
        popCommon01:{
            status:0,//0为关闭
            text:''
        },
        // 分享弹窗
        shareWrap:false,
        // 活动提醒弹窗
        remind:false,
        // 活动提醒
        reminded:false,
        //超值购弹窗
        popUp01:0,//0:不显示任何弹窗
        // 超值购购买协议同意状态
        agrees:false,
        // 超值购券使用状态
        quanUse:false,
        // 超值卷剩余数
        quanNum:'XXX',
        //至尊购通用弹窗
        popCommon:{
            status:false,
            text:''
        },
        // 申请退款原因
        reason:'',
        // 至尊购凭证码按钮
        use:true,
        // 至尊购填写表单信息
        msg01:{
            name:'',
            phone:'',
            city:'',
            address:'',
            type:'purchase'
        },
        // 至尊购发票
        types:'个人发票',//发票tab选择
        fptype01:'普通发票',//发票类型
        fpmessage01:{//发票表单信息
            u_id:59938,//用户id
            o_id:2,//订单id
            invoice_type:'普通发票',
            money:9999,
            rise:'',
            code:'',
            mail:'',
            type:'Invoice'
        },
        fpCommon:{//发票通用弹窗参数
            status:false,
            text:''
        },
        // 换新购抵用券状态
        quanUse03:false,

        moneyData:'预定金99元',//申请退款金额
        //首页规则---------------------------------------------------------------------------------
        //规则背景图
        ruleBack:['img/allrule1.png','img/allrule2.png','img/allrule3.png','img/allrule4.png'],
        ruleShow:false, //是否显示规则
        ruleIndex:0, //当前规则表示 0-至尊购、1-超值购、2-换新购、3-免费购
        //规则详情
        rules:[
            [
                {
                    title:'01预约',
                    content: [
                        "(1)成功预约的用户有机会获得以9999元抢购价值18888元的神级晾晒神器至尊体验权的特权。",
                        "(2)预约截止时间：7月18日零点，订金金额为99元，预约名额有限，先到先得。",
                        "(3)每个用户限预约一次；已预约但中途申请退款的不能再次预约。",
                        "(4)请填写正确的地址，抢购成功后，会根据所填地址，就近原则安排上门安装，若因地址填写有误，导致产生远程送货费用的，费用由用户自行承担。",
                        "(5)请填写正确的联系电话，提交预约后，好太太集团会安排工作人员联系用户核实信息，若因电话有误，导致信息无法核实的，好太太集团有权取消其参与资格。",
                        "(6)未抢购成功的用户，在活动结束后，会按原付款路径退回订金。"
                    ]
                },
                {
                    title:'02尾款支付',
                    content: [
                        "(1)7月19日会在好太太公众号公布获得特权的名单；并且会在本活动H5上更新用户的参与状态。",
                        "(2)用户可以在公众号或再次打开本活动H5查看是否获得特权。",
                        "(3)获得特权的用户需在规定时间内完成付款，否则好太太集团有权取消其参与资格。",
                        "(4)尾款支付成功后，5个工作日内，会有工作人员联系用户，确认上门安装事宜。"
                    ]
                },
                {
                    title:'03退款',
                    content: [
                        "(1)订金退款：未付尾款前，用户可以申请退回订金，再次点击“至尊购-退款申请”进行申请退款，退款会在20个工作日内退回。",
                        "(2)未获得特权的用户所交订金，若用户未主动申请退款，在活动结束后，会由好太太集团统一安排退回。",
                        "(3)退货退款：已安排上门安装，但未实际安装之前，用户可以在线申请退货退款；若已安装，非质量问题不退不换。",
                        "(4)上述所有退款，都会按用户原支付路径退回。"
                    ]
                },
                {
                    title:'04其它',
                    content: [
                        "(4)发票：需要开发票，可以前往 “至尊购-开发票”填写开票信息。"
                    ]
                }
            ],
            [
                {
                    title:'',
                    content:[
                        "(1)用户在线购买超值券，凭券可以用超值价在实体门店购买指定型号；全国限量10000张。",
                        "(2)可购买型号：GW-1211（超值价1288元）、GW-1362（超值价1688元）、GW-1572（超值价2488元）",
                        "(3)每个用户限购一张超值券。",
                        "(4)每张超值券仅限用于购买一台晾衣机。",
                        "(5)使用截止日期：2018年7月31日"
                    ]
                }
            ],
            [
                {
                    title:'',
                    content:[
                        "(1)用户在线购买换新抵用券，凭券到实体门店购买指定型号（具体型号由门店而定）可以减免200元；全国限量50000张。",
                        "(2)每个用户限购一张换新抵用券。",
                        "(3)每张焕新抵用券仅限用于购买一台晾衣机。",
                        "(4)使用截止日期：2018年7月31日"
                    ]
                }
            ],
            [
                {
                    title:'',
                    content:[
                        "(1)活动发布日起至7月18日零点，用户可以提交第三代智能晾衣机GW-1212的体验申请。",
                        "(2)好太太集团官方根据所交资料选择客户参与体验活动，全国限量1000个名额。",
                        "(3)7月19日，会在好太太公众号公布获得特权的名单；并且会在本活动H5上更新用户的参与状态。用户可以在公众号或再次打开本活动H5查看是否获得体验资格。",
                        "(4)免费体验的晾衣机不含送货安装，全国统一收取399元/台作为送货安装费用。",
                        "(5)请填写正确的地址，申请成功后，会根据所填地址，就近原则安排上门安装，若因地址填写有误，导致产生远程送货费用的，费用由用户自行承担。",
                        "(6)请填写正确的联系电话，申请成功后，好太太集团会安排工作人员联系用户核实信息，若因电话有误，导致信息无法核实的，好太太集团有权取消其参与资格。",
                        "(7)获得体验权的用户需在规定时间内完成送货安装费付款，否则好太太集团有权取消其参与资格。",
                        "(8)支付成功后，5个工作日内，会有工作人员联系用户，确认上门安装事宜。",
                        "(9)安装结束后客户需要再次点击“免费购”上传安装效果图。",
                        "(10)发票：需要开发票，可以前往 “免费购-开发票”填写开票信息。",
                        "(11)每个用户限申请一次。"
                    ]
                }
            ],

        ],
        //首页规则---------------------------------------------------------------------------------
        //免费购---------------------------------------------------------------------------------
        freePopStatus:-1,//0规则弹窗
        //免费页面显示 0--首页 1--填写地址 2--提交成功 3--已申请页面 4--抢购成功 5--抢购失败
        //7--开发票 8--安装凭证码 9--评价 10--提交成功
        freeIndex:0,
        yearLimit:"",//年限
        fImgList:[{'img':''},{'img':''},{'img':''}],//图片数据
        //免费评价的数据
        freeComment:{
            serve:-1,
            produce:-1,
            fcImg:[{'img':''},{'img':''},{'img':''}],
            txt:''
        },
        freeUse:false,
        //同意协议
        freeAgree:false,
        freeSubmitArr:{
            key:'Free',
            u_id:'',
            s_id:'',
            name:'',
            phone:'',
            city:'',
            address:'',
            brand:'',
            model:'',
            years:'',
            problem:'',
            photo:'',
            type:'purchase',
            token:''
        },
        //状态
        freeStatus:-1,
        //安装凭证码（免费购）
        freeCodeList:[],
        //免费购---------------------------------------------------------------------------------
        swiper1:null,
        bjList:['GW-1211','GW-1362','GW-1572'],
        index01:0
    },
    watch:{
        shop_type:function (newData,oldData) {
            if(newData == 0){
                this.subPage = 0
            }
        },
        status:function (n, o) {
            if(n == 1){
                this.remind = true;
            }
        }
    },
    methods:{
        // 至尊购------------------------------------------------------------------------------
        // 至尊购申请退款
        refund(){
            const that = this;
            this.popCommon01.status = 2;
            this.popCommon01.text = '申请退款后将无法参与该活动！';
            // this.popUp01 = 4;
            // Post('/index.php/shop/api/dataForm',{
            //     o_id:o_id.orderId_1,
            //     token:that.token,
            //     type:'refund',
            //     // refund_reason:
            // })
        },
        // 至尊购去凭证码
        toCode(){
            const that = this;
            axiosGet('/index.php/shop/api/operationOrder',{
                o_id:that.orderId.orderId_1,
                s_id:that.s_id.s_id_1,
                type:'robShoping',
                token:that.token
            },function (res) {
                console.log(res)
            })
        },
        // 至尊购补交体验款
        payMoney(){
          alert(123)
        },
        // 至尊购去开发票
        toInvoice(){

        },
        //免费购---------------------------------------------------------------------------------
        //关闭规则页面（免费购）
        closeRule(){
            this.ruleShow = false;
        },
        //关闭规则页面（免费购）
        closeRule(){
            this.ruleShow = false;
        },
        //显示大图（免费购）
        showBImg(src){
            showBigImg(src);
        },
        //删除图片 -- 旧机
        fdelImg(index){
            var self = this;
            this.fImgList[index].img = '';
            setTimeout(function(){
                upImg('file'+index,index,self.fImgList);
            },500);
        },
        //删除图片 -- 评价
        fcdelImg(index){
            var self = this;
            this.freeComment.fcImg[index].img = '';
            setTimeout(function(){
                upImg('fileCom'+index,index,self.freeComment.fcImg);
            },500);
        },
        resetComment(){
            var self = this;
            self.freeComment.serve = -1;
            self.freeComment.produce = -1;
            self.freeComment.fcImg = [{'img':''},{'img':''},{'img':''}];
            self.freeComment.txt = '';
        },
        //新机评价
        newProC(){
            var self = this;
            if(self.freeStatus==3)
            {
                this.popCommon01.status = 1;
                this.popCommon01.text = '您还没有付款,不能进行该操作！';
            }else if(self.freeStatus==4){
                self.freeIndex = 9;
                self.resetComment();
                setTimeout(function(){
                    for(var i=0; i<self.freeComment.fcImg.length; i++)
                    {
                        upImg('fileCom'+i,i,self.freeComment.fcImg)

                    }
                },500);
            }

        },
        //开发票判断
        setFreeFapiao(){
            var self = this;
            if(self.freeStatus==3)
            {
                this.popCommon01.status = 1;
                this.popCommon01.text = '您还没有付款,不能进行该操作！';
            }else if(self.freeStatus==4){
                self.freeIndex = 7;
            }
        },
        //开发票判断
        setFreeComment(){
            var self = this;
            if(self.freeStatus==3)
            {
                this.popCommon01.status = 1;
                this.popCommon01.text = '您还没有付款,不能进行该操作！';
            }else if(self.freeStatus==4){
                self.freeIndex = 8;
            }
        },
        //缴纳安装费
        setFreeMoney(){
            var self = this;
            if(self.freeStatus==4)
            {
                this.popCommon01.status = 1;
                this.popCommon01.text = '您已经付款，感谢您的支持';
            }else if(self.freeStatus==3){
                self.freePopStatus = 1;
            }
        },
        //免费购-付款
        setFreePay(){
            var self = this
            this.popCommon01.status = 1;
            this.popCommon01.text = '购买失败！';
        },
        //产片评价
        fproCmm(index){
            this.freeComment.produce = index;
        },
        //服务评价
        fserCmm(index){
            this.freeComment.serve = index;
        },
        //我要预约（免费购）
        freeBook(){
            var self = this;
            this.fImgList = [{'img':''},{'img':''},{'img':''}];
            this.freeIndex = 1;
            setTimeout(function(){
                for(var i=0; i<self.fImgList.length; i++)
                {
                    upImg('file'+i,i,self.fImgList)

                }
            },500);
        },
        //新机合影提交（免费购）
        freecSubmit(){
            var self = this;

            var arr = [];
            for(var i=0; i<this.freeComment.fcImg.length; i++)
            {
                if(this.freeComment.fcImg[i].img != '')
                {
                    arr.push(this.freeComment.fcImg[i].img);
                }
            }
            var photos = JSON.stringify(arr);
            if(this.freeComment.produce<0)
            {
                this.popCommon01.status = 1;
                this.popCommon01.text = '请给产品评价！';
            }else if(this.freeComment.serve<0){
                this.popCommon01.status = 1;
                this.popCommon01.text = '请给服务评价！';
            }else if(photos.length == 2){
                this.popCommon01.status = 1;
                this.popCommon01.text = '至少上传一张图片！';
            }else if(this.freeComment.txt == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '内容不能为空！';
            }else{
                var updata = {
                    key:'Free',
                    o_id:2147483647,
                    evaluate:(self.freeComment.produce+1)+','+(self.freeComment.serve+1),
                    comment:self.freeComment.txt,
                    photo:photos,
                    type : 'Evaluate',
                    token:self.token
                }
                Post(
                    '/index.php/shop/api/dataForm',
                    updata,
                    function (data) {
                        if(data.status==0)
                        {
                            self.popCommon01.status = 1;
                            self.popCommon01.text = data.msg;
                        }else if(data.status==1){
                            self.popCommon01.status = 1;
                            self.popCommon01.text = "评价成功，感谢您的评价！";
                        }

                    }
                )
            }


        },
        //提交地址
        fSubmit(){
            var self = this;
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            this.freeSubmitArr.years = this.yearLimit;
            var arr = [];
            for(var i=0; i<this.fImgList.length; i++)
            {
                if(this.fImgList[i].img != '')
                {
                    arr.push(this.fImgList[i].img);
                }
            }
            this.freeSubmitArr.photo = JSON.stringify(arr);
            if(this.freeSubmitArr.name == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '姓名不能为空！';
            }else if(this.freeSubmitArr.phone == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '手机号码不能为空！';
            }else if(!myreg.test(this.freeSubmitArr.phone)){
                this.popCommon01.status = 1;
                this.popCommon01.text = '手机号码格式错误！';
            }else if(this.freeSubmitArr.city == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '城市不能为空！';
            }else if(this.freeSubmitArr.address == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '具体地址不能为空！';
            }else if(this.freeSubmitArr.brand == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '产品品牌不能为空！';
            }else if(this.freeSubmitArr.model == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '产品型号不能为空！';
            }else if(this.freeSubmitArr.years == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '产品年限不能为空！';
            }else if(this.freeSubmitArr.problem == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '问题不能为空';
            }else if(this.freeSubmitArr.photo.length <= 2){
                this.popCommon01.status = 1;
                this.popCommon01.text = '旧产品图片不能为空';
            }else{
                self.freeSubmitArr.u_id = self.u_id;
                self.freeSubmitArr.s_id = self.s_id.s_id_4;
                Post(
                    '/index.php/shop/api/dataForm',
                    self.freeSubmitArr,
                    function (data) {
                        if(data.status == 0){
                            self.popCommon01.status = 1;
                            self.popCommon01.text = data.msg;
                            self.token = data.token;
                        }else{
                            self.token = data.token;
                            self.freeIndex = 2;
                        }
                    }
                )

            }

        },
        //查看凭证码
        freeLookCode(){
            var self = this;
            this.freeIndex = 8;
            this.freeUse = true;
        },
        //免费购---------------------------------------------------------------------------------
        // 首页方法：
        btn(index){
            const that = this;
            if(index == 0){ //至尊购
                axiosGet('/index.php/shop/api/operationOrder',{
                    token:that.token,
                    u_id:that.u_id,
                    s_id:that.s_id.s_id_1,
                    type:'robShoping'
                },function (res) {
                    console.log(res);
                    console.log(that.orderId);
                    that.statusNum.Num_1 = res.data.status;
                    console.log(that.statusNum.Num_1)
                    if(res.data.orderId){
                        that.orderId.orderId_1 = res.data.orderId;
                    }
                    if(res.data.status == 0){
                        that.shop_type = 1;
                        that.popUp01 = 6;
                    }else if(res.data.status == 1){
                        that.shop_type = 1;
                        that.subPage = 1;
                        that.popCommon01.status = 2;
                        that.popCommon01.text = '您有未付款订单，点击确定前往支付！'
                    }else if(res.data.status == 2){
                        that.shop_type = 1;
                        that.subPage = 9;
                    }else if(res.data.status == 3){
                        that.shop_type = 1;
                        that.subPage = 3;
                        that.popUp01 = 2;
                    }else if(res.data.status == 5){
                        that.shop_type = 1;
                        that.subPage = 4;
                        that.popUp01 = 3;
                    }else if(res.data.status == 4){
                        that.shop_type = 1;
                        that.subPage = 3;
                    }
                })
            }else if(index == 1){ //超值购
                axiosGet('/index.php/shop/api/operationOrder',{
                    token:that.token,
                    u_id:that.u_id,
                    s_id:that.s_id.s_id_2,
                    type:'existence'
                },function (res) {
                    console.log(res);
                    // that.shop_type = 3;
                    // that.subPage = 3;
                    if(res.data.status == 0){
                        axiosGet('/index.php/shop/api/operationOrder',{
                            token:that.token,
                            u_id:that.u_id,
                            s_id:that.s_id.s_id_2,
                            type:'isUseCoupon'
                        },function (res) {
                            console.log(res)
                            if(res.data.status == 0){
                                that.quanUse = true;
                                that.shop_type = 2;
                                that.subPage = 3;
                            }else if(res.data.status == 1){
                                that.quanUse = false;
                                that.shop_type = 2;
                                that.subPage = 3;
                            }
                        })
                    }else if(res.data.status == 1){
                        that.shop_type = 2;
                        that.popUp01 = 1;
                        setTimeout(function () {
                            this.swiper1 = new Swiper('.swiper-container',{
                                autoplay:2000,
                                // observer:true,//修改swiper自己或子元素时，自动初始化swiper
                                // observeParents:true,//修改swiper的父元素时，自动初始化swiper
                                pagination:'.swiper-pagination',
                                prevButton:'.swiper-button-prev',
                                nextButton:'.swiper-button-next',
                                onSlideChangeStart: function(swiper){
                                    console.log(swiper.activeIndex)
                                    that.index01 = swiper.activeIndex
                                }
                            });
                        })
                    }else if(res.data.status == 2){
                        that.shop_type = 2;
                        that.subPage = 1;
                        that.popCommon.status = true;
                        that.popCommon.text = '您有未付款订单，点击确定前往支付！'
                    }
                })
            }else if(index == 2){ //换新购
                // this.shop_type = 3
                axiosGet('/index.php/shop/api/operationOrder',{
                    token:that.token,
                    u_id:that.u_id,
                    s_id:that.s_id.s_id_3,
                    type:'existence'
                },function (res) {
                    console.log(res)
                    // that.shop_type = 3;
                    // that.subPage = 3;
                    if(res.data.status == 0){
                        axiosGet('/index.php/shop/api/operationOrder',{
                            token:that.token,
                            u_id:that.u_id,
                            s_id:that.s_id.s_id_3,
                            type:'isUseCoupon'
                        },function (res) {
                            console.log(res)
                            if(res.data.status == 0){
                                that.quanUse03 = true;
                                that.shop_type = 3;
                                that.subPage = 3;
                            }else if(res.data.status == 1){
                                that.quanUse03 = false;
                                that.shop_type = 3;
                                that.subPage = 3;
                            }
                        })
                    }else if(res.data.status == 1){
                        that.shop_type = 3;
                        that.popUp01 = 1;
                    }else if(res.data.status == 2){
                        that.shop_type = 3;
                        that.subPage = 1;
                        that.popCommon.status = true;
                        that.popCommon.text = '您有未付款订单，点击确定前往支付！'
                    }


                    //sdffdfsdfsd
                })
            }else if(index == 3){ //免费购
                var self = this;

                //设置首页中心高度
                var hTween = setTimeout(function(){
                    var h1 = $('#index_4 .i-1 .list2 .list2Top img').height();
                    var h2 =  $('#index_4 .i-1 .list2 .list2Bottom').height()
                    var h = $(window).height()-h1-h2;
                    $('#index_4 .i-1 .list2 .list2Mottom').height(h);
                },100);

                //免费购
                axiosGet('/index.php/shop/api/operationOrder',{
                    token:that.token,
                    u_id:that.u_id,
                    s_id:that.s_id.s_id_4,
                    type:'robShoping'
                },function (res) {
                    console.log(res);
                    if(res.data.status == 0)
                    {
                        self.shop_type = 4
                        self.freePopStatus = 0;
                        self.freeIndex = 0;
                    }else if(res.data.status == 2){
                        self.shop_type = 4
                        self.freeIndex = 3;
                    }else if(res.data.status == 3){
                        self.shop_type = 4
                        self.freeIndex = 4;
                        self.freeStatus = res.data.status;
                    }else if(res.data.status == 4){
                        self.shop_type = 4
                        self.freeIndex = 4;
                        self.freeStatus = res.data.status;
                        self.freeCodeList = res.data.code.toString().split("");
                    }else{
                        self.shop_type = 4
                        self.freeIndex = 5;
                    }

                })

            }else{
                this.ruleShow = true;
                console.log(1);
            }
        },
        //关闭弹窗
        close(){
            this.popUp01 = 0
        },
        //超值购我要预约
        i1Btn01(){
            const that = this;
            let id = this.s_id.s_id_2;
            // 获取剩余券数
            $.get(
                'https://haotaitai.hengdikeji.com/index.php/shop/api/shopNumber',
                {id:id,token:that.token},
                function (data) {
                    if(data.number<=0){
                        that.popUp01 = 2
                    }else{
                        that.quanNum = data.number;
                        that.popUp01 = 3
                    }
                }
            )
        },
        // 超值购弹窗按钮
        btn01(){
            const that = this;
            if(this.shop_type == 1 && this.subPage == 1){
                var msg00 = this.msg01;
                msg00.type = 'purchase';
                msg00.token = this.token;
                msg00.u_id = this.u_id;
                msg00.s_id = this.s_id.s_id_1;
                console.log(msg00);
                Post('/index.php/shop/api/dataForm',msg00,function (res) {
                    console.log(res);
                    if(res.status == 0&&res.msg == "您已存在该商品的订单，请勿重复提交订单"){
                        that.popUp01 = 0;
                        that.popCommon.status = true;
                        that.popCommon.text = '您已有未付款订单，点击确定前往支付！';
                    }else if(res.status == 1){
                        that.orderId.orderId_1 = res.orderId;
                        console.log(that.orderId.orderId_1)
                        alert(1);
                        that.subPage = 2;
                        that.popUp01 = 0;
                    }
                })
            }
            if(this.shop_type == 2&&this.subPage == 1){
                var msg00 = this.msg01;
                msg00.type = 'purchase';
                msg00.token = this.token;
                msg00.u_id = this.u_id;
                msg00.s_id = this.s_id.s_id_2;
                console.log(msg00);
                this.popUp01 = 4
                Post('/index.php/shop/api/dataForm',msg00,function (res) {
                    console.log(res);
                    if(res.status == 0&&res.msg == "您已存在该商品的订单，请勿重复提交订单"){
                        that.popUp01 = 0;
                        that.popCommon.status = true;
                        that.popCommon.text = '您已有未付款订单，点击确定前往支付！';
                    }else if(res.status == 1){
                        that.orderId.orderId_2 = res.orderId;
                        console.log(that.orderId.orderId_2);
                    }
                })
            }
            if(this.shop_type == 3&&this.subPage == 1){
                var msg00 = this.msg01;
                msg00.type = 'purchase';
                msg00.token = this.token;
                msg00.u_id = this.u_id;
                msg00.s_id = this.s_id.s_id_3;
                console.log(msg00);
                this.popUp01 = 4
                Post('/index.php/shop/api/dataForm',msg00,function (res) {
                    console.log(res);
                    if(res.status == 0&&res.msg == "您已存在该商品的订单，请勿重复提交订单"){
                        that.popUp01 = 0;
                        that.popCommon.status = true;
                        that.popCommon.text = '您已有未付款订单，点击确定前往支付！';
                    }else if(res.status == 1){
                        that.orderId.orderId_3 = res.orderId;
                        console.log(that.orderId.orderId_3)
                    }
                })
            }
        },
        // 超值购购买协议活动规则跳转
        navTo(){
            this.popUp01 = 1
        },
        // 超值购信息提交
        submit02(){
            const that = this;
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(this.msg01.name == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '姓名不能为空!';
            }else if(this.msg01.phone == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '手机号码不能为空!';
            }else if(!myreg.test(this.msg01.phone)){
                this.popCommon01.status = 1;
                this.popCommon01.text = '手机号码格式错误！';
            }else if(this.msg01.city == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '请选择城市';
            }else if(this.msg01.address == ''){
                this.popCommon01.status = 1;
                this.popCommon01.text = '具体地址不能为空!';
            }else{
                this.popUp01 = 4
            }
        },
        // 至尊购开发票tab切换s
        sel01(item){
            $(event.target).parent('div').find('div').removeClass('nav01_sel nav02_sel');
            if(item == 'nav01'){
                $(event.target).addClass('nav01_sel');
                this.types = '个人发票'
            }else{
                $(event.target).addClass('nav02_sel');
                this.types = '企业发票'
            }

        },
        //发票信息提交
        fpbtn01(){
            if(this.fpmessage01.rise == ''){
                this.fpCommon.status = true;
                this.fpCommon.text = '请输入发票的抬头名称';
            }else if(this.fpmessage01.code == ''&&this.types == '企业发票'){
                this.fpCommon.status = true;
                this.fpCommon.text = '请输入发票的识别号';
            }else if(this.fpmessage01.mail == ''){
                this.fpCommon.status = true;
                this.fpCommon.text = '请输入发票的电子邮箱';
            }else{
                console.log(this.fpmessage01);
                const that = this;
                this.fpmessage01.types = this.types;
                this.fpmessage01.token = this.token;
                console.log(this.fpmessage01.types)
                $.post(
                    'https://haotaitai.hengdikeji.com/index.php/shop/api/dataForm',
                    that.fpmessage01,
                    function (data) {
                        console.log(data)
                        if(data.status == 0){
                            console.log(1)
                            that.fpCommon.status = true;
                            that.fpCommon.text = data.msg;
                            that.token = data.token;
                            console.log(that.token)
                        }else{
                            console.log(2)
                            that.fpCommon.status = true;
                            that.fpCommon.text = '发票申请成功';
                            that.token = data.token;
                            console.log(that.token)
                        }
                    }
                )
            }
        },
        // 退款按钮
        tkbtns(item){
            if(item == 'sure'){
                if(this.reason == ''){
                    this.popCommon.status = true;
                    this.popCommon.text = '请填写您的退款原因'
                }else{
                    console.log(this.reason);
                    alert('申请退款');
                    this.popUp01 = 0;
                    this.shop_type = 0;
                    this.popCommon01.status = 2;
                    this.popCommon01.text = '退款申请已提交，请耐心等待！'
                }
            }else{
                this.popUp01 = 0;
            }
        },
        // 至尊购信息提交
        submit01(){
            const that = this;
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(this.msg01.name == ''){
                this.popCommon.status = true;
                this.popCommon.text = '用户名不能为空';
            }else if(this.msg01.phone == ''){
                this.popCommon.status = true;
                this.popCommon.text = '手机号不能为空';
            }else if(!myreg.test(this.msg01.phone)){
                this.popCommon01.status = 1;
                this.popCommon01.text = '手机号码格式错误！';
            }else if(this.msg01.city == ''){
                this.popCommon.status = true;
                this.popCommon.text = '请选择城市';
            }else if(this.msg01.address == ''){
                this.popCommon.status = true;
                this.popCommon.text = '请填写详细地址';
            }else{
                this.popUp01 = 1;
            }
        },
        // 通用弹窗按钮
        button_1(){
            const that = this;
            if(this.shop_type == 0){
                this.popCommon01 = 0;
            }
            if(this.shop_type == 1&&this.subPage == 1){
                alert(1)
                that.popCommon01.status = 0
                that.subPage = 2;
            }
            if(this.shop_type == 3&&this.subPage == 1){
                that.popCommon01.status = 0
            }
            if(this.shop_type == 1 && this.subPage == 9){
                that.popCommon01.status = 0;
                that.popUp01 = 4;
                // console.log(that.orderId)
                // Post('/index.php/shop/api/operationOrder',{
                //     o_id:that.orderId.orderId_1,
                //     s_id:that.s_id.s_id_1,
                //     type:'refundMoney',
                //     token:that.token,
                // },function (res) {
                //     console.log(res)
                // })
            }
            if(this.shop_type == 1 && this.subPage == 3){
                that.popCommon01.status = 0;
                that.popUp01 = 4;
            }
        },
        // 换新购
        // 换新购使用抵用券
        useDY(){
            const that = this;
            // quanUse03 = true;popCommon.status = false
            // 使用抵用券
            if(this.subPage == 3 && this.shop_type == 3){
                axiosGet('/index.php/shop/api/operationOrder',{
                    token:that.token,
                    u_id:that.u_id,
                    s_id:that.s_id.s_id_3,
                    type:'useCoupon'
                },function (res) {
                    console.log(res);
                    that.quanUse03 = true;
                    that.popCommon.status = false
                })
            }
            // 使用超值券
            if(this.subPage == 3 && this.shop_type == 2){
                axiosGet('/index.php/shop/api/operationOrder',{
                    token:that.token,
                    u_id:that.u_id,
                    s_id:that.s_id.s_id_2,
                    type:'useCoupon'
                },function (res) {
                    console.log(res);
                    that.quanUse = true;
                    that.popCommon.status = false
                })
            }
            // 换新购支付
            if(this.shop_type == 3 && this.subPage == 1){
                alert(123);
                that.popCommon.status = false;
                that.subPage = 2
            }
            // 超值购支付
            if(this.shop_type == 2 && this.subPage == 1){
                alert(123);
                that.popCommon.status = false;
                that.subPage = 2
            }
        }
    },
    updated(){
        const that = this;
        //////////////////////////////////////////////////////////////
        $('.img').click(function () {
            return false
        });

        //超值购选择省市区
        !function () {
            var $target = $('#acity');

            $target.citySelect();

            $target.on('click', function (event) {
                event.stopPropagation();
                $target.citySelect('open');
            });

            $target.on('done.ydui.cityselect', function (ret) {
                $(this).val(ret.provance + '市 ' + ret.city + ' ' + ret.area);
                that.msg01.city = ret.provance + '市 ' + ret.city + ' ' + ret.area;
            });
        }();
        $('#acity').focusin(function () {
            $(this).blur();
        })

        //免费购 3级联动
        !function () {
            var $target = $('#freeCity');
            $target.citySelect();

            $target.on('click', function (event) {
                event.stopPropagation();
                $target.citySelect('open');
            });

            $target.on('done.ydui.cityselect', function (ret) {
                $(this).val(ret.provance + ' ' + ret.city + ' ' + ret.area);
                that.freeSubmitArr.city = ret.provance + '市 ' + ret.city + ' ' + ret.area;
            });
        }();
        // 至尊购选择省市区
        !function () {
            var $target = $('#acity02');
            $target.citySelect();

            $target.on('click', function (event) {
                event.stopPropagation();
                $target.citySelect('open');
            });

            $target.on('done.ydui.cityselect', function (ret) {
                $(this).val(ret.provance + '市 ' + ret.city + ' ' + ret.area);
                that.msg01.city = ret.provance + '市 ' + ret.city + ' ' + ret.area;
            });
        }();
        // 换新购选择省市区
        !function () {
            var $target = $('#acity03');
            $target.citySelect();

            $target.on('click', function (event) {
                event.stopPropagation();
                $target.citySelect('open');
            });

            $target.on('done.ydui.cityselect', function (ret) {
                $(this).val(ret.provance + '市 ' + ret.city + ' ' + ret.area);
                that.msg01.city = ret.provance + '市 ' + ret.city + ' ' + ret.area;
            });
        }();

        $('#freeCity').focusin(function () {
            $(this).blur();
        })
        $('#acity02').focusin(function () {
            $(this).blur();
        })
    },
    mounted:function () {
        const that = this;
        // 获取token
        axiosGet('/index.php/shop/error/getToken',{},function (res) {
            that.token = res.data.token;
            console.log('页面加载获取token：',that.token);
            //获取用户id
            axiosGet('/index.php/shop/api/getUserInfo',{
                token:that.token
            },function (res) {
                that.u_id = res.data.user_id;
                console.log('用户id：',res);
            });
            //获取活动时间
            axiosGet('/index.php/shop/api/Activitytime',{
                token:that.token
            },function (res) {
                console.log(res)
                that.start = res.data.begin.split('-');
                that.end = res.data.end.split('-');
            });
            //获取商品id
            axiosGet('/index.php/shop/api/getShop',{
                token:that.token
            },function (res) {
                for(var i in res.data){
                    if(res.data[i].name == '至尊购'){
                        that.s_id.s_id_1 = res.data[i].id
                    }else if(res.data[i].name == '超值购'){
                        that.s_id.s_id_2 = res.data[i].id
                    }else if(res.data[i].name == '换新购'){
                        that.s_id.s_id_3 = res.data[i].id
                    }else if(res.data[i].name == '免费购'){
                        that.s_id.s_id_4 = res.data[i].id
                    }
                }
                console.log(that.s_id)
            })
        });
        var swiper1 = new Swiper('.swiper-container',{

        });
        //加载完后进入首页
        setTimeout(function () {
            load(imgList,that)
        },100);


    }
})