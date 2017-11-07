<template>
    <div class="wrapper">
        <div class="order-wrapper">
            <div class="order-time">
                <i class="atonce" v-if="items.collection_order_type_id == 1"></i>
                <i class="subscribe" v-else></i>
                <p>下单时间：
                    <span class="ft-red">{{items.collection_order_create_time}}</span>
                </p>
            </div>
            <div class="order-box">
                <div class="order-list-item">
                    <p>订单编号：
                        <span>{{items.collection_order_number}}</span>
                    </p>
                    <p class="nickname" v-if="status == 'service'" @click="layerSendFun">
                        <img :src="user.user_avatar" />
                        <span>{{user.user_nickname}}</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>订单状态：
                        <span class="ft-red" v-if="items.collection_order_status_id == -1">已取消</span>
                        <span class="ft-red" v-else-if="items.collection_order_status_id == 1">待接单</span>
                        <span class="ft-red" v-else-if="items.collection_order_status_id == 2">已接单</span>
                        <span class="ft-red" v-else-if="items.collection_order_status_id == 3">已确认收货</span>
                        <span class="ft-red" v-else-if="items.collection_order_status_id == 4">待支付</span>
                        <span class="ft-red" v-else-if="items.collection_order_status_id == 5">待评价</span>
                        <span class="ft-red" v-else-if="items.collection_order_status_id == 6">已完成</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>快递单号：
                        <router-link class="ft-blue" :to="{path:'/result',query:{code:items.logistics_code}}" tag="span">{{items.logistics_code}}</router-link>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>快递员电话：
                        <span>{{items.courier_phone}}</span>
                    </p>
                </div>
            </div>
            <div class="order-box">
                <div class="order-list-item">
                    <p>收货人：
                        <span>{{items.consignee_name}}</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>手机号码：
                        <span>{{items.consignee_phone}}</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>详细地址：
                        <span>{{items.consignee_address}}</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>送件时间：
                        <span>{{items.delivery_start_time.substring(5, 16)}} — {{items.delivery_end_time.substring(5, 16)}}</span>
                    </p>
                </div>
                <div class="order-list-item" v-if="items.collection_order_type_id == 2">
                    <p>预约收件时间：
                        <span>{{items.estimate_collection_start_time.substring(5, 16)}} — {{items.estimate_collection_end_time.substring(5, 16)}}</span>
                    </p>
                </div>
                <div class="order-list-item">
                    <p>代收物流费：
                        <span class="ft-red">￥{{items.collection_logistics_fee}}</span>
                    </p>
                </div>
                <!--待支付-->
                <div class="order-list-item" v-if="items.collection_order_status_id == 4 && status == 'user'">
                    <p>应付金额：
                        <span class="ft-red">{{items.order_fee}}快递豆</span>
                    </p>
                </div>
                <div class="order-list-item" v-if="items.collection_order_status_id >= 5">
                    <p>实付金额：
                        <span class="ft-red">{{items.accrued_fee}}快递豆</span>
                    </p>
                </div>
                <!--已完成-->
                <div class="order-list-item" v-if="items.collection_order_status_id >= 6 && status == 'user'">
                    <p>评价结果：
                        <ul class="start-icon" v-if="items.service_score >= 5">
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                        </ul>
                        <ul class="start-icon" v-else-if="items.service_score >= 4">
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li></li>
                        </ul>
                        <ul class="start-icon" v-else-if="items.service_score >= 3">
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class=""></li>
                            <li></li>
                        </ul>
                        <ul class="start-icon" v-else-if="items.service_score >= 2">
                            <li class="sel"></li>
                            <li class="sel"></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li></li>
                        </ul>
                        <ul class="start-icon" v-else-if="items.service_score >= 1">
                            <li class="sel"></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li></li>
                        </ul>
                        <ul class="start-icon" v-else-if="items.service_score >= 0">
                            <li class=""></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li></li>
                        </ul>
                    </p>
                </div>
            </div>
            <div class="order-group">
                <!-- 用户操作按纽 -->
                <button class="disable-btn" v-if="items.collection_order_status_id == 1 && status == 'user' || items.collection_order_status_id == 2 && status == 'user'" @click="cancel(items.collection_order_number,'collection')">取消</button>
                <button v-if="items.collection_order_status_id == 1 && status == 'service' || items.collection_order_status_id == 2 && status == 'service'" @click="editerorder(items.collection_order_number)">编辑</button>
                <button v-else-if="items.collection_order_status_id == 3 && status == 'user'" @click="clickModifyTime(items.collection_order_number)">修改送件时间</button>
                <button v-else-if="items.collection_order_status_id == 4 && status == 'user'" @click="pay(items.collection_order_number)">去支付</button>
                <button v-else-if="items.collection_order_status_id == 5 && status == 'user'" @click="evaluate(items.collection_order_number)">去评价</button>
                <button v-else-if="items.collection_order_status_id == 6 && status == 'user'" @click="editerorder()">继续下单</button>

                <!-- 客服操作按纽 -->
                <button v-if="items.collection_order_status_id == 1 && status == 'service'" @click="receiveOrder(items.collection_order_number)">接单</button>
                <button v-else-if="items.collection_order_status_id == 2 && status == 'service'" @click="affirmShip(items.collection_order_number)">确认收货</button>
                <button v-else-if="items.collection_order_status_id == 3 && status == 'service'" @click="affirmDelivery(items.collection_order_number)">确认送达</button>
            </div>

        </div>


        <!-- 修改送件时间 -->
        <div class="layer_warp layer_modifyTime" v-if="layermodifyTime">
            <div class="layer_table">
                <div class="layer_table_cell">
                    <div class="layer_box">
                        <div class="layer_title">
                            <p>修改送件时间</p>
                        </div>
                        <div class="layer_container">
                            <div class="phone_register register_box">
                                <div class="phone_number">
                                    <popup-picker :title="title1" :data="list1" :columns="1" v-model="value1" :display-format="format" :placeholder="placeholder1" @on-change="onChangePickUpTime"></popup-picker>
                                </div>
                            </div>
                        </div>
                        <div class="layer_footer">
                            <div class="layer_footer_cancel">
                                <router-link tag="li" to="/"></router-link>
                                <button @click="modifyTimeCancel">取消</button>
                            </div>
                            <div class="layer_footer_confirm">
                                <button @click="modifyTimeConfirm">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 用户信息 -->
        <div class="layer_warp layer_user_message" v-if="layerSend" @click="layerSendFun1">
            <div class="layer_table">
                <div class="layer_table_cell">
                    <div class="layer_box" @click.stop="">
                        <div class="layer_container">
                            <div class="message_main">
                                <div class="img">
                                    <img v-bind:src="user.user_avatar" />
                                </div>
                                <p class="name">{{user.user_name}}</p>
                                <p>
                                    <span>电话：</span>{{user.user_phone}}</p>
                                <p>
                                    <span>地址：</span>{{user.user_full_address}}</p>
                            </div>
                        </div>
                        <div class="layer_footer">
                            <div class="layer_footer_cancel">
                                <button @click="sendMessage">发送信息</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LayerPw v-if="layerPwhide" v-on:listenEvent="getOrder"></LayerPw>
    </div>
