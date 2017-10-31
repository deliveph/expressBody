<template>
    <div class="collection" v-wechat-title="$route.meta.title">
        <div class="collection_wrap">
            <div class="forthwith_box" v-if="currentType == 0">
                <h3 class="title">快递信息</h3>
                <div class="ex_msg forthwith_msg">
                    <div class="ex_odd ex_li forthwith_li">
                        <label for="">快递单号：</label>
                        <input type="number" name="odd" placeholder="请输入快递单号" v-model="currentLogisticsCode">
                    </div>
                    <div class="ex_phone ex_li forthwith_li">
                        <label for="">快递员电话：</label>
                        <input type="number" name="phone" placeholder="请输入快递员手机号码(选填)" v-model="currentCourierPhone">
                    </div>
                    <div class="logisticFee addressee_li forthwith_li">
                        <label for="">代付运费（元）：</label>
                        <input type="number" name="logisticFee" placeholder="请输入代付运费金额(选填)" v-model="currentCollectionLogisticsFee">
                    </div>
                </div>
                <h3 class="title">收件人信息</h3>
                <div class="addressee_msg forthwith_msg">
                    <div class="addressee_name addressee_li forthwith_li">
                        <label for="">收件人：</label>
                        <input type="text" name="name" placeholder="请输入收件人姓名" value="" v-model="currentConsigneeName">
                    </div>
                    <div class="addressee_phone addressee_li forthwith_li">
                        <label for="">手机号码：</label>
                        <input type="number" name="phone" placeholder="请输入手机号码" value="" v-model="currentConsigneePhone">
                    </div>
                    <div class="addressee_add addressee_li forthwith_li">
                        <label for="">详细地址：</label>
                        <input type="text" name="address" placeholder="请输入收货详细地址" value="" v-model="currentConsigneeAddress">
                    </div>
                    <div class="default" v-if="stage.current_service != undefined">
                        <input type="checkbox" v-model="defaultFalse" @click="defaultMsg">
                        <span>默认共享快递哥</span>
                    </div>
                </div>
                <div class="expect_time">
                    <popup-picker :title="title3" :data="takeTimes" :columns="3" v-model="currentTakeTime" :placeholder="placeholder3" show-name></popup-picker>
                </div>
                <div class="readAgreement">
                    <input type="checkbox" v-model="readfalse">
                    <span>我已阅读并同意</span>
                    <router-link to="" @click.native="clickAgreement" href="javascript:;">《共享快递哥协议》</router-link>
                </div>
                <div class="submit">
                    <p>服务时间：
                        <span>{{ serviceTimeTip }}</span>
                    </p>
                    <div class="btn">
                        <button @click="realSubmit" id="submitBtn">确定</button>
                    </div>
                </div>
            </div>
            <div class="forthwith_box" v-else>
                <h3 class="title">快递信息</h3>
                <div class="ex_msg forthwith_msg">
                    <div class="ex_odd ex_li forthwith_li">
                        <label for="">快递单号：</label>
                        <input type="number" name="odd" placeholder="请输入快递单号" value="" v-model="currentLogisticsCode">
                    </div>
                    <div class="ex_phone ex_li forthwith_li">
                        <label for="">快递员电话：</label>
                        <input type="number" name="phone" placeholder="请输入快递员手机号码(选填)" v-model="currentCourierPhone">
                    </div>
                    <div class="logisticFee addressee_li forthwith_li">
                        <label for="">代付运费（元）：</label>
                        <input type="number" name="logisticFee" placeholder="请输入代收物流金额(选填)" value="" v-model="currentCollectionLogisticsFee">
                    </div>
                    <div class="ex_time expect_time">
                        <popup-picker :title="title2" :data="takeTimes" :columns="2" v-model="currentTakeTime1" :placeholder="placeholder2" show-name></popup-picker>
                    </div>
                </div>
                <h3 class="title">快递单收件人信息</h3>
                <div class="addressee_msg forthwith_msg">
                    <div class="addressee_name addressee_li forthwith_li">
                        <label for="">收件人：</label>
                        <input type="text" name="name" placeholder="请输入收件人姓名" value="" v-model="currentConsigneeName">
                    </div>
                    <div class="addressee_phone addressee_li forthwith_li">
                        <label for="">手机号码：</label>
                        <input type="number" name="phone" placeholder="请输入手机号码" value="" v-model="currentConsigneePhone">
                    </div>
                    <div class="addressee_add addressee_li forthwith_li">
                        <label for="">详细地址：</label>
                        <input type="text" name="add" placeholder="请输入收货详细地址" v-model="currentConsigneeAddress">
                    </div>
                    <div class="default" v-if="stage.current_service != undefined">
                        <input type="checkbox" v-model="defaultFalse1" @click="defaultMsg">
                        <span>默认共享快递哥</span>
                    </div>
                </div>
                <div class="expect_time">
                    <popup-picker :title="title3" :data="takeTimes" :columns="3" v-model="currentTakeTime" :placeholder="placeholder3" show-name></popup-picker>
                </div>
                <div class="readAgreement">
                    <input type="checkbox" v-model="readfalse1" @click="appointment">
                    <span>我已阅读并同意</span>
                    <router-link to=""  @click.native="clickAgreement1" href="javascript:;">《共享快递哥协议》</router-link>
                </div>
                <div class="submit">
                    <p>服务时间：
                        <span>{{ serviceTimeTip }}</span>
                    </p>
                    <div class="btn">
                        <button @click="reservationSubmit" id="submitBtn">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, PopupPicker, XNumber, Toast } from 'vux'
