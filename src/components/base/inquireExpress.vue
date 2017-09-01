<template>
    <div id="inquire">
        <div class="inquire_warp">
            <div class="banner">
                <img src="/static/assets/images/inquire_bg.png" />
            </div>
            <div class="inquire_main">
                <div class="import">
                    <input type="text" name="odd" value="" placeholder="请输入您要查询的快递单号" ref="odd"/>
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
            odd:null,
        }
    },
    components: {
        Toast
    },
    methods: {
        see(){
            let odd = this.$refs.odd.value;
            if(odd == ''){
                this.$vux.toast.text('请输入快递单号', 'middle',100);
                return false;
            }
            this.$router.push({path: '/result'})
        },
        richscan(){
            let that = this;
            this.wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    alert(res);
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                }
            });
        }
    },
    created(){
        let that = this;
        let data = qs.stringify({
            'url':location.href
        })
        this.$ajax({
            url:'/api/weixin-js-sdk-config',
            method:'post',
            headers:{
                'Access-Control-Allow-Credentials': true
            },
            data:data,
            responseType:'json',
            withCredentials:true
        }).then(function(res){ 
            let msg = res.data.data
            that.wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: msg.app_id, // 必填，公众号的唯一标识 
                timestamp: msg.timestamp,
                nonceStr: msg.nonce_str,
                signature: msg.signature,
                jsApiList: [
                    'getLocation',
                    'openLocation',
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'scanQRCode',
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            that.wx.ready(function(){
            });
            that.wx.error(function(res){      
            });
        }).catch(function(err){
            // that.loadingState = "加载失败"
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/home.scss';
</style>
