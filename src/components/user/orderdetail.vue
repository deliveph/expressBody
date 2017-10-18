<template>
    <div class="wrapper">
        <div class="order-wrapper">
            <div class="order-box">
                <div class="order-list-item">
                    <p>下单时间：
                        <span class="ft-red">{{items.ship_order_create_time}}</span>
                    </p>
                    <p class="nickname" v-if="status == 'service'" @click="layerSendFun"><img :src="items.user_avatar" />
                        <span>{{items.user_nickname}}</span>
                    </p>
                </div>
            </div>
            <div class="order-box">
                <dl class="set">
                    <dt>
                        <i></i>
                    </dt>
                    <dd>
                        <h6 class="order-name">{{items.shipper_name}} {{items.shipper_phone}}</h6>
                        <p class="order-adress">{{items.shipper_full_address}}</p>
                    </dd>
                </dl>
                <dl class="put">
                    <dt>
                        <i></i>
                    </dt>
                    <dd>
                        <h6 class="order-name">{{items.consignee_name}} {{items.consignee_phone}}</h6>
                        <p class="order-adress">{{items.consignee_full_address}}</p>
                    </dd>
                </dl>
            </div>
            <div class="order-box">
                <div class="order-list-item">
                    <p>订单编号：
                        <span>{{items.ship_order_number}}</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>订单状态：
                        <span class="ft-red" v-if="items.ship_order_status_id == -1">已取消</span>
                        <span class="ft-red" v-else-if="items.ship_order_status_id == 1">待接单</span>
                        <span class="ft-red" v-else-if="items.ship_order_status_id == 2">已接单</span>
                        <span class="ft-red" v-else-if="items.ship_order_status_id == 3">待支付</span>
                        <span class="ft-red" v-else-if="items.ship_order_status_id == 4">待评价</span>
                        <span class="ft-red" v-else-if="items.ship_order_status_id == 5">已完成</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>快递公司：
                        <span>{{items.logistics_company_name}}</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>物品类型：
                        <span>{{items.logistics_goods_category_name}}</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>预估重量：
                        <span>{{items.estimate_weight}}kg</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>取件时间：
                        <span>{{items.take_start_time}}~{{items.take_end_time}}</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>备注说明：
                        <span>{{items.remark}}</span>
                    </p>
                </div>
            </div>
            <div class="order-box">
                <!--待评价-->
                <div class="order-list-item" v-if="(items.ship_order_status_id >= 4 && status == 'user') || (items.ship_order_status_id >= 4 && status == 'service')">
                    <p>快递单号：
                        <span class="ft-blue">{{items.logistics_company_name}}
                            <router-link :to="{path:'/result',query:{code:items.logistics_code}}" v-if="items.logistics_code != '0'">{{items.logistics_code}}</router-link>
                            <router-link to="" href="javascript:;" v-else>--</router-link>
                        </span>
                    </p>
                </div>
                <div class="order-list-item" v-if="items.ship_order_status_id == 1 && status == 'user' || items.ship_order_status_id == 2 && status == 'user'">
                    <p>预计费用：
                        <span class="ft-red">{{items.order_fee}}快递豆</span>
                    </p>
                </div>
                <div class="order-list-item" v-if="items.ship_order_status_id == 1 && status == 'service' || items.ship_order_status_id == 2 && status == 'service'">
                    <p>预计费用：
                        <span class="ft-red">￥ {{items.order_fee}}</span>
                    </p>
                </div>
                <div class="order-list-item" v-if="items.ship_order_status_id >= 4 && status == 'user' || items.ship_order_status_id >= 4 && status == 'user'">
                    <p>实付金额:
                        <span class="ft-red">{{items.order_fee}}快递豆</span>
                    </p>
                </div>
                <div class="order-list-item" v-if="items.ship_order_status_id >= 4 && status == 'service' || items.ship_order_status_id >= 4 && status == 'service'">
                    <p>实付金额:
                        <span class="ft-red">￥ {{items.order_fee}}</span>
                    </p>
                </div>
                <!--已完成-->
                <div class="order-list-item" v-if="items.ship_order_status_id >= 5 && status == 'user'">
                    <p>评价结果：
                        <ul class="start-icon" v-if="items.service_score >= 5">
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                        </ul>
                        <ul class="start-icon" v-else-if="items.service_score >= 4">
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li></li>
                        </ul>
                        <ul class="start-icon" v-else-if="items.service_score >= 3">
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class=""></li>
                            <li></li>
                        </ul>
                        <ul class="start-icon" v-else-if="items.service_score >= 2">
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li></li>
                        </ul>
                        <ul class="start-icon" v-else-if="items.service_score >= 1">
                            <li class="sel"></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li></li>
                        </ul>
                        <ul class="start-icon" v-else-if="items.service_score >= 0">
                            <li class=""></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li></li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
        <div class="order-group">
            <!-- 用户操作按纽 -->
            <button class="disable-btn" v-if="(items.ship_order_status_id == 1 && status == 'user') || (items.ship_order_status_id == 2 && status == 'user')" @click="cancel(items.ship_order_number,'ship')">取消</button>
            <button v-if="items.ship_order_status_id == 1 && status == 'user' || items.ship_order_status_id == 2 && status == 'user'" @click="editerorder(items.ship_order_number)">编辑</button>
            <button v-else-if="items.ship_order_status_id == 3 && status == 'user'" @click="pay(items.ship_order_number)">去支付</button>
            <button v-else-if="items.ship_order_status_id == 4 && status == 'user'" @click="evaluate(items.ship_order_number)">去评价</button>
            <button v-else-if="items.ship_order_status_id == 5 && status == 'user'" @click="editerorder()">继续下单</button>
            <!-- 客服操作按纽 -->
            <button class="" v-if="items.ship_order_status_id == 1 && status == 'service'" @click="receiveOrder(items.ship_order_number)">接单</button>
            <button v-if="items.ship_order_status_id == 2 && status == 'service'" @click="affirmShip(items.ship_order_number)">
                确定收货
            </button>
            <button v-if="(items.ship_order_status_id == 4 && status == 'service') || (items.ship_order_status_id == 5  && status == 'service')" @click="writelayer(items.ship_order_number)">
                填写/修改快递单号
            </button>
        </div>

        <div class="layer_warp layer_writeOrder" v-if="writelayerStorey">
            <div class="layer_table">
                <div class="layer_table_cell">
                    <div class="layer_box">
                        <div class="layer_title">
                            <p>快递单号</p>
                        </div>
                        <div class="layer_container">
                            <div class="phone_register register_box">
                                <div class="phone_number">
                                    <popup-picker :title="title1" :data="list1" :columns="1" v-model="value1" :display-format="format" :placeholder="placeholder1" @on-change="onChangeOfLogisticsCompanies"></popup-picker>
                                </div>
                                <div class="phone_code">
                                    <label></label>
                                    <input type="number" name="code" value="" placeholder="请输入快递单号" v-model="code" />
                                </div>
                            </div>
                        </div>
                        <div class="layer_footer">
                            <div class="layer_footer_cancel">
                                <router-link tag="li" to="/"></router-link>
                                <button @click="writeCancel">取消</button>
                            </div>
                            <div class="layer_footer_confirm">
                                <button @click="writeConfirm">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 用户信息 -->
        <div class="layer_warp layer_user_message" v-if="layerSend">
            <div class="layer_table">
                <div class="layer_table_cell">
                    <div class="layer_box">
                        <div class="layer_container">
                            <div class="message_main">
                                <div class="img">
                                    <img v-bind:src="items.user_avatar" />
                                </div>
                                <p class="name">{{items.user_name}}</p>
                                <p>
                                    <span>电话：</span>{{items.user_phone}}</p>
                                <p>
                                    <span>地址：</span>{{items.shipper_full_address}}</p>
                            </div>
                        </div>
                        <div class="layer_footer">
                            <div class="layer_footer_cancel">
                                <button @click="sendMessage">发送信息</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LayerPw v-if="layerPwhide" v-on:listenEvent="getOrder"></LayerPw>
    </div>
