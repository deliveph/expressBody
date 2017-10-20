<template>
    <div class="wrapper">
        <div class="cen-list">
            <div class="cen-item">
                <ul class="some-item" v-if="isSettingUserPayPassword">
                    <li>
                        <router-link to="/oldPassword">
                            <span><i class="icon6"></i>修改支付密码</span>
                            <em><i class="arrow-right"></i></em>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/findpaypwd">
                            <span><i class="icon7"></i>找回支付密码</span>
                            <em><i class="arrow-right"></i></em>
                        </router-link>
                    </li>
                </ul>
                <ul class="some-item" v-else>
                    <li>
                        <router-link to="/setpaypw">
                            <span><i class="icon6"></i>设置支付密码</span>
                            <em><i class="arrow-right"></i></em>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isSettingUserPayPassword: false,
        }
    },
    created() {
        let that = this
        this.http(that.configs.apiTop + "/page/pay-password-setting", "get", '', function(res) {
            let msg = res.data
            if (msg.code == 0) {
                let data = msg.data
                that.isSettingUserPayPassword = data.is_setting_user_pay_password
            } else {
                that.$vux.toast.text(msg.message, 'middle', 100);
            }
        })
    }
}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>