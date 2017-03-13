<template>
    <div>
        <div class="picbox">
            <img class="picd" :src="imgsrc" alt="">
            <div class="goons" @click="hideme">继续</div>
        </div>
    </div>
</template>
<script>
export default{
    name:'picture',
    props: ['imgsrc'],
    methods: {
        hideme: function() {
            $('.picbox,.mask').hide();
            $('.videos')[0].play();
            $('.videos')[0].currentTime += 0.1;
        }
    },
    mounted() {
        
    },
    updated() {
        
    }
}
</script>
<style scoped>
    /*body {
        position: relative;
    }*/
    .picbox {
        z-index: 10;
        width: 1200px;
        height: 500px;
        text-align: center;
        /*background-color: yellow;*/
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translate(-50%);
        display: none;
    }
    .picd {
         z-index: 15;
        max-height: 450px;
        max-width: 800px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .goons {
        z-index: 20;
        position: absolute;
        width: 140px;
        height: 41px;
        background: url(../assets/images/preview.png);
        bottom: -50px;
        left: 50%;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        color: #d9e8ff;
        transform: translate(-50%);
        cursor:pointer;
    }
</style>