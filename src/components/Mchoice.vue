<template>
    <div>
        <div class="choicesbox">
            <div class="choicesup">
                <div class="choices_head">
                    <span class="choices_title">[多选题]</span>
                    <span>{{mcho.subject}}</span>
                </div>
                <ul @click="findlis($event)">
                    <li :class="item.ans" v-for="item in mcho.items">
                        <span>{{item.sel}}</span>
                        <span>{{item.opans}}</span>
                        <img class="icontrue" src="../assets/images/true.png" alt="">
                        <img class="iconfalse" src="../assets/images/false.png" alt="">
                    </li>
                </ul>
            </div>
            <div class="answerana">
                <span>[答案解析]: </span><span>{{mcho.answer}}</span>
                <p>{{mcho.analysis}}</p>
            </div>
            <div class="submitdaan" @click="submed">提交答案</div>
            <div class="goon" @click="hideme">继续</div>
        </div>
    </div>
</template>
<script>
export default{
    name:'mchoice',
    props: ['mcho'],
    methods: {
        hideme: function() {
            $('.submitdaan').show();
            $('.choicesbox,.mask,.answerana,.goon').hide();
            $('.videos')[0].play();
            $('.true span:first-child,.false span:first-child').css({'background':'#fff',color:"#000"});
            $('.icontrue, .iconfalse').hide();
            $('.videos')[0].currentTime += 0.1;
            $('.choicesup li').removeClass("act_onlys");
        },
        findlis: function(e) {
            if(e.target.nodeName == "LI") {
                $(e.target).toggleClass('act_onlys');
            }
            if((e.target.nodeName == "SPAN")) {
                $(e.target).parent().toggleClass('act_onlys');
            }
        },
        submed: function() {
            if($('.choicesup ul li').hasClass('act_onlys') == false) {
                alert('请务必选择一个您觉得正确的答案哦~~！');
                return;
            }
            if($('.act_onlys').hasClass('true') == true) {
                // $('.act_onlys span:first-child').text("√").css({'background':'#42b685',color:"#fff"});
                $('.act_onlys .icontrue').show();
                $('.true span:first-child').css({'background':'#42b685',color:"#fff"});
                if($('.act_onlys').hasClass('false') == true) {
                        // $('.act_onlys.false span:first-child').text("X").css({'background':'#fb4f4b',color:"#fff"});
                        $('.act_onlys.false .iconfalse').show();
                }
            }else {
                // $('.act_onlys span:first-child').text("X").css({'background':'#fb4f4b',color:"#fff"});
                $('.act_onlys .iconfalse').show();
                $('.true span:first-child').css({'background':'#42b685',color:"#fff"});
            }
            $('.submitdaan').hide();
            $('.goon,.answerana').show();
            $('.choicesup li').removeClass("act_onlys");
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
    .choicesbox {
        display: none;
        width: 1000px;
        height: 485px;
        border-radius: 3px;
        /*text-align: center;*/
        background-color: #fff;
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translate(-50%);
        /*padding-bottom: 60px;
        box-sizing: border-box;*/
    }
    .choicesup {
        height: 370px;
        overflow: auto;
    }
    .choices_head {
        height: 62px;
        padding: 24px 0 0 22px;
    }
    .choices_title {
        font-size: 18px;
        font-weight: 700;
    }
    .choicesbox ul li {
        height: 47px;
        margin: 0 18px 20px;
        border: 1px solid #d4d4d4;
        line-height: 47px;
        border-radius: 5px;
        /*cursor:pointer;*/
        position: relative;
    }
     .choicesbox ul li .icontrue {
        position: absolute;
        left: 13px;
        top: 12px;
        display: none;
    }
    .choicesbox ul li .iconfalse {
        position: absolute;
        left: 13px;
        top: 12px;
        display: none;
    }
    .choicesbox ul li span:first-child {
        background-color: transparent;
        color: #000;
        float: left;
        border: 1px solid #d4d4d4;
        margin: 12px;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
    }
    .choicesbox ul li.act_onlys {
        background-color: #f5fafe;
        color: #009afe;
        border: 1px solid #009afe;
    }
    .choicesbox ul li.act_onlys span:first-child {
        background-color: #009afe !important;
        border: none;
        color: #fff !important;
        float: left;
        margin: 12px;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
    }
    .answerana {
        display: none;
        margin: 0 18px;
        background-color: #ecf6ff;
    }
    .answerana span:first-child {
        font-size: 16px;
        font-weight: 700;
    }
    .answerana p {
        padding-top: 7px;
        min-height: 60px;
        /*background-color: #ecf6ff;*/

    }
    .submitdaan {
        position: fixed;
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
    .goon {
        position: fixed;
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
        display: none;
    }
</style>