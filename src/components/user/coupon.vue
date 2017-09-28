<template>
    <div class="wrapper">
        <tab :line-width=2 v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in list" :key="index" @on-item-click="getItem(index)"><span>{{item.name}}({{item.num}})</span></tab-item>
        </tab>
        <div class="tab-container" ref="tabcon" v-if="items != ''">
            <div class="coupon-list" v-if="index == 0">
                <ul>
                    <li v-for="(item,i) in items" :key="i" >
                        <div class="coupon-l">
                            <router-link to="" href="javascript:;" @click.native="getTicket(item.coupon_id,item.coupon_category_id)">
                                <i class="arrow-left"></i>
                                <span>立即使用</span>
                            </router-link>
                        </div>
                        <div class="coupon-r">
                            <div class="coupon-info">
                                <h6><span>{{item.coupon_amount}}</span>{{item.coupon_category_name}}</h6>
                                <p>使用期限：{{item.coupon_send_time_f}}-{{item.coupon_expire_time_f}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="coupon-list after" v-if="index == 2">
                <ul>
                    <li v-for="(item,i) in items" :key="i">
                        <div class="coupon-l">
                            <router-link to="" href="javascript:;" @click.native="getTicket(item.coupon_id,item.coupon_category_id)">
                                <i class="arrow-left"></i>
                                <span>立即使用</span>
                            </router-link>
                        </div>
                        <div class="coupon-r">
                            <div class="coupon-info">
                                <h6><span>{{item.coupon_amount}}</span>{{item.coupon_category_name}}</h6>
                                <p>使用期限：{{item.coupon_send_time_f}}-{{item.coupon_expire_time_f}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="coupon-list past" v-if="index == 1 ">
                <ul>
                    <li v-for="(item,i) in items" :key="i">
                        <div class="coupon-l">
                            <router-link to="" href="javascript:;" @click.native="getTicket(item.coupon_id,item.coupon_category_id)">
                                <i class="arrow-left"></i>
                                <span>立即使用</span>
                            </router-link>
                        </div>
                        <div class="coupon-r">
                            <div class="coupon-info">
                                <h6><span>{{item.coupon_amount}}</span>{{item.coupon_category_name}}</h6>
                                <p>使用期限：{{item.coupon_send_time_f}}-{{item.coupon_expire_time_f}}</p>
                            </div>
                        </div>
                        <div class="past-icon"></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="no-coupon" v-else>
            <img src="/static/assets/images/no_state.png" alt="">
            <p>暂无优惠券</p>
        </div>
        <router-link class="discount go-btn " to="/discount">去领券中心</router-link>
    </div>
</template>

<script>
    import { Tab, TabItem, Toast } from 'vux'
    import qs from 'qs'
    export default{
        data() {
            return{
                list: [
                    { 'name': '立即使用', num: '0' },
                    { 'name': '使用记录', num: '0' },
                    { 'name': '已过期', num: '0' }
                ],
                index: 0,
                items:[]
            }
        },
        components: {
            Tab,
            TabItem,
            Toast
        },
        methods: {
            getItem(index){
                let that = this
                if(index == 0){
                    this.http(that.configs.apiTop + "/coupon/unused-user-coupons", "get", '', function(res) {
                        let msg = res.data
                        if (msg.code == 0) {
                            let data = msg.data
                            that.items = data.coupons
                            let len = data.coupons.length
                            that.list[0].num = len
                        } else if (msg.code == 40004) {
                            // location.href = that.configs.accreditUrl
                        } else {
                            that.$vux.toast.text(msg.message, 'middle', 100);
                        }
                    })
                }else if(index == 1){
                    this.http(that.configs.apiTop + "/coupon/used-user-coupons", "get", '', function(res) {
                        let msg = res.data
                        if (msg.code == 0) {
                            let data = msg.data
                            that.items = data.coupons
                            let len = data.coupons.length
                            that.list[1].num = len
                        } else if (msg.code == 40004) {
                            // location.href = that.configs.accreditUrl
                        } else {
                            that.$vux.toast.text(msg.message, 'middle', 100);
                        }
                    })
                }else if(index == 2){
                    this.http(that.configs.apiTop + "/coupon/expire-user-coupons", "get", '', function(res) {
                        let msg = res.data
                        if (msg.code == 0) {
                            let data = msg.data
                            that.items = data.coupons
                            let len = data.coupons.length
                            that.list[2].num = len
                        } else if (msg.code == 40004) {
                            // location.href = that.configs.accreditUrl
                        } else {
                            that.$vux.toast.text(msg.message, 'middle', 100);
                        }
                    })
                }
            },
            getTicket(coupon_id,coupon_category_id){
                let that = this;
                if(coupon_category_id){
                    
                }
                let data = qs.stringify({
                    'coupon_id': coupon_id
                })
                this.http(that.configs.apiTop + "/coupon/get-coupon", "post", data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    } else if (msg.code == 40004) {
                        // location.href = that.configs.accreditUrl
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
                
            }
        },
        created() {
            let that = this
            let index = that.index
            that.getItem(index)
        },
        mounted(){
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
    .discount.go-btn{
        width: 90%;
        margin: 0 auto;
        height: px2rem(88);line-height: px2rem(88);font-size: px2rem(28);
        color: #fff;display: block;background-color: #366931;border-radius: px2rem(8);text-align: center;
    }
    .discount.go-btn{
        margin-top: px2rem(140);
    }
</style>