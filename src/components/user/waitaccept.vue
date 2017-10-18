<template>
    <div class="wrapper">
        <tab :line-width=2 v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in list" :key="index" @on-item-click="order(index)">
                <span>{{item.name}}({{item.num}})</span>
            </tab-item>
        </tab>
        <div class="order-container" v-model="index">
            <div class="order-con-box" v-if="index == 0">
                <div class="order-list" v-if="items != ''">
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
                                            <div class="order-option">
                                                <span class="order-btn" v-if="ship.ship_order_status_id == -1">删除订单</span>
                                                <span class="order-btn" v-else-if="ship.ship_order_status_id == 1 || ship.ship_order_status_id == 2">取消订单</span>
                                                <span class="order-btn bd-finish" v-else-if="ship.ship_order_status_id == 3">去支付</span>
                                                <span class="order-btn bd-finish" v-else-if="ship.ship_order_status_id == 4">去评价</span>
                                                <span class="order-btn" v-else-if="ship.ship_order_status_id == 5">删除订单</span>
                                            </div>
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
            <div class="order-con-box" v-else>
                <div class="order-list" v-if="items != ''">
                    <ul>
                        <div v-for="(item,i) in items" :key="i">
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
                                            <div class="order-option">
                                                <span class="order-btn" v-if="collection.collection_order_status_id == -1">删除订单</span>
                                                <span class="order-btn" v-else-if="collection.collection_order_status_id == 1 || collection.collection_order_status_id == 2">取消订单</span>
                                                <span class="order-btn" v-else-if="collection.collection_order_status_id == 3">修改收货时间</span>
                                                <span class="order-btn bd-finish" v-else-if="collection.collection_order_status_id == 4">去支付</span>
                                                <span class="order-btn bd-finish" v-else-if="collection.collection_order_status_id == 5">去评价</span>
                                                <span class="order-btn" v-else-if="collection.collection_order_status_id == 6">删除订单</span>
                                            </div>
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
import { Tab, TabItem } from 'vux'
export default {
    data() {
        return {
            index: 0,
            list: [
                { name: '我寄的', 'num': '0' },
                { name: '代收的', 'num': '0' },
            ],
            items: [],
            ships: [],
            collections: [],
            express_order_status: '',
            express_order_type: ''
        }
    },
    components: {
        Tab,
        TabItem
    },
    created() {
        this.order(this.index)
    },
    methods: {
        order(index) {
            let that = this
            that.express_order_status = this.$route.query.express_order_status
            if (that.index == 0) {
                that.express_order_type = 'ship'
            } else {
                that.express_order_type = 'collection'
            }
            this.http(that.configs.apiTop + "/order/orders?express_order_status=" + that.express_order_status + "&express_order_type=" + that.express_order_type, "get", '', function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    let data = msg.data
                    that.items = data.items
                    that.ships = data.ships
                    that.collections = data.collections
                    that.list[0].num = data.total_ship_order
                    that.list[1].num = data.total_collection_order
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        }
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
</style>