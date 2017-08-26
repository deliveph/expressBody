<template>
    <div id="inquire">
        <div class="inquire_warp">
            <div class="banner">
                <img src="/static/assets/images/inquire_bg.png" />
            </div>
            <div class="inquire_main">
                <div class="import">
                    <input type="text" name="odd" value="" placeholder="请输入您要查询的快递单号" ref="odd"/>
                    <div class="richscan" @click="richscan">
                        <i></i>
                    </div>
                </div>
                <div class="btn">
                    <button @click="see">查询</button>
                </div>
            </div>
            <div class="order_list">
                <h3>最近订单</h3>
                <ul>
                    <li class="send">
                        <router-link :to="{name:'Detail',query:{type:'free'}}">
                            <i class="icon_send"></i>
                            <div class="odd">
                                <p class="order_number">订单号：
                                    <span>4332502938508025</span>
                                </p>
                                <div class="site">
                                    <div class="starting">
                                        <h4>深圳</h4>
                                        <p>战锤</p>
                                    </div>
                                    <div class="center">

                                    </div>
                                    <div class="receipt">
                                        <h4>新疆</h4>
                                        <p>战犯</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <li class="put">
                        <router-link :to="{name:'Detail',query:{type:'free'}}">
                            <i class="icon_put"></i>
                            <div class="odd">
                                <p class="order_number">订单号：<span>30945683409590345</span></p>
                                <p class="express_number">快递单号：<span>30945683409590345</span></p>
                            </div>
                        </router-link>
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            odd:null    
        }
    },
    methods:{
        see(){
            let odd = this.$refs.odd.value;
            if(odd == ''){
                Toast('请输入快递单号');
                return false;
            }
            this.$router.push({path: '/result'})
        },
        richscan(){
            Toast('暂未开发');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/home.scss';
</style>
