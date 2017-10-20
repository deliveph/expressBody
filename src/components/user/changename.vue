<template>
    <div class="wrapper">
        <div class="change-name">
            <div class="change-name-input">
                <input type="text" placeholder="请输入姓名(不超过10个字)" v-model="name" minlength="2" maxlength="10">
            </div>
            <div class="change-name-save">
                <button class="commit-btn" @click="save">保存</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vux'
import qs from 'qs'
export default {
    data() {
        return {
            name: ''
        }
    },
    components: {
        Toast,
        qs
    },
    methods: {
        save() {
            let that = this
            let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
            let namelen = parseInt(that.name.length)
            console.log(namelen)
            if (that.name == '') {
                this.$vux.toast.text('请输入姓名', 'middle', 100);
                return false;
            }
            if (!(reg.test(that.name))) {
                this.$vux.toast.text('请输入正确格式（数字、字母、中文）', 'middle', 100);
                return false;
            }else if( namelen < 2  || namelen > 11){
                this.$vux.toast.text('限制2-10字', 'middle', 100);
                return false;
            }
            if (this.$route.query.type == 'service') {
                let data = qs.stringify({
                    'service_nickname': that.name
                })

                this.http(that.configs.apiTop + "/service/update-profile-nickname", "post", data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        setTimeout(() => {
                            that.$router.push({ path: '/person', query: { type: 'service' } });
                        }, 1000)
                    } else if (msg.code == 40004) {
                        localStorage.clear("token")
                        that.wx.closeWindow()
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            } else {
                let data = qs.stringify({
                    'user_nickname': that.name
                })
                this.http(that.configs.apiTop + "/user/update-profile-nickname", "post", data, function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        setTimeout(() => {
                            that.$router.push({ path: '/person', query: { type: 'user' } });
                        }, 1000)
                    } else if (msg.code == 40004) {
                        localStorage.clear("token")
                        that.wx.closeWindow()
                        // location.href = that.configs.accreditUrl
                    }
                })
            }

        }
    },
    created() {
        this.$weChat()
    }
}
</script>
<style lang="scss">
@import '../../../static/assets/css/px2rem.scss';
.change-name {
    margin-top: px2rem(20)
}

.change-name-input {
    padding: px2rem(20) 4%;
    background: #fff;
    input {
        width: 100%;
        background: #fff;
        height: px2rem(48);
        border: 0;
        font-size: px2rem(30);
        color: #333;
    }
}

.change-name-save {
    padding: 0 4%;
    margin-top: px2rem(480);
    .commit-btn {
        width: 100%;
        height: px2rem(88);
        line-height: px2rem(88);
        font-size: px2rem(30);
        color: #fff;
        background-color: #366931;
        border-radius: px2rem(10);
    }
}
</style>