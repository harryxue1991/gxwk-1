<template>
    <div class="video_page">
    <div class="header">
            <div class="header_title">
                <router-link  to="/">< 返回</router-link>
                <span>{{video.title}}</span>
            </div>
             <div class="head_portrait">
                <img :src="video.headlogo" alt="">
            </div>
    </div>
    <div class="mid_video">

        <div class="videobox">
            <video class="videos" @timeupdate="timechange"  :src="video.videosrc" poster="transparent" controls>
                    <!--<source src="http://视频地址格式1.mp4" type='video/mp4' />
                    <source src="http://视频地址格式2.webm" type='video/webm' />
                    <source src="http://视频地址格式3.ogv" type='video/ogg' />-->
                    <track kind="captions" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->
                    <track kind="subtitles" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->
            </video>
                    <!--<video class="videos" @timeupdate="timechange" src="http://vjs.zencdn.net/v/oceans.mp4" controls poster="transparent"> </video>-->
            <!--<div class="imgbox">-->
                    <img @click="playvo" class="playicon" :src="video.play" alt="">
            <!--</div>-->
            <div class="mask"></div>
            <Picture :imgsrc = "imgsrc"></Picture>
            <Videosm :viosrc="viosrc" ></Videosm>
            <Choice :choarr="chod"></Choice>
            <Mchoice :mcho="mcho"></Mchoice>
        </div>

        <div class="rightlist">
            <div class="piclist listtitle">
                <h3>图片列表</h3>
                <ul>
                    <li v-for="(img, index) in imgarr" @click="jumppic(index)">{{img.name}}<span>{{img.tigtime}}</span></li>
                </ul>
            </div>
            <div class="danlist listtitle">
                <h3>单选题</h3>
                <ul>
                    <li v-for="(dan, index) in choarr" @click="jumpdan(index)">{{dan.name}}<span>{{dan.tigtime}}</span></li>
                </ul>
            </div>
            <div class="doblist listtitle">
                <h3>多选题</h3>
                <ul>
                    <li v-for="(duo, index) in mchoarr" @click="jumpduo(index)">{{duo.name}}<span>{{duo.tigtime}}</span></li>
                </ul>
            </div>
            <div class="btn" @click="boxhide"></div>
            <div class="nbtn" @click="boxshow"></div>
        </div>

    </div>
    </div>
