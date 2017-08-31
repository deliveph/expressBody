<template> 
    <div id="address"> 
        <div class="address_box"> 
            <div class="name address_input"> 
                <label for="">收件人</label> 
                <input type="text" name="name" placeholder="请输入姓名" value=""> 
            </div> 
            <div class="phone address_input"> 
                <label for="">手机号</label> 
                <input type="tel" name="phone" placeholder="请输入收货人手机号码" value=""> 
            </div> 
            <div class="region address_input"> 
                <label for="">所在地区</label> 
                <input type="text" name="region" placeholder="请点击选择送货区域" value=""> 
            </div> 
            <div class="detailed_address  address_input"> 
                <label for="">详细地址</label> 
                <input type="text" name="address" placeholder="请输入街道、小区等" value=""> 
            </div> 
            <div class="default address_input"> 
                <input type="checkbox"> 
                <span>设为默认地址</span> 
            </div> 
        </div> 
        <div class="btn"> 
            <button type="button" @click="addressFun">保存</button> 
        </div> 
    </div> 
</template> 
<script> 
export default { 
   data(){ 
      return{ 
 
      }  
   }, 
   methods:{ 
       addressFun(){ 
           this.$router.push({path: '/address'}) 
       } 
   } 
} 
</script> 
 
<style lang="scss" scoped> 
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