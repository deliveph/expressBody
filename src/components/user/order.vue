<template>
    <div class="wrapper">
        <ul class="advise">
            <li class="on">
                <router-link to="/order/">
                    <span>全部</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{path:'waitaccept',query:{express_order_status:'wait_order'}}">
                    <span>待接单</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{path:'accept',query:{express_order_status:'have_order'}}">
                    <span>已接单</span>
                </router-link>
            </li>
            <li>
                <router-link  :to="{path:'waitpay',query:{express_order_status:'unpaid'}}">
                    <span>待支付</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{path:'finish',query:{express_order_status:'wait_comment'}}">
                    <span>待评价</span>
                </router-link>
            </li>
        </ul>
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
                                            <div class="order-status" v-if="ship.ship_order_status_id == -1">已取消</div>
                                            <div class="order-status" v-else-if="ship.ship_order_status_id == 1">待接单</div>
                                            <div class="order-status" v-else-if="ship.ship_order_status_id == 2">已接单</div>
                                            <div class="order-status" v-else-if="ship.ship_order_status_id == 3">待支付</div>
                                            <div class="order-status" v-else-if="ship.ship_order_status_id == 4">待评价</div>
                                            <div class="order-status" v-else-if="ship.ship_order_status_id == 5">已完成</div>
                                        </div>
                                    </router-link>
                                    <div class="order-option">
                                        <span class="order-btn" v-if="ship.ship_order_status_id == -1">删除订单</span>
                                        <span class="order-btn" v-else-if="ship.ship_order_status_id == 1 || ship.ship_order_status_id == 2" @click="cancel(ship.ship_order_number)">取消订单</span>
                                        <router-link class="order-btn bd-finish" v-else-if="ship.ship_order_status_id == 3" tag="span" :to="{}">去支付</router-link>
                                        <span class="order-btn bd-finish" v-else-if="ship.ship_order_status_id == 4">去评价</span>
                                        <span class="order-btn" v-else-if="ship.ship_order_status_id == 5">删除订单</span>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.express_order_type == 'collection'">
                        <div v-for="(collection,c) in collections" :key="c">
                            <div v-if="item.express_order_number == collection.collection_order_number">
                                <li class="put" >
                                    <router-link :to="{path:'repget',query:{ship_order_number:collection.collection_order_number,status:'user'}}">
                                        <i class="icon_put"></i>
                                        <div class="odd">
                                            <p class="order_number">订单号：<span>{{collection.collection_order_number}}</span></p>
                                            <p class="express_number">快递单号：<span>{{collection.logistics_code}}</span></p>
                                            <div class="order-status" v-if="collection.collection_order_status_id == -1">已取消</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 1">待接单</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 2">已接单</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 3">已接单-已确认收货</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 4">待支付</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 5">待评价</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 6">已完成</div>
                                        </div>
                                    </router-link>
                                    <div class="order-option "  >
                                        <span class="order-btn" v-if="collection.collection_order_status_id == -1">删除订单</span>
                                        <span class="order-btn" v-else-if="collection.collection_order_status_id == 1 || collection.collection_order_status_id == 2" @click="cancel(collection.collection_order_number)">取消订单</span>
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
</template>

<script>
    export default{
        data() {
            return{
                items:[],
                ships:[],
                collections:[]
            }
        },
        methods:{
            cancel(ship_order_number){
                let that = this
                this.$vux.confirm.show({
                    title: '取消订单',
                     content: '确定要取消此订单???',
                    // 组件除show外的属性
                    onCancel () {
                        
                    },
                    onConfirm () {
                        if(ship_order_number){
                            that.http(that.configs.apiTop+"/order/cancel-ship-order/"+ship_order_number, "post", '', function(res){
                                let msg = res.data
                                if(msg.code == 0){
                                    that.$vux.toast.text(msg.message, 'middle',100)
                                    setTimeout(function(){ 
                                        that.$router.push({path: '/'}) 
                                    }, 200);
                                }else if(msg.code == 40004){

                                }else {
                                    that.$vux.toast.text(msg.message, 'middle', 100);
                                }
                            })
                        }
                    }
                })
            }
        },
        created() {
            let that = this
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
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
