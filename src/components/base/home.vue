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
        <layer></layer>
    </div>
</template>

<script>
import Vheader from '../base/public/header'
import Banner from '../base/public/banner'
import Layer from '../base/public/layer'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueAMap from 'vue-amap'
// import $wechat from 'weixin-js-sdk'
// import { Divider, FlexboxItem, Flexbox } from 'vux'
let map
export default {
    components: {
        Vheader,
        Banner,
        Layer,
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
          plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                    console.log(status,result)
                    if (result && result.position) {
                        console.log(result.formattedAddress)
                        alert(result.formattedAddress)
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

        // let that = this;
        // this.$ajax({
        //     url:'/api/weixin-js-sdk-config',
        //     method:'get',
        //     withCredentials:true
        // }).then(function(res){ 
        //     let msg = res.data.data
        //     console.log(that);
        //     console.log(msg);

        //     that.wx.config({
        //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //         appId: msg.app_id, // 必填，公众号的唯一标识 
        //         timestamp: msg.timestamp,
        //         nonceStr: msg.nonce_str,
        //         signature: msg.signature,
        //         jsApiList: [
        //             'getLocation',
        //             'openLocation',
        //             'onMenuShareAppMessage',
        //             'onMenuShareTimeline'
        //         ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        //     })
        // }).catch(function(err){
        //     // that.loadingState = "加载失败"
        // })
        // that.wx.ready(function() {
        //     that.wx.getLocation({
        //         type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        //         success: function (res) {
        //             console.log(res);
        //             that.wx.openLocation({
        //                 latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
        //                 longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
        //                 name: '', // 位置名
        //                 address: '', // 地址详情说明
        //                 scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        //                 infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        //             });
        //             // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        //             // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        //             // var speed = res.speed; // 速度，以米/每秒计
        //             // var accuracy = res.accuracy; // 位置精度
        //         }
        //     });
        // });

        // AMap.initAMapApiLoader({
        //     // 申请的高德key
        //     key: 'YOUR_KEY',
        //     // 插件集合
        //     plugin: ['']
        // });
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/home.scss';

.amap-demo {
    height: 300px;
}
</style>
