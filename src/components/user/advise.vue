<template>
    <div class="wrapper">
        <!--
        <ul class="advise">
            <li v-for="(item,i) in items" :key="i" v-bind:class="{'on': i === active}" @click="addClass(i)"><span>{{ item.name }}</span></li>
        </ul>
        <div class="menu">
            <component :is="tab" transition="fade" transition-mode="out-in"></component>

            <div class="advise-info">
                <div class="advise-info-box">
                    <div class="advise-item">
                        <p>请选择你要反馈的意见类型(必填)</p>
                        <ul class="choice">
                            <li>产品功能</li>
                            <li>页面展示</li>
                            <li>系统使用</li>
                            <li>新版建议</li><li>新版建议</li>
                        </ul>
                        <input type="hidden" value="">
                    </div>
                    <div class="advise-item">
                        <p>请选择你要反馈的意见类型(必填)</p>
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
                    <button disabled>提交</button>
                </div>
            </div>
        </div>
        -->

        <mt-navbar class="page-part" v-model="selected">  
            <mt-tab-item id="1">我要投诉</mt-tab-item>  
            <mt-tab-item id="2">我要建议</mt-tab-item>  
        </mt-navbar>  
  
        <!-- tabcontainer -->  
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">  
                <div class="advise-info">
                    <div class="advise-info-box">
                        <div class="advise-item">
                            <p>请选择你要反馈的意见类型(必填)</p>
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
                        <button disabled>提交</button>
                    </div>
                </div>
            </mt-tab-container-item>  
            <mt-tab-container-item id="2">  
                <div class="advise-info">
                    <div class="advise-info-box">
                        <div class="advise-item">
                            <p>请选择你要反馈的意见类型(必填)</p>
                            <ul class="choice">
                                <li>产品功能</li>
                                <li>页面展示</li>
                                <li>系统使用</li>
                                <li>新版建议</li><li>新版建议</li>
                            </ul>
                            <input type="hidden" value="">
                        </div>
                        <div class="advise-item">
                            <p>您的建议(必填)</p>
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
            </mt-tab-container-item>  
        </mt-tab-container> 
    </div>
</template>

<script>
    import complain from './issue/complain'
    import suggest from './issue/suggest'

 
    export default{
        data() {
            return {
                items: [
                    { name: '我要投诉' },
                    { name: '我要建议' }
                ],
                active: 0,
                tab: 0,
                selected: '1'
            }
        },
        components: {
            'tab0': complain,
            'tab1': suggest
        },
        methods: {
            addClass(index) {
                this.active = index,
                this.tab = 'tab'+index
            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
    @import '../../../static/assets/css/px2rem.scss';

    .mint-navbar .mint-tab-item.is-selected{
        color: #366931;
    }
    .mint-navbar .mint-tab-item .mint-tab-item-label{
        font-size: px2rem(28) !important;
        display: inline-block;
        padding-bottom:px2rem(20);
    }
    .mint-navbar .mint-tab-item.is-selected{
        border-bottom:0;
    }
    .mint-navbar .mint-tab-item{
        padding:px2rem(20) 0 0 0;
    }
    .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
        border-bottom: 2px solid #366931;
    }
</style>
