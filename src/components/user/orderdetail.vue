<template>
<div class="wrapper">
    <div class="order-wrapper">
        <div class="order-box">
            <div class="order-list-item">
                <p>下单时间：<span class="ft-red">{{items.ship_order_create_time_f}}</span></p>
            </div>
        </div>
        <div class="order-box">
            <dl class="set">
                <dt><i></i></dt>
                <dd>
                    <h6 class="order-name">{{items.shipper_name}} {{items.shipper_phone}}</h6>
                    <p class="order-adress">{{items.shipper_full_address}}</p>
                </dd>
            </dl>
            <dl class="put">
                <dt><i></i></dt>
                <dd>
                    <h6 class="order-name">{{items.consignee_name}} {{items.consignee_phone}}</h6>
                    <p class="order-adress">{{items.consignee_full_address}}</p>
                </dd>
            </dl>
        </div>
        <div class="order-box">
            <div class="order-list-item">
                <p>订单编号：<span >{{items.ship_order_number}}</span></p>
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
                <p>快递公司：<span>{{items.logistics_company_name}}</span></p>
            </div>
            <div class="order-list-item">
                <p>物品类型：<span>{{items.logistics_goods_category_name}}</span></p>
            </div>
            <div class="order-list-item">
                <p>预估重量：<span>{{items.estimate_weight}}kg</span></p>
            </div>
            <div class="order-list-item">
                <p>取件时间：<span>{{items.take_start_time_f}}~{{items.take_end_time_f}}</span></p>
            </div>
            <div class="order-list-item">
                <p>备注说明：<span>{{items.remark}}</span></p>
            </div>
        </div>
        <div class="order-box">
            <!--待评价-->
            <div class="order-list-item" v-if="items">
                <p>快递单号：<span class="ft-blue">顺丰快递 25555554564464644</span></p>
            </div>
            <div class="order-list-item" v-if="items">
                <p>预计费用：<span class="ft-red">{{items.order_fee}}快递豆</span></p>
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
    </div>
    <div class="order-group">
        <button class="disable-btn" v-if="items.ship_order_status_id == 1 || items.ship_order_status_id == 2" @click="cancel(items.ship_order_number)">取消</button>
        <button v-if="items.ship_order_status_id == 1 || items.ship_order_status_id == 2" @click="editerorder(items.ship_order_number)">编辑</button>
        <button v-else-if="items.ship_order_status_id == 3 ">去支付</button>
        <button v-else-if="items.ship_order_status_id == 4">去评价</button>
        <button v-else-if="items.ship_order_status_id == 5" @click="editerorder()">继续下单</button>
    </div>
</div>
</template>

<script>
    import { Toast } from 'vux'
    import { Confirm } from 'vux'
    export default{
        data(){
            return{
                items:[]
            }
        },
        components:{
            Toast
        },
        created(){
            let that = this
            let ship_order_number = this.$route.query.ship_order_number
            this.http(that.configs.apiTop + "/order/ship-order-detail/"+ship_order_number, "get", '', function(res) {
                let msg = res.data
                if(msg.code == 0){  
                    that.items = msg.data
                }else if(msg.code == 40004){

                }else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        },
        methods:{
            editerorder(order_number){
                let that = this
                if(!order_number){
                    this.$router.push({ name: 'send', query: { ship_order_number: order_number }})
                }else{
                    this.$router.push({ name: 'send'})
                }
                
            },
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
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>