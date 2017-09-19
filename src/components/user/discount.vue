<template>
    <div class="wrapper">
        <div class="coupon-list">
            <ul>
                <li v-for="(item,i) in items" :key="i">
                    <div class="coupon-l">
                        <router-link href="javascript:;" @click.native="getTicket(item.coupon_id)" to="">
                            <i class="arrow-left"></i>
                            <span>点击领取</span>
                        </router-link>
                    </div>
                    <div class="coupon-r">
                        <div class="coupon-info">
                            <h6><span>{{item.coupon_amount}}</span>{{item.coupon_category_name}}</h6>
                            <p>使用期限：{{item.coupon_send_time_f}}-{{item.coupon_expire_time_f}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'vux'
    import qs from 'qs'
    export default{
        data(){
            return{
                items:[]
            }
        },
        methods:{
            getTicket(id){
                let that = this
                let data = qs.stringify({
                    'coupon_id':id
                })
                console.log(data)
                this.http(that.configs.apiTop + "/coupon/get-coupon", "post", data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        that.$router.push({path: '/coupon'});
                    } else if (msg.code == 40004) {
                        // location.href = that.configs.accreditUrl
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            }
        },
        created(){
            let that = this
            this.http(that.configs.apiTop + "/coupon/coupons", "get", '', function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    let data = msg.data
                    that.items = data.coupons
                    console.log(that.items)
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>