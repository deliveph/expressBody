<template>
    <div class="wrapper">
        <el-amap vid="amap" :plugin="plugin" class="amap-demo hide" :center="center">
        </el-amap>
        <div class="toolbar hide">
            <span v-if="loaded">
                location: lng = {{ lng }} lat = {{ lat }}
            </span>
            <span v-else>正在定位</span>
        </div>
        <div class="league-banner"></div>
        <div class="league-sink">
            <div class="league-form">
                <div class="league-item">
                    <label>定位城市：</label>
                    <input type="text" class="league-input" v-model="result.city" readonly >
                </div>
                <div class="league-item">
                    <label>小区名字：</label>
                    <input type="text" v-model="caddr" class="league-input" placeholder="小区名字">
                </div>
                <div class="league-item mt40">
                    <label>您的电话：</label>
                    <input type="tel" v-model="phone" class="league-input" placeholder="请输入您的电话">
                </div>
                
            </div>
            <div class="content mt80">
                <button class="commit-btn" @click="applyOpen">申请开通</button>
            </div>
        </div>
    </div>
</template>
<script>
    // import { Group, XAddress, ChinaAddressV3Data, Toast, Value2nameFilter as value2name } from 'vux'
    import qs from 'qs'
    import VueAMap from 'vue-amap'
    import { Toast } from 'vux'
    export default{
        components: {
            VueAMap,
            Toast
        },
        data() {
            let self = this
            return {
                center: [121.59996, 31.197646],
                lng: 0,
                lat: 0,
                loaded: false,
                user:[],
                phone: '',
                caddr: '',
                result: {},
                plugin: [{
                    pName: 'Geolocation',
                    events: {
                    init(o) {
                        // o 是高德地图定位插件实例
                        o.getCurrentPosition((status, result) => {
                            console.log(status,result)
                            self.result = result.addressComponent
                            if (result && result.position) {
                                console.log(result.formattedAddress)
                            }
                        });
                    }
                    }
                }]
            };
        },
        created() {},
        methods: {
            applyOpen() {
                let reg = /^1[34578]\d{9}$/
                let that =  this
                let data = {
                    'province_region_name': this.result.province,
                    'city_region_name': this.result.city,
                    'district_region_name': this.result.district,
                    'community_region_name': this.caddr,
                    'phone': this.phone
                }
                if(this.caddr == ''){
                    that.$vux.toast.text('请填写小区名字', 'middle', 100);
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
                
                this.http(that.configs.apiTop + "/stage/apply-opening", "post",  data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        setTimeout(() =>{
                            that.$router.push({path:'/send'});
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

.mt80{
    margin-top:px2rem(80)
}
.mt40{
    margin-top:px2rem(40)
}
.league-banner{
    background: url(/static/assets/images/dredge_banner.png) no-repeat !important;
    background-size:cover !important;
}
</style>