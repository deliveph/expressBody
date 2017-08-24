<template>
    <div class="detail" id="detail">
        <div class="detail_box">
            <img src="/static/assets/images/banner.png" />
            <div class="content">
                <p>我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝</p>
            </div>
        </div>
        <div class="footer_btn">
            <button>充值</button>
            <button>分享</button>
        </div>
        <shareshade></shareshade>
    </div>
</template>

<script>
    import Shareshade from './public/shareShade'
    export default {
        data(){
            return{

            }
        },
        components:{
           Shareshade
        }
    }    
</script>

<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';

    .detail{

    }
    .detail_box{
        padding-bottom:px2rem(90);
        img{
            width:100%
        }
        .content{
            margin-top:px2rem(30);
            padding:0 px2rem(30);
        }
        p{
            font-size:px2rem(28);
            color:#333;
            text-align: left;
            text-indent:2em;
            line-height:px2rem(38);
        }
    }

    .footer_btn{
        display:flex;
        width: 100%;
        height:px2rem(90);
        line-height:px2rem(90);
        position: fixed;
        bottom: 0;
        button{
            flex:1;
            font-size:px2rem(34);
            color:#fff;
            background-color: #499142;
            border-right:1px solid #fff;
            &::last-child{
                border-right:0;
            }
        }
    }
</style>