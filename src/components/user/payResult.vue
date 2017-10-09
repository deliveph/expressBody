<template>
    <div class="wrapper">
        <div class="result-wrapper">
            <div class="result-status" v-if="pay">
                <i class="status-suc"></i>
                <p>充值成功</p>
            </div>
            <div class="result-status" v-else>
                <i class="status-fail"></i>
                <p>充值失败</p>
            </div>
        </div>
    </div>

</template>
<script>
    export default{
        data() {
            return {
                pay:true
            }
        },
        created(){
            let status = this.$route.query.status
            if(status == 'success'){
                this.pay = true
            }else{
                this.pay = false
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';
    .result-wrapper{
        padding-top:px2rem(260);
        i{
            display:block;width:px2rem(140);height:px2rem(140);background-size:cover !important;margin:0 auto;
            &.status-suc{
                background: url('/static/assets/images/icon_success.png') no-repeat;
            }
            &.status-fail{
                background: url('/static/assets/images/failure.png') no-repeat;
            }
        }
        p{
            text-align:center;font-size:px2rem(34);color:#333;margin-top:px2rem(30);
        }
    }

</style>
