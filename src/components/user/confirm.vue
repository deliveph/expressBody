<template>
    <div class="wrapper">
        <div class="confirm-order">
            <div class="pay-item">
                <div class="pay-des col-5">应付金额：</div>
                <div class="pay-much col-5 t-r">
                    <span class="ft-red">{{ship_order.order_fee}}快递豆</span>
                </div>
            </div>
            <h2>支付明细</h2>
            <ul>
                <li>
                    <div class="pay-item">
                        <div class="pay-des col-5">快递金额：</div>
                        <div class="pay-much col-5 t-r">
                            <span class="ft-red">{{ship_order.estimate_logistics_fee}}快递豆</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="pay-item">
                        <div class="pay-des col-5">服务费：</div>
                        <div class="pay-much col-5 t-r">
                            <span class="ft-red">{{ship_order.service_fee}}快递豆</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="pay-item">
                        <div class="pay-des col-5">可用优惠券：</div>
                        <div class="pay-much col-5 t-r">
                            <router-link :to="{path:'/coupon'}">
                                <span v-if="JSON.stringify(user_coupon) != '{}'" class="ft-red">{{user_coupon.coupon_amount}}快递豆</span>
                                <span v-else>请选择</span>
                                <i class="arrow-right"></i>
                            </router-link>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="confirm-btn">
                <button class="commit-btn" @click="confirmPay">确认支付</button>
            </div>
        </div>

        <!--设置支付弹出层  -->
        <div class="layer_warp layer_setting" v-bind:class="{hide:!layerSetting}">
            <div class="layer_table">
                <div class="layer_table_cell">
                    <div class="layer_box">
                        <div class="layer_title">
                            <p>请输入支付密码</p>
                            <i @click="cancelSetting"></i>
                        </div>
                        <div class="layer_container">
                            <div class="pw_input ipt-box-nick">
                                <input type="tel" maxlength="6" class="ipt-real-nick" value="" v-model="password" />
                                <div class="ipts-box-nick">
                                    <div class="ipt-fake-box">
                                        <input type="password" maxlength="1">
                                        <input type="password" maxlength="1">
                                        <input type="password" maxlength="1">
                                        <input type="password" maxlength="1">
                                        <input type="password" maxlength="1">
                                        <input type="password" maxlength="1">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="layer_footer">
                            <div class="btn">
                                <!-- 输入完6位密码才会高亮 active-->
                                <button type="button" class="btn_next active" @click="pay">确认支付</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import { Toast } from 'vux'
