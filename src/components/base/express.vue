<template>
    <div id="express">
        <div id="header" class="por express_head">
            <ul>
                <li class="courier_message">
                    <div class="photo">
                        <img :src="result.service.service_avatar == 'undefined' ? '/static/assets/images/head_def.png' : result.service.service_avatar" /> 
                        <div class="grade">
                            <grade class="icon_express_1"></grade>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="statistics">
            <ul>
                <li>
                    <P class="number">{{ result.today_receive_order_number == undefined ? '0' : result.today_receive_order_number }}</p> 
                    <p>今日接单(个)</p>
                </li>
                <li>
                    <P class="number">{{ result.today_finish_order_number == undefined ? '0' : result.today_finish_order_number }}</p> 
                    <p>今日已完成(个)</p>
                </li>
                <li>
                    <p class="number">{{ result.today_result == undefined ? '0' : result.today_result }}</p> 
                    <p>今日赚取(元)</p>
                </li>
            </ul>
        </div>
        <div class="hg20"></div>
        <div class="entrance_list">
            <ul>
                <li>
                    <router-link :to="{name:'serviceOrder'}">
                        <img src="/static/assets/images/btn_me_-indent.png" />
                        <p>我的订单</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Inquire'}">
                        <img src="/static/assets/images/btn_cha.png" />
                        <p>查询快递</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'statistics'}">
                        <img src="/static/assets/images/btn_me_statistics.png" />
                        <p>我的统计</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Person',query:{type:'service'}}"> 
                        <img src="/static/assets/images/btn_me.png" />
                        <p>我的资料</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="hg20"></div>
        <div class="order_list">
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
                        <div class="time">
                            <p>2017-08-06 14:59:52</p>
                        </div>
                    </router-link>
                </li>
                <li class="put">
                    <router-link :to="{name:'Detail',query:{type:'free'}}">
                        <i class="icon_put"></i>
                        <div class="odd">
                            <p class="order_number">订单号：
                                <span>30945683409590345</span>
                            </p>
                            <p class="express_number">快递单号：
                                <span>30945683409590345</span>
                            </p>
                        </div>
                        <div class="time">
                            <p>2017-08-06 14:59:52</p>
                        </div>
                    </router-link>

                </li>
            </ul>
        </div>

        <LayerPw v-if="layerPwhide"></LayerPw>
        <LayerPw v-if="layerPwhide" v-bind:Info="result" v-on:listenEvent="getInfo"></LayerPw>
    </div>
</template>

<script>
import Grade from '../../components/grade'
import LayerPw from '../base/public/layer_pw'
export default {
    components: {
        Grade,
        LayerPw
    },
    methods: {
        messageBox() {

        }
    },
    computed: {

    },
    data() {
        return {
            layerPwhide:true,
            data: {}, 
            result: {} 
        }
    },
    created() {
        let that = this
        let data = this.$route.query.password
    },
    methods: { 
        getInfo(result) { 
            let that = this 
            this.http(that.configs.apiTop + "/page/service-home", "get",  '', function(res) { 
                // console.log(res) 
                let msg = res.data 
                if (msg.code == 0) { 
                    // console.log(msg) 
                    that.result = msg.data; 
                } 
            }) 
        } 
    } 
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/px2rem.scss';
@import '../../../static/assets/css/home.scss';

.amap-demo {
    height: 300px;
}

#header {
    &.express_head {
        padding: 0;
        ul {
            height: px2rem(260);
            background: url('/static/assets/images/my_background.png') no-repeat center;
        }
        li {
            padding-top: 0;
            .photo {
                margin-top: px2rem(60);
                width: px2rem(120);
                height: px2rem(120);
                background-color: rgba(255, 255, 255, 1);
                img {
                    width: px2rem(112);
                    height: px2rem(112);
                    margin-top: px2rem(4);
                }
            }
        }
    }
}

.statistics{
    height: px2rem(130);
    background-color:#fff; 
    ul{
        display:flex;
        padding:px2rem(20) px2rem(10);
    }
    li{
        flex:1;
        text-align: center;
        border-right:1px solid #f0f2f5;
        height:px2rem(90);
        &:last-child{
            border-right:0;
        }
        p{
            font-size:px2rem(28);
            color: #333;
            &.number{
                font-size: px2rem(30);
                color:#fd2073;
                margin-bottom:px2rem(16);
            }
        }
    }
}

.entrance_list{
    background-color:#fff; 
}

.order_list {
    padding: 0 px2rem(30);
    h3 {
        font-size: px2rem(30);
        color: #333;
        margin: px2rem(60) 0 px2rem(20);
        &::before {
            content: "";
            width: px2rem(6);
            height: px2rem(30);
            background-color: #356930;
            margin-right: px2rem(10);
            display: inline-block;
            vertical-align: middle;
        }
    }

    ul {}
    li {
        display: flex;
        min-height: px2rem(204);
        background-color: #fff;
        margin-bottom: px2rem(30);
        padding: px2rem(20) px2rem(20) px2rem(10);
        border-radius: px2rem(10);
        box-shadow: 0px px2rem(4) px2rem(16) rgba(164, 164, 164, .17);
        a{
            width:100%;
        }
        i {
            width: px2rem(52);
            height: px2rem(52);
            display: inline-block;
            margin-right: px2rem(20);
            flex: 1;
            vertical-align: top;
            &.icon_send {
                background: url('/static/assets/images/icon_ji.png') no-repeat center;
                background-size: px2rem(52);
            }
            &.icon_put {
                background: url('/static/assets/images/icon_shou.png') no-repeat center;
                background-size: px2rem(52);
            }
        }
        .odd {
            flex: 1;
            display: inline-block;
            .order_number {
                font-size: px2rem(28);
                color: #999;
                margin-top: px2rem(10);
            }
            .site {
                display: flex;
                margin-top: px2rem(30);
                h4 {
                    font-size: px2rem(34);
                    color: #333;
                }
                p {
                    font-size: px2rem(28);
                    color: #999;
                    margin-top: px2rem(20);
                }
                .starting {
                    flex: 1;
                    width: px2rem(262);
                }
                .receipt {
                    flex: 1;
                    width: px2rem(262);
                    text-align: right;
                }
                .center {
                    flex: 1;
                    width: px2rme(320);
                    height: 1px;
                    background-color: #e1e1e1;
                    margin-top: px2rem(20);
                }
            }
        }
        .express_number {
            font-size: px2rem(28);
            color: #999;
            margin-top: px2rem(20)
        }
        .time{
            font-size: px2rem(28);
            color: #999;
            height: px2rem(80);
            line-height: px2rem(80);
            border-top:1px solid #e5e5e5;
            padding-left:px2rem(72);
            margin-top:px2rem(40);
            p{
                
            }
        }
    }
}
</style>
