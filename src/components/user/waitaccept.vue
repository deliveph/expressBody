<template>
    <div class="wrapper">
        <!--
        <mt-navbar class="page-part" v-model="selected">  
            <mt-tab-item id="1">我寄的(3)</mt-tab-item>  
            <mt-tab-item id="2">代收的(30)</mt-tab-item>  
        </mt-navbar>  
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">  
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
                                <span class="order-btn">取消订单</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="no-order">
                    <div class="no-img"></div>
                    <p>暂无订单</p>
                </div>
            </mt-tab-container-item>  
            <mt-tab-container-item id="2">  
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
                                <span class="order-btn">取消订单</span>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                <div class="no-order">
                    <div class="no-img"></div>
                    <p>暂无订单</p>
                </div>
            </mt-tab-container-item>  
        </mt-tab-container>
        -->
    </div>
</template>
<script>
    export default{
        data() {
            return{
                selected: '1'
            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
    @import '../../../static/assets/css/px2rem.scss';

    .mint-navbar .mint-tab-item.is-selected{
        color: #366931;
    }
    .mint-navbar .mint-tab-item .mint-tab-item-label{
        font-size: px2rem(28) !important;
        display: inline-block;
        padding-bottom:px2rem(20);
    }
    .mint-navbar .mint-tab-item.is-selected{
        border-bottom:0;
    }
    .mint-navbar .mint-tab-item{
        padding:px2rem(20) 0 0 0;
    }
    .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
        border-bottom: 2px solid #366931;
    }
</style>