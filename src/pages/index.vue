<template>
    <div class="weike">
        <div class="header">
            <div class="logo">
                <img src="../assets/images/logo2.png" alt="">
            </div>
            <div class="head_portrait">
                <img :src="vpres.hlogo" alt="">
            </div>
        </div>
        <div class="middle">
            <div class="video_preview" v-for="vpre in vpres.indexlist">
                <div class="pic">
                    <img :src="vpre.pic" alt="">
                </div>
                <div class="content">
                    <h2>{{vpre.conth2}}</h2>
                    <p>{{vpre.contp}}</p>
                </div>
                <div class="preview">
                    <router-link  :to="vpre.link" :class="vpre.cass">预览</router-link>
                </div>
            </div>
        </div>
        <div class="footer">
             <p>Copyright© 2014-2018 中软国际教育京ICP备11010802014778号</p>
        </div>
    </div>
</template>
<script>
export default{
    name:'weike',
    data() {
        return{
            vpres: {}
        }
    },
    methods: {
        getindex: function() {
                this.$http({
                    url: 'src/assets/json/index.json',
                }).then(function(res){
                    this.vpres = res.data
                },function(err){
                    console.log(err);
                })
         }
    },
    mounted() {
        this.getindex();
    },
    updated() {
        $(function() {
            var winheight;
            var miheight;
            var totalheight;
            var headheight = $('.header').height();
            winheight = $(window).height();
            miheight = $('.middle').height();
            totalheight = headheight + miheight+60;
            if(winheight < totalheight) {
                //  alert(1);
                $('.footer').css({"position":"static","transform":"translate(0)"})
            }
        })
    }
}
$(function() {
    $(window).resize(function(){
            var winheight;
            var miheight;
            var totalheight;
            var headheight = $('.header').height();
            winheight = $(window).height();
            miheight = $('.middle').height();
            totalheight = headheight + miheight+60;
            if(winheight < totalheight) {
                //  alert(1);
                $('.footer').css({"position":"static","transform":"translate(0)"})
            }else {
                 $('.footer').css({"position":"absolute","transform":"translate(-50%)"})
            }
    })
 })
</script>

<style scoped>
.weike {
    position: relative;
    background-color: #EBEDF5;
    height: 100%;
    /*display: flex;
    flex-direction: column;*/
}
.header {
    height: 60px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 2px 5px #ccc;
    margin-bottom: 3px;
}
.logo img {
    float: left;
    padding: 13px 0 0 23px;
}

.head_portrait img {
    float: right;
    padding: 13px 13px 0 0;
}
.middle {
    background-color: #EBEDF5;
    position: relative;
    width: 100%;
    /*height: 100%;*/
    padding: 20px 0;
    /*flex: 1;*/
    /*position: relative;*/
}
.video_preview {
    width: 1000px;
    height: 224px;
    background-color: #fff;
    margin: 0 auto 20px;
    border-radius: 8px;
    box-shadow: 0px 1px 5px 1px #e3f1ff;
    position: relative;
}
.pic {
    float: left;
}
.pic img{
    padding: 30px 32px 0 25px;
    height: 161px;
    width: 290px;
}
.content {
    float: left;
    width: 440px;
    height: 224px;
    overflow: hidden;
}
.content h2{
    font-size: 22px;
    color: #3e5875;
    line-height: 60px;
}
.content p{
    font-size: 14px;
    color: #738da6;
    line-height: 22px;
}
.preview a{
    position: absolute;
    width: 140px;
    height: 40px;
    top: 93px;
    right: 50px;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border-radius: 20px;
}
.can {
    background: url(../assets/images/preview.png);
    color: #d9e8ff;
}
.can:hover {
    background: url(../assets/images/preview2.png);
}
.cant {
    background-color: #ccc;
    color: #999;
    cursor: default;
}
.footer {
    height: 60px;
    font-size: 12px;
    line-height: 60px;
    color: #9eafc3;
    background-color: #EBEDF5;
    position: absolute;
    text-align: center;
    left: 50%;
    transform: translate(-50%);
    bottom: 0;
}
</style>