</template>
<script>
import { Toast } from 'vux'
import LayerPw from '../base/public/layer_pw'
import { Confirm, PopupPicker } from 'vux'
import qs from 'qs'
export default {
  data () {
    return {
      layerPwhide: false,
      collection_order_number: '',
      items: {},
      user: {},
      service_time: {},
      status: '',
      layerSend: false,
      layermodifyTime: false,
            //
      title1: '',
      value1: ['一小时内'],
      placeholder1: '',
      list1: [
      ],
      format: function (value, name) {
        if (name) {
          return `${name}`
        } else {
          return `${value}`
        }
      },
      begin: '00:00',
      end: '00:00',
      timequantum: '-'
    }
  },
  created () {
    this.getOrder()
  },
  components: {
    Toast,
    Confirm,
    PopupPicker,
    LayerPw
  },
  methods: {
        // 计算时间段
        // 时间格式化
    formatDateTime: function (e, t) {
      var r = function (e) {
          return e += '', e.replace(/^(\d)$/, '0$1')
        },
        n = {
          yyyy: e.getFullYear(),
          yy: e.getFullYear().toString().substring(2),
          M: e.getMonth() + 1,
          MM: r(e.getMonth() + 1),
          d: r(e.getDate()),
          dd: r(e.getDate()),
          hh: r(e.getHours()),
          mm: r(e.getMinutes()),
          ss: r(e.getSeconds()),
          SSS: r(e.getMilliseconds())
        }
      return t || (t = 'yyyy-MM-dd hh:mm:ss'), t.replace(/([a-z])(\1)*/gi, function (e) {
        return n[e]
      })
    },
    formattedTimeInit () {
      let that = this
      that.arr = [{
        name: '今天',
        value: '1',
        parent: 0
      }, {
        name: '明天',
        value: '2',
        parent: 0
      }, {
        name: '后天',
        value: '3',
        parent: 0
      }, {
        name: '一小时内',
        value: '-',
        parent: '1'
      }]
      let newDate = that.formatDateTime(new Date(), 'yyyy/MM/dd')
      let startDate = newDate + ' ' + that.begin + ':00'
      let endDate = newDate + ' ' + that.end + ':00'
      let startDateTimestamp = new Date(startDate).getTime()
      let endDateTimestamp = new Date(endDate).getTime()
      let step = 60 * 60 * 1000
      let currentTimestamp = new Date().getTime()
            // 今天
      for (let timestamp = startDateTimestamp; timestamp <= endDateTimestamp; timestamp += step) {
        if (timestamp >= currentTimestamp) {
          let tmp1 = that.formatDateTime(new Date(timestamp), 'yyyy/MM/dd hh:mm:ss')
          let tmp2 = that.formatDateTime(new Date(Math.min(timestamp + step, endDateTimestamp)), 'yyyy/MM/dd hh:mm:ss')
          that.arr.push({
            name: tmp1.split(' ')[1].substring(0, 5) + '~' + tmp2.split(' ')[1].substring(0, 5),
            value: tmp1 + '~' + tmp2,
            parent: '1'
          })
        }
      }
      let step1 = 24 * 60 * 60 * 1000
            // 明天
      endDateTimestamp = endDateTimestamp + step1
      for (let timestamp = startDateTimestamp + step1; timestamp <= endDateTimestamp; timestamp += step) {
        let tmp1 = that.formatDateTime(new Date(timestamp), 'yyyy/MM/dd hh:mm:ss')
        let tmp2 = that.formatDateTime(new Date(Math.min(timestamp + step, endDateTimestamp)), 'yyyy/MM/dd hh:mm:ss')
        that.arr.push({
          name: tmp1.split(' ')[1].substring(0, 5) + '~' + tmp2.split(' ')[1].substring(0, 5),
          value: tmp1 + '~' + tmp2,
          parent: '2'
        })
      }
            // 后天
      endDateTimestamp = endDateTimestamp + step1
      for (let timestamp = startDateTimestamp + 2 * step1; timestamp <= endDateTimestamp; timestamp += step) {
        let tmp1 = that.formatDateTime(new Date(timestamp), 'yyyy/MM/dd hh:mm:ss')
        let tmp2 = that.formatDateTime(new Date(Math.min(timestamp + step, endDateTimestamp)), 'yyyy/MM/dd hh:mm:ss')
        that.arr.push({
          name: tmp1.split(' ')[1].substring(0, 5) + '~' + tmp2.split(' ')[1].substring(0, 5),
          value: tmp1 + '~' + tmp2,
          parent: '3'
        })
      }
      that.list1 = that.arr
    },
    getOrder (result) {
      let that = this
      that.collection_order_number = that.$route.query.collection_order_number
      that.status = that.$route.query.status
      that.http(that.configs.apiTop + '/page/collection-order-detail/' + that.collection_order_number, 'get', '', function (res) {
        let msg = res.data
        if (msg.code == 0) {
          let data = msg.data
          that.items = data.collection_order
          that.user = data.user
          that.service_time = data.service_time
          that.begin = that.service_time.start_time
          that.end = that.service_time.end_time
          that.formattedTimeInit()
        } else if (msg.code === 40016) {
          that.layerPwhide = true
                    // location.href = that.configs.accreditUrl
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
        // 用户编辑订单
    editerorder (orderNumber) {
      let that = this
      let collectionOrderTypeId = that.items.collection_order_type_id
      let index = ''
      if (collectionOrderTypeId === 1) {
        index = 0
      } else if (collectionOrderTypeId === 2) {
        index = 1
      }
      if (orderNumber !== '') {
        this.$router.push({ name: 'updateCollectionOrder', query: { collection_order_number: orderNumber, index: index } })
      } else {
        this.$router.push({ name: 'Collection' })
      }
    },
        // 用户取消订单
    cancel (collection_order_number, type) {
      let that = this
      this.$vux.confirm.show({
        title: '取消订单',
        content: '确定要取消此订单???',
                // 组件除show外的属性
        onCancel () {

        },
        onConfirm () {
          if (collection_order_number, type) {
            that.http(that.configs.apiTop + '/order/cancel-collection-order/' + collection_order_number, 'post', '', function (res) {
              let msg = res.data
              if (msg.code == 0) {
                that.$router.push({path: '/ordercancel', query: {status: type}})
              } else {
                that.$vux.toast.text(msg.message, 'middle', 100)
              }
            })
          }
        }
      })
    },
    // 修改送件时间
    modifyTimeConfirm () {
      let that = this
      if (that.realLogisticFee == '') {
        that.realLogisticFee = 0
      }
      let take_start_time = ''
      let take_end_time = ''
      if (that.timequantum == '-') { // 一小时内
        take_start_time = that.formatDateTime(new Date(), 'yyyy/MM/dd hh:mm:00')
        take_end_time = that.formatDateTime(new Date(new Date().getTime() + 60 * 60 * 1000), 'yyyy/MM/dd hh:mm:00')
      } else {
        let arr = that.timequantum.split('~')
        take_start_time = arr[0]
        take_end_time = arr[1]
      }
      let data = qs.stringify({
        'delivery_start_time': take_start_time,
        'delivery_end_time': take_end_time
      })
      this.http(that.configs.apiTop + '/collection-order/update-take-time/' + that.collection_order_number, 'post', data, function (res) {
        let msg = res.data
        if (msg.code == 0) {
          that.$vux.toast.text(msg.message, 'middle', 100)
          setTimeout(function () {
            that.$router.push({ path: '/order' })
          }, 200)
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
        // 用户支付订单
    pay (collection_order_number) {
      this.$router.push({ path: '/confirm', query: { express_order_number: collection_order_number, express_order_type: 'collection' } })
    },
        // 去评价
    evaluate (collection_order_number) {
      this.$router.push({ path: '/evaluate', query: { ship_order_number: collection_order_number, type: 'collection' } })
    },
        // 客服接受寄件订单
    receiveOrder (collection_order_number) {
      let that = this
      this.http(that.configs.apiTop + '/order/receive-collection-order/' + collection_order_number, 'post', '', function (res) {
        let msg = res.data
        if (msg.code == 0) {
          that.$vux.toast.text(msg.message, 'middle', 100)
          setTimeout(function () {
            that.$router.push({ path: '/serviceOrder' })
          }, 200)
        } else if (msg.code == 40004) {

        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
        // 客服确定收到收件
    affirmShip (collection_order_number) {
      let that = this
      this.http(that.configs.apiTop + '/collection-order/affirm-collection/' + collection_order_number, 'post', '', function (res) {
        let msg = res.data
        if (msg.code == 0) {
          that.$vux.toast.text(msg.message, 'middle', 100)
          setTimeout(function () {
            that.$router.push({ path: '/serviceOrder' })
          }, 200)
        } else if (msg.code == 40004) {

        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
        // 客服确定送达收件
    affirmDelivery (collection_order_number) {
      let that = this
      this.http(that.configs.apiTop + '/collection-order/affirm-delivery/' + collection_order_number, 'post', '', function (res) {
        let msg = res.data
        if (msg.code == 0) {
          that.$vux.toast.text(msg.message, 'middle', 100)
          setTimeout(function () {
            that.$router.push({ path: '/serviceOrder' })
          }, 200)
        } else if (msg.code == 40004) {

        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
    sendMessage () {
      let that = this
      this.$router.push({ path: '/chat/p2p-user_' + that.items.user_id })
    },
    layerSendFun () {
      let that = this
      this.layerSend = true
    },
    layerSendFun1 () {
      let that = this
      this.layerSend = false
    },
    clickModifyTime () {
      let that = this
      that.layermodifyTime = true
    },
    modifyTimeCancel () {
      let that = this
      that.layermodifyTime = false
    },
    onChangePickUpTime (values) {
      this.timequantum = values[1]
    }
  }
}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
@import '../../../static/assets/css/px2rem.scss';
.layer_warp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
    .layer_table {
        width: 100%;
        height: 100%;
        display: table;
        text-align: center;
    }
    .layer_table_cell {
        display: table-cell;
        vertical-align: middle;
    }
    .layer_box {
        width: px2rem(600); // height: px2rem(460);
        background-color: #fff;
        display: inline-block;
        border-radius: px2rem(10);
    }
    .layer_title {
        font-size: px2rem(30);
        color: #fff;
        height: px2rem(88);
        line-height: px2rem(88);
        background-color: #366931;
        border-top-left-radius: px2rem(10);
        border-top-right-radius: px2rem(10);
    }
    .layer_container {}
    .layer_footer {
        height: px2rem(90);
        border-top: 1px solid #e0e0e0;
        display: flex;
        line-height: px2rem(90);
    }
    .layer_footer_cancel,
    .layer_footer_confirm,
    .layer_footer_cancel button,
    .layer_footer_confirm button {
        flex: 1;
        border-right: 1px solid #e0e0e0;
        text-align: center;
        font-size: px2rem(34);
        color: #007aff;
    }
    .layer_footer_confirm,
    .layer_footer_cancel button,
    .layer_footer_confirm button {
        border-right: 0
    }
}

.layer_warp {
    &.layer_user_message {
        .message_main {
            padding: px2rem(40) px2rem(66) px2rem(76);
            text-align: center;
            .img {
                width: px2rem(124);
                height: px2rem(124);
                border-radius: 50%;
                background-color: rgba(58, 105, 49, 0.34);
                margin: 0 auto;
                img {
                    width: px2rem(114);
                    height: px2rem(114);
                    border-radius: 50%;
                    vertical-align: top;
                    margin-top:px2rem(5)
                }
            }
            p {
                font-size: px2rem(28);
                color: #999;
                margin-bottom: px2rem(18);
                &.name {
                    font-size: px2rem(30);
                    color: #333;
                    margin: px2rem(20) 0;
                }
            }
        }
        .layer_footer_cancel {
            border: 0;
        }
        .layer_footer {
            button {
                width: 100%;
                height: 100%;
                font-size: px2rem(24);
                color: #fff; // line-height: px2rem(70);
                border-bottom-right-radius: 0.05rem;
                border-bottom-left-radius: 0.05rem;
                border: 0;
                background-color: #366931;
            }
        }
    }
}


.layer_modifyTime{
    .register_box{
        padding: px2rem(40) px2rem(66) px2rem(76);
        text-align: center;
        .phone_number{
            height:px2rem(80);
            line-height:px2rem(80);
        }
        .vux-cell-box:before{
            border:0;
        }
        .weui-cell{
            border:1px solid #d8dce2;
            border-radius: px2rem(10);
        }
        .vux-popup-picker-select{
            padding:px2rem(5) px2rem(5);
            text-align: left !important;
        }
    }
}
</style>