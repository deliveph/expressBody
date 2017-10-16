<template> 
    <div id="address"> 
        <div class="address_box"> 
            <div class="name address_input"> 
                <label for="">{{nameLabel}}</label> 
                <input type="text" name="name" placeholder="请输入姓名" v-bind:value="name" v-model="name"> 
            </div> 
            <div class="phone address_input"> 
                <label for="">手机号</label> 
                <input type="tel" name="phone" placeholder="请输入收货人手机号码" v-bind:value="phone" v-model="phone"> 
            </div> 
            <div class="region address_input">
                <x-address :title="title2" v-model="value2" raw-value :list="addressData" value-text-align="left" placeholder="请点击选择送货区域" @on-shadow-change="onShadowChange"></x-address>
            </div> 
            <div class="detailed_address  address_input"> 
                <label for="">详细地址</label> 
                <input type="text" name="address" placeholder="请输入街道、小区等" v-bind:value="address" v-model="address"> 
            </div> 
            <div class="default address_input"> 
                <input type="checkbox" v-model="checked" checked="checked"> 
                <span>设为默认地址</span> 
            </div> 
        </div> 
        <div class="btn"> 
            <button type="button" @click="addressFun">保存</button> 
        </div> 
    </div> 
</template> 
<script>
import { XAddress,ChinaAddressV3Data, Toast } from 'vux'
import qs from 'qs'
export default { 
   data(){ 
      return{ 
          name:'',
          phone:'',
          address:'',
          checked:false,
          types:'',
          index:'',
          id:'',
          nameLabel:'寄件人',
          title2: '所在地区',
          value2: ['北京市','市辖区','东城区'],
          addressData:ChinaAddressV3Data,
          province:'',
          city:'',
          district:'',
          is_default_shipper_address:''
      }  
   },
   components: {
        ChinaAddressV3Data,
        XAddress,
        Toast
    },
   methods:{ 
       addressFun(){
           let that = this;
           let reg = /^1[0-9]{10}$/
           if(that.checked == false){
                that.is_default_shipper_address = 'N'
            }else{
                that.is_default_shipper_address = 'Y'
            }
            if(that.index == 0){
                if(that.name == ''){
                    that.$vux.toast.text('请输入寄件人名字', 'middle',100);
                    return false;
                }else if(that.phone == ''){
                    that.$vux.toast.text('请输入手机号码', 'middle',100);
                    return false;
                }else if(!(reg.test(that.phone))){
                    that.$vux.toast.text('手机号码输入有误', 'middle',100);
                    return false;
                }else if(that.province == ''){
                    that.$vux.toast.text('请输入所在地区', 'middle',100);
                    return false;
                }else if(that.address == ''){
                    that.$vux.toast.text('请输入详细地址', 'middle',100);
                    return false;
                }
                let data = qs.stringify({
                    'province_region_id':that.province,
                    'city_region_id':that.city,
                    'district_region_id':that.district,
                    'shipper_name':that.name,
                    'shipper_phone':that.phone,
                    'shipper_detail_address':that.address,
                    'is_default_shipper_address':that.is_default_shipper_address,
                })
                if(that.id != ''){
                    this.http(that.configs.apiTop + "/address/edit-shipper-address/"+that.id, "post", data, function (res) {
                            let msg = res.data
                            if(msg.code == 0){
                                console.log(1)
                                that.$router.push({path: '/address/shipper',params:{type:0}}) 
                            }else if(msg.code == 40004){
                                // location.href = that.configs.accreditUrl
                            }
                        })
                }else{
                    this.http(that.configs.apiTop + "/address/add-shipper-address", "post", data, function (res) {
                            let msg = res.data
                            if(msg.code == 0){
                                that.$router.push({path:'/address/shipper',params:{type:0}}) 
                            }else if(msg.code == 40004){
                                // location.href = that.configs.accreditUrl
                            }
                        })
                }
            }else{
                if(that.name == ''){
                    that.$vux.toast.text('请输入收件人名字', 'middle',100);
                    return false;
                }else if(that.phone == ''){
                    that.$vux.toast.text('请输入手机号码', 'middle',100);
                    return false;
                }else if(!(reg.test(that.phone))){
                    that.$vux.toast.text('手机号码输入有误', 'middle',100);
                    return false;
                }else if(that.province == ''){
                    that.$vux.toast.text('请输入所在地区', 'middle',100);
                    return false;
                }else if(that.address == ''){
                    that.$vux.toast.text('请输入详细地址', 'middle',100);
                    return false;
                }
                let data = qs.stringify({
                    'province_region_id':that.province,
                    'city_region_id':that.city,
                    'district_region_id':that.district,
                    'consignee_name':that.name,
                    'consignee_phone':that.phone,
                    'consignee_detail_address':that.address,
                    'is_default_consignee_address':that.is_default_shipper_address,
                })
                if(that.id){
                    this.http(that.configs.apiTop + "/address/edit-consignee-address/"+that.id, "post", data, function (res) {
                            let msg = res.data
                            if(msg.code == 0){
                                that.$router.push({path: '/address/consignee',params:{type:1}}) 
                            }else if(msg.code == 40004){
                                // location.href = that.configs.accreditUrl
                            }
                        })
                }else{
                    this.http(that.configs.apiTop + "/address/add-consignee-address", "post", data, function (res) {
                            let msg = res.data
                            if(msg.code == 0){
                                that.$router.push({path: '/address/consignee',params:{type:1}}) 
                            }else if(msg.code == 40004){
                                // location.href = that.configs.accreditUrl
                            }
                        })
                }
            }
       },
        onShadowChange (ids, names) {
            let that = this;
            that.province = ids[0]
            that.city = ids[1]
            that.district = ids[2 ]
        }   
   },
   created(){
       let that = this
       let id = this.$route.params.attribute;
       if(parseInt(id)== id){
           that.id = id
       }
       
        // index 0 寄件人 1 收件人   
       that.index = this.$route.query.type;
       console.log(that.index,that.id)
       if(that.index == 0){
           that.nameLabel = '寄件人'
           if(that.id != ''){
               console.log(123)
                this.http(that.configs.apiTop + "/address/shipper-address-detail/"+that.id, "get", '', function (res) {
                    let msg = res.data
                    if(msg.code == 0){
                    let data = msg.data
                    console.log(data,"12412")
                    that.name = data.shipper_name
                    that.phone = data.shipper_phone
                    that.value2 = [data.province_region_name,data.city_region_name,data.district_region_name]
                    console.log(that.value2)
                    that.province = data.province_region_name
                    that.city = data.city_region_name
                    that.district = data.district_region_name
                    that.address = data.shipper_detail_address
                    if(data.is_default_shipper_address == 'Y'){
                        that.checked = true
                    }else{
                            that.checked = false
                    }
                    console.log(that.name,that.phone,that.value2,that.checked)
                    }else if(msg.code == 40004){
                        // location.href = that.configs.accreditUrl
                    }
                })
            }
       }else{
           that.nameLabel = '收件人'
           if(that.id != ""){
                this.http(that.configs.apiTop + "/address/consignee-address-detail/"+that.id, "get", '', function (res) {
                    let msg = res.data
                    if(msg.code == 0){
                    let data = msg.data;
                    that.name = data.consignee_name
                    that.phone = data.consignee_phone
                    that.value2 = [data.province_region_name,data.city_region_name,data.district_region_name]
                    that.province = data.province_region_name
                    that.city = data.city_region_name
                    that.district = data.district_region_name
                    that.address = data.consignee_detail_address
                    if(data.is_default_shipper_address == 'Y'){
                        that.checked = true
                    }else{
                        that.checked = false
                    }
                    console.log(that.name,that.phone,that.value2,that.checked)
                    }else if(msg.code == 40004){
                        // location.href = that.configs.accreditUrl
                    }
                })
            }
       }
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
 
<style lang="scss"> 
    @import '../../static/assets/css/px2rem.scss'; 
    .address_box{ 
        background-color: #fff; 
        .address_input{ 
            margin-left:px2rem(30); 
            border-bottom:1px solid #e3e5e9; 
            height: px2rem(100); 
            line-height: px2rem(100); 
            display: flex; 
            font-size:px2rem(28); 
            color:#666; 
            &:last-child{ 
                border-bottom:0; 
            } 
            label{ 
                width: px2rem(140); 
            } 
            input{ 
                padding:px2rem(20) px2rem(20) px2rem(20) 0; 
                font-size:px2rem(28); 
                color:#999; 
                height: px2rem(60); 
                line-height: px2rem(60); 
                border:0; 
                flex: 1; 
            } 
            &.default{ 
                input{ 
                    flex:initial; 
                    width: px2rem(30); 
                    height: px2rem(30); 
                    vertical-align: middle; 
                    margin-top:px2rem(35); 
                    margin-right:px2rem(20); 
                } 
                span{ 
                    font-size: px2rem(28); 
                    color:#333; 
                } 
 
            } 
        }
        .region > div{
            width: 100%;
        }
        .vux-cell-box{
            &:before{
                border-top:0
            }
        }
        .weui-cell{
            display: flex;
            padding:0;
            .weui-cell__hd{
                width: px2rem(140); 
            }
            .vux-cell-primary{
                flex:1;
            }
        }
    } 
    #address{ 
        .btn{ 
            width: 90%; 
            height:px2rem(90); 
            line-height: px2rem(90); 
            margin:0 auto; 
            margin-top:px2rem(80); 
            button{ 
                font-size:px2rem(30); 
                color:#fff; 
                width: 100%; 
                height:px2rem(90); 
                line-height: px2rem(90); 
                border-radius: px2rem(10); 
                background-color:#366931; 
            } 
        } 
    }
</style>