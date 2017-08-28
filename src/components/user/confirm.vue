<template>
<div class="wrapper">
    <div class="confirm-order">
        <div class="pay-item">
            <div class="pay-des col-5">应付金额：</div>
            <div class="pay-much col-5 t-r">
                <span class="ft-red">210快递豆</span>
            </div>
        </div>
        <h2>支付明细</h2>
        <ul>
            <li>
                <div class="pay-item">
                    <div class="pay-des col-5">快递金额：</div>
                    <div class="pay-much col-5 t-r">
                        <span class="ft-red">210快递豆</span>
                    </div>
                </div>
            </li>
            <li>
                <div class="pay-item">
                    <div class="pay-des col-5">服务费：</div>
                    <div class="pay-much col-5 t-r">
                        <span class="ft-red">210快递豆</span>
                    </div>
                </div>
            </li>
            <li>
                <div class="pay-item">
                    <div class="pay-des col-5">可用优惠券：</div>
                    <div class="pay-much col-5 t-r">
                        <router-link to="" class="ft-red">-60快递豆<i class="arrow-right"></i></router-link>
                    </div>
                </div>
            </li>
        </ul>
        <div class="confirm-btn">
            <button class="commit-btn">确认支付</button>
        </div>
    </div>
</div>
</template>
<script>
    export default{}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>