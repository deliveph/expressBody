<template>
    <div id="expressResult">
        <div class="result_title">
            <p>承运公司：<span>顺丰速运</span></p>
            <p class="mt20">运单编号：<span>235235235</span></p>
        </div>
        <div class="logistics_tracking">
            <h3>物流跟踪</h3>
            <ul>
                <li class="first">
                    <i></i>
                    <div class="msg">
                        <p class="txt">快递已从义乌中转部 发出</p>
                        <p class="time">2017-08-16 19:27:35</p>
                    </div>
                </li>
                <li class="">
                    <i></i>
                    <div class="msg">
                        <p class="txt">快递已从义乌中转部 发出</p>
                        <p class="time">2017-08-16 19:27:35</p>
                    </div>
                </li>
                <li class="">
                    <i></i>
                    <div class="msg">
                        <p class="txt">快递已从义乌中转部 发出</p>
                        <p class="time">2017-08-16 19:27:35</p>
                    </div>
                </li>
            </ul>
        </div> 
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';
    .result_title{
        margin-top:px2rem(20);
        padding:px2rem(30);
        font-size:px2rem(30);
        color:#333;
        background-color:#fff; 
    }
    .logistics_tracking{
        background-color:#fff; 
        margin-top:px2rem(20);
        h3{
            height: px2rem(88);
            line-height: px2rem(88);
            font-size:px2rem(30);
            color: #333;
            border-bottom: 1px solid #dddddc;
            padding:0 px2rem(30);
        }
        ul{
            padding:px2rem(0) px2rem(30) px2rem(24);
            margin-top:px2rem(32);
        }
        li{
            font-size:px2rem(28);
            color:#999;
            border-left:2px solid #dddddc;
            padding-left:px2rem(60);
            position: relative;
            &.first{
                color:#27ba4e;
                i{
                    width: px2rem(30);
                    height: px2rem(30);
                    background: url('/static/assets/images/icon_logistics_record.png') no-repeat center;
                    background-size:px2rem(30);
                    top:px2rem(-10);
                    left:px2rem(-16);
                }
            }
            &:last-child{
                .msg{
                    border-bottom: 0;
                }
            }
            i{
                width: px2rem(16);
                height: px2rem(16);
                background: url('/static/assets/images/icon_logistics_record2.png') no-repeat center;
                background-size:px2rem(16);
                display: inline-block;
                position: absolute;
                left:px2rem(-10);
                top:px2rem(10);
            }
            .msg{
                padding:px2rem(32) px2rem(0) px2rem(24);
                border-bottom: 1px solid #dddddc;
                
            }
            .time{
                margin-top:px2rem(26);
                font-size:px2rem(24);
            }
        }
    }
</style>
