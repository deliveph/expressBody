<template>
    <div id="home" class="home">
        <el-amap vid="amap" :plugin="plugin" class="amap-demo hide" :center="center">
        </el-amap>
        <div class="toolbar hide">
            <span v-if="loaded">
                location: lng = {{ lng }} lat = {{ lat }}
            </span>
            <span v-else>正在定位</span>
        </div>
        <Vheader></Vheader>
        <div class="hg20"></div>
        <banner></banner>
        <div class="entrance_list">
            <ul>
                <li>
                    <router-link :to="{name:'Collection'}">
                        <img src="/static/assets/images/btn_shou@2x.png" />
                        <p>代收快递</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Send'}">
                        <img src="/static/assets/images/btn_ji.png" />
                        <p>代寄快递</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Inquire'}">
                        <img src="/static/assets/images/btn_cha.png" />
                        <p>查询快递</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'user'}">
                        <img src="/static/assets/images/btn_me.png" />
                        <p>个人中心</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="hg30"></div>
        <div class="advertisement_banner">
            <router-link :to="{name:'Detail',query:{type:'ad'}}">
                <img src="/static/assets/images/picture_fuwu.png" />
            </router-link>
        </div>
        <div class="footer_btn">
            <ul>
                <li>
                    <router-link :to="{name:'Detail',query:{type:'free'}}">免费寄快递</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Detail',query:{type:'free'}}">免费代收快递</router-link>
                </li>
            </ul>
        </div>
        <Layer v-if="layerhide"></Layer>
        <LayerPw v-if="layerPwhide"></LayerPw>
    </div>
</template>

<script>
import Vheader from '../base/public/header'
import Banner from '../base/public/banner'
import Layer from '../base/public/layer'
import LayerPw from '../base/public/layer_pw'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueAMap from 'vue-amap'
import qs from 'qs'
// import $wechat from 'weixin-js-sdk'
// import { Divider, FlexboxItem, Flexbox } from 'vux'
let map
export default {
    components: {
        Vheader,
        Banner,
        Layer,
        LayerPw,
        VueAMap
    },
    methods: {
        messageBox() {

        }
    },
    computed: {

    },
    data(){
        let self = this;
        return {
          center: [121.59996, 31.197646],
          lng: 0,
          lat: 0,
          loaded: false,
          layerhide:false,
          layerPwhide:true,
          plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                    console.log(status,result)
                    if (result && result.position) {
                        console.log(result.formattedAddress)
                        // alert(result.formattedAddress)
                        // self.lng = result.position.lng;
                        // self.lat = result.position.lat;
                        // self.center = [self.lng, self.lat];
                        // self.loaded = true;
                        // self.$nextTick();
                    }
                });
              }
            }
          }]
        };
    },
    created() {
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
