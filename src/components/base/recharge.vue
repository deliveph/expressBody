<template>
    <div class="recharge_warp">
        <div class="recharge_main">
            <label for="" class="title">选择充值金额</label>
            <div class="rechargeNumber_list">
                <ul>
                    <li v-for="(item,k) in items" :key="k" @click="recharge_combos(item.recharge_combo_id)" :class="{active: id == item.recharge_combo_id}" v-model="id">
                        <p>充值{{item.fee}}</p>
                        <span v-if="item.give_fee > 0">送{{item.give_fee}}</span>
                    </li>
                </ul>
            </div>
            <div class="input_money">
                <label>充值金额</label>
                <input type="number" placeholder="请输入充值金额" v-model="money" @blur = "done()">
            </div>
            <div class="hint">
                温馨提示：1元 = 10快递豆
            </div>
            <div class="btn" @click="pay()">
                <button>确定充值</button>
            </div>
        </div>

    </div>
</template>

<script>
import { Toast } from 'vux'
import qs from 'qs'
export default {
    data() {
        return {
            items: [],
            id:'',
            money:''
        }
    },
    components: {
        Toast
    },
    created() {
        let that = this
        this.$weChat()
        this.http(that.configs.apiTop + "/order/recharge-combos", "get", '', function(res) {
            let msg = res.data
            let data = msg.data
            if (msg.code == 0) {
                that.items = data.recharge_combos;
            } else if (msg.code == 40004) {
                localStorage.clear("token")
                that.wx.closeWindow()
            } else {
                that.$vux.toast.text(msg.message, 'middle', 100);
            }
        })
    },
    methods:{
        recharge_combos(id){
            this.id = id
        },
        done(){
            this.id = ''
        },
        pay(){
            let that = this
            let recharge_combo_id = that.id
            let fee = that.money
            console.log(that.id,that.money)
            if(that.id == '' && that.money == ''){
                that.$vux.toast.text('请选择或输入充值金额', 'middle', 100)
                return
            }
            if( this.id != '' || that.money == ''){
                this.http(that.configs.apiTop + "/order/get-weixin-pay-params-by-combo?recharge_combo_id="+recharge_combo_id, "get", '' , function(res) {
                    let msg = res.data
                    let data = msg.data
                    if (msg.code == 0) {
                       that.wx.chooseWXPay({
                            timestamp: data.timestamp,
                            nonceStr: data.nonce_str,
                            package: data.package,
                            signType: data.sign_type,
                            paySign: data.sign,
                            success: function (res) {
                                that.$router.push({path:'/payresult',query:{status:'success'}})
                                // 支付成功后的回调函数
                            }
                        });
                    } else if (msg.code == 40004) {
                        localStorage.clear("token")
                        that.wx.closeWindow()
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100)
                    }
                })
            }else if(this.money != ''){
                this.http(that.configs.apiTop + "/order/get-weixin-pay-params-by-fee?fee="+fee, "get", '', function(res) {
                    let msg = res.data
                    let data = msg.data
                    if (msg.code == 0) {
                        that.wx.chooseWXPay({
                            timestamp: data.timestamp,
                            nonceStr: data.nonce_str,
                            package: data.package,
                            signType: data.sign_type,
                            paySign: data.sign,
                            success: function (res) {
                               that.$router.push({path:'/payresult',query:{status:'success'}})
                                // 支付成功后的回调函数
                            }
                        });
                    } else if (msg.code == 40004) {
                        localStorage.clear("token")
                        that.wx.closeWindow()
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../static/assets/css/px2rem.scss';

.recharge_main {
    .title {
        font-size: px2rem(28);
        color: #333;
        font-weight: 700;
        padding: px2rem(46) px2rem(30) px2rem(30);
        display: block;
        text-align: left;
    }
    .rechargeNumber_list {
        ul {
            height: px2rem(320);
            padding: px2rem(40) px2rem(30) px2rem(0);
            background-color: #fff;
            display: flex;
            flex-wrap: wrap;
        }
        li {
            width: px2rem(200);
            height: px2rem(100);
            border: 1px solid #356931;
            border-radius: px2rem(10);
            vertical-align: middle;
            font-size: px2rem(28);
            color: #356931;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            /*垂直居中*/
            justify-content: center;
            text-align: center;
            margin-right: px2rem(20);
            margin-bottom: px2rem(36);
            cursor: pointer;
            &:hover,
            .active {
                background: #356931;
                color: #fff;
            }
            &:nth-child(3),:nth-child(6){
                margin-right: 0;
            }
            p {
                width: 100%;
                align-self: center;
            }
            span {
                width: 100%;
                align-self: center;
            }
        }
    }
    .input_money {
        height: px2rem(90);
        line-height: px2rem(90);
        padding: px2rem(0) px2rem(30);
        margin-top: px2rem(30);
        text-align: left;
        display: flex;
        background-color: #fff;
        label {
            width: px2rem(130);
            font-size: px2rem(30);
            color: #333;
        }
        input {
            flex: 1;
            padding: px2rem(10);
            height: px2rem(70);
            line-height: px2rem(70);
            border: 0;
            font-size: px2rem(28);
            color: #cacaca;
        }
    }
    .hint {
        font-size: px2rem(24);
        color: #999;
        padding: px2rem(30) px2rem(30) px2rem(0);
        text-align: left;
    }
    .btn {
        font-size: px2rem(30);
        color: #fff;
        width: 90%;
        height: px2rem(90);
        line-height: px2rem(90);
        background-color: #356931;
        margin: 0 auto;
        margin-top: px2rem(180);
        border-radius: px2rem(10);
        button {
            font-size: px2rem(30);
            color: #fff;
            width: 100%;
            height: px2rem(90);
        }
    }
}
</style>
