<template>
    <div id="level" class="level_warp">
        <div class="level_title">
            <div class="grade">
                <!-- :src="user_level_logo" -->
                <grade class="gradeMax_img" :src="user_level_logo"></grade>
            </div>
            <div class="exp_difference">
                <p>我的经验值
                    <span>{{existing}}</span>,离升级还差：
                    <span>{{difference}}</span>
                </p>
            </div>
            <div class="article_experience">
                <span class="exp_min">lv<em>{{exp_min}}</em></span>
                <p class="exp_item">
                    <span v-bind:style="{width:exp_item+'%'}"></span>
                </p>
                <span class="exp_max">lv<em>{{exp_max}}</em></span>
            </div>
        </div>
        <div class="level_explain">
            <h3>会员等级说明</h3>
            <div class="level_content">
                <p v-html="htmlContent"></p>
            </div>
        </div>
    </div>
</template>

<script>
    import Grade from '../../components/grade'
    export default {
        data() {
            return {
                existing: 0,
                difference: 0,
                exp_min: 0,
                exp_max: 1,
                exp_item: 0,
                htmlContent: '',
                user_level_logo: '/static/assets/images/user_level/icon_1_shaowei.png',
            }
        },
        components: {
            Grade
        },
        created() {
            let that = this
            if (that.$route.query.user_level !== undefined) {
                that.exp_min = that.$route.query.user_level
            }
            if (that.$route.query.next_user_level !== undefined) {
                that.exp_max = that.$route.query.next_user_level
            }
            if (that.$route.query.current_user_exp !== undefined) {
                that.existing = that.$route.query.current_user_exp
            }
            if (that.$route.query.next_user_level_exp !== undefined) {
                that.difference = Math.max(0, that.$route.query.next_user_level_exp - that.existing)
            }
            if (that.$route.query.user_level_logo !== undefined) {
                that.user_level_logo = that.$route.query.user_level_logo
            }
            that.exp_item = Math.min(100, (that.existing / that.$route.query.next_user_level_exp) * 100)
            that.http(that.configs.apiTop + "/page/html-content?type=user_level", "get", "", function(res) {
                let msg = res.data;
                if (msg.code == 0) {
                    that.htmlContent = msg.data.html_content
                } else {
                    that.$vux.toast.text(msg.message, "middle", 100)
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';
    .level_warp {
        .level_title {
            height: px2rem(560);
            margin-top: px2rem(20);
            background: url('/static/assets/images/class_bg.png') #fff no-repeat center;
            background-size: cover;
            text-align: center;
            .grade {
                padding-top: px2rem(140);
            }
            .exp_difference {
                font-size: px2rem(30);
                color: #333;
                margin-top: px2rem(56);
            }
            .article_experience {
                margin: px2rem(50) px2rem(60) 0;
                display: flex;
                span {
                    font-size: px2rem(24);
                    color: #333;
                    &.exp_min {
                        flex: 1;
                        margin-right: px2rem(20);
                    }
                    &.exp_max {
                        flex: 1;
                        margin-left: px2rem(20);
                    }
                }
                p {
                    width: px2rem(510);
                    height: px2rem(24);
                    line-height: px2rem(24);
                    border: 1px solid #ffd600;
                    border-radius: px2rem(10);
                    span {
                        height: px2rem(20);
                        background-color: #ffd600;
                        display: block;
                        border-radius: px2rem(10);
                        margin-top: px2rem(2);
                        margin-left: px2rem(2);
                    }
                }
            }
        }
        .level_explain {
            margin-top: px2rem(20);
            padding-left: px2rem(30);
            background-color: #fff;
            padding-bottom: px2rem(80);
            h3 {
                font-size: px2rem(30);
                color: #333;
                height: px2rem(84);
                line-height: px2rem(84);
                border-bottom: 1px solid #eaeaea;
                font-weight: initial;
                &:before {
                    content: '';
                    display: inline-block;
                    width: px2rem(6);
                    height: px2rem(34);
                    background-color: #366931;
                    margin-right: px2rem(20);
                    vertical-align: middle;
                }
            }
            .level_content {
                font-size: px2rem(26);
                color: #999;
                min-height: px2rem(478);
                line-height: px2rem(48);
                margin-right: px2rem(30);
                padding-top: px2rem(26);
            }
        }
    }
</style>
