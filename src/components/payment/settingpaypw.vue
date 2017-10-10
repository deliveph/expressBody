<template>
    <div id="settingPassword">
        <div class="oldPassword" v-if="setting">
            <h3>为保障您的账户安全，请设置6位支付密码</h3>
            <div class="pw_input ipt-box-nick">
                <input type="tel" maxlength="6" class="ipt-real-nick" v-model="passwordlen" />
                <div class="ipts-box-nick">
                    <div class="ipt-fake-box">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                    </div>
                </div>
            </div>
            <div class="btn">
                <!-- 输入完6位密码才会高亮 active-->
                <button type="button" :class="className" @click="settingPassword">下一步</button>
            </div>
        </div>
        <!-- 确认支付密码 -->
        <div class="oldPassword" v-if="affirmPW">
            <h3>请确认支付密码</h3>
            <div class="pw_input ipt-box-nick">
                <input type="tel" maxlength="6" class="ipt-real-nick" v-model="affirmpwlen" />
                <div class="ipts-box-nick">
                    <div class="ipt-fake-box">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                    </div>
                </div>
            </div>
            <div class="btn">
                <!-- 输入完6位密码才会高亮 active-->
                <button type="button" :class="className" @click="affirmPassword">完成</button>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { Toast } from 'vux'
import qs from 'qs'
export default {
    data() {
        return {
            passwordlen: '',
            affirmpwlen: '',
            setting: true,
            affirmPW: false,
            className: {
                btn_next: true,
                active: true
            }
        }
    },
    components: {
        Toast
    },
    mounted: function() {
        $(".ipt-real-nick").on("input", function() {
            //console.log($(this).val());
            var $input = $(".ipt-fake-box input");
            console.log($input)
            if (!$(this).val()) {//无值光标顶置
                $('.ipt-active-nick').css('left', $input.eq(0).offset().left - parseInt($('.ipt-box-nick').parent().css('padding-left')) + 'px');
            }
            if (/^[0-9]*$/g.test($(this).val())) {//有值只能是数字
                //console.log($(this).val());
                var pwd = $(this).val().trim();
                for (var i = 0, len = pwd.length; i < len; i++) {
                    $input.eq(i).val(pwd[i]);
                    if ($input.eq(i).next().length) {//模拟光标，先将图片容器定位，控制left值而已
                        $('.ipt-active-nick').css('left', $input.eq(i + 1).offset().left - parseInt($('.ipt-box-nick').parent().css('padding-left')) + 'px');
                    }
                }
                $input.each(function() {//将有值的当前input后的所有input清空
                    var index = $(this).index();
                    if (index >= len) {
                        $(this).val("");
                    }
                });
                if (len == 6) {
                    //执行其他操作
                    console.log('输入完整，执行操作');
                }
            } else {//清除val中的非数字，返回纯number的value
                var arr = $(this).val().match(/\d/g);
                $(this).val($(this).val().slice(0, $(this).val().lastIndexOf(arr[arr.length - 1]) + 1));
                //console.log($(this).val());
            }
        })
    },
    methods: {
        settingPassword() {
            let that = this;
            if (that.passwordlen.length < 6) {
                that.$vux.toast.text('请输入6位支付密码', 'middle', 100);
                return false;
            }
            that.setting = false
            that.affirmPW = true
        },
        affirmPassword() {
            let that = this
            if (that.passwordlen.length < 6) {
                that.$vux.toast.text('请输入6位支付密码', 'middle', 100);
                return false;
            } else if (that.affirmpwlen != that.passwordlen) {
                that.$vux.toast.text('两次支付密码不一致', 'middle', 100);
                return false;
            }
            let data = qs.stringify({
                'password': that.passwordlen,
                'confirm_password': that.affirmpwlen
            })
            this.http(that.configs.apiTop + "/user-pay-password/setting", "post", data, function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                    setTimeout(function() {
                        that.$router.go(-1)
                    }, 200);
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/px2rem.scss';

.oldPassword {
    h3 {
        font-size: px2rem(30);
        color: #333;
        margin: px2rem(50) px2rem(30) px2rem(30);
    }
    .btn {
        width: 90%;
        margin: 0 auto;
        margin-top: px2rem(80);
    }
    .btn_next {
        width: 100%;
        height: px2rem(88);
        line-height: px2rem(88);
        text-align: center;
        font-size: px2rem(30);
        color: #fff;
        border-radius: px2rem(10);
        background-color: #afc3ad;
        &.active {
            background-color: #366931;
        }
    }
}

.ipt-box-nick {
    width: px2rem(690);
    height: px2rem(100);
    line-height: px2rem(100);
    position: relative;
    margin: 0 auto;
    .ipt-real-nick {
        position: absolute;
        top: 0 !important;
        left: 0 !important;
        width: 100%;
        height: px2rem(100);
        line-height: px2rem(100);
        opacity: 0;
        z-index: 3;
        color: transparent;
        text-shadow: 0px 0px 0px #333;
    }
    .ipts-box-nick {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: px2rem(100);
        line-height: px2rem(100);
        overflow: hidden;
        border: 1px solid #d6d9e0;
        border-radius: px2rem(6);

        .ipt-fake-box {
            height: px2rem(100);
            line-height: px2rem(100);
            display: flex;
            justify-content: space-between;
            &:focus {
                color: #F00
            }
        }
        .ipt-fake-box {
            input {
                width: px2rem(114);
                height: px2rem(98);
                border: 0;
                border-right: 1px solid #d6d9e0;
                color: #000;
                font-weight: bold;
                font-size: 18px;
                text-align: center;
                padding: 0;
                border-radius: 2px;
            }
        }
        .ipt-active-nick {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }
        .ipt-active-nick {
            img {
                vertical-align: middle;
            }
        }
    }
}
</style>
