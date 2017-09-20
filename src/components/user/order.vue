<template>
    <div class="wrapper">
        <ul class="advise">
            <li class="on">
                <router-link to="">
                    <span>全部</span>
                </router-link>
            </li>
            <li>
                <router-link to="/waitaccept">
                    <span>待接单</span>
                </router-link>
            </li>
            <li>
                <router-link to="">
                    <span>已接单</span>
                </router-link>
            </li>
            <li>
                <router-link  to="/waitpay">
                    <span>待支付</span>
                </router-link>
            </li>
            <li>
                <router-link to="">
                    <span>待评价</span>
                </router-link>
            </li>
        </ul>

        <div class="order-list">
            <ul>
                <li class="send" v-for="(item,i) in items" :key="i">
                    <router-link to="/orderdetail">
                        <i class="icon_send"></i>
                        <div class="odd">
                            <p class="order_number">订单号：
                                <span>4332502938508025</span>
                            </p>
                            <div class="site">
                                <div class="starting">
                                    <h4>深圳</h4>
                                    <p>战锤</p>
                                </div>
                                <div class="center">

                                </div>
                                <div class="receipt">
                                    <h4>新疆</h4>
                                    <p>战犯</p>
                                </div>
                            </div>
                            <div class="order-status">待接单</div>
                        </div>
                    </router-link>
                    <div class="order-option">
                        <span class="order-btn">取消订单</span>
                    </div>
                </li>
                <li class="put">
                    <router-link :to="{name:'Detail',query:{type:'free'}}">
                        <i class="icon_put"></i>
                        <div class="odd">
                            <p class="order_number">订单号：<span>30945683409590345</span></p>
                            <p class="express_number">快递单号：<span>30945683409590345</span></p>
                            <div class="order-status">待接单</div>
                        </div>
                    </router-link>
                    <div class="order-option">
                        <span class="order-btn">取消订单</span>
                    </div>
                </li>
                <li class="send">
                    <router-link to="">
                        <i class="icon_send"></i>
                        <div class="odd">
                            <p class="order_number">订单号：
                                <span>4332502938508025</span>
                            </p>
                            <div class="site">
                                <div class="starting">
                                    <h4>深圳</h4>
                                    <p>战锤</p>
                                </div>
                                <div class="center">

                                </div>
                                <div class="receipt">
                                    <h4>新疆</h4>
                                    <p>战犯</p>
                                </div>
                            </div>
                            <div class="order-status">待支付</div>
                        </div>
                    </router-link>
                    <div class="order-option">
                        <span class="order-btn">去支付</span>
                    </div>
                </li>
                <li class="send">
                    <router-link to="">
                        <i class="icon_send"></i>
                        <div class="odd">
                            <p class="order_number">订单号：
                                <span>4332502938508025</span>
                            </p>
                            <div class="site">
                                <div class="starting">
                                    <h4>深圳</h4>
                                    <p>战锤</p>
                                </div>
                                <div class="center">

                                </div>
                                <div class="receipt">
                                    <h4>新疆</h4>
                                    <p>战犯</p>
                                </div>
                            </div>
                            <div class="order-status">待评价</div>
                        </div>
                    </router-link>
                    <div class="order-option">
                        <span class="order-btn">去评价</span>
                    </div>
                </li>
                <li class="send">
                    <router-link to="">
                        <i class="icon_send"></i>
                        <div class="odd">
                            <p class="order_number">订单号：
                                <span>4332502938508025</span>
                            </p>
                            <div class="site">
                                <div class="starting">
                                    <h4>深圳</h4>
                                    <p>战锤</p>
                                </div>
                                <div class="center">

                                </div>
                                <div class="receipt">
                                    <h4>新疆</h4>
                                    <p>战犯</p>
                                </div>
                            </div>
                            <div class="order-status">已完成</div>
                        </div>
                    </router-link>
                    <div class="order-option">
                        <span class="order-btn">删除订单</span>
                    </div>
                </li>
                <li class="send">
                    <router-link to="">
                        <i class="icon_send"></i>
                        <div class="odd">
                            <p class="order_number">订单号：
                                <span>4332502938508025</span>
                            </p>
                            <div class="site">
                                <div class="starting">
                                    <h4>深圳</h4>
                                    <p>战锤</p>
                                </div>
                                <div class="center">

                                </div>
                                <div class="receipt">
                                    <h4>新疆</h4>
                                    <p>战犯</p>
                                </div>
                            </div>
                            <div class="order-status">已取消</div>
                        </div>
                    </router-link>
                    <div class="order-option">
                        <span class="order-btn">删除订单</span>
                    </div>
                </li>
                <li class="put">
                    <router-link :to="{name:'Detail',query:{type:'free'}}">
                        <i class="icon_put"></i>
                        <div class="odd">
                            <p class="order_number">订单号：<span>30945683409590345</span></p>
                            <p class="express_number">快递单号：<span>30945683409590345</span></p>
                            <div class="order-status">已确认收货</div>
                        </div>
                    </router-link>
                    <div class="order-option">
                        <span class="order-btn">修改收货时间</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="no-order">
            <div class="no-img"></div>
            <p>暂无订单</p>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return{
            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