import qs from 'qs'
export default {
//   data () {
//     return {
//       list2: list(),
//       demo2: '即时代件',
//       index: 0,
//       title1: '预约代件时间',
//       title2: '预约代件时间',
//       title3: '约定送件上门时间',
//       list3: [],
//       value1: ['一小时内'],
//       value2: ['一小时内'],
//       value3: ['一小时内'],
//       placeholder2: '请选择预约代件时间',
//       placeholder3: '请选择约定送件上门时间',
//       format: function (value, name) {
//         if (name) {
//           return `${name}`
//         } else {
//           return `${value}`
//         }
//       },
//       collection_order_number: '',
//             // 即时收件
//       realCode: '',
//       realExpressPhone: '',
//       realLogisticFee: '',
//       realName: '',
//       realPhone: '',
//       realAddress: '',
//       defaultFalse: false,
//             // 预约收件
//       reservationCode: '',
//       reservationExpressPhone: '',
//       reservationLogisticFee: '',
//       reservationName: '',
//       reservationPhone: '',
//       reservationAddress: '',
//       defaultFalse1: false,
//             //
//       items: [],
//       stage: {},
//       service_time: '',

//             // 时间
//       begin: '08:00',
//       end: '21:00',
//       benginTm1: '',
//       benginTm: '',
//       endTm1: '',
//       endTm: '',
//       len: '',
//       itemList: new Array(),
//       timeList: new Array(),
//       formatTm: new Array(),
//       timeList1: new Array(),
//       timeList2: new Array(),
//       estimateLogisticsFee: 0,
//       logisticsGoodsCategoryId: 0,
//       logisticsCompanyId: 0,
//       pickUpTime: '',
//             // 期望上门时间
//       timeday: '',
//       timequantum: '-',
//             // 预约上门时间
//       timeday1: '',
//       timequantum1: '-',
//       arr: []
//     }
//   },
  data () {
    return {
      collectionOrderNumber: null,
      currentType: 0,
      currentLogisticsCode: '',
      currentCourierPhone: '',
      currentCollectionLogisticsFee: '',
      currentConsigneeName: '',
      currentConsigneePhone: '',
      currentConsigneeAddress: '',
      stage: {},
      takeTimes: [],
      title2: '预约代收时间',
      title3: '约定送件上门时间',
      currentTakeTime: [],
      currentTakeTime1: [],
      placeholder2: '',
      placeholder3: '',
      readfalse: true,
      readfalse1: true,
      serviceTimeTip: '00:00~00:00',
      defaultFalse: false,
      defaultFalse1: false,
      deliveryStartTime: '',
      deliveryEndTime: '',
      estimateCollectionStartTime: '',
      estimateCollectionEndTime: ''
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    PopupPicker,
    XNumber,
    Toast
  },
  methods: {
    realSubmit () {
      let that = this
      if (that.realCode === '') {
        that.$vux.toast.text('请输入快递单号', 'middle', 100)
        return false
      } else if (that.realName === '') {
        that.$vux.toast.text('请输入收货人名称', 'middle', 100)
        return false
      } else if (that.realPhone === '') {
        that.$vux.toast.text('请输入收货人手机', 'middle', 100)
        return false
      } else if (that.realAddress === '') {
        that.$vux.toast.text('请输入收货人地址', 'middle', 100)
        return false
      } else if (!that.readfalse) {
        that.$vux.toast.text('请同意共享快递哥协议', 'middle', 100)
        return false
      }
      if (that.currentTakeTime.length > 0) {
        if (that.currentTakeTime[1] === '-') {
          that.deliveryStartTime = that.formatDateTime(new Date(), 'yyyy/MM/dd hh:mm:00')
          that.deliveryEndTime = that.formatDateTime(new Date(new Date().getTime() + 60 * 60 * 1000), 'yyyy/MM/dd hh:mm:00')
        } else {
          let arr = that.currentTakeTime[1].split('~')
          that.deliveryStartTime = arr[0]
          that.deliveryEndTime = arr[1]
        }
      }
      let data = qs.stringify({
        'logistics_code': that.currentLogisticsCode,
        'courier_phone': that.currentCourierPhone,
        'collection_logistics_fee': that.currentCollectionLogisticsFee,
        'delivery_start_time': that.deliveryStartTime,
        'delivery_end_time': that.deliveryEndTime,
        'consignee_name': that.currentConsigneeName,
        'consignee_phone': that.currentConsigneePhone,
        'consignee_address': that.currentConsigneeAddress
      })
      // document.getElementById('submitBtn').setAttribute('disabled', false)
      that.http(that.configs.apiTop + '/collection-order/update/' + that.collectionOrderNumber, 'post', data, function (res) {
        let msg = res.data
        // document.getElementById('submitBtn').setAttribute('disabled', true)
        if (msg.code === 0) {
          localStorage.removeItem('consignee')
          that.$vux.toast.text(msg.message, 'middle', 100)
          setTimeout(function () {
            that.$router.push({ path: '/serviceOrder' })
          }, 200)
        } else {
          if (msg.code === 40014) {
            that.showPlugin(msg.message)
          } else {
            that.$vux.toast.text(msg.message, 'middle', 100)
          }
        }
      })
    },
    defaultMsg () {
      let that = this
      let stage = that.stage
      let currentService = stage.current_service
      if (that.defaultFalse) {
        if (stage.current_service !== undefined) {
          that.defaultFalse = true
          that.currentConsigneeName = currentService.service_nickname
          that.currentConsigneePhone = currentService.service_phone
          that.currentConsigneeAddress = stage.stage_full_address
        }
      } else {
        that.defaultFalse = false
        that.currentConsigneeName = ''
        that.currentConsigneePhone = ''
        that.currentConsigneeAddress = ''
      }
    },
    reservationSubmit () {
      let that = this
      if (that.realCode === '') {
        that.$vux.toast.text('请输入快递单号', 'middle', 100)
        return false
      } else if (that.realName === '') {
        that.$vux.toast.text('请输入收货人名称', 'middle', 100)
        return false
      } else if (that.realPhone === '') {
        that.$vux.toast.text('请输入收货人手机', 'middle', 100)
        return false
      } else if (that.realAddress === '') {
        that.$vux.toast.text('请输入收货人地址', 'middle', 100)
        return false
      } else if (!that.readfalse) {
        that.$vux.toast.text('请同意共享快递哥协议', 'middle', 100)
        return false
      }
      if (that.currentTakeTime.length > 0) {
        if (that.currentTakeTime[1] === '-') {
          that.deliveryStartTime = that.formatDateTime(new Date(), 'yyyy/MM/dd hh:mm:00')
          that.deliveryEndTime = that.formatDateTime(new Date(new Date().getTime() + 60 * 60 * 1000), 'yyyy/MM/dd hh:mm:00')
        } else {
          let arr = that.currentTakeTime[1].split('~')
          that.deliveryStartTime = arr[0]
          that.deliveryEndTime = arr[1]
        }
      }
      if (that.currentTakeTime1.length > 0) {
        if (that.currentTakeTime1[1] === '-') {
          that.estimateCollectionStartTime = that.formatDateTime(new Date(), 'yyyy/MM/dd hh:mm:00')
          that.estimateCollectionEndTime = that.formatDateTime(new Date(new Date().getTime() + 60 * 60 * 1000), 'yyyy/MM/dd hh:mm:00')
        } else {
          let arr = that.currentTakeTime1[1].split('~')
          that.estimateCollectionStartTime = arr[0]
          that.estimateCollectionEndTime = arr[1]
        }
      }
      let data = qs.stringify({
        'logistics_code': that.currentLogisticsCode,
        'courier_phone': that.currentCourierPhone,
        'collection_logistics_fee': that.currentCollectionLogisticsFee,
        'delivery_start_time': that.deliveryStartTime,
        'delivery_end_time': that.deliveryEndTime,
        'consignee_name': that.currentConsigneeName,
        'consignee_phone': that.currentConsigneePhone,
        'consignee_address': that.currentConsigneeAddress,
        'estimate_collection_start_time': that.estimateCollectionStartTime,
        'estimate_collection_end_time': that.estimateCollectionEndTime
      })
      // document.getElementById('submitBtn').setAttribute('disabled', false)
      that.http(that.configs.apiTop + '/estimate-collection-order/update/' + that.collectionOrderNumber, 'post', data, function (res) {
        let msg = res.data
        // document.getElementById('submitBtn').setAttribute('disabled', true)
        if (msg.code === 0) {
          localStorage.removeItem('consignee')
          that.$vux.toast.text(msg.message, 'middle', 100)
          setTimeout(function () {
            that.$router.push({ path: '/serviceOrder' })
          }, 200)
        } else {
          if (msg.code === 40014) {
            that.showPlugin(msg.message)
          } else {
            that.$vux.toast.text(msg.message, 'middle', 100)
          }
        }
      })
    },
    showPlugin (content) {
      let that = this
      this.$vux.confirm.show({
        title: '提示',
        content: content,
        confirmText: '申请开通',
        onShow () {
        },
        onHide () {
        },
        onCancel () {
        },
        onConfirm () {
          that.$router.push({ path: '/open' })
        }
      })
    },
    // 即时收件期望上门时间
    onChangePickUpTime (values) {
      this.timeday = values[0]
      this.timequantum = values[1]
    },
    // 预约收件预约上门时间
    onChangePickUpTime1 (values) {
      this.timeday1 = values[0]
      this.timequantum1 = values[1]
      console.log(this.timeday1, this.timequantum1, '235235')
    },
    // 预约收件期望上门时间
    onChangeExpectTime (values) {
      this.timeday = values[0]
      this.timequantum = values[1]
    },
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
    // 格式化今天明天后天
    getDateStr (AddDayCount) {
      let dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
      let y = dd.getFullYear()
      let m = dd.getMonth() + 1 // 获取当前月份的日期
      let d = dd.getDate()
      return y + '-' + m + '-' + d
    },
    // 格式时间段()
    formattedTimeInit (startTime, endTime) {
      let that = this
      let arr = [{
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
      let startDate = newDate + ' ' + startTime + ':00'
      let endDate = newDate + ' ' + endTime + ':00'
      let startDateTimestamp = new Date(startDate).getTime()
      let endDateTimestamp = new Date(endDate).getTime()
      let step = 60 * 60 * 1000
      let currentTimestamp = new Date().getTime()
            // 今天
      for (let timestamp = startDateTimestamp; timestamp <= endDateTimestamp; timestamp += step) {
        if (timestamp >= currentTimestamp) {
          let tmp1 = that.formatDateTime(new Date(timestamp), 'yyyy/MM/dd hh:mm:ss')
          let tmp2 = that.formatDateTime(new Date(Math.min(timestamp + step, endDateTimestamp)), 'yyyy/MM/dd hh:mm:ss')
          arr.push({
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
        arr.push({
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
        arr.push({
          name: tmp1.split(' ')[1].substring(0, 5) + '~' + tmp2.split(' ')[1].substring(0, 5),
          value: tmp1 + '~' + tmp2,
          parent: '3'
        })
      }
      return arr
    },
    appointment () {
      let that = this
      that.readfalse1 = true
    },
    clickAgreement () {
      let that = this
      let consignee = {
        'logistics_code': that.currentLogisticsCode,
        'courier_phone': that.currentCourierPhone,
        'collection_logistics_fee': that.currentCollectionLogisticsFee,
        'consignee_name': that.currentConsigneeName,
        'consignee_phone': that.currentConsigneePhone,
        'consignee_address': that.currentConsigneeAddress,
        'defaultFalse': that.defaultFalse
      }
      localStorage.setItem('consignee', JSON.stringify(consignee))
      this.$router.push({name: 'Detail', query: {type: 'agreement'}})
    },
    clickAgreement1 () {
      let that = this
      let estimateConsignee = {
        'logistics_code': that.currentLogisticsCode,
        'courier_phone': that.currentCourierPhone,
        'collection_logistics_fee': that.currentCollectionLogisticsFee,
        'consignee_name': that.currentConsigneeName,
        'consignee_phone': that.currentConsigneePhone,
        'consignee_address': that.currentConsigneeAddress,
        'defaultFalse1': that.defaultFalse1
      }
      localStorage.setItem('estimateConsignee', JSON.stringify(estimateConsignee))
      this.$router.push({name: 'Detail', query: {type: 'agreement'}})
    }
  },
  created () {
    let that = this
    if (that.$route.query.collection_order_number === undefined) {
      that.$router.push({
        name: 'serviceOrder'
      })
      that.$vux.toast.text('没有订单记录', 'middle', 100)
      return
    }
    that.collectionOrderNumber = that.$route.query.collection_order_number
    // let index = that.$route.query.index
    // let consignee = localStorage.getItem('consignee')
    // let estimateConsignee = localStorage.getItem('estimateConsignee')
    this.http(that.configs.apiTop + '/page/user-collection', 'get', '', function (res) {
      let msg = res.data
      if (msg.code === 0) {
        let data = msg.data
        that.stage = data.stage
        that.takeTimes = that.formattedTimeInit(data.service_time.start_time, data.service_time.end_time)
        that.serviceTimeTip = data.service_time.start_time + '~' + data.service_time.end_time
        that.http(that.configs.apiTop + '/order/collection-order-detail/' + that.collectionOrderNumber, 'get', '', function (res) {
          let resData = res.data
          if (resData.code === 0) {
            let data = resData.data
            that.currentType = data.collection_order_type_id === 1 ? 0 : 1
            that.currentLogisticsCode = data.logistics_code
            that.currentCourierPhone = data.courier_phone
            that.currentCollectionLogisticsFee = data.collection_logistics_fee
            that.currentConsigneeName = data.consignee_name
            that.currentConsigneePhone = data.consignee_phone
            that.currentConsigneeAddress = data.consignee_address
            that.placeholder3 = data.delivery_start_time.substring(5, 16) + '~' + data.delivery_end_time.substring(5, 16)
            that.deliveryStartTime = data.delivery_start_time
            that.deliveryEndTime = data.delivery_end_time
            that.placeholder2 = data.estimate_collection_start_time.substring(5, 16) + '~' + data.estimate_collection_end_time.substring(5, 16)
            that.estimateCollectionStartTime = data.estimate_collection_start_time
            that.estimateCollectionEndTime = data.estimate_collection_end_time
          } else {
            that.$router.push({
              name: 'serviceOrder'
            })
            that.$vux.toast.text('没有订单记录', 'middle', 100)
            return
          }
        })
      }
    })
  }
    //     that.items = msg.data
    //     that.stage = msg.data.stage
    //     that.service_time = msg.data.service_time.start_time + '-' + msg.data.service_time.end_time
    //     that.begin = msg.data.service_time.start_time
    //     that.end = msg.data.service_time.end_time
    //             // 时间段
    //     that.formattedTimeInit()
    //   } else if (msg.code == 40004) {
    //   } else {
    //     that.$vux.toast.text(msg.message, 'middle', 100)
    //   }
    // })
    // if (typeof index !== 'undefined') {
    //   that.index = parseInt(index)
    // }
    // if (typeof that.collection_order_number !== 'undefined') {
    //   this.http(that.configs.apiTop + '/order/collection-order-detail/' + that.collection_order_number, 'get', '', function (res) {
    //     let msg = res.data
    //     if (msg.code == 0) {
    //       let data = msg.data
    //       // 即时收件
    //       if (that.index == 0) {
    //         that.realCode = parseInt(data.logistics_code)
    //         that.realExpressPhone = parseInt(data.courier_phone)
    //         that.realLogisticFee = data.collection_logistics_fee
    //         that.realName = data.consignee_name
    //         that.realPhone = data.consignee_phone
    //         that.realAddress = data.consignee_address
    //       } else if (that.index == 1) {
    //       // 预约收件
    //         that.reservationCode = parseInt(data.logistics_code)
    //         that.reservationExpressPhone = parseInt(data.courier_phone)
    //         that.realLogisticFee = data.reservationLogisticFee
    //         that.reservationName = data.consignee_name
    //         that.reservationPhone = data.consignee_phone
    //         that.reservationAddress = data.consignee_address
    //       } else {
    //         that.items = msg.data
    //         that.stage = msg.data.stage
    //         that.service_time = msg.data.service_time.start_time + '-' + msg.data.service_time.end_time
    //         that.begin = msg.data.service_time.start_time
    //         that.end = msg.data.service_time.end_time
    //       }
    //     } else if (msg.code == 40004) {
    //     } else {
    //       that.$vux.toast.text(msg.message, 'middle', 100)
    //   }
    // }
    // if (JSON.parse(consignee) != '') {
    //   let obj = JSON.parse(consignee)
    //   that.realCode = obj.logistics_code
    //   that.realExpressPhone = obj.courier_phone
    //   that.realLogisticFee = obj.collection_logistics_fee
    //   that.realName = obj.consignee_name
    //   that.realPhone = obj.consignee_phone
    //   that.realAddress = obj.consignee_address
    //   that.defaultFalse = obj.defaultFalse
    // } else if (JSON.parse(estimateConsignee) != '') {
    //   let obj = JSON.parse(estimateConsignee)
    //   that.reservationCode = obj.logistics_code
    //   that.reservationExpressPhone = obj.courier_phone
    //   that.reservationLogisticFee = obj.collection_logistics_fee
    //   that.reservationName = obj.consignee_name
    //   that.reservationPhone = obj.consignee_phone
    //   that.reservationAddress = obj.consignee_address
    //   that.defaultFalse1 = obj.defaultFalse1
    // }
  // }
}
</script>

<style lang="scss">
@import '../../../static/assets/css/px2rem.scss';
@import '../../../static/assets/css/express.scss';
.collection {}

.expect_time.vux-cell-box {}

.collection .vux-tab .vux-tab-item.vux-tab-selected span {
    border-bottom: 3px solid #366931 !important;
    padding-bottom: px2rem(14)
}

.collection .vux-tab-item+.vux-tab-ink-bar {
    display: none !important;
}
</style>
<style lang="less">
.forthwith_box {
    .expect_time {
        .weui-cell {
            display: flex;
            padding: 0;
        }
        .vux-cell-box {
            width: 100%;
        }
    }
}
</style>
