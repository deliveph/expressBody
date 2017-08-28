<template>
<div class="wrapper">
    <div class="order-wrapper">
        <div class="order-box">
            <div class="order-list-item">
                <p>下单时间：<span class="ft-red">2015-01-20 16:40:27</span></p>
            </div>
        </div>
        <div class="order-box">
            <dl class="set">
                <dt><i></i></dt>
                <dd>
                    <h6 class="order-name">陈与飞 15172236168</h6>
                    <p class="order-adress">广东省深圳市南山区大冲国际商务中心5号楼501广东省深圳市南山区大冲国际商务中心5号楼501</p>
                </dd>
            </dl>
            <dl class="put">
                <dt><i></i></dt>
                <dd>
                    <h6 class="order-name">陈与飞 15172236168</h6>
                    <p class="order-adress">广东省深圳市南山区大冲国际商务中心5号楼501广东省深圳市南山区大冲国际商务中心5号楼501</p>
                </dd>
            </dl>
        </div>
        <div class="order-box">
            <div class="order-list-item">
                <p>订单编号：<span >2017015424855254185</span></p>
            </div>
            <div class="order-list-item">
                <p>订单状态：<span class="ft-red">待接单</span></p>
            </div>
            <div class="order-list-item">
                <p>快递公司：<span>默认</span></p>
            </div>
            <div class="order-list-item">
                <p>物品类型：<span>文件</span></p>
            </div>
            <div class="order-list-item">
                <p>预估重量：<span>1kg</span></p>
            </div>
            <div class="order-list-item">
                <p>取件时间：<span>2015-01-20 16:40:27</span></p>
            </div>
            <div class="order-list-item">
                <p>备注说明：<span>请按时取件</span></p>
            </div>
        </div>
        <div class="order-box">
            <!--待评价-->
            <div class="order-list-item">
                <p>快递单号：<span class="ft-blue">顺丰快递 25555554564464644</span></p>
            </div>
            <div class="order-list-item">
                <p>预计费用：<span class="ft-red">210快递豆</span></p>
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
    </div>
    <div class="order-group">
        <button class="disable-btn">取消</button>
        <button>编辑</button>
        <button>去评价</button>
        <button>继续下单</button>
    </div>
</div>
</template>

<script>
    export default{}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>