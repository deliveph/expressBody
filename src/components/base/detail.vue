<template>
    <div class="detail" id="detail">
        <div class="detail_box">
            <img src="/static/assets/images/banner.png" />
            <div class="content">
                <p>我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝我是共享快递宝宝</p>
            </div>
        </div>
        <div class="footer_btn">
            <div v-if="status == 'ad'">
                <button>立即体验</button>
            </div>
            <div v-else-if="status == 'free'">
                <button @click="rechargeBtn">充值</button>
                <button @click="share = !share">分享</button>
            </div>
        </div>
        <shareshade v-show="share" @click.native="share = !share"></shareshade>
    </div>
</template>

<script>
    import Shareshade from './public/shareShade'
    export default {
        data(){
            return{
                share: false,
                status: 'free', 
                data : {} 
            }
        },
        components:{
           Shareshade
        },
        methods: {
            rechargeBtn(){
                this.$router.push({path: '/recharge'})
            }
        },
        created(){
            let that = this 
            let types = this.$route.query.type;
            this.status = types;
            if(types == 'user'){ 
                let readmeId = this.$route.query.id; 
                // console.log(readmeId) 
                this.http(that.configs.apiTop + "/page/readme-detail/"+readmeId, "get",  '', function(res) { 
                    let msg = res.data 
                    if (msg.code == 0) { 
                        that.data = msg.data; 
                        document.title = msg.data.readme_title 
                    } 
                }) 
            }
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
        div{
            display: flex;
            width: 100%;
            height: 0.45rem;
        }
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