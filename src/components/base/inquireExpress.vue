<template>
    <div id="inquire">
        <div class="inquire_warp">
            <div class="banner">
                <img src="/static/assets/images/inquire_bg.png" />
            </div>
            <div class="inquire_main">
                <div class="import">
                    <input type="tel" name="odd" v-model="odd" placeholder="请输入您要查询的快递单号" />
                    <div class="richscan" @click="richscan">
                        <i></i>
                    </div>
                </div>
                <div class="btn">
                    <button @click="see">查询</button>
                </div>
            </div>
            <div class="order_list">
                <h3>最近订单</h3>
                <ul>
                    <li class="send">
                        <router-link :to="{name:'Detail',query:{type:'free'}}">
                            <i class="icon_send"></i>
                            <div class="odd">
                                <p class="order_number">订单号：
                                    <span>4332502938508025</span>
                                </p>
                                <div class="site">
                                    <div class="starting">
                                        <h4>深圳</h4>
                                        <p>战锤</p>
                                    </div>
                                    <div class="center">

                                    </div>
                                    <div class="receipt">
                                        <h4>新疆</h4>
                                        <p>战犯</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <li class="put">
                        <router-link :to="{name:'Detail',query:{type:'free'}}">
                            <i class="icon_put"></i>
                            <div class="odd">
                                <p class="order_number">订单号：<span>30945683409590345</span></p>
                                <p class="express_number">快递单号：<span>30945683409590345</span></p>
                            </div>
                        </router-link>
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vux'
import qs from 'qs'
export default {
    data(){
        return{
            odd:'',
            // odd:'4858189652',
        }
    },
    components: {
        Toast
    },
    methods: {
        see(){
            let that = this
            let reg = /^[1-9]\d*$/
            let odd = that.odd
            if(odd == ''){
                that.$vux.toast.text('请输入快递单号', 'middle',100);
                return false;
            }else if(!reg.test(odd)){
                that.$vux.toast.text('请输入正确的快递单号', 'middle',100);
                return false;
            }
            that.$router.push({path: '/result',query:{code:odd}})
        },
        richscan(){
            let that = this;
            // let msg = {"resultStr":"CODE_128,534052156639","errMsg":"scanQRCode:ok"}
            this.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    let str = result.split(',');
                    let code = '';
                    if(str.length > 1){
                        code = str[1]
                    }else{
                        code = str[0]
                    }
                }
            });

        }
    },
    created(){
        let that = this;
        this.$weChat();
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/home.scss';
</style>
