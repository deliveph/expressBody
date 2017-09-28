<template>
    <div class="wrapper">
        <div class="edit-wrapper mt20 content">
            <div class="edit-item">
                <x-address :title="title1" v-model="value1" raw-value :list="addressData" value-text-align="left" v-bind:class="{ 'edit-address':true}"  :value="getName(value1)" @on-shadow-change="onShadowChange"></x-address>
            </div>
            <div class="edit-item">
                <div class="edit-des col-2">小区名称</div>
                <div class="edit-addr col-8 t-l">
                    <input type="text" placeholder="请输入小区名" v-model="village_name">
                </div>
            </div>
            <div class="edit-item">
                <div class="edit-des col-2">联系地址</div>
                <div class="edit-addr col-8 t-l">
                    <textarea placeholder="请输入单元、房号等详细内容" v-model="element"></textarea>
                </div>
            </div>
        </div>
        <div class="edit-commit content">
            <button class="commit-btn" @click="save">保存</button>
        </div>
    </div>
</template>
<script>
import { XAddress, ChinaAddressV3Data, Value2nameFilter as value2name } from 'vux'
import qs from 'qs'
export default {
    data() {
        return {
            title1: '省市区',
            value1: ['天津市', '市辖区', '河东区'],
            addressData: ChinaAddressV3Data,
            showAddress: false,
            village_name:'',
            element:'',
            province:'',
            city:'',
            district:''
        }
    },
    components: {
        XAddress,
        ChinaAddressV3Data
    },
    methods: {
        save() {
            let that = this
            let province = that.getName(that.value1)
            if(that.value1 == ''){
                this.$vux.toast.text('请选择省市区', 'middle',100);
                return false;
            }else if(that.village_name == ''){
                this.$vux.toast.text('请输入小区名', 'middle',100);
                return false;
            }else if(that.element == ''){
                this.$vux.toast.text('请输入单元、房号等详细内容', 'middle',100);
                return false;
            }
            let data = qs.stringify({
                'province_region_id':that.province,
                'city_region_id':that.city,
                'district_region_id':that.district,
                'community_region_name':that.village_name,
                'user_detail_address': that.element,
            })
            this.http(that.configs.apiTop + "/user/update-profile-address", "post", data, function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    that.$router.push({ path: '/person',query:{type:'user'} })
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                }
            })
        },
        getName (value) {
            return value2name(value, ChinaAddressV3Data)
        },
        onShadowChange (ids, names) {
            let that = this;
            that.province = ids[0]
            that.city = ids[1]
            that.district = ids[2]
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
    }

}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
.edit-item {
    .edit-address {
        width: 100%;
        display: block;
        .vux-cell-box:before {
            content: " ";
            border: 0;
        }
        .vux-cell-box {}
        .weui-cell {
            display: flex;
        }
        .weui-cell__hd {
            font-size: 0.15rem;
            color: #999;
            vertical-align: middle;
            height: 0.2rem;
            line-height: 0.2rem;
            width: 20%;
        }
        .vux-cell-primary {
            width: 80%;
            vertical-align: middle;
            height: 0.2rem;
            border: 0;
            font-size: 0.14rem;
            color: #333;
        }
    }
}

</style>
