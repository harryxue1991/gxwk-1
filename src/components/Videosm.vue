<template>
    <div>
        <div class="viobox">
            <video @ended="videoend" class="smvideo" poster="none" :src="viosrc" controls></video>
            <div class="vidgoons" @click="hideme">继续</div>
            <div class="vidblo">
                <span @click="returnvideo">重新播放</span>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:'Videosm',
    props: ['viosrc'],
    methods: {
        hideme: function() {
            $('.viobox,.mask,.vidgoons,.vidblo').hide();
            $('.videos')[0].play();
            $('.videos')[0].currentTime += 0.1;
        },
        videoend:function() {
            $('.vidgoons,.vidblo').show();
        },
        returnvideo: function() {
            $('.smvideo')[0].play();
            $('.vidgoons,.vidblo').hide();
        }
        
    },
    mounted() {
        
    },
    updated() {

    }
}
</script>
<style scoped>
    .viobox {
        display: none;
        width: 1200px;
        height: 500px;
        /*text-align: center;*/
        /*background-color: yellow;*/
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translate(-50%)
    }
    .smvideo {
        position: absolute;
        width: 690px;
        height: 390px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .vidgoons {
        position: absolute;
        width: 140px;
        height: 41px;
        background: url(../assets/images/preview.png);
        bottom: -40px;
        left: 50%;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        color: #d9e8ff;
        transform: translate(-50%);
        cursor:pointer;
        display: none;
    }
    .vidblo {
        position: absolute;
        width: 690px;
        height: 390px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        z-index: 1;
        display: none;
        text-align: center;
    }
    .vidblo span {
        /*position: absolute;*/
        cursor:pointer;
        color: #000;
        border: 1px solid #000;
        display: inline-block;
        width: 140px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        margin-top: 180px;
    }
</style>