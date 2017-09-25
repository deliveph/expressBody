<template>
<div class="wrapper">
    <div class="order-wrapper">
        <div class="order-time">
        <!--
            <i class="atonce"></i>-->
            <i class="subscribe"></i>
            <p>下单时间：<span class="ft-red">{{items.collection_order_create_time_f}}</span></p>
        </div>
        <div class="order-box">
            <div class="order-list-item">
                <p>订单编号：<span >{{items.collection_order_number}}</span></p>
            </div>
            <div class="order-list-item">
                <p>订单状态：
                    <span class="ft-red" v-if="items.collection_order_status_id == -1">已取消</span>
                    <span class="ft-red" v-else-if="items.collection_order_status_id == 1">待接单</span>
                    <span class="ft-red" v-else-if="items.collection_order_status_id == 2">已接单</span>
                    <span class="ft-red" v-else-if="items.collection_order_status_id == 3">已确认收货</span>
                    <span class="ft-red" v-else-if="items.collection_order_status_id == 4">待支付</span>
                    <span class="ft-red" v-else-if="items.collection_order_status_id == 5">待评价</span>
                    <span class="ft-red" v-else-if="items.collection_order_status_id == 6">已完成</span>
                </p>
            </div>
            <div class="order-list-item">
                <p>快递单号：<router-link class="ft-blue" :to="{path:'/result',query:{code:items.logistics_code}}" tag="span">{{items.logistics_code}}</router-link></p>
            </div>
            <div class="order-list-item">
                <p>快递员电话：<span>{{items.courier_phone}}</span></p>
            </div>
        </div>
        <div class="order-box">
            <div class="order-list-item">
                <p>收货人：<span >{{items.consignee_name}}</span></p>
            </div>
            <div class="order-list-item">
                <p>手机号码：<span>{{items.consignee_phone}}</span></p>
            </div>
            <div class="order-list-item">
                <p>详细地址：<span>{{items.consignee_address}}</span></p>
            </div>
            <div class="order-list-item">
                <p>送件时间：<span>{{items.delivery_start_time_f}} ~ {{items.delivery_end_time_f}}</span></p>
            </div>
            <div class="order-list-item">
                <p>代收流费：<span class="ft-red">￥{{items.collection_logistics_fee}}</span></p>
            </div>
            <!--待支付-->
            <div class="order-list-item">
                <p>应付金额：<span class="ft-red">{{items.order_fee}}快递豆</span></p>
            </div>
            <div class="order-list-item" v-if>
                <p>实付金额：<span class="ft-red">{{items.order_fee}}快递豆</span></p>
            </div>
            <!--已完成-->
            <div class="order-list-item">
                <p>评价结果：
                    <ul class="start-icon">
                        <li class="sel"></li>
                        <li class="sel"></li>
                        <li class="sel"></li>
                        <li class="sel"></li>
                        <li></li>
                    </ul>
                </p>
            </div>
        </div>
        <div class="order-group">
            <!-- 用户操作按纽 -->
            <button class="disable-btn" v-if="items.collection_order_status_id == 1 && status == 'user' || items.collection_order_status_id == 2 && status == 'user'" @click="cancel(items.collection_order_number)">取消</button>
            <button v-if="items.collection_order_status_id == 1 && status == 'user' || items.collection_order_status_id == 2 && status == 'user'" @click="editerorder(items.collection_order_number)">编辑</button>
            <button v-else-if="items.collection_order_status_id == 3 && status == 'user'" @click="cancel(items.collection_order_number)">修改送件时间</button>
            <button v-else-if="items.collection_order_status_id == 4 && status == 'user'" @click="pay(items.collection_order_number)">去支付</button>
            <button v-else-if="items.collection_order_status_id == 5 && status == 'user'" @click="evaluate(items.collection_order_number)">去评价</button>
            <button v-else-if="items.collection_order_status_id == 6 && status == 'user'" @click="editerorder()">继续下单</button>

            <!-- 客服操作按纽 -->
            <button v-if="items.collection_order_status_id == 1 && status == 'service'" @click="receiveOrder(items.collection_order_number)">接单</button>
            <button v-else-if="items.collection_order_status_id == 2 && status == 'service'" @click="affirmShip(items.collection_order_number)">确认收货</button>
            <button v-else-if="items.collection_order_status_id == 3 && status == 'service'" @click="affirmDelivery(items.collection_order_number)">确认送达</button>
        </div>
        
    </div>
