<template>
    <div class="wrapper">
        <tab :line-width=2 v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in list" :key="index" @on-item-click="getItem(index)">
                <span>{{item.name}}({{item.num}})</span>
            </tab-item>
        </tab>
        <div class="tab-container" ref="tabcon" v-if="items != ''">
            <div class="coupon-list" v-if="index == 0">
                <ul>
                    <li v-for="(item,i) in items" :key="i" :class="(current_coupon_category_id > 0 && (current_coupon_category_id != item.coupon_category_id && item.coupon_category_id != 1))  ? 'disable' : ''">
                        <div class="coupon-l">
                            <router-link to="" href="javascript:;" v-if="(current_coupon_category_id > 0 && (current_coupon_category_id != item.coupon_category_id && item.coupon_category_id != 1))">
                                <i class="arrow-left"></i>
                                <span>立即使用</span>
                            </router-link>
                            <router-link to="" href="javascript:;" @click.native="getTicket(i, item.coupon_category_id)" v-else>
                                <i class="arrow-left"></i>
                                <span>立即使用</span>
                            </router-link>
                        </div>
                        <div class="coupon-r">
                            <div class="coupon-info">
                                <h6>
                                    <span>{{item.coupon_amount}}</span>{{item.coupon_category_name}}</h6>
                                <p>使用期限：{{item.coupon_send_time}}-{{item.coupon_expire_time}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="coupon-list after" v-if="index == 2">
                <ul>
                    <li v-for="(item,i) in items" :key="i">
                        <div class="coupon-l">
                            <router-link to="" href="javascript:;">
                                <i class="arrow-left"></i>
                                <span>立即使用</span>
                            </router-link>
                        </div>
                        <div class="coupon-r">
                            <div class="coupon-info">
                                <h6>
                                    <span>{{item.coupon_amount}}</span>{{item.coupon_category_name}}</h6>
                                <p>使用期限：{{item.coupon_send_time}}-{{item.coupon_expire_time}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="coupon-list past" v-if="index == 1 ">
                <ul>
                    <li v-for="(item,i) in items" :key="i">
                        <div class="coupon-l">
                            <router-link to="" href="javascript:;">
                                <i class="arrow-left"></i>
                                <span>立即使用</span>
                            </router-link>
                        </div>
                        <div class="coupon-r">
                            <div class="coupon-info">
                                <h6>
                                    <span>{{item.coupon_amount}}</span>{{item.coupon_category_name}}</h6>
                                <p>使用期限：{{item.coupon_send_time}}-{{item.coupon_expire_time}}</p>
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
export default {
    data() {
        return {
            list: [
                { 'name': '立即使用', num: '0' },
                { 'name': '使用记录', num: '0' },
                { 'name': '已过期', num: '0' }
            ],
            index: 0,
            items: [],
            express_order_number: '',
            express_order_type: "",
            current_coupon_category_id: 0,
        }
    },
    components: {
        Tab,
        TabItem,
        Toast
    },
    methods: {
        getItem(index) {
            let that = this
            if (index == 0) {
                this.http(that.configs.apiTop + "/coupon/unused-user-coupons", "get", '', function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        let data = msg.data
                        that.items = data.coupons
                        that.list[0].num = data.total_unused_user_coupons
                        that.list[1].num = data.total_used_user_coupons
                        that.list[2].num = data.total_expire_user_coupons
                    } else if (msg.code == 40004) {
                        // location.href = that.configs.accreditUrl
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            } else if (index == 1) {
                this.http(that.configs.apiTop + "/coupon/used-user-coupons", "get", '', function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        let data = msg.data
                        that.items = data.coupons
                        that.list[0].num = data.total_unused_user_coupons
                        that.list[1].num = data.total_used_user_coupons
                        that.list[2].num = data.total_expire_user_coupons
                    } else if (msg.code == 40004) {
                        // location.href = that.configs.accreditUrl
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            } else if (index == 2) {
                this.http(that.configs.apiTop + "/coupon/expire-user-coupons", "get", '', function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        let data = msg.data
                        that.items = data.coupons
                        that.list[0].num = data.total_unused_user_coupons
                        that.list[1].num = data.total_used_user_coupons
                        that.list[2].num = data.total_expire_user_coupons
                    } else if (msg.code == 40004) {
                        // location.href = that.configs.accreditUrl
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            }
        },
        getTicket(i, coupon_category_id) {
            let that = this
            if (that.express_order_number != "") {
                this.$store.dispatch('chooseCoupon', that.items[i])
                this.$router.push({
                    path: "/confirm",
                    query: { express_order_number: that.express_order_number, express_order_type: that.express_order_type },
                })
            } else {
                if (coupon_category_id == 1) {
                    this.$router.push({ name: 'user' })
                } else if (coupon_category_id == 2) {
                    this.$router.push({ name: 'Collection'})
                } else if (coupon_category_id == 3) {
                    this.$router.push({ name: 'Send' })
                }
            }

        }
    },
    created() {
        let that = this
        let index = that.index
        that.getItem(index)
        if (that.$route.query.express_order_number != undefined) {
            that.express_order_number = that.$route.query.express_order_number 
        }
        if (that.$route.query.express_order_type != undefined) {
            that.express_order_type = that.$route.query.express_order_type
        }
        if (that.express_order_type != "") {
            that.current_coupon_category_id = that.express_order_type == "ship" ? 3 : 2
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
@import '../../../static/assets/css/px2rem.scss';

.vux-tab .vux-tab-item.vux-tab-selected {
    color: #366931 !important;
    border-bottom: none !important;
}

.vux-tab .vux-tab-item.vux-tab-selected span {
    border-bottom: 3px solid #366931 !important;
    padding-bottom: px2rem(14)
}

.vux-tab-ink-bar {
    background-color: none !important
}

.vux-tab-item+.vux-tab-ink-bar {
    display: none !important;
}

.vux-slider>.vux-swiper {
    min-height: -webkit-fill-available;
}

.vux-slider>.vux-swiper {
    overflow: auto !important;
    position: relative;
}

.discount.go-btn {
    width: 90%;
    margin: 0 auto;
    height: px2rem(88);
    line-height: px2rem(88);
    font-size: px2rem(28);
    color: #fff;
    display: block;
    background-color: #366931;
    border-radius: px2rem(8);
    text-align: center;
}

.discount.go-btn {
    margin-top: px2rem(140);
}
</style>