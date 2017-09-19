<template>
    <div class="record">
        点击录音
    </div>
</template>


<script>
import $ from 'jquery'
export default {
    data(){
        return {

        }
    },
    created(){
        this.$weChat()
    },
    components:{

    },
    mounted:function(){
        let that = this
        let START,END
        let voice = {
            localId:''
        }
        //假设全局变量已经在外部定义
        //按下开始录音
        $('.record').on('touchstart', function(event){
            event.preventDefault();
            START = new Date().getTime();
            recordTimer = setTimeout(function(){
                that.wx.startRecord({
                    success: function(){
                        localStorage.rainAllowRecord = 'true';
                    },
                    cancel: function () {
                        alert('用户拒绝授权录音');
                    }
                });
            },300);
        });
        //松手结束录音
        $('.record').on('touchend', function(event){
            event.preventDefault();
            END = new Date().getTime();
            
            if((END - START) < 300){
                END = 0;
                START = 0;
                //小于300ms，不录音
                clearTimeout(recordTimer);
            }else{
                that.wx.stopRecord({
                    success: function (res) {
                        voice.localId = res.localId;
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
        margin:0 auto
    }
</style>