</div>
</template>
<script>
    import { Toast } from 'vux'
    import { Confirm } from 'vux'
    export default{
        data(){
            return{
                collection_order_number:'',
                items:[],
                status:'',
            }
        },
        created(){
            let that = this
            that.collection_order_number = this.$route.query.ship_order_number
            that.status = this.$route.query.status
            this.http(that.configs.apiTop + "/order/collection-order-detail/"+that.collection_order_number, "get", '', function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    let data = msg.data
                    that.items = data
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        },
        components: {
            Toast,
            Confirm
        },
        methods:{
            // 用户编辑订单
            editerorder(order_number){
                let that = this
                if(!order_number){
                    this.$router.push({ name: 'Collection', query: { ship_order_number: order_number }})
                }else{
                    this.$router.push({ name: 'Collection'})
                }
                
            },
            // 用户取消订单
            cancel(collection_order_number){
                let that = this
                this.$vux.confirm.show({
                    title: '取消订单',
                     content: '确定要取消此订单???',
                    // 组件除show外的属性
                    onCancel () {
                        
                    },
                    onConfirm () {
                        if(collection_order_number){
                            that.http(that.configs.apiTop+"/order/cancel-collection-order/"+collection_order_number, "post", '', function(res){
                                let msg = res.data
                                if(msg.code == 0){
                                    that.$vux.toast.text(msg.message, 'middle',100)
                                    setTimeout(function(){ 
                                        that.$router.push({path: '/user'}) 
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
             // 用户支付订单
            pay(collection_order_number){
                this.$router.push({path:'/confirm',query:{ship_order_number:collection_order_number,type:'collection'}})
            },
            // 去评价
            evaluate(collection_order_number){
                this.$router.push({path:'/evaluate',query:{ship_order_number:collection_order_number,type:'collection'}})
            },
            // 客服接受寄件订单
            receiveOrder(collection_order_number){
                let that = this
                this.http(that.configs.apiTop+"/order/receive-collection-order/"+collection_order_number, "post", '', function(res){
                    let msg = res.data
                    if(msg.code == 0){
                        that.$vux.toast.text(msg.message, 'middle',100)
                        setTimeout(function(){ 
                            that.$router.push({path: '/serviceOrder'}) 
                        }, 200);
                    }else if(msg.code == 40004){

                    }else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            },
            // 客服确定收到收件
            affirmShip(collection_order_number){
                let that = this
                this.http(that.configs.apiTop+"/collection-order/affirm-collection/"+collection_order_number, "post", '', function(res){
                    let msg = res.data
                    if(msg.code == 0){
                        that.$vux.toast.text(msg.message, 'middle',100)
                        setTimeout(function(){ 
                            that.$router.push({path: '/serviceOrder'}) 
                        }, 200);
                    }else if(msg.code == 40004){

                    }else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            },
            // 客服确定送达收件
            affirmDelivery(collection_order_number){
                let that = this
                this.http(that.configs.apiTop+"/collection-order/affirm-delivery/"+collection_order_number, "post", '', function(res){
                    let msg = res.data
                    if(msg.code == 0){
                        that.$vux.toast.text(msg.message, 'middle',100)
                        setTimeout(function(){ 
                            that.$router.push({path: '/serviceOrder'}) 
                        }, 200);
                    }else if(msg.code == 40004){

                    }else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            },
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>