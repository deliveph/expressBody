<template>
    <div class="wrapper">
         <tab :line-width=2 v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in list2" :key="index" @on-item-click="onItemClick(index)"><span>{{item}}</span></tab-item>
        </tab>
        <div class="advise-wrapper" v-model="index" ref="advise">
            <div class="advise-info" v-if=" box == 0 ">
                <div class="advise-info-box">
                    <div class="advise-item">
                        <p>请选择你要反馈的意见类型(必填)11</p>
                        <ul class="choice">
                            <li>产品功能</li>
                            <li>页面展示</li>
                            <li>系统使用</li>
                            <li>新版建议</li><li>新版建议</li>
                        </ul>
                        <input type="hidden" value="">
                    </div>
                    <div class="advise-item">
                        <p>你的反馈(必填)</p>
                        <div class="matter">
                            <textarea placeholder="请输入产品功能/系统意见，感谢您的反馈我们将不断优化体验"></textarea>
                            <div class="num"><span>0</span><em>/</em><span>30</span></div>
                        </div>
                    </div>
                    <div class="advise-item mt46">
                        <div class="save-box">
                            <div class="upload">
                                <input type="file" >
                                <span></span>
                            </div>
                            <ul>
                                <li><img src="http://jindou.oss-cn-shenzhen.aliyuncs.com/goods/201706295954d01af227e.jpg" alt=""></li>
                                <li><img src="http://jindou.oss-cn-shenzhen.aliyuncs.com/goods/201706295954d01af227e.jpg" alt=""></li>
                                <li><img src="http://jindou.oss-cn-shenzhen.aliyuncs.com/goods/201706295954d01af227e.jpg" alt=""></li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="commit">
                    <button class="commit-btn" disabled>提交</button>
                </div>
            </div>
            <div class="advise-info" v-else>
                <div class="advise-info-box">
                    <div class="advise-item">
                        <p>请选择你要反馈的意见类型(必填)112222223</p>
                        <ul class="choice">
                            <li>产品功能</li>
                            <li>页面展示</li>
                            <li>系统使用</li>
                            <li>新版建议</li><li>新版建议</li>
                        </ul>
                        <input type="hidden" value="">
                    </div>
                    <div class="advise-item">
                        <p>你的反馈(必填)</p>
                        <div class="matter">
                            <textarea placeholder="请输入产品功能/系统意见，感谢您的反馈我们将不断优化体验"></textarea>
                            <div class="num"><span>0</span><em>/</em><span>30</span></div>
                        </div>
                    </div>
                    <div class="advise-item mt46">
                        <div class="save-box">
                            <div class="upload">
                                <input type="file" >
                                <span></span>
                            </div>
                            <ul>
                                <li><img src="http://jindou.oss-cn-shenzhen.aliyuncs.com/goods/201706295954d01af227e.jpg" alt=""></li>
                                <li><img src="http://jindou.oss-cn-shenzhen.aliyuncs.com/goods/201706295954d01af227e.jpg" alt=""></li>
                                <li><img src="http://jindou.oss-cn-shenzhen.aliyuncs.com/goods/201706295954d01af227e.jpg" alt=""></li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="commit">
                    <button class="commit-btn" disabled>提交</button>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
    import complain from './issue/complain'
    import suggest from './issue/suggest'

    import { Tab, TabItem } from 'vux'

    const list = () => ['我要投诉', '我要建议']
    export default {
        components: {
            Tab,
            TabItem
        },
        data () {
            return {
                list2: list(),
                index: 0,
                getBarWidth: function (index) {
                    // return (index + 1) * 22 + 'px'
                },
                box: 0,
            }
        },
        methods: {
            onItemClick(index) {
                var that = this
                let els = this.$refs.advise.querySelectorAll('div.advise-info')
                for (let i = 0; i < els.length; i++) {
                    that.box = index
                }
            }   
        }
    }
</script>
<style >
.vux-slider{
    overflow:auto !important;
}
</style>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
    @import '../../../static/assets/css/px2rem.scss';

    .vux-tab .vux-tab-item.vux-tab-selected{
        color: #366931 !important;border-bottom:none !important;
    }
    .vux-tab .vux-tab-item.vux-tab-selected span{
        border-bottom:3px solid  #366931 !important;
        padding-bottom:px2rem(14)
    }
    .vux-tab-ink-bar{
        background-color:none !important
    }
    .vux-tab-item + .vux-tab-ink-bar{
        display:none !important;
    }
    .vux-slider > .vux-swiper{
        min-height: -webkit-fill-available;
    }
    .vux-slider > .vux-swiper{
        overflow: auto !important;
        position: relative;
    }
</style>
