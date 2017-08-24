<template>
    <div class="detail" id="detail">
        <div class="detail_box">
            <img src="/static/assets/images/banner.png" />
            <div class="content">
                <p>我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝</p>
            </div>
        </div>
        <div class="footer_btn">
            <button>立即体验</button>
        </div>  
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
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
            text-indent:2em;
        }
    }

    .footer_btn{
        display:flex;
        height:px2rem(90);
        line-height:px2rem(90);
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