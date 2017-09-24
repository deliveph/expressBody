<template>
    <div class="wrapper">
        <div class="modules" v-if="type == 1">
            <div class="result-module" v-if="status == 0">
                <div class="result-module-img">
                    <img src="/static/assets/images/succeed.png" alt="">
                </div>
                <h6 class="pay-status">支付失败</h6>
                <p></p>
                <div class="go-eval">
                    <button class="commit-btn">重新支付</button>
                </div>
            </div>
            <div class="result-module" v-if="status == 1">
                <div class="result-module-img">
                    <img src="/static/assets/images/succeed.png" alt="">
                </div>
                <h6 class="pay-status">支付成功</h6>
                <p>快去给快递宝宝给个好评吧！</p>
                <div class="go-eval">
                    <router-link to="/evaluate" class="commit-btn dis t-c">去评价</router-link>
                </div>
            </div>
        </div>
        <div class="modules" v-else>
            <div class="result-module">
                <div class="result-module-img">
                    <img src="/static/assets/images/succeed.png" alt="">
                </div>
                <p>感谢您的评价，我们会再接再励！</p>
                <div class="go-eval" @click="confirmShare">
                    <button class="commit-btn">分享</button>
                </div>
            </div>
        </div>

        <shareshade v-show="share" @click.native="share = !share"></shareshade>
    </div>
</template>
<script>
    import Shareshade from '../base/public/shareShade'
    export default{
        data() {
            return{
                type: 2,
                status: 0,
                share: false
            }
        },
        components:{
           Shareshade
        },
        methods:{
            confirmShare(){
                this.share = true
            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>