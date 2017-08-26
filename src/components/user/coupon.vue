<template>
    <div class="wrapper">
        <!--
        <mt-navbar class="page-part" v-model="selected">  
            <mt-tab-item id="1">立即使用(3)</mt-tab-item>  
            <mt-tab-item id="2">使用记录(30)</mt-tab-item>  
            <mt-tab-item id="3">已过期(30)</mt-tab-item>  
        </mt-navbar>  
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">  
                <div class="coupon-list">
                    <ul>
                        <li>
                            <div class="coupon-l">
                                <router-link to="">
                                    <i class="arrow-left"></i>
                                    <span>立即使用</span>
                                </router-link>
                            </div>
                            <div class="coupon-r">
                                <div class="coupon-info">
                                    <h6><span>100</span>快递豆通用劵</h6>
                                    <p>使用期限：2016.05.10-2016.02.01</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>  
            <mt-tab-container-item id="2">  
                <div class="coupon-list after">
                    <ul>
                        <li>
                            <div class="coupon-l">
                                <router-link to="">
                                    <i class="arrow-left"></i>
                                    <span>立即使用</span>
                                </router-link>
                            </div>
                            <div class="coupon-r">
                                <div class="coupon-info">
                                    <h6><span>100</span>快递豆通用劵</h6>
                                    <p>使用期限：2016.05.10-2016.02.01</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>  
            <mt-tab-container-item id="3">  
                <div class="coupon-list past">
                    <ul>
                        <li>
                            <div class="coupon-l">
                                <router-link to="">
                                    <i class="arrow-left"></i>
                                    <span>立即使用</span>
                                </router-link>
                            </div>
                            <div class="coupon-r">
                                <div class="coupon-info">
                                    <h6><span>100</span>快递豆通用劵</h6>
                                    <p>使用期限：2016.05.10-2016.02.01</p>
                                </div>
                            </div>
                            <div class="past-icon"></div>
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>
        </mt-tab-container> 
        -->
        <tab :line-width=2 v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in list" :key="index" @on-item-click="getItem(index)"><span>{{item.name}}({{item.num}})</span></tab-item>
        </tab>
        <div class="tab-container" refs="tabcon">
            <div class="coupon-list" v-if="idx == 0">
                <ul>
                    <li>
                        <div class="coupon-l">
                            <router-link to="">
                                <i class="arrow-left"></i>
                                <span>立即使用</span>
                            </router-link>
                        </div>
                        <div class="coupon-r">
                            <div class="coupon-info">
                                <h6><span>100</span>快递豆通用劵</h6>
                                <p>使用期限：2016.05.10-2016.02.01</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="coupon-list after" v-if="idx == 1">
                <ul>
                    <li>
                        <div class="coupon-l">
                            <router-link to="">
                                <i class="arrow-left"></i>
                                <span>立即使用</span>
                            </router-link>
                        </div>
                        <div class="coupon-r">
                            <div class="coupon-info">
                                <h6><span>100</span>快递豆通用劵</h6>
                                <p>使用期限：2016.05.10-2016.02.01</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="coupon-list past" v-if="idx ==2 ">
                <ul>
                    <li>
                        <div class="coupon-l">
                            <router-link to="">
                                <i class="arrow-left"></i>
                                <span>立即使用</span>
                            </router-link>
                        </div>
                        <div class="coupon-r">
                            <div class="coupon-info">
                                <h6><span>100</span>快递豆通用劵</h6>
                                <p>使用期限：2016.05.10-2016.02.01</p>
                            </div>
                        </div>
                        <div class="past-icon"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { Tab, TabItem } from 'vux'
    import comm from '../../../static/assets/js/public.js'
    export default{
        data() {
            return{
                list: [
                    { 'name': '立即使用', num: '3' },
                    { 'name': '使用记录', num: '4' },
                    { 'name': '已过期', num: '5' }
                ],
                index: 0,
                idx:0
            }
        },
        components: {
            Tab,
            TabItem
        },
        methods: {
            getItem(index){
                
                comm.onItemClick(index,tabcon,'div.coupon-list',idx);
            }
        },
        create() {
            console.log(122)
            console.log(this)
        },
        mounted(){
            console.log(121)
            console.log(this.comm)
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