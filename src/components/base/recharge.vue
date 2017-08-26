<template>
    <div class="recharge_warp">
        <div class="recharge_main">
            <label for="" class="title">选择充值金额</label>
            <div class="rechargeNumber_list">
                <ul>
                    <li>
                        <p>充值50</p>
                    </li>
                    <li>
                        <p>充值100</p>
                    </li>
                    <li>
                        <p>充值200</p>
                    </li>
                    <li>
                        <p>充值500</p>
                        <span>送50</span>
                    </li>
                    <li>
                        <p>充值50</p>
                        <span>送200</span>
                    </li>
                    <li>
                        <p>充值2000</p>
                        <span>送500</span>
                    </li>
                </ul>
            </div>
            <div class="input_money">
                <label>充值金额</label>
                <input type="number" placeholder="请输入充值金额" value="">
            </div>
            <div class="hint">
                温馨提示：1元 = 10快递豆
            </div>
            <div class="btn">
                <button>确定充值</button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
  
}
</script>
<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';

    .recharge_main{
        .title{
            font-size:px2rem(28);
            color:#333;
            font-weight: 700;
            padding:px2rem(46) px2rem(30) px2rem(30);
            display: block;
            text-align: left;
        }
        .rechargeNumber_list{
            ul{
                height: px2rem(320);
                padding:px2rem(40) px2rem(30) px2rem(0);
                background-color: #fff;
                display: flex;
                flex-wrap:wrap;
            }
            li{                
                width:px2rem(200);
                height: px2rem(100);
                border:1px solid #356931;
                border-radius: px2rem(10);
                vertical-align: middle;
                font-size: px2rem(28);
                color: #356931;
                display: flex;
                flex-wrap:wrap;
                align-items:center;/*垂直居中*/
                justify-content: center;
                text-align: center;
                margin-right:px2rem(20);
                margin-bottom: px2rem(36);
                cursor: pointer;
                &:hover,.active{
                    background: #356931;
                    color: #fff;
                }
                p{
                    width: 100%;
                    align-self: center;
                }
                span{
                    width: 100%;
                    align-self: center;
                }
            }
        }
        .input_money{
            height: px2rem(90);
            line-height: px2rem(90);
            padding:px2rem(0) px2rem(30);
            margin-top:px2rem(30);
            text-align: left;
            display: flex;
            background-color: #fff;
            label{
                width: px2rem(130);
                font-size: px2rem(30);
                color: #333;
                
            }
            input{
                flex:1;
                padding:px2rem(10);
                height:px2rem(70);
                line-height: px2rem(70);
                border:0;
                font-size: px2rem(28);
                color: #cacaca;
            }
        }
        .hint{
            font-size: px2rem(24);
            color:#999;
            padding:px2rem(30) px2rem(30) px2rem(0) ;
            text-align: left;
        }
        .btn{
            font-size: px2rem(30);
            color: #fff;
            width: 90%;
            height: px2rem(90);
            line-height: px2rem(90);
            background-color: #356931;
            margin:0 auto;
            margin-top:px2rem(180);
            border-radius: px2rem(10);
            button{
                font-size: px2rem(30);
                color: #fff;
                width: 100%;
                height: px2rem(90);
                
            }
        }
    }

</style>
