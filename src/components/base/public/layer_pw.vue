<template>
    <!--密码弹出层  -->
    <div class="layer_warp layer_pw">
        <div class="layer_table">
            <div class="layer_table_cell">
                <div class="layer_box">
                    <div class="layer_title">
                        <p>请输入您的密码</p>
                    </div>
                    <div class="layer_container">
                        <div class="password_register register_box">
                            <div class="password_number">
                                <input type="password" name="password" value="" v-model="password" />
                            </div>
                        </div>
                    </div>
                    <div class="layer_footer">
                        <div class="layer_footer_cancel">
                            <button @click="cancel">取消</button>
                        </div>
                        <div class="layer_footer_confirm">
                            <button @click="pwConfirm">确定</button>
                        </div>
                    </div>
                </div>
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
            password: ''
        }
    },
    created() {
        this.$weChat()
    },
    components: {
        Toast
    },
    methods: {
        pwConfirm() {
            let that = this;
            if (that.password == '') {
                this.$vux.toast.text('请输入密码', 'middle', 100);
                return false;
            }
            let data = qs.stringify({
                'password': that.password
            })
            this.http(that.configs.apiTop + "/service/verify-password", "post", data, function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    that.$parent.layerPwhide = false
                    that.$vux.toast.text(msg.message, 'middle', 100); 
                    that.$emit('listenEvent',"is_verification=1")
                } else if (msg.code == 40004) {
                    location.href = that.configs.accreditUrl
                } else{
                    that.$vux.toast.text(msg.message, 'middle', 100);1
                }
            })
        },
        cancel() {
            let that = this;
            that.$parent.layerPwhide = false
            localStorage.clear("token")
            that.wx.closeWindow()
        }

    }
}
</script>

<style lang="scss" scoped>
@import '../../../../static/assets/css/px2rem.scss';
.layer_warp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    .layer_table {
        width: 100%;
        height: 100%;
        display: table;
        text-align: center;
    }
    .layer_table_cell {
        display: table-cell;
        vertical-align: middle;
    }
    .layer_box {
        width: px2rem(600); // height: px2rem(460);
        background-color: #fff;
        display: inline-block;
        border-radius: px2rem(10);
    }
    .layer_title {
        font-size: px2rem(30);
        color: #fff;
        height: px2rem(88);
        line-height: px2rem(88);
        background-color: #366931;
        border-top-left-radius: px2rem(10);
        border-top-right-radius: px2rem(10);
    }
    .layer_container {}
    .layer_footer {
        height: px2rem(90);
        border-top: 1px solid #e0e0e0;
        display: flex;
        line-height: px2rem(90);
    }
    .layer_footer_cancel,
    .layer_footer_confirm,
    .layer_footer_cancel button,
    .layer_footer_confirm button {
        flex: 1;
        border-right: 1px solid #e0e0e0;
        text-align: center;
        font-size: px2rem(34);
        color: #007aff;
    }
    .layer_footer_confirm,
    .layer_footer_cancel button,
    .layer_footer_confirm button {
        border-right: 0
    }
}

.register_box {
    padding: px2rem(40) px2rem(66) px2rem(76);
    input {
        font-size: px2rem(24);
        color: #cacaca;
        width: 100%;
        height: px2rem(50);
        line-height: px2rem(50);
        padding: px2rem(10);
        border: 1px solid #dddddd;
        border-radius: px2rem(10);
    }
    button {
        width: px2rem(142);
        height: px2rem(70);
        font-size: px2rem(24);
        color: #fff;
        line-height: px2rem(70);
        border-radius: px2rem(10);
        margin-left: px2rem(20);
        border: 0;
        background-color: #afc3ad;
        &.action {
            background-color: #366931;
        }
    }
    .phone_number {
        display: flex;
        margin-bottom: px2rem(30);
        input {
            flex: 0;
            width: px2rem(270);
        }
        button {}
    }
}
</style>