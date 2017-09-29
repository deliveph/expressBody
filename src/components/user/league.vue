<template>
    <div class="wrapper">
        <div class="league-banner"></div>
        <div class="league-sink">
            <div class="league-form">
                <div class="league-item">
                    <label>您的姓名：</label>
                    <input type="text" v-model="name" class="league-input" placeholder="请输入您的姓名">
                </div>
                <div class="league-item">
                    <label>您的电话：</label>
                    <input type="tel" v-model="phone" class="league-input" placeholder="请输入您的电话">
                </div>
                <group label-width="auto" label-align="left" class="league-item">
                    <x-address :title="title" v-model="value" raw-value :list="addressData" value-text-align="left"></x-address>
                </group>
                <div class="league-item">
                    <textarea name="" v-model="addr" id="" placeholder="填写详细地址"></textarea>
                </div>
            </div>
            <div class="content mt80">
                <button class="commit-btn" @click="applyFor">申请加盟</button>
            </div>
        </div>
    </div>
</template>
<script>
    import { Group, XAddress, ChinaAddressV3Data, Toast, Value2nameFilter as value2name } from 'vux'
    import qs from 'qs'
    export default{
        components: {
            Group,
            XAddress,
            Toast
        },
        data() {
            return {
                title: '您的地址：',
                value: ["广东省", "深圳市", "南山区"],
                addressData: ChinaAddressV3Data,
                showAddress: false,
                province:'',
                city:'',
                district:'',
                name: '',
                phone: '',
                addr: ''
            }
        },
        created() {
            let that = this
            this.http(that.configs.apiTop + "/region/regions", "get", '', function (res) {
                let msg = res.data
                if(msg.code == 0){
                    localStorage.setItem('regions',JSON.stringify(msg.data.regions))
                    that.addressData = msg.data.regions
                }else if(msg.code == 40004){
                    // location.href = that.configs.accreditUrl
                }
            })
        },
        methods: {
            applyFor() {
                this.province = this.value[0]
                this.city = this.value[1]
                this.district = this.value[2]
                let reg = /^1[34578]\d{9}$/
                let that =  this
                let data = {
                    'user_real_name': this.name,
                    'user_phone': this.phone,
                    'province_region_id': this.province,
                    'city_region_id': this.city,
                    'district_region_id': this.district,
                    'user_detail_address': this.addr

                }
                if(this.name == ''){
                    that.$vux.toast.text('请填写您的名字', 'middle', 100);
                    return
                }
                
                if(this.phone == ''){
                    that.$vux.toast.text('请填写手机号码', 'middle', 100);
                    return
                }
                if(!(reg.test(this.phone))){
                    that.$vux.toast.text('请填写正确的手机号码', 'middle', 100);
                    return
                }
                if(this.value == ''){
                    that.$vux.toast.text('请选择地址', 'middle', 100);
                    return
                }
                if(this.addr == ''){
                    that.$vux.toast.text('请填写详细地址', 'middle', 100);
                    return
                }
                console.log(data)

                this.http(that.configs.apiTop + "/stage/apply-join", "post",  data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        setTimeout(() =>{
                            that.$router.push({path:'/Userindex'});
                        },1000)
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