<template>
    <div class="video_page">
    <div class="header">
            <div class="header_title">
                <router-link  to="/">< 返回</router-link>
                <span>Java语言变成基础</span>
            </div>
             <div class="head_portrait">
                <img src="../assets/images/head_logo.png" alt="">
            </div>
    </div>
    <div class="mid_video">
        <!--<video class="videos" @timeupdate="timechange" src="http://vjs.zencdn.net/v/oceans.mp4" controls poster="
transparent"> </video>-->
        <video class="videos" @timeupdate="timechange" @canplay="cplay" @ended="ends" src="../src/assets/chrome.mp4" poster="
transparent"></video>
        <!--<video class="videos" @timeupdate="timechange" src="../src/assets/chrome.mp4" controls poster="
transparent"></video>-->
        <img @click="playvo" class="playicon" src="../assets/images/playicon.png" alt="">
        <div class="mask"></div>
        <Picture></Picture>
        <Videosm></Videosm>
        <Choice></Choice>
        <Mchoice></Mchoice>
    </div>
        <!--video控制器开始-->
       <div class="controls ">
                <span class="switch typcn typcn-media-play" @click="switchvideo($event)"></span>
                <div class="progress" @click="proless($event)">
                    <div class="curr-progress"></div>
                    <span class="dot typcn typcn-media-record"  @mousedown="mousein($event)" @mousemove="mousemo($event)" @mouseup="mouseup"></span>
                </div>
                <div class="time">
                    <span class="curr-time">00:00:00</span>/<span class="total-time">00:00:00</span>
                </div>
                <div class="volume">
                    <span class="vol typcn typcn-volume-up" @click="mute"></span>
                     <div class="volumes">
                         <div class="curr-volumes"></div>
                     </div>
                </div>
                <span class="extend typcn typcn-arrow-maximise" @click="extend"></span>
        </div>
        <!--video 控制器结束-->
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
            video: [],
            message:'dfdf',
            Ttime:0,
            Ctime:0,
            Ntime:0,
            timeDrag: false
        }
    },
    methods: {
        mousein: function(e) {
            this.timeDrag = true; 
            // console.log(e)
            this.mousemo();
        },
        mousemo: function(e) {
            if(this.timeDrag == true) {
                // console.log(e.clientX)
                

                var wwidth = $(window).width();
                var vals = e.clientX / wwidth;
                this.Ntime = this.Ttime*vals
                var h=Math.floor(this.Ntime/3600);
                var m=Math.floor(this.Ntime%3600/60);
                var s=Math.floor(this.Ntime%60);
                h=h>=10?h:'0'+h;
                m=m>=10?m:'0'+m;
                s=s>=10?s:'0'+s;
                $('.dot').css({'left': e.clientX + 'px'}); 
                // $('.dot').css({'left':val*100+"%"});
                $('.videos')[0].currentTime = this.Ntime;  

            }
        },
        mouseup: function() {
            this.timeDrag = false;
        },
        getvideo: function() {
            this.$http({
                url: 'src/assets/json/video.json',
            }).then(function(res){
                this.video = res.data
            },function(err){
                console.log(err);
            })
         },
         playvo: function() {
             $('.videos')[0].play();
             $('.playicon').hide();
             $('.switch').removeClass('typcn-media-play');
             $('.switch').addClass('typcn-media-pause');
         },
         switchvideo: function() {
             if($('.videos')[0].paused){
                $('.videos')[0].play();
                $('.switch').removeClass('typcn-media-play');
                $('.switch').addClass('typcn-media-pause');
            }else{
                $('.videos')[0].pause();
                $('.switch').removeClass('typcn-media-pause');
                $('.switch').addClass('typcn-media-play');
            }
         },
         cplay: function() {
                this.Ttime=$('.videos')[0].duration;
                var h=Math.floor(this.Ttime/3600);
                var m=Math.floor(this.Ttime%3600/60);
                var s=Math.floor(this.Ttime%60);
                h=h>=10?h:'0'+h;
                m=m>=10?m:'0'+m;
                s=s>=10?s:'0'+s;
                $('.total-time').html(h+':'+m+':'+s);
         },
         timechange:function(){
                $('.playicon').hide();
                this.Ctime=$('.videos')[0].currentTime;
                var h=Math.floor(this.Ctime/3600);
                var m=Math.floor(this.Ctime%3600/60);
                var s=Math.floor(this.Ctime%60);
                h=h>=10?h:'0'+h;
                m=m>=10?m:'0'+m;
                s=s>=10?s:'0'+s;
                 $('.curr-time').html(h+':'+m+':'+s);
                var value=this.Ctime/this.Ttime;
                $('.curr-progress').css({'width':value*100+"%"});
                $('.dot').css({'left':value*100+"%"});

                // console.log($('.videos')[0].volume)

            //   var time = $('.videos')[0].currentTime.toFixed(1);
            //   console.log(time)
            //   if(time >= 3  && time<=3.3 ) {
            //        $('.videos')[0].pause();
            //        $('.choicebox, .mask').show();
            //   };
            //   if(time >= 7  && time<=7.3) {
            //        $('.videos')[0].pause();
            //        $('.choicesbox, .mask').show();
            //   }
            //   if(time >= 10  && time<=10.3 ) {
            //        $('.videos')[0].pause();
            //        $('.picbox, .mask').show();
            //   };
            //   if(time >= 13  && time<=13.3) {
            //        $('.videos')[0].pause();
            //        $('.smvideo')[0].play();
            //        $('.viobox, .mask').show();
            //   }
         },
         ends: function() {
                $('.switch').removeClass('typcn-media-pause');
                $('.switch').addClass('typcn-media-play');
         },
         extend: function() {
             $('.videos')[0].webkitRequestFullScreen();
         },
         proless: function(e) {
             var winwidth = $(window).width();
             var val = e.clientX / winwidth;
             this.Ntime = this.Ttime*val
             var h=Math.floor(this.Ntime/3600);
             var m=Math.floor(this.Ntime%3600/60);
             var s=Math.floor(this.Ntime%60);
             h=h>=10?h:'0'+h;
             m=m>=10?m:'0'+m;
             s=s>=10?s:'0'+s;
             $('.dot').css({'left':val*100+"%"});
             $('.videos')[0].currentTime = this.Ntime;
         },
         mute: function() {
             if($('.videos')[0].muted === true) {
                $('.videos')[0].muted = false;
                $('.vol').removeClass('typcn-volume-mute');
                $('.vol').addClass('typcn-volume-up');
             }else {
                $('.videos')[0].muted = true;
                $('.vol').removeClass('typcn-volume-up');
                $('.vol').addClass('typcn-volume-mute');
             }
            
         }
    },
    mounted() {
        // this.getTimes();
    },
    updated() {

    }
}
</script>
<style scoped>
    .video_page {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: black;
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
    }
    .videos {
        position: absolute;
        top: 0;
        left: 0;
        /*background: url(../assets/images/playicon.png) 50% 50%  no-repeat ;*/
        width: 100%;
        height: 100%;
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
    .playicon {
        position: absolute;
        top: 50%;
        left: 50%;
        cursor:pointer;
        transform: translate(-50%,-50%);
    }
    /*video控制器*/
    .controls{
            /*position: absolute;*/
            width: 100%;
            height: 44px;
            background-color: #000;
            /*left:0px;*/
            /*bottom:0px;*/
            position: relative;
            overflow: hidden;
            padding-top: 10px;
        }
        .switch{
            position: absolute;
            left:10px;
            top:20px;
            width: 20px;
            height: 20px;
            font-size:24px;
            text-align: center;
            line-height: 20px;
            color:white;
            cursor: pointer;
        }

        .progress{
            width: 100%;
            height: 8px;
            background-color: rgba(255,255,255,0.3);
            position: absolute;
            left:0px;
            top:5px;
            border-radius: 4px;
            /*overflow: hidden;*/
            cursor: pointer
        }

        .curr-progress{
            height:100%;
            background-color: #fdc740;
            width: 0%;
        }

        .dot {
            font-size: 25px;
            position: absolute;
            top: -9px;
            left: 0;
            color: #fff;
            cursor: pointer;
            /*margin-left: -13px;*/
        }
        .dot.typcn:before {
            width: 12px;
            height: 12px;
        }
        .time{
            position: absolute;
            width: 120px;
            height: 20px;
            left:50px;
            top:22px;
            font-size:13px;
            color:#fff;
            text-align: center;
            line-height: 20px;
        }
        .volume {
            position: absolute;
            width: 120px;
            height: 25px;
            right: 50px;
            top:20px;
            font-size:20px;
            color:#fff;
            text-align: left;
            line-height: 20px;
            /*background-color: yellow;*/
        }
        .vol {
            cursor: pointer;
        }
        .volumes{
            width: 89px;
            height: 6px;
            background-color: rgba(255,255,255,0.3);
            position: absolute;
            right:0px;
            top:10px;
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;
        }
        .curr-volumes{
            height:100%;
            background-color: #0398ff;
            width: 100%;
        }
        .extend{
            position: absolute;
            right:15px;
            top:20px;
            width: 20px;
            height: 20px;
            font-size:24px;
            cursor: pointer;
            text-align: center;
            line-height: 20px;
            color:white;
        }
</style>