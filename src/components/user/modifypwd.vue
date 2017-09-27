<template>
    <div class="wrapper">
       
        <div class="modify-wrapper">
            <div class="pwd-input">
                <label for="">原密码</label>
                <input type="password" v-model="oldPwd" placeholder="请输入原密码">
            </div>
            <div class="pwd-input">
                <label for="">新密码</label>
                <input type="password" v-model="newPwd" placeholder="请输入6-16" maxlength="16">
            </div>
            <div class="change-name-save">
                <button class="commit-btn" @click="complete">完成</button>
            </div>
            
        </div>
    </div>
</template>

<script>
    import  { Toast } from 'vux'
    import  qs from 'qs'
    export default{
        components:{
            Toast,
            qs
        },
        data() {
            return {
                oldPwd: '',
                newPwd: ''
            }
        },
        methods: {
            complete() {
                let that = this
                let reg = /^[0-9]{6,16}$/
                if(this.oldPwd == ''){
                    that.$vux.toast.text('请填写旧密码', 'middle', 100);
                    return
                }
                if(this.newPwd == ''){
                    that.$vux.toast.text('请填写新密码', 'middle', 100);
                    return
                }

                if(!(reg.test(this.oldPwd))){
                    that.$vux.toast.text('请填写6-16位的旧密码', 'middle', 100);
                    return
                }

                if(!(reg.test(this.newPwd))){
                    that.$vux.toast.text('请填写6-16位的新密码', 'middle', 100);
                    return
                }
                let data = {
                    'old_service_password': this.oldPwd,
                    'new_service_password': this.newPwd
                }

                this.http(that.configs.apiTop + "/service/update-password", "post", data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        setTimeout(() =>{
                            that.$router.push({path:'/person',query: {type: 'service'}});
                        },1000)

                    } else if (msg.code == 40004) {
                        location.href = that.configs.accreditUrl
                    } else{
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })

            }
        }
    }
</script>
<style lang="scss">
    @import '../../../static/assets/css/px2rem.scss';
   
    .modify-wrapper{
        margin-top:px2rem(20);
        .pwd-input{
            padding:px2rem(20) 4%;background:#fff;border-bottom:1px solid #f1f1f1;height:px2rem(48);line-height:px2rem(48);
            label{
                font-size:px2rem(28);color:#666;vertical-align: middle;
            }
            input{
                width:50%;border:0;font-size:px2rem(28);
            }
        }
        .change-name-save{
            padding: 0 4%;
            margin-top:px2rem(340);
            .commit-btn{
                width: 100%;height: px2rem(88);line-height: px2rem(88);
                font-size: px2rem(30);color: #fff;background-color: #366931;
                border-radius: px2rem(10);
            }
        }
    }

</style>