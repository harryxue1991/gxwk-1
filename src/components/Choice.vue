<template>
    <div>
        <div class="choicebox">
            <div class="choiceup">
                <div class="choice_head">
                    <span class="choice_title">{{choarr.topic}}</span>
                    <span>{{choarr.subject}}</span>
                </div>
                <ul @click="findli($event)">
                    <li :class="item.ans" v-for="item in choarr.items" >
                        <span>{{item.sel}}</span>
                        <span>{{item.opans}}</span>
                        <img class="icontrue" src="../assets/images/true.png" alt="">
                        <img class="iconfalse" src="../assets/images/false.png" alt="">
                    </li>
                </ul>
            </div>
            <div class="answerana">
                <span>[答案解析]: </span><span>{{choarr.answer}}</span>
                <p>{{choarr.analysis}}</p>
            </div>
            <div class="submitdaan"  @click="subme">提交答案</div>
            <div class="goon" @click="hideme">继续</div>
        </div>
    </div>
</template>
<script>
export default{
    name:'choice',
    props: ['choarr'],
    methods: {
        hideme: function() {
            $('.submitdaan').show();
            $('.choicebox,.mask,.answerana,.goon').hide();
            $('.videos')[0].play();
            $('.true span:first-child,.false span:first-child').css({'background':'#fff',color:"#000"});
            $('.icontrue, .iconfalse').hide();
            $('.videos')[0].currentTime += 0.1;
            $('.choiceup li').removeClass("act_only");
        },
        findli: function(e) {
            if((e.target.nodeName == "LI")) {
                $(e.target).addClass('act_only').siblings().removeClass("act_only");
            }
             if((e.target.nodeName == "SPAN")) {
                $(e.target).parent().addClass('act_only').siblings().removeClass("act_only");
            }
        },
        subme: function() {
            if($('.choiceup ul li').hasClass('act_only') == false) {
                alert('请务必选择一个您觉得正确的答案哦~~！');
                return;
            }
            if($('.act_only').hasClass('true') == true) {
                // $('.act_only span:first-child').text("√").css({'background':'#42b685',color:"#fff"});
                $('.act_only .icontrue').show();
            }else {
                $('.act_only .iconfalse').show();
                // $('.act_only span:first-child').text("X").css({'background':'#fb4f4b',color:"#fff"});
                $('.true span:first-child').css({'background':'#42b685',color:"#fff"});
            }
            $('.submitdaan').hide();
            $('.goon,.answerana').show();
            $('.choiceup li').removeClass("act_only");
            
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
    .choicebox {
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
    .choiceup {
        height: 370px;
        overflow: auto;
    }
    .choice_head {
        height: 62px;
        padding: 24px 0 0 22px;
    }
    .choice_title {
        font-size: 18px;
        font-weight: 700;
    }
    .choicebox ul li {
        height: 47px;
        margin: 0 18px 20px;
        border: 1px solid #d4d4d4;
        line-height: 47px;
        border-radius: 5px;
        cursor:pointer;
        position: relative;
    }
    .choicebox ul li span{
        cursor:pointer;
    }
    .choicebox ul li .icontrue {
        position: absolute;
        left: 12px;
        top: 12px;
        display: none;
    }
    .choicebox ul li .iconfalse {
        position: absolute;
        left: 12px;
        top: 12px;
        display: none;
    }
    .choicebox ul li span:first-child {
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
    .choicebox ul li.act_only {
        background-color: #f5fafe;
        color: #009afe;
        border: 1px solid #009afe;
    }
    .choicebox ul li.act_only span:first-child {
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