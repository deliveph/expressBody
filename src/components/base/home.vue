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
                    <router-link :to="{name:'Userindex'}">
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
    </div>
</template>

<script>
import Vheader from '../base/public/header'
import Banner from '../base/public/banner'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueAMap from 'vue-amap'
import { Toast } from 'vux'
let map
export default {
    components: {
        Vheader,
        Banner,
        VueAMap,
        Toast
    },
    methods: {
        messageBox() {

        }
    },
    computed: {

    },
    data(){
        let self = this
        return {
          center: [121.59996, 31.197646],
          lng: 0,
          lat: 0,
          loaded: false,
          service:{},
          user:{},
          carousels:[],
          plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                    console.log(status,result)
                    if (result && result.position) {
                        console.log(result.formattedAddress)
                    }
                });
              }
            }
          }]
        };
    },
    created() {
        let that = this
        this.http(that.configs.apiTop + "/page/user-home", "get", '', function(res) {
            let msg = res.data
            if (msg.code == 0) {
                let data = msg.data
                that.user = data.user
                that.service = data.service
                that.carousels = data.carousels
            } else if (msg.code == 40004) {
                // location.href = that.configs.accreditUrl
            } else {
                that.$vux.toast.text(msg.message, 'middle', 100);
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/home.scss';
</style>
