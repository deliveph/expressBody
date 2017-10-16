<template>
    <div id="statistics" class="statistics_warp">
        <div class="title por">
            <router-link to="{name:'detail'}" class="poa">使用帮助</router-link>
            <ul>
                <li class="ordersTotal">
                    <i class="icon_ordersTotal"></i>
                    <p class="sum">{{ result.finish_order_number }}</p>
                    <p>完成订单总数(个)</p>
                </li>
                <li class="pushMoney_sum">
                    <i class="icon_pushMoney"></i>
                    <p class="sum">￥{{ result.finish_order_total_service_percentage }}</p>
                    <p>提成总额(元)</p>
                </li>
            </ul>
        </div>
        <div class="statistics_time">
            <label for="">时间</label>
            <div class="start">
                <datetime v-model="value1" @on-change="change"></datetime>
            </div>
            <span class="strip"></span>
            <div class="end">
                <datetime v-model="value2" @on-change="change"></datetime>
            </div>
            <button type="button" class="btn active" @click="getStatistics">确定</button>
        </div>
        <div class="statistics_list">
            <ul v-if="result.express_orders.length != 0"> 
                <li v-for="item in result.express_orders"> 
                    <div class="row">
                        <p class="order_number">订单号：{{ item.express_order_number }}</p> 
                        <p class="time">{{ item.express_order_create_time }}</p> 
                    </div>
                    <div class="number">
                        {{ item.express_order_service_percentage > 0 ? '+':'' }}<span>{{ item.express_order_service_percentage }}</span> 
                    </div>
                </li>
            </ul>
            <div class="no-balance" v-if="result.express_orders.length == 0"> 
                <img src="/static/assets/images/no_record.png" alt=""> 
                <p>暂无统计</p> 
            </div> 
        </div>
    </div>
</template>

<script>
import { Datetime } from 'vux'
export default {
  components: {
    Datetime,
  },
  data () {
    return {
      value1: '2017-08-31',
      value2: '2017-08-31',
      result: {}
    }
  },
  methods: {
    change (value) {
      console.log('change', value)
    },
    getStatistics() { 
        let that = this 
         
        this.http(that.configs.apiTop + "/page/service-order-total?start_time="+this.value1+'&end_time='+this.value2, "get", '', function (res) { 
            let msg = res.data 
            if(msg.code == 0){ 
                // console.log(msg); 
                that.result = msg.data 
            }else if(msg.code == 40004){ 
                that.$vux.toast.text(msg.message, 'middle', 100); 
            }else{ 
                that.$vux.toast.text(msg.message, 'middle', 100); 
            } 
        }) 
    } 
  },
  created() { 
      let date = new Date(); 
      let mon = date.getMonth() + 1; 
      let day = date.getDate() 
      if(mon >= 0 && mon <= 9 ){ 
          mon = '0' + mon 
      } 
      if(day >= 0 && day <= 9){ 
          day = '0' + day 
      } 
      let Today = date.getFullYear() + '-' + mon + '-' + day; 
 
    //   this.value1 = Today; 
    //   this.value2 = Today; 
 
    //   console.log(Today); 
      this.getStatistics(); 
  } 
  
}
</script>

<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';

    .statistics_warp{
        .title{
            background: url('/static/assets/images/my_background.png') no-repeat center;
            background-size: cover;
            padding:px2rem(44) 0 px2rem(80);
            a{
                top:px2rem(20);
                right:px2rem(34);
            }
            ul{
                display: flex;
            }
            li{
                flex:1;
                text-align: center;
                i{
                    width: px2rem(100);
                    height:px2rem(100);
                    margin-bottom: px2rem(30);
                    display:inline-block;
                    &.icon_ordersTotal{
                        background: url('/static/assets/images/icon_indent_number.png') no-repeat center;
                        background-size:px2rem(100);
                    }
                    &.icon_pushMoney{
                        background: url('/static/assets/images/icon_ticheng.png') no-repeat center;
                        background-size:px2rem(100);
                        
                    }
                }
                p{
                    font-size:px2rem(24);
                    color:#fff;
                    margin-bottom:px2rem(30);
                    &.sum{
                        font-size:px2rem(72);
                        color:#fff;
                    }
                }
            }
        }

        .statistics_time{
            margin-top:px2rem(20);
            background-color:#fff;
            padding:px2rem(28) px2rem(30);
            display: flex;
            align-items:center;
            label{
                font-size:px2rem(30);
                color:#333;
                margin-right: px2rem(20);
            }
            .start{
                font-size:px2rem(28);
                color:#cacaca;
                width: px2rem(216);
                height:px2rem(60);
                line-height: px2rem(60);
                background-color:#f2f2f2; 
                text-align: center;
                border-radius:px2rem(10);
                .vux-datetime{
                    color:#cacaca;
                }
            }
            .strip{
                width: px2rem(16);
                height: px2rem(2);
                margin:0 px2rem(7);
                vertical-align: middle;
                background-color:#a6a6a6;
            }
            .end{
                font-size:px2rem(28);
                color:#cacaca;
                width: px2rem(216);
                height:px2rem(60);
                line-height: px2rem(60);
                background-color:#f2f2f2; 
                text-align: center;
                border-radius:px2rem(10);
                .vux-datetime{
                    color:#cacaca;
                }
            }
            .btn{
                font-size:px2rem(30);
                color:#fff;
                width: px2rem(116);
                height:px2rem(54);
                border-radius: px2rem(10);
                background-color:rgba(54,105,49,0.4);
                margin-left:px2rem(30);
                &.active{
                    background-color:rgba(54,105,49,1);
                } 
            }
        }

        .statistics_list{
            ul{
                margin-top:px2rem(20);
                background-color:#fff;
                padding-left:px2rem(30);
            }
            li{
                border-bottom: 1px solid #e3e5e9;
                padding:px2rem(30) px2rem(30) px2rem(30) px2rem(20);
                display: flex;
                align-items:center;
                .row{
                    flex:1;
                    p{
                        font-size:px2rem(30);
                        color:#333;
                        &.order_number{
                            margin-bottom:px2rem(28); 
                        }
                        &.time{
                            font-size:px2rem(24);
                            color:#999;
                        }
                    }
                }
                .number{
                    font-size:px2rem(40);
                    color:#fd2073;
                }
            }
        }
    }
    .no-balance { 
        margin-top: px2rem(120); 
        img { 
            width: px2rem(250); 
            height: px2rem(250); 
            margin: 0 auto; 
            display: block; 
        } 
        p { 
            font-size: px2rem(30); 
            color: #666; 
            text-align: center; // margin-top:px2rem(40); 
        } 
    } 
</style>
<style>
    .weui-cell_access .weui-cell__ft:after{
        content:initial;
    }
</style>
