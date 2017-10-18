<template>
    <div id="inquire">
        <div class="inquire_warp">
            <div class="banner">
                <img src="/static/assets/images/inquire_bg.png" />
            </div>
            <div class="inquire_main">
                <div class="import">
                    <input type="tel" name="odd" v-model="odd" placeholder="请输入您要查询的快递单号" />
                    <div class="richscan" @click="richscan">
                        <i></i>
                    </div>
                </div>
                <div class="btn">
                    <button @click="see">查询</button>
                </div>
            </div>
            <div class="order_list">
                <h3>最近订单</h3>
                <div v-if="items != ''">
                    <ul>
                        <div v-for="(item,i) in items" :key="i">
                            <div v-if="item.express_order_type == 'ship'">
                                <div v-for="(ship,s) in ships" :key="s">
                                    <div v-if="item.express_order_number == ship.ship_order_number">
                                        <li class="send">
                                            <router-link :to="{path:'orderdetail',query:{ship_order_number:ship.ship_order_number,status:'user'}}">
                                                <i class="icon_send"></i>
                                                <div class="odd">
                                                    <p class="order_number">订单号：
                                                        <span>{{ship.ship_order_number}}</span>
                                                    </p>
                                                    <div class="site">
                                                        <div class="starting">
                                                            <h4>{{ship.shipper_address_city_region_name}}</h4>
                                                            <p>{{ship.shipper_name}}</p>
                                                        </div>
                                                        <div class="center">

                                                        </div>
                                                        <div class="receipt">
                                                            <h4>{{ship.consignee_address_city_region_name}}</h4>
                                                            <p>{{ship.consignee_name}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </li>
                                    </div>
                                </div>
                            </div>
                            <div v-if="item.express_order_type == 'collection'">
                                <div v-for="(collection,c) in collections" :key="c">
                                    <div v-if="item.express_order_number == collection.collection_order_number">
                                        <li class="put">
                                            <router-link :to="{path:'repget',query:{collection_order_number:collection.collection_order_number,status:'user'}}">
                                                <i class="icon_put"></i>
                                                <div class="odd">
                                                    <p class="order_number">订单号：
                                                        <span>{{collection.collection_order_number}}</span>
                                                    </p>
                                                    <p class="express_number">快递单号：
                                                        <span>{{collection.logistics_code}}</span>
                                                    </p>
                                                </div>
                                            </router-link>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
                <div class="no-order" v-else>
                    <div class="no-img"></div>
                    <p>暂无订单</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vux'
import qs from 'qs'
export default {
    data() {
        return {
            odd: '',
            items: [],
            ships: [],
            collections: []
        }
    },
    components: {
        Toast
    },
    methods: {
        see() {
            let that = this
            let reg = /^[1-9]\d*$/
            let odd = that.odd
            if (odd == '') {
                that.$vux.toast.text('请输入快递单号', 'middle', 100);
                return false;
            } else if (!reg.test(odd)) {
                that.$vux.toast.text('请输入正确的快递单号', 'middle', 100);
                return false;
            }
            that.$router.push({ path: '/result', query: { code: odd } })
        },
        richscan() {
            let that = this;
            // let msg = {"resultStr":"CODE_128,534052156639","errMsg":"scanQRCode:ok"}
            this.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function(res) {
                    let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    let str = result.split(',');
                    let code = '';
                    if (str.length > 1) {
                        code = str[1]
                    } else {
                        code = str[0]
                    }
                }
            });
        },
        cancel(ship_order_number) {
            let that = this
            this.$vux.confirm.show({
                title: '取消订单',
                content: '确定要取消此订单???',
                // 组件除show外的属性
                onCancel() {

                },
                onConfirm() {
                    if (ship_order_number) {
                        that.http(that.configs.apiTop + "/order/cancel-ship-order/" + ship_order_number, "post", '', function(res) {
                            let msg = res.data
                            if (msg.code == 0) {
                                that.$vux.toast.text(msg.message, 'middle', 100)
                                setTimeout(function() {
                                    that.$router.push({ path: '/user' })
                                }, 200);
                            } else if (msg.code == 40004) {

                            } else {
                                that.$vux.toast.text(msg.message, 'middle', 100);
                            }
                        })
                    }
                }
            })
        },
        deleteShipCode(ship_order_number) {
            let that = this
            this.$vux.confirm.show({
                title: '删除订单',
                content: '确定要删除此订单???',
                // 组件除show外的属性
                onCancel() {

                },
                onConfirm() {
                    if (ship_order_number) {
                        that.http(that.configs.apiTop + "/ship-order/user-ignore/" + ship_order_number, "post", '', function(res) {
                            let msg = res.data
                            if (msg.code == 0) {
                                that.$vux.toast.text(msg.message, 'middle', 100)
                                setTimeout(function() {
                                    that.$router.push({ path: '/user' })
                                }, 200);
                            } else if (msg.code == 40004) {

                            } else {
                                that.$vux.toast.text(msg.message, 'middle', 100);
                            }
                        })
                    }
                }
            })
        },
        deleteCollectionCode(collection_order_number) {
            let that = this
            this.$vux.confirm.show({
                title: '删除订单',
                content: '确定要删除此订单???',
                // 组件除show外的属性
                onCancel() {

                },
                onConfirm() {
                    if (collection_order_number) {
                        that.http(that.configs.apiTop + "/collection-order/user-ignore/" + collection_order_number, "post", '', function(res) {
                            let msg = res.data
                            if (msg.code == 0) {
                                that.$vux.toast.text(msg.message, 'middle', 100)
                                setTimeout(function() {
                                    that.$router.push({ path: '/user' })
                                }, 200);
                            } else if (msg.code == 40004) {

                            } else {
                                that.$vux.toast.text(msg.message, 'middle', 100);
                            }
                        })
                    }
                }
            })
        }
    },
    created() {
        let that = this;
        this.$weChat();
        this.http(that.configs.apiTop + "/order/orders", "get", '', function(res) {
            let msg = res.data
            if (msg.code == 0) {
                let data = msg.data
                that.items = data.items
                that.ships = data.ships
                that.collections = data.collections
            } else if (msg.code == 40004) {
                // location.href = that.configs.accreditUrl
            } else {
                that.$vux.toast.text(msg.message, 'middle', 100);
            }
        })
    }
}
</script>

<style lang="scss">
@import '../../../static/assets/css/home.scss';
#inquire {
    padding-bottom: px2rem(80)
}

.no-order {
    margin-top: px2rem(102);
    .no-img {
        background: url('/static/assets/images/no_indent.png') no-repeat;
        background-size: cover;
        width: px2rem(250);
        height: px2rem(250);
        margin: 0 auto;
    }
    p {
        text-align: center;
        font-size: px2rem(28);
        color: #999;
        margin-top: px2rem(40);
    }
    button {}
}
</style>