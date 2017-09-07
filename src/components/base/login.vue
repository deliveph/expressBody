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
                    <a href="https://m.kuaidi100.com/">
                        <img src="/static/assets/images/btn_cha.png" />
                        <p>快递查询</p>
                    </a>
                    <!-- <router-link :to="">
                        
                    </router-link> -->
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
export default {
    components: {
        Vheader,
        Banner,
        Layer,
        LayerPw
    },
    methods: {
        messageBox() {

        }
    },
    computed: {

    },
    data(){
        return {
          layerhide:false,
          layerPwhide:false
        };
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/home.scss';
</style>
