<template>
    <div class="wrapper">
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