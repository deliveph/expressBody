<template>
    <div id="session">
        <div class="record">
            点击录音
        </div>
        

        <!-- 手指上划，取消发送 -->
        <div class="layer_warp layer_record"  v-if="click_record">
            <div class="layer_table">
                <div class="layer_table_cell">
                    <div class="layer_box">
                        <div class="img">
                            <img src="/static/assets/images/voice/microphone.png" class="microphone"/>
                            <img src="/static/assets/images/voice/speak4.png" class="volume"/>
                        </div>
                        <p>手指上划，取消发送</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 松开手指，取消发送 -->
        <div class="layer_warp layer_record" v-if="loosen_record">
            <div class="layer_table">
                <div class="layer_table_cell">
                    <div class="layer_box">
                        <div class="img">
                            <img src="/static/assets/images/voice/abolish.png" class="arrows"/>
                        </div>
                        <p>松开手指，取消发送</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import $ from 'jquery'
import { Toast } from  'vux'
export default {
    data(){
        return {
            click_record:false,
            loosen_record:false
        }
    },
    created(){
    },
    components:{
        Toast
    },
    mounted:function(){
        let that = this
        let START,END
        let voice = {
            localId:''
        }
        let recordTimer
        //假设全局变量已经在外部定义
        //按下开始录音
        $('.record').on('touchstart', function(event){
            event.preventDefault();
            START = new Date().getTime();
            that.click_record = true
            recordTimer = setTimeout(function(){
                that.wx.startRecord({
                    success: function(){
                        localStorage.rainAllowRecord = 'true';
                    },
                    cancel: function () {
                        that.$vux.toast.text('用户拒绝授权录音', 'middle', 100);
                    }
                });
            },300);
        });
        $('.record').on('touchmove', function(event){
            that.click_record = false
            that.loosen_record = true
        })
        //松手结束录音
        $('.record').on('touchend', function(event){
            event.preventDefault();
            END = new Date().getTime();
            that.loosen_record = false
            if((END - START) < 300){
                END = 0;
                START = 0;
                //小于300ms，不录音
                that.$vux.toast.text('少于300ms', 'middle', 100);
                clearTimeout(recordTimer);
            }else{
                that.wx.stopRecord({
                    success: function (res) {
                        voice.localId = res.localId;
                        that.wx.playVoice({
                            localId: res.localId // 需要播放的音频的本地ID，由stopRecord接口获得
                        });
                        uploadVoice();
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            }
        });

        //上传录音
        function uploadVoice(){
            //调用微信的上传录音接口把本地录音先上传到微信的服务器
            //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
            that.wx.uploadVoice({
                localId: voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    alert(res)
                    //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
                    // $.ajax({
                    //     url: '后端处理上传录音的接口',
                    //     type: 'post',
                    //     data: JSON.stringify(res),
                    //     dataType: "json",
                    //     success: function (data) {
                    //         alert('文件已经保存到七牛的服务器');//这回，我使用七牛存储
                    //     },
                    //     error: function (xhr, errorType, error) {
                    //         console.log(error);
                    //     }
                    // });
                }
            });
        }

        //注册微信播放录音结束事件【一定要放在wx.ready函数内】
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';
    .record{
        width: 90%;
        height:px2rem(80);
        line-height:px2rem(80);
        border:1px solid red;
        font-size:px2rem(28);
        color:#666;
        text-align: center;
        margin:0 auto;
        position: relative;
        z-index:100;
    }
    .layer_warp{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        .layer_table{
            width: 100%;
            height: 100%;
            display: table;
            text-align: center;
        }
        .layer_table_cell{
            display: table-cell;
            vertical-align: middle;
        }
        .layer_box{
            width:px2rem(262);
            height: px2rem(192);
            background-color:rgba(0,0,0,0.3);
            display: inline-block;
            border-radius:px2rem(10);
            padding:px2rem(34);
            .img{
                display: flex;
                justify-content: center;/*水平居中*/
                .microphone{
                    width: px2rem(90);
                    height:px2rem(130);
                    margin-right: px2rem(10);
                }
                .volume{
                    width: px2rem(110);
                    height:px2rem(110);
                    margin-top:px2rem(20)
                }
                .arrows{
                    width: px2rem(108);
                    height:px2rem(130);
                }
            }
            p{
                font-size:px2rem(24);
                color:#fff;
                margin-top:px2rem(40)
            }
        }
    }
</style>


