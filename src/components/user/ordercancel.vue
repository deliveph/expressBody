<template>
    <div class="wrapper">
        <div class="modules">
            <div class="result-module">
                <div class="result-module-img">
                    <img src="/static/assets/images/succeed.png" alt="">
                </div>
                <p>订单取消成功</p>
                <div class="go-result-group">
                    <router-link to="/order" class="col-4 icon-order">我的订单</router-link>
                    <router-link to="/send" class="col-4 icon-again" v-if="status == 'ship'">继续下单</router-link>
                    <router-link to="/collection" class="col-4 icon-again" v-else-if="status == 'collection'">继续下单</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            status: ''
        }
    },
    created() {
        let that = this
        that.status = this.$route.query.status
    }
}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>