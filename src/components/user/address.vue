<template>
    <div class="wrapper">
        <tab :line-width=2 v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in lists" :key="index" ><span>{{item}}</span></tab-item>
        </tab>
        <div class="address-wrapper" v-model="index">
            <!--
            <ul class="address-list" v-if="index == 0">
                <li>
                    <div class="address-info">
                        <dl>
                            <dt>张珊珊</dt>
                            <dd>15812319880</dd>
                        </dl>
                        <p>广东省深圳市南山区粤海街道大冲国际中心华润城铜鼓路大冲国际5号楼502</p>
                    </div>
                    <div class="address-tues">
                        <div class="address-default">
                            <span><i></i>默认地址</span>
                        </div>
                        <ul class="address-add">
                            <li class="addr-edit">
                                <router-link to=""><span><i></i>编辑</span></router-link>
                            </li>
                            <li class="addr-del">
                                <span><i></i>删除</span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div class="address-info">
                        <dl>
                            <dt>张珊珊</dt>
                            <dd>15812319880</dd>
                        </dl>
                        <p>广东省深圳市南山区粤海街道大冲国际中心华润城铜鼓路大冲国际5号楼502</p>
                    </div>
                    <div class="address-tues">
                        <ul class="address-add">
                            <li class="addr-edit">
                                <router-link to=""><span><i></i>编辑</span></router-link>
                            </li>
                            <li class="addr-del">
                                <span><i></i>删除</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <ul class="address-list" v-else>
                <li>
                    <div class="address-info">
                        <dl>
                            <dt>张珊珊</dt>
                            <dd>15812319880</dd>
                        </dl>
                        <p>广东省深圳市南山区粤海街道大冲国际中心华润城铜鼓路大冲国际5号楼1202</p>
                    </div>
                    <div class="address-tues">
                        <div class="address-default">
                            <span><i></i>默认地址</span>
                        </div>
                        <ul class="address-add">
                            <li class="addr-edit">
                                <router-link to=""><span><i></i>编辑</span></router-link>
                            </li>
                            <li class="addr-del">
                                <span><i></i>删除</span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div class="address-info">
                        <dl>
                            <dt>张珊珊</dt>
                            <dd>15812319880</dd>
                        </dl>
                        <p>广东省深圳市南山区粤海街道大冲国际中心华润城铜鼓路大冲国际5号楼502</p>
                    </div>
                    <div class="address-tues">
                        <ul class="address-add">
                            <li class="addr-edit">
                                <router-link to=""><span><i></i>编辑</span></router-link>
                            </li>
                            <li class="addr-del">
                                <span><i></i>删除</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            -->
            <v-address v-if="index == 0"></v-address>
            <v-address v-else></v-address>
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem } from 'vux'
    import address from '../addressitem'
    const list = () => ['寄件地址', '收件地址']
    export default{
        components: {
            Tab,
            TabItem,
            'v-address': address
        },
        data() {
            return{
                lists: list(),
                index: 0
            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
    @import '../../../static/assets/css/px2rem.scss';

    .vux-tab .vux-tab-item.vux-tab-selected{
        color: #366931 !important;border-bottom:none !important;
    }
    .vux-tab .vux-tab-item.vux-tab-selected span{
        border-bottom:3px solid  #366931 !important;
        padding-bottom:px2rem(14)
    }
    .vux-tab-ink-bar{
        background-color:none !important
    }
    .vux-tab-item + .vux-tab-ink-bar{
        display:none !important;
    }
    .vux-slider > .vux-swiper{
        min-height: -webkit-fill-available;
    }
    .vux-slider > .vux-swiper{
        overflow: auto !important;
        position: relative;
    }
</style>