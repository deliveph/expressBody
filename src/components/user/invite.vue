<template>
    <div class="wrapper">
        <div class="ask-wrapper">
            <div class="ask-banner"></div>
            <div class="ask-container">
                <h1>免费寄快递<br />免费代收快递送货上门</h1>
                <div class="invite-friend">
                    <div class="invite-info ">
                        <label for="">账号：</label>
                        <input type="tel" placeholder="请输入手机号码">
                    </div>
                    <div class="invite-info info-dis">
                        <div class="invite-code">
                            <label for="">验证码：</label>
                            <input type="number" placeholder="请输入验证码">
                        </div>
                        <div class="invite-code-btn">
                            <button>获取验证码</button>
                        </div>
                    </div>
                    <div class="next-about">
                        <button class="commit-btn" @click="nextPage">下一步</button>
                    </div>
                </div>
            </div>
            <h6>共享快递，为人民服务</h6>
        </div>
        
    </div>
</template>
<script>
    export default{
        methods: {
            nextPage() {
                this.$router.push({path:'/invitesuc'});
            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style>
    body{
        background-color:#fff;
    }
</style>