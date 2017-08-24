<template>
    <div class="collection">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">即时收件</mt-tab-item>
            <mt-tab-item id="2">预约收件</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="forthwith_box">
                    <h3 class="title">快递信息</h3>
                    <div class="ex_msg">
                        <div class="ex_odd ex_li">
                            <label for="">快递单号：</label>
                            <input type="text" name="odd" placeholder="请输入快递单号" value="">
                        </div>
                        <div class="ex_phone ex_li">
                            <label for="">快递员电话：</label>
                            <input type="number" name="phone" placeholder="请输入快递员手机号码(选填)">
                        </div>
                    </div>
                    <h3 class="title">收件人信息</h3>
                    <div class="addressee_msg">
                        <div class="addressee_name addressee_li">
                            <label for="">收件人：</label>
                            <input type="text" name="odd" placeholder="请输入收件人姓名" value="">
                        </div>
                        <div class="addressee_phone addressee_li">
                            <label for="">手机号码：</label>
                            <input type="number" name="phone" placeholder="请输入手机号码" value="">
                        </div>
                        <div class="addressee_add addressee_li">
                            <label for="">详细地址：</label>
                            <input type="text" name="add" placeholder="请输入收货详细地址" value="">
                        </div>
                        <div class="logisticFee addressee_li">
                            <label for="">代收物流费：</label>
                            <input type="text" name="add" placeholder="请输入收货详细地址" value="">
                        </div>
                        <div class="default">
                            <input type="checkbox">
                            <span>默认快递宝宝</span>
                        </div>
                    </div>
                    <div class="expect_time">
                        <label for="">期望上门时间</label>
                        <select name="" id="">
                            <option value="">一小时内</option>
                        </select>
                        <i></i>
                    </div>
                    <div class="readAgreement">
                        <input type="checkbox">
                        <span>我已阅读并同意</span>
                        <router-link :to="{name:'Detail',query:{type:'agreement'}}">《快递宝宝协议》</router-link>
                    </div>
                    <div class="submit">
                        <p>服务时间：<span>08:00-21:00</span></p>
                        <div class="btn">
                            <button @click="submitBtn">确定</button>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import { Navbar, TabItem } from 'mint-ui';
export default {
    data() {
        return{
            selected:'1'
        }
    },
    components: {
        Navbar,
        TabItem
    },
    methods:{
        submitBtn(){
            this.$router.push({path: '/Detail'})
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';

    .mint-navbar{
        .mint-tab-item{
            padding:px2rem(20) 0 0 0;
            &.is-selected{
                color: #366931;
                border-bottom:0;
                .mint-tab-item-label{
                    border-bottom: 2px solid #366931;
                }
            }
            .mint-tab-item-label{
                font-size: px2rem(28) !important;
                display: inline-block;
                padding-bottom:px2rem(20);
            }
        }
    }
</style>
