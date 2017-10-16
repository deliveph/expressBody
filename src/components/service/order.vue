<template>
    <div class="wrapper">
        <div class="order_search" @click="searchlayer()">
            <i></i>
            <span>查找订单</span>
        </div>
        <div class="order-list" v-if="items != ''">
            <ul>
                <div v-for="(item,i) in items" :key="i">
                    <div v-if="item.express_order_type == 'ship'">
                        <div v-for="(ship,s) in ships" :key="s">
                            <div v-if="item.express_order_number == ship.ship_order_number">
                                <li class="send">
                                    <router-link :to="{path:'orderdetail',query:{ship_order_number:ship.ship_order_number,status:'service'}}">
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
                                        <span class="order-btn" v-if="ship.ship_order_status_id == -1" @click="deleteShipCode(ship.ship_order_number)">删除订单</span>
                                        <span class="order-btn" v-else-if="ship.ship_order_status_id == 1">接单</span>
                                        <span class="order-btn" v-else-if="ship.ship_order_status_id == 2">取消订单</span>
                                        <!-- <span class="order-btn bd-finish" v-else-if="ship.ship_order_status_id == 3">去支付</span>
                                        <span class="order-btn bd-finish" v-else-if="ship.ship_order_status_id == 4">去评价</span> -->
                                        <span class="order-btn" v-else-if="ship.ship_order_status_id == 5" @click="deleteShipCode(ship.ship_order_number)">删除订单</span>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.express_order_type == 'collection'">
                        <div v-for="(collection,c) in collections" :key="c">
                            <div v-if="item.express_order_number == collection.collection_order_number">
                                <li class="put" >
                                    <router-link :to="{path:'repget',query:{collection_order_number:collection.collection_order_number,status:'service'}}">
                                        <i class="icon_put"></i>
                                        <div class="odd">
                                            <p class="order_number">订单号：<span>{{collection.collection_order_number}}</span></p>
                                            <p class="express_number">快递单号：<span>{{collection.logistics_code}}</span></p>
                                            <div class="order-status" v-if="collection.collection_order_status_id == -1">已取消</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 1">待接单</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 2">已接单</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 3">已确认收货</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 4">待支付</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 5">待评价</div>
                                            <div class="order-status" v-else-if="collection.collection_order_status_id == 6">已完成</div>
                                        </div>
                                    </router-link>
                                    <div class="order-option "  >
                                        <span class="order-btn" v-if="collection.collection_order_status_id == -1" @click="deleteCollectionCode(collection.collection_order_number)">删除订单</span>
                                        <span class="order-btn" v-else-if="collection.collection_order_status_id == 1">接单</span>
                                        <span class="order-btn" v-else-if="collection.collection_order_status_id == 2">取消订单</span>
                                        <span class="order-btn" v-else-if="collection.collection_order_status_id == 3">确认送达</span>
                                        <!-- <span class="order-btn bd-finish" v-else-if="collection.collection_order_status_id == 4">去支付</span>
                                        <span class="order-btn bd-finish" v-else-if="collection.collection_order_status_id == 5">去评价</span> -->
                                        <span class="order-btn" v-else-if="collection.collection_order_status_id == 6" @click="deleteCollectionCode(collection.collection_order_number)">删除订单</span>
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

        <!-- 查询条件框  -->
        <div class="layer_warp layer_refer" v-if="layer" @click="layerWarp()">
            <div class="layer_main" @click="layerMain()">
                <div class="layer_title">
                    <input type="number" v-model="orderCode" placeholder="请输入订单号"/>
                </div>
                <div class="layer_conter">
                    <h3>请选择订单状态</h3>
                    <ul class="order_type_list">
                        <li @click="order_combos('wait_order')" :class="{active: express_order_status == 'wait_order'}" v-model="express_order_status">
                            待接单
                        </li>
                        <li @click="order_combos('have_order')" :class="{active: express_order_status == 'have_order'}" v-model="express_order_status">
                            已接单
                        </li>
                        <li @click="order_combos('unpaid')" :class="{active: express_order_status == 'unpaid'}" v-model="express_order_status">
                            待支付
                        </li>
                        <li @click="order_combos('wait_comment')" :class="{active: express_order_status == 'wait_comment'}" v-model="express_order_status">
                            待评价
                        </li>
                        <li @click="order_combos('finish')" :class="{active: express_order_status  == 'finish'}" v-model="express_order_status">
                            确认收货
                        </li>
                    </ul>
                </div>
                <div class="layer_footer">
                    <ul>
                        <li class="resetting" @click="resetting()">重置</li>
                        <li class="success" @click="success()">完成</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import qs  from 'qs'
    import { Toast } from 'vux'
    export default{
        data() {
            return{
                items:[],
                ships:[],
                collections:[],
                layer:false,
                orderCode:'',
                express_order_status:''
            }
        },
        methods:{
            searchlayer(){
                this.layer = true
            },
            layerWarp(){
                // this.layer = false
            },
            layerMain(e){
                // e.stopPropagation()
            },
            order_combos(type){
                this.express_order_status = type
            },
            resetting(){
                let that = this
                that.orderCode = ''

            },
            success(ship_order_number){
                let that = this
                let data = qs.stringify({
                    'express_order_number':that.orderCode,
                    'express_order_status':that.express_order_status
                })
                that.http(that.configs.apiTop+"/order/orders?express_order_number="+that.orderCode+"&express_order_status="+that.express_order_status, "get", '', function(res){
                    let msg = res.data
                    if(msg.code == 0){
                        let data = msg.data
                        that.items = data.items
                        that.ships = data.ships
                        that.collections = data.collections
                        that.layer = false
                    }else if(msg.code == 40004){

                    }else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            },
            orderlist(){
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
            },
            deleteShipCode(ship_order_number){
                let that = this
                this.$vux.confirm.show({
                    title: '删除订单',
                     content: '确定要删除此订单???',
                    // 组件除show外的属性
                    onCancel () {
                        
                    },
                    onConfirm () {
                        if(ship_order_number){
                            that.http(that.configs.apiTop+"/ship-order/service-ignore/"+ship_order_number, "post", '', function(res){
                                let msg = res.data
                                if(msg.code == 0){
                                    that.$vux.toast.text(msg.message, 'middle',100)
                                    setTimeout(function(){ 
                                        that.$router.push({path: '/service'}) 
                                    }, 200);
                                }else if(msg.code == 40004){

                                }else {
                                    that.$vux.toast.text(msg.message, 'middle', 100);
                                }
                            })
                        }
                    }
                })
            },
            deleteCollectionCode(collection_order_number){
                let that = this
                this.$vux.confirm.show({
                    title: '删除订单',
                     content: '确定要删除此订单???',
                    // 组件除show外的属性
                    onCancel () {
                        
                    },
                    onConfirm () {
                        if(collection_order_number){
                            that.http(that.configs.apiTop+"/ship-order/service-ignore/"+collection_order_number, "post", '', function(res){
                                let msg = res.data
                                if(msg.code == 0){
                                    that.$vux.toast.text(msg.message, 'middle',100)
                                    setTimeout(function(){ 
                                        that.$router.push({path: '/service'}) 
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
            this.orderlist()
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';
    .order_search{
        height:px2rem(100);
        line-height:px2rem(100);
        border-bottom:1px solid #d8dce2;
        padding:0 px2rem(20);
        background-color:#fff;
        i{
            width:px2rem(50);
            height:px2rem(50);
            background:url('/static/assets/images/orderform_find.png') no-repeat center;
            background-size:px2rem(50) px2rem(50);
            display: inline-block;
            vertical-align: top;
            margin-right:px2rem(16);
            margin-top: px2rem(26);
        }
        span{
            font-size:px2rem(30);
            colore:#333;
        }
    }
    
    .layer_warp {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
        &.layer_refer{
            .layer_title{
                background-color:transparent;
            }
        }
        .layer_main {
            width: px2rem(520);
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            background-color: #fff;
        }
        .layer_title {
            font-size: px2rem(30);
            color: #999;
            width: px2rem(460);
            height: px2rem(62);
            line-height: px2rem(62);
            border-radius: px2rem(8);
            margin: 0 px2rem(30);
            margin-top: px2rem(30);
            input {
                width: 100%;
                height: 100%;
                background-color: #f2f2f2;
                border: 0;
                padding-left: px2rem(20);
            }
        }
        .layer_conter {
            margin-top: px2rem(30);
            padding: 0 px2rem(30);
            h3 {
                font-size: px2rem(28);
                font-size: #333;
            }
            .order_type_list {
                margin-top: px2rem(20);
                display: flex;
                flex-wrap: wrap;
                li {
                    min-width: px2rem(60);
                    height: px2rem(54);
                    line-height: px2rem(54);
                    border: 1px solid #d2d2d2;
                    border-radius: px2rem(10);
                    padding: 0 px2rem(30);
                    margin-bottom: px2rem(30);
                    text-align: center;
                    margin-right:px2rem(20);
                    cursor: pointer;
                    &.active {
                        background-color: #366931;
                        color: #fff;
                    }
                    // &:nth-child(2n){
                    //     margin:0 px2rem(20);
                    // }
                }

            }
        }
        .layer_footer {
            width: 100%;
            height: px2rem(90);
            border-top: 1px solid #e0e0e0;
            line-height: px2rem(90);
            position: absolute;
            bottom: 0;
            ul {
                width: 100%;
                display: flex;
            }
            li {
                flex: 1;
                font-size: px2rem(28);
                color: #fff;
                height: px2rem(90);
                line-height: px2rem(90);
                text-align: center;
                cursor: pointer;
                &.resetting {
                    background: rgba(140, 217, 133, 1.0)
                }
                &.success {
                    background-color: #366931;
                }
            }
        }
    }
</style>
