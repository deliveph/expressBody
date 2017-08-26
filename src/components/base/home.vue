<template>
    <div id="home" class="home">
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
// import { Divider, FlexboxItem, Flexbox } from 'vux'
export default {
    components: {
        Vheader,
        Banner,
        Layer
    },
    methods: {
        messageBox() {

        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/home.scss';
</style>
