<template>
    <div class="wrapper">
        <div class="ask-wrapper">
            <div class="ask-banner"></div>
            <div class="ask-container">
                <h1>免费寄快递<br />免费代收快递送货上门</h1>
                <div class="invite-friend">
                    <div class="invite-info ">
                        <label for="">账号：</label>
                        <input type="tel" v-model="phone" placeholder="请输入手机号码">
                    </div>
                    <div class="invite-info info-dis">
                        <div class="invite-code">
                            <label for="">验证码：</label>
                            <input type="number" v-model="captcha" placeholder="请输入验证码">
                        </div>
                        <div class="invite-code-btn">
                            <button type="button" @click="getCode" :disabled="!sendMsgDisabled">
                                <span v-show="sendMsgDisabled">获取验证码</span>
                                <span v-show="!sendMsgDisabled" class="count">{{count}} s</span>
                            </button>
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
    import  { Toast } from 'vux'
    import  qs from 'qs'
    const TIME_COUNT = 60
    export default{
        data() {
            return{
                phone: '',
                captcha: '',
                count:0,
                timer: null,
                sendMsgDisabled: true,
                fromUserId: ''
            }
        },
        components:{
            Toast,
            qs
        },
        methods: {
            nextPage() {
                let reg = /^1[34578]\d{9}$/
                let that =  this
                let data = {
                    'phone': this.phone,
                    'captcha': this.captcha
                }
                if(this.phone == ''){
                    that.$vux.toast.text('请填写手机号码', 'middle', 100);
                    return
                }
                if(!(reg.test(this.phone))){
                    that.$vux.toast.text('请填写正确的手机号码', 'middle', 100);
                    return
                }
                if(this.captcha == ''){
                    that.$vux.toast.text('请填写验证码', 'middle', 100);
                    return
                }
                this.http(that.configs.apiTop + "/captcha/accept-invite-sms-captcha", "post",  data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        setTimeout(() =>{
                            that.$router.push({path:'/invitesuc'});
                        },1000)
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            },
            getCode() {
                let reg = /^1[34578]\d{9}$/
                let that =  this
                let data = {
                    'phone': this.phone
                }
                if(this.phone == ''){
                    that.$vux.toast.text('请填写手机号码', 'middle', 100);
                    return
                }
                if(!(reg.test(this.phone))){
                    that.$vux.toast.text('请填写正确的手机号码', 'middle', 100);
                    return
                }

                this.http(that.configs.apiTop + "/user/accept-invite/:"+ this.fromUserId, "post",  data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        if (!that.timer) {
                            that.count = TIME_COUNT
                            that.sendMsgDisabled = false
                            that.timer = setInterval(() => {
                                if (that.count > 0 && that.count <= TIME_COUNT) {
                                    that.count--;
                                } else {
                                    that.sendMsgDisabled = true
                                    clearInterval(that.timer)
                                    that.timer = null
                                }
                            }, 1000)
                        }
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            }
        },
        created() {
            this.fromUserId = this.$route.query.from_user_id
            // console.log(this.fromUserId)
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style>
    body{
        background-color:#fff;
    }
</style>