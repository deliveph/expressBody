<template>
    <div class="wrapper">
        <div class="league-banner"></div>
        <div class="league-sink">
            <div class="league-form">
                <div class="league-item">
                    <label>您的姓名：</label>
                    <input type="text" t class="league-input" placeholder="请输入您的姓名">
                </div>
                <div class="league-item">
                    <label>您的电话：</label>
                    <input type="tel" class="league-input" placeholder="请输入您的电话">
                </div>
                <group label-width="auto" label-align="left" class="league-item">
                    <x-address :title="title" v-model="value" raw-value :list="addressData" value-text-align="left"></x-address>
                </group>
                <div class="league-item">
                    <textarea name="" id="" placeholder="填写详细地址"></textarea>
                </div>
            </div>
            <div class="content mt80">
                <button class="commit-btn">申请加盟</button>
            </div>
        </div>
    </div>
</template>
<script>
    import { Group, XAddress, ChinaAddressV3Data, Value2nameFilter as value2name } from 'vux'
    export default{
        components: {
            Group,
            XAddress
        },
        data() {
            return {
                title: '您的地址：',
                value: ['广东省', '深圳市', '南山区'],
                addressData: ChinaAddressV3Data,
                showAddress: false
            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
@import '../../../static/assets/css/px2rem.scss';
.weui-cell{
    padding:13px 0 !important;
}
.weui-label{
    font-size:px2rem(28);margin-right:px2rem(20)
}
.vux-popup-picker-value{
    font-size:px2rem(28);
}
.modal-open{
    overflow:auto !important;position: inherit !important;
}
.weui-cells:after{
    border-bottom:inherit !important;
}
.mt80{
    margin-top:px2rem(80)
}
</style>