</template>

<script>
import { Toast, Confirm, PopupPicker } from 'vux'
import LayerPw from '../base/public/layer_pw'
import qs from 'qs'
export default {
    data() {
        return {
            layerPwhide: false,
            items: [],
            ship_order_number: '',
            status: '',
            writelayerStorey: false,
            layerSend: false,
            company: '',
            code: '',
            title1: '',
            list1: [],
            value1: ['默认'],
            placeholder1: '请选择快递公司',
            format: function(value, name) {
                if (name) {
                    return `${name}`
                } else {
                    return `${value}`
                }
            }
        }
    },
    components: {
        Toast,
        Confirm,
        PopupPicker,
        LayerPw
    },
    created() {
        this.getOrder()
    },
    methods: {
        getOrder(result) {
            console.log(result)
            let that = this
            that.ship_order_number = that.$route.query.ship_order_number
            that.status = that.$route.query.status
            that.http(that.configs.apiTop + "/order/ship-order-detail/" + that.ship_order_number, "get", '', function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    that.items = msg.data
                } else if (msg.code === 40016) {
                    that.layerPwhide = true
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        },
        // 用户编辑订单
        editerorder(order_number) {
            let that = this
            if (order_number != '') {
                this.$router.push({ name: 'Send', query: { ship_order_number: order_number } })
            } else {
                this.$router.push({ name: 'Send' })
            }

        },
        // 用户取消订单
        cancel(ship_order_number) {
            let that = this
            this.$vux.confirm.show({
                title: '取消订单',
                content: '确定要取消此订单???',
                // 组件除show外的属性
                onCancel() {

                },
                onConfirm() {
                    if (ship_order_number,type) {
                        that.http(that.configs.apiTop + "/order/cancel-ship-order/" + ship_order_number, "post", '', function(res) {
                            let msg = res.data
                            if (msg.code == 0) {
                                that.$router.push({path: '/ordercancel',query:{status:type}}) 
                                // that.$vux.toast.text(msg.message, 'middle', 100)
                                // setTimeout(function() {
                                //     that.$router.push({ path: '/user' })
                                // }, 200);
                            } else if (msg.code == 40004) {

                            } else {
                                that.$vux.toast.text(msg.message, 'middle', 100);
                            }
                        })
                    }
                }
            })
        },
        // 用户支付订单
        pay(ship_order_number) {
            this.$router.push({ path: '/confirm', query: { express_order_number: ship_order_number, express_order_type: 'ship' } })
        },
        // 去评价
        evaluate(ship_order_number) {
            this.$router.push({ path: '/evaluate', query: { ship_order_number: ship_order_number, type: 'ship' } })
        },
        // 客服接受寄件订单
        receiveOrder(ship_order_number) {
            let that = this
            this.http(that.configs.apiTop + "/order/receive-ship-order/" + ship_order_number, "post", '', function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    that.$vux.toast.text(msg.message, 'middle', 100)
                    setTimeout(function() {
                        that.$router.push({ path: '/serviceOrder' })
                    }, 200);
                } else if (msg.code == 40004) {

                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        },
        // 客服确定寄件
        affirmShip(ship_order_number) {
            let that = this
            console.log(1230)
            this.http(that.configs.apiTop + "/order/affirm-ship-order/" + ship_order_number, "post", '', function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    that.$vux.toast.text(msg.message, 'middle', 100)
                    setTimeout(function() {
                        that.$router.push({ path: '/serviceOrder' })
                    }, 200);
                } else if (msg.code == 40004) {

                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        },
        // 客服填写/修改快递单号
        writelayer(ship_order_number) {
            let that = this
            that.writelayerStorey = true
            that.logisticsCompaniesList()
        },
        writeConfirm() {
            let that = this;
            if (that.company == '') {
                this.$vux.toast.text('请选择快递公司', 'middle', 100);
                return false;
            } else if (that.code == '') {
                this.$vux.toast.text('请输入快递单号', 'middle', 100);
                return false;
            }
            let data = qs.stringify({
                'logistics_company_id': that.company,
                'logistics_code': that.code,
            })
            this.http(that.configs.apiTop + "/ship-order/fill-in-logistics-code/" + that.items.ship_order_number, "post", data, function(res) {
                let msg = res.data
                let data = msg.data
                if (msg.code == 0) {
                    that.$vux.toast.text(msg.message, 'middle', 100)
                    that.writelayerStorey = false
                    setTimeout(function() {
                        that.$router.push({ path: '/orderdetail' })
                    }, 200);
                } else if (msg.code == 40004) {
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        },
        writeCancel() {
            let that = this
            that.writelayerStorey = false
        },
        //快递公司列表 
        logisticsCompaniesList() {
            let that = this
            let logistics_companies = []
            this.http(that.configs.apiTop + "/logistics/logistics-companies", "get", '', function(res) {
                let msg = res.data
                let data = msg.data
                if (msg.code == 0) {
                    // 快递公司
                    for (let i = 0; i < data.length; i++) {
                        logistics_companies.push({
                            name: data[i].logistics_company_name,
                            value: String(data[i].logistics_company_id),
                            parent: 0,
                        })
                    }
                    that.list1 = logistics_companies
                } else if (msg.code == 40004) {
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        },
        //取物流公司id 
        onChangeOfLogisticsCompanies(values) {
            this.company = values[0]
        },
        sendMessage() {
            let that = this
            this.$router.push({ path: '/chat/p2p-user_' + that.items.user_id })
        },
        layerSendFun() {
            let that = this
            this.layerSend = true
        }
    }
}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
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
        font-size: px2rem(30);
        color: #fff;
        height: px2rem(88);
        line-height: px2rem(88);
        background-color: #366931;
        border-top-left-radius: px2rem(10);
        border-top-right-radius: px2rem(10);
    }
    .layer_container {}
    .layer_footer {
        height: px2rem(90);
        border-top: 1px solid #e0e0e0;
        display: flex;
        line-height: px2rem(90);
    }
    .layer_footer_cancel,
    .layer_footer_confirm,
    .layer_footer_cancel button,
    .layer_footer_confirm button {
        flex: 1;
        border-right: 1px solid #e0e0e0;
        text-align: center;
        font-size: px2rem(34);
        color: #007aff;
    }
    .layer_footer button {
        width: 100%;
        height: px2rem(90);
    }
    .layer_footer_confirm,
    .layer_footer_cancel button,
    .layer_footer_confirm button {
        border-right: 0
    }
}

.layer_writeOrder {
    .register_box {
        padding: px2rem(40) px2rem(66) px2rem(76);
        input {
            font-size: px2rem(24);
            color: #cacaca;
            width: 100%;
            height: px2rem(50);
            line-height: px2rem(50);
            padding: px2rem(10);
            border: 1px solid #dddddd;
            border-radius: px2rem(10);
        }
        button {
            width: px2rem(142);
            height: px2rem(70);
            font-size: px2rem(24);
            color: #fff;
            line-height: px2rem(70);
            border-radius: px2rem(10);
            margin-left: px2rem(20);
            border: 0;
            background-color: #afc3ad;
            &.action {
                background-color: #366931;
            }
        }
        .phone_number {
            display: flex;
            margin-bottom: px2rem(30);
            height: px2rem(50);
            line-height: px2rem(50);
            padding: px2rem(10);
            border: 1px solid #dddddd;
            border-radius: px2rem(10);
            input {
                flex: 0;
                width: px2rem(270);
            }
            button {}
        }
        .phone_code {
            input {
                width: 95%
            }
        }
    }
    .vux-cell-box {
        width: 100%;
        &:before {
            border-top: 0
        }
        .weui-cell {
            padding: 0
        }
        .vux-popup-picker-select {
            text-align: left !important;
        }
    }

    .layer_writeOrder {
        .register_box {
            padding: px2rem(40) px2rem(66) px2rem(76);
            input {
                font-size: px2rem(24);
                color: #cacaca;
                width: 100%;
                height: px2rem(50);
                line-height: px2rem(50);
                padding: px2rem(10);
                border: 1px solid #dddddd;
                border-radius: px2rem(10);
            }
            button {
                width: px2rem(142);
                height: px2rem(70);
                font-size: px2rem(24);
                color: #fff;
                line-height: px2rem(70);
                border-radius: px2rem(10);
                margin-left: px2rem(20);
                border: 0;
                background-color: #afc3ad;
                &.action {
                    background-color: #366931;
                }
            }
            .phone_number {
                display: flex;
                margin-bottom: px2rem(30);
                height: px2rem(50);
                line-height: px2rem(50);
                padding: px2rem(10);
                border: 1px solid #dddddd;
                border-radius: px2rem(10);
                input {
                    flex: 0;
                    width: px2rem(270);
                }
                button {}
            }
            .phone_code {
                input {
                    width: 95%;
                    -webkit-appearance: none;
                }
            }
        }
        .vux-cell-box {
            width: 100%;
            &:before {
                border-top: 0
            }
            .weui-cell {
                padding: 0
            }
            .vux-popup-picker-select {
                text-align: left !important;
            }
        }
    }
}


.layer_warp {
    &.layer_user_message {
        .message_main {
            padding: px2rem(40) px2rem(66) px2rem(76);
            text-align: center;
            .img {
                width: px2rem(124);
                height: px2rem(124);
                line-height: px2rem(124);
                border-radius: 50%;
                background-color: rgba(58, 105, 49, 0.34);
                margin: 0 auto;
                img {
                    width: px2rem(114);
                    height: px2rem(114);
                    border-radius: 50%;
                    vertical-align: top;
                    margin-top: px2rem(6)
                }
            }
            p {
                font-size: px2rem(28);
                color: #999;
                margin-bottom: px2rem(18);
                &.name {
                    font-size: px2rem(30);
                    color: #333;
                    margin: px2rem(20) 0;
                }
            }
        }
        .layer_footer_cancel {
            border: 0;
        }
        button {
            width: 100%;
            height: 100%;
            font-size: px2rem(24);
            color: #fff; // line-height: px2rem(70);
            border-bottom-right-radius: 0.05rem;
            border-bottom-left-radius: 0.05rem;
            border: 0;
            background-color: #366931;
        }
    }
}
</style>
