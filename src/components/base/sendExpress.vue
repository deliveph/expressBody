<template>
    <div id="sendExpress">
        <div class="receiveSend_add">
            <ul>
                <li class="send pdlf30">
                    <i class="icon_send"></i>
                    <div class="msg">
                        <p>
                            <span class="name">彭老鬼</span>
                            <span class="tel">18681587662</span>
                        </p>
                        <p class="add">广东省深圳市南山区</p>
                        <i class="fr"></i>
                    </div>
                </li>
                 <li class="receive pdlf30">
                    <i class="icon_receive"></i>
                    <div class="msg">
                        <p>
                            <span class="name">彭老鬼</span>
                            <span class="tel">18681587662</span>
                        </p>
                        <p class="add">广东省深圳市南山区</p>
                        <i class="fr"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="express_company pdlf30">
            <label for="">快递公司</label>
            
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        
    },
    created(){
        // //接口入住权限验证配置
        // this.SDKRegister.config({ 
        //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     appId: wx0f1687d213ede012, // 必填，公众号的唯一标识 
        //    timestamp: 1503655542,
        //     nonceStr: '0I70NBJvjsoSvzzq',
        //     signature: 'b2d698ba455426571922267f49700001ecddf789',
        //     jsApiList: [
        //         'onMenuShareTimeline',
        //         'onMenuShareAppMessage'
        //     ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        // });
    }
}
</script>

<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';

    .express_company{   
    }

</style>