import qs from 'qs'
export default {
    data() {
        return {
            ship_order_number: '',
            items: [],
            ship_order: [],
            user_coupon: {},
            layerSetting: false,
            password: '',
            type: ''
        }
    },
    components: {
        Toast,
        qs
    },
    created() {
        let that = this
        that.ship_order_number = this.$route.query.ship_order_number
        that.type = this.$route.query.type
        if (that.type == 'ship') {
            this.http(that.configs.apiTop + "/page/affirm-ship-order/" + that.ship_order_number, "get", '', function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    let data = msg.data
                    that.items = msg.data
                    that.ship_order = data.ship_order
                    that.user_coupon = data.user_coupon
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        } else {
            this.http(that.configs.apiTop + "/page/affirm-collection-order/" + that.ship_order_number, "get", '', function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    let data = msg.data
                    that.items = msg.data
                    that.ship_order = data.ship_order
                    that.user_coupon = data.user_coupon
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        }

    },
    methods: {
        confirmPay() {
            let that = this
            if (that.items.is_setting_pay_password == false) {
                that.$router.push({ name: 'setpaypw' })
            } else {
                that.layerSetting = true
            }
        },
        cancelSetting() {
            this.layerSetting = false
        },
        pay() {
            let that = this
            if (this.password.length < 6) {
                that.$vux.toast.text('请输入6位数的密码', 'middle', 100);
                return false;
            }
            let user_coupon_id = 0;
            if (that.user_coupon.coupon_id) {
                user_coupon_id = that.user_coupon.user_coupon_id
            }
            let data = qs.stringify({
                'user_coupon_id': user_coupon_id,
                'user_pay_password': that.password
            })
            if (that.type == 'ship') {
                this.http(that.configs.apiTop + "/order/pay-ship-order/" + that.ship_order_number, "post", data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        setTimeout(function() {
                            // ship_order_number 订单号 condition 寄件或收件
                            that.$router.push({ path: '/evalresult', query: { type: 1, status: 1, ship_order_number: that.ship_order_number, condition: that.type } })
                        }, 200);
                    } else if (msg.code == 40004) {
                        // location.href = that.configs.accreditUrl
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        setTimeout(function() {
                            that.$router.push({ path: '/evalresult', query: { type: 1, status: 0 } })
                        }, 200);
                    }
                })
            } else {
                this.http(that.configs.apiTop + "/collection-order/pay/" + that.ship_order_number, "post", data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        setTimeout(function() {
                            that.$router.push({ path: '/evalresult', query: { type: 1, status: 1, ship_order_number: that.ship_order_number, condition: that.type } })
                        }, 200);
                    } else if (msg.code == 40004) {
                        // location.href = that.configs.accreditUrl
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        setTimeout(function() {
                            that.$router.push({ path: '/evalresult', query: { type: 1, status: 0 } })
                        }, 200);
                    }
                })
            }

        }
    },
    mounted: function() {
        $(".ipt-real-nick").on("input", function() {
            //console.log($(this).val());
            var $input = $(".ipt-fake-box input");
            if (!$(this).val()) {//无值光标顶置
                $('.ipt-active-nick').css('left', $input.eq(0).offset().left - parseInt($('.ipt-box-nick').parent().css('padding-left')) + 'px');
            }
            if (/^[0-9]*$/g.test($(this).val())) {//有值只能是数字
                //console.log($(this).val());
                var pwd = $(this).val().trim();
                for (var i = 0, len = pwd.length; i < len; i++) {
                    $input.eq(i).val(pwd[i]);
                    if ($input.eq(i).next().length) {//模拟光标，先将图片容器定位，控制left值而已
                        $('.ipt-active-nick').css('left', $input.eq(i + 1).offset().left - parseInt($('.ipt-box-nick').parent().css('padding-left')) + 'px');
                    }
                }
                $input.each(function() {//将有值的当前input后的所有input清空
                    var index = $(this).index();
                    if (index >= len) {
                        $(this).val("");
                    }
                });
                if (len == 6) {
                    //执行其他操作
                    console.log('输入完整，执行操作');
                }
            } else {//清除val中的非数字，返回纯number的value
                var arr = $(this).val().match(/\d/g);
                $(this).val($(this).val().slice(0, $(this).val().lastIndexOf(arr[arr.length - 1]) + 1));
                //console.log($(this).val());
            }
        })
    }
}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss" scoped>
@import '../../../static/assets/css/px2rem.scss';
.layer_warp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    .layer_table {
        width: 100%;
        height: 100%;
        display: table;
        text-align: center;
    }
    .layer_table_cell {
        display: table-cell;
        vertical-align: middle;
    }
    .layer_box {
        width: px2rem(600); // height: px2rem(460);
        background-color: #fff;
        display: inline-block;
        border-radius: px2rem(10);
    }
    .layer_title {
        font-size: px2rem(34);
        color: #333;
        height: px2rem(88);
        line-height: px2rem(88);
        background-color: #fff;
        border-top-left-radius: px2rem(10);
        border-top-right-radius: px2rem(10);
        border-bottom: 1px solid #dbdbdb;
        position: relative;
        i {
            width: px2rem(50);
            height: px2rem(50);
            display: inline-block;
            background: url('/static/assets/images/pay_password_esc.png') no-repeat center;
            background-size: px2rem(50);
            position: absolute;
            top: px2rem(20);
            right: px2rem(30);
            cursor: pointer;
        }
    }
    .layer_container {
        padding: px2rem(56) px2rem(30);
    }
    .layer_footer {
        border-top: 1px solid #dbdbdb;
        display: flex;
        padding: px2rem(30) 0;
        .btn {
            width: 90%;
            margin: 0 auto;
        }
        .btn_next {
            width: 100%;
            height: px2rem(88);
            line-height: px2rem(88);
            text-align: center;
            font-size: px2rem(30);
            color: #fff;
            border-radius: px2rem(10);
            background-color: #afc3ad;
            &.active {
                background-color: #366931;
            }
        }
    }
}

.ipt-box-nick {
    width: 100%;
    height: px2rem(100);
    line-height: px2rem(100);
    position: relative;
    margin: 0 auto;
    .ipt-real-nick {
        position: absolute;
        top: 0 !important;
        left: 0 !important;
        width: 100%;
        height: px2rem(100);
        line-height: px2rem(100);
        opacity: 0;
        z-index: 999;
        color: transparent;
        text-shadow: 0px 0px 0px #333;
    }
    .ipts-box-nick {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
        width: 100%;
        height: px2rem(100);
        line-height: px2rem(100);
        overflow: hidden;
        border: 1px solid #d6d9e0;
        border-radius: px2rem(6);

        .ipt-fake-box {
            height: px2rem(100);
            line-height: px2rem(100);
            display: flex;
            justify-content: space-between;
            &:focus {
                color: #F00
            }
        }
        .ipt-fake-box {
            input {
                width: px2rem(88);
                height: px2rem(98);
                border: 0;
                border-right: 1px solid #d6d9e0;
                color: #000;
                font-weight: bold;
                font-size: 18px;
                text-align: center;
                padding: 0;
                border-radius: 2px;
                &:last-child {
                    border-right: 0;
                }
            }
        }
        .ipt-active-nick {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }
        .ipt-active-nick {
            img {
                vertical-align: middle;
            }
        }
    }
}
</style>