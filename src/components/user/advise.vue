<template>
    <div class="wrapper">
         <tab :line-width=2 v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in list2" :key="index" @on-item-click="onItemClick(index)"><span>{{item}}</span></tab-item>
        </tab>
        <div class="advise-wrapper" v-model="index" ref="advise">
            <div class="advise-info" v-if=" index == 0 ">
                <div class="advise-info-box">
                    <div class="advise-item">
                        <p>请选择你要反馈的意见类型(必填)</p>
                        <ul class="choice">
                            <li v-for="(item,k) in items" :key="k" @click="opinion_type(item.user_feedback_category_id)" :class="{active: id == item.user_feedback_category_id}" v-model="id">{{item.user_feedback_category_name}}</li>
                        </ul>
                        <input type="hidden" value="">
                    </div>
                    <div class="advise-item">
                        <p>你的反馈(必填)</p>
                        <div class="matter">
                            <x-textarea :max="200" v-model="text" placeholder="请输入产品功能/系统意见，感谢您的反馈我们将不断优化体验" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
                            <!-- <textarea placeholder="请输入产品功能/系统意见，感谢您的反馈我们将不断优化体验"></textarea>
                            <div class="num"><span>0</span><em>/</em><span>30</span></div> -->
                        </div>
                    </div>
                    <div class="advise-item mt46">
                        <div class="save-box">
                            <div class="upload">
                                <input type="file" name="file" value="" @change="onFileChange">
                                <span></span>
                            </div>
                            <ul>
                                <li v-for="(im, i) in imgs" :key="i">
                                    <img :src="im" alt="">
                                    <i @click="deleteImg(im)"></i>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="commit">
                    <button class="commit-btn" @click="submitUserFeedback">提交</button>
                </div>
            </div>
            <div class="advise-info" v-else>
                <div class="advise-info-box">
                    <div class="advise-item">
                        <p>请选择你要反馈的意见类型(必填)</p>
                        <ul class="choice">
                            <li v-for="(item,k) in items" :key="k" @click="opinion_type(item.user_feedback_category_id)" :class="{active: id == item.user_feedback_category_id}" v-model="id">{{item.user_feedback_category_name}}</li>
                        </ul>
                        <input type="hidden" value="">
                    </div>
                    <div class="advise-item">
                        <p>你的反馈(必填)</p>
                        <div class="matter">
                            <x-textarea :max="200" v-model="text" placeholder="请输入产品功能/系统意见，感谢您的反馈我们将不断优化体验" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
                        </div>
                    </div>
                    <div class="advise-item mt46">
                        <div class="save-box">
                            <div class="upload">
                                <input type="file" name="file" value="" @change="onFileChange">
                                <span></span>
                            </div>
                            <ul>
                                <li v-for="(im, i) in imgs" :key="i">
                                    <img :src="im" alt="">
                                    <i @click="deleteImg(im)"></i>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="commit">
                    <button class="commit-btn" @click="submitUserFeedback">提交</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Tab, TabItem, XTextarea } from 'vux'
    import qs from 'qs'
    const list = () => ['我要投诉', '我要建议']
    export default {
        components: {
            Tab,
            TabItem,
            XTextarea
        },
        data () {
            return {
                list2: list(),
                index: 0,
                items:[],
                id:'',
                text:'',
                img:'',
                imgs:[],
                getBarWidth: function (index) {
                }
            }
        },
        methods: {
            onItemClick(index) {
                let that = this
                that.id = ''
                that.text = ''
                that.imgs = []
                that.categories()
            },
            opinion_type(id){
                this.id = id
            },
            onEvent (event) {
            },
            onFileChange(e) {
                let that = this
                if(that.imgs.length >= 3){
                    that.$vux.toast.text('最多上传三张', 'middle', 100);
                    return
                }
                var files = e.target.files || e.dataTransfer.files
                if (!files.length)
                    return;
                var formData = new FormData()
                formData.append('file', e.target.files[0])
                formData.append('type', 'test')
                this.http(that.configs.apiUpload + "/upload", "post", formData, function (res) {
                    let msg = res.data
                    if(msg.code == 0){
                        that.img = msg.data.uri
                        that.imgs.push(that.img)
                    }else if(msg.code == 40004){
                        // location.href = that.configs.accreditUrl
                    }else{
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            },
            submitUserFeedback(){
                let that = this
                let data = qs.stringify({
                    'user_feedback_category_id':that.id,
                    'user_feedback_content':that.text,
                    'user_feedback_images1':that.imgs[0],
                    'user_feedback_images2':that.imgs[1],
                    'user_feedback_images3':that.imgs[2]
                })
                this.http(that.configs.apiTop + "/user/submit-user-feedback", "post", data, function (res) {
                    let msg = res.data
                    if(msg.code == 0){
                        that.$vux.toast.text(msg.message, 'middle', 100);
                        that.id = ''
                        that.text = ''
                        that.imgs = []
                    }else if(msg.code == 40004){
                        // location.href = that.configs.accreditUrl
                    }else{
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            },
            deleteImg(item){
                this.imgs.splice(item,1)
            },
            categories(){
                let that = this
                let user_feedback_module = '';
                if(that.index == 0){
                    user_feedback_module = 'S'
                }else{
                    user_feedback_module = 'C'
                }
                this.http(that.configs.apiTop + "/user/user-feedback-categories?user_feedback_module="+user_feedback_module, "get",  '', function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        that.items = msg.data.user_feedback_categories
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            }
        },
        created(){
            let that = this
            that.categories()
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

    .matter{
        .vux-x-textarea{
            padding:0;
            .weui-cell__bd{
                width:100%;
                textarea{
                    resize: none;
                    height: px2rem(284);
                    background: #f7f7f7;
                    border-radius: px2rem(8);
                    border: 0;
                    padding: px2rem(20);
                    display: block;
                    width: 94%;
                    line-height: px2rem(38);
                    font-size: px2rem(28);
                }
                .weui-textarea-counter{
                    position: absolute;
                    bottom: px2rem(20);
                    right: px2rem(20);
                    font-size: px2rem(24);
                    color: #999;
                }
            }
        }
    }
</style>
