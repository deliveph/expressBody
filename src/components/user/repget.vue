<template>
<div class="wrapper">
    <div class="order-wrapper">
        <div class="order-time">
        <!--
            <i class="atonce"></i>-->
            <i class="subscribe"></i>
            <p>下单时间：<span class="ft-red">2015-01-20 16:40:27</span></p>
        </div>
        <div class="order-box">
            <div class="order-list-item">
                <p>订单编号：<span >2017015424855254185</span></p>
            </div>
            <div class="order-list-item">
                <p>订单状态：<span class="ft-red">待接单</span></p>
            </div>
            <div class="order-list-item">
                <p>快递单号：<span class="ft-blue">15141515454854848488</span></p>
            </div>
            <div class="order-list-item">
                <p>快递员电话：<span>151111111111</span></p>
            </div>
        </div>
        <div class="order-box">
            <div class="order-list-item">
                <p>收货人：<span >陈羽凡</span></p>
            </div>
            <div class="order-list-item">
                <p>手机号码：<span>待接单</span></p>
            </div>
            <div class="order-list-item">
                <p>详细地址：<span>15141515454854848488</span></p>
            </div>
            <div class="order-list-item">
                <p>送件时间：<span>151111111111</span></p>
            </div>
            <div class="order-list-item">
                <p>代收流费：<span class="ft-red">￥0</span></p>
            </div>
            <!--待支付-->
            <div class="order-list-item">
                <p>应付金额：<span class="ft-red">260快递豆</span></p>
            </div>
            <!--已完成-->
            <div class="order-list-item">
                <p>预计费用：
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
            <button class="disable-btn">取消</button>
            <button>编辑</button>
            <button>修改送件时间</button>
            <button>去评价</button>
            <button>继续下单</button>
        </div>
        
    </div>
</div>
</template>
<script>
    export default{}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>