</template>
<script>
    import Picture from '../components/Picture.vue';
    import Videosm from '../components/Videosm.vue';
    import Choice from '../components/Choice.vue';
    import Mchoice from '../components/Mchoice.vue';
    export default{
    name:'video',
    components: {
        Picture,
        Videosm,
        Choice,
        Mchoice
    },
    data() {
        return{
            video: {},
            time: 0,
            imgsrc: '',
            imgarr: [],
            viosrc: "",
            vioarr: [],
            mcho: {},
            mchoarr: [],
            chod: {},
            choarr:[],
            timer:'',
        }
    },
    methods: {
        getvideo: function() {
            var coursenm=this.$route.query.id;
            this.$http({
                url: 'src/assets/json/video'+coursenm+'.json',
            }).then(function(res){
                this.video = res.data.main
                this.imgarr = res.data.pics
                this.choarr = res.data.danchoice
                this.mchoarr = res.data.dobchoice
                 this.vioarr = res.data.videosmall
            },function(err){
                console.log(err);
            })
         },
         jumppic: function(index) {
             $('.choicebox').hide();
             $('.choicesbox').hide();
              $('.videos')[0].currentTime = this.imgarr[index].tigger;
         },
         jumpdan: function(index) {
             $('.picbox').hide();
             $('.choicesbox').hide();
             $('.videos')[0].currentTime = this.choarr[index].tigger;
         },
         jumpduo: function(index) {
             $('.picbox').hide();
             $('.choicebox').hide();
             $('.videos')[0].currentTime = this.mchoarr[index].tigger;
         },
         playvo: function() {
             $('.videos')[0].play();
             $('.playicon').hide();
         },
         timechange:function(){
             $('.playicon').hide();
         },
         showcho: function() {
             $('.videos')[0].pause();
             $('.choicebox, .mask').show();
         },
        showmcho: function() {
             $('.videos')[0].pause();
             $('.choicesbox, .mask').show();
         },
         showpic: function() {
             $('.videos')[0].pause();
             $('.picbox, .mask').show();
         },
          showvideo: function() {
             $('.videos')[0].pause();
             $('.smvideo')[0].play();
             $('.viobox, .mask').show();
         },
         boxhide: function() {
             $('.rightlist').animate({"right":"-255"},1000);
             $('.videobox').animate({"paddingRight":"0"},1000);
             $('.btn').hide();
             $('.nbtn').show();
         },
         boxshow: function() {
             $('.rightlist').animate({"right":"0"},1000);
             $('.videobox').animate({"paddingRight":"255"},1000);
             $('.btn').show();
             $('.nbtn').hide();
         },
         getTimes: function() {
             var self = this
             this.timer = setInterval(function() {
              this.time = $('.videos')[0].currentTime.toFixed(1);
                setTimeout(function() {
                    for(var i = 0; i < self.imgarr.length; i++) {
                    if(this.time == self.imgarr[i].tigger) {
                        self.imgsrc = self.imgarr[i].imgs;
                        self.showpic();
                    }
                    }
                    // for(var j = 0; j < self.vioarr.length; j++) {
                    //     if(this.time == self.vioarr[j].tigger) {
                    //         self.viosrc = self.vioarr[j].mvideod;
                    //         self.showvideo();
                    //     }
                    // }
                    //  $(self.vioarr).each(function(index,ele) {
                    //         // console.log(index)
                    //         if(this.time == ele.tigger) {
                    //             self.viosrc = ele.mvideod;
                    //             self.showvideo();
                    //         }
                    //  });
                    for(var k = 0; k < self.choarr.length; k++) {
                        if(this.time == self.choarr[k].tigger) {
                            self.chod = self.choarr[k].radio;
                            self.showcho();
                        }
                    }
                    for(var l = 0; l < self.mchoarr.length; l++) {
                        if(this.time == self.mchoarr[l].tigger) {
                            self.mcho = self.mchoarr[l].multiple;
                            self.showmcho();
                        }
                    }
                }, 0);

             },100)
         }
    },
    mounted() {
        this.getvideo();
        this.getTimes();
    },
    
    updated() {

    },
    destroyed() {
        clearInterval(this.timer);
    }
}
</script>
<style scoped>
    .video_page {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: black;
        overflow: hidden;
    }
    .header {
        height: 63px;
        background-color: #333333;
    }
    .header_title {
        float: left;
        padding: 20px 0 40px 20px;
    }
     .header_title a {
         color: #7e7e7e;
         font-weight: 700;
    }
    .header_title span {
        color: #ccc;
        font-size: 16px;
        padding-left: 26px;
    }
    .head_portrait img {
        float: right;
        padding: 13px 13px 0 0;
    }
    .mid_video {
        position: relative;
        flex: 1;
        height: 100%;
        background-color: #000;
        display: flex;
    }
    .videobox {
        width: 100%;
        height: 100%;
        padding-right: 255px;
        /*position: absolute;
        top: 0;
        left: 0;*/
        float: left;
        box-sizing: border-box;
        position: relative;
    }
    .videos {
        width: 100%;
        height: 100%;
        float: left;
    }
    .rightlist {
        width: 255px;
        height: 100%;
        background-color: #333;
        color: #fff;
        display: auto;
        position: absolute;
        top: 0;
        right: 0;
        /*float: right;*/
        /*margin-left: -100%;*/
    }
    .listtitle h3 {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        background-color: #222;
    }
    .listtitle ul li {
        height: 30px;
        line-height: 30px;
        padding-left: 15px;
        cursor:pointer;
    }
    .listtitle ul li span {
        float: right;
        padding-right: 10px;
    }
    .btn,.nbtn {
        width: 12px;
        height: 40px;
        background-color: #ccc;
        position: absolute;
        border-radius: 6px;;
        top: 50%;
        left: -12px;
        transform: translate(0,-50%);
        cursor:pointer;
    }
    .nbtn {
        display: none;
    }
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        /*z-index: 10;*/
        display: none;
    }
    .imgbox {
        width: 100%;
        height: 100%;
        background-color: black;
        /*position: relative;*/
    }
    .playicon {
        position: absolute;
        top: 50%;
        left: 43%;
        cursor:pointer;
        transform: translate(-50%,-50%);
    }
</style>