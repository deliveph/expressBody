<template>
    <div class="wrapper">
        <tab :line-width=2 v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in list" :key="index"><span>{{item.name}}({{item.num}})</span></tab-item>
        </tab>
        <div class="order-container" v-model="index">
            <div class="order-con-box" v-if="index == 0">
                <div class="order-list">
                    <ul>
                        <li class="send">
                            <router-link :to="{name:'waitaccept'}">
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
                            <div class="order-option">
                                <router-link to="/evaluate" class="order-btn bd-finish" >去评价</router-link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="no-order">
                    <div class="no-img"></div>
                    <p>暂无订单</p>
                </div>
            </div>
            <div class="order-con-box" v-else>
                <div class="order-list">
                    <ul>
                        <li class="put">
                            <router-link :to="{name:'Detail',query:{type:'free'}}">
                                <i class="icon_put"></i>
                                <div class="odd">
                                    <p class="order_number">订单号：<span>30945683409590345</span></p>
                                    <p class="express_number">快递单号：<span>30945683409590345</span></p>
                                </div>
                            </router-link>
                            <div class="order-option">
                                <router-link to="/evaluate" class="order-btn bd-finish">去评价</router-link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="no-order">
                    <div class="no-img"></div>
                    <p>暂无订单</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem } from 'vux'
    export default{
        data() {
            return{
                index: 0,
                list: [
                    { name: '我寄的', 'num': '3' },
                    { name: '代收的', 'num': '5' },
                ]
            }
        },
        components: {
            Tab,
            TabItem
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