<template>
    <div id="sendExpress" class="send_warp" v-wechat-title="$route.meta.title">
        <div class="receiveSend_add">
            <ul>
                <li class="send pdlf30">
                    <i class="icon_send"></i>
                    <div class="msg por" v-if="isShowShipOrderCurrentShiperAddress">
                        <p>
                            <span class="name">{{ shipOrderCurrentShiperAddress.shiperName }}</span>
                            <span class="tel">{{ shipOrderCurrentShiperAddress.shiperPhone }}</span>
                        </p>
                        <p class="add">{{ shipOrderCurrentShiperAddress.shiperFullAddress }}</p>
                    </div>
                </li>
                <li class="send pdlf30">
                    <i class="icon_receive"></i>
                    <div class="msg por" v-if="isShowShipOrderCurrentConsigneeAddress">
                        <p>
                            <span class="name">{{ shipOrderCurrentConsignessAddress.consigneeName }}</span>
                            <span class="tel">{{ shipOrderCurrentConsignessAddress.consigneePhone }}</span>
                        </p>
                        <p class="add">{{ shipOrderCurrentConsignessAddress.consigneeFullAddress }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="express_company pdlf30 express_list">
          <popup-picker :data="logisticsCompanies" :title="title1" :columns="1" v-model="currentLogisticsCompany" show-name></popup-picker>
        </div>
        <div class="express_stdmode pdlf30 express_list">
            <popup-picker :data="logisticsGoodsCategories" :title="title2" v-model="currentLogisticsGoodsCategory" :columns="1" show-name></popup-picker>
        </div>
        <div class="estimated_weight pdlf30 express_list">
            <x-number :title="numberCasesTitle" v-model="shipOrderGoodsNumber" button-style="round" :max="1000" :min="0"></x-number>
        </div>
        <div class="estimated_weight pdlf30 express_list">
            <x-number :title="estimatedTitle" v-model="estimateWeight" button-style="round" :max="1000" :min="0"></x-number>
        </div>
        <div class="delivery_time pdlf30  express_list">
            <popup-picker :title="title3" :data="takeTimes" :columns="2" v-model="currentTakeTime" :placeholder="placeholder1" show-name></popup-picker>
        </div>
        <div class="explain pdlf30">
            <label for="">备注说明：</label>
            <textarea name="explain" id="" cols="30" rows="10" placeholder="请输入30字符内的说明" v-model="remark" maxlength="30"></textarea>
        </div>
        <div class="readAgreement">
            <input type="checkbox" v-model="isAgreement">
            <span>我已阅读并同意</span>
            <router-link :to="{name:'Detail',query:{type:'agreement'}}">《共享快递哥协议》</router-link>
        </div>
        <div class="submit">
            <div class="row">
                <p class="predict_money">预计金额：
                  <span>
                  <em>{{ estimateLogisticsFee }}</em>快递豆</span>
                </p>
                <p class="servicing_time ">服务时间：
                  <span class="time_quantum">{{ serviceTimeTip }}</span>
                </p>
            </div>
            <div class="btn">
                <button @click="submitBtn" class="active" id="submitBtn">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
import { PopupPicker, XNumber, Toast } from 'vux'
import qs from 'qs'
export default {
  data () {
    return {
      shipOrderNumber: null,
      shipOrderCurrentConsignessAddress: null,
      shipOrderCurrentShiperAddress: null,
      logisticsCompanies: [],
      logisticsGoodsCategories: [],
      takeTimes: [],
      currentLogisticsCompany: ['0'],
      currentLogisticsGoodsCategory: ['0'],
      currentTakeTime: [],
      format: function (value, name) {
        return name ? `${name}` : `${value}`
      },
      numberCasesTitle: '件数选择',
      estimatedTitle: '预估重量（kg）',
      shipOrderGoodsNumber: 0,
      estimateWeight: 0,
      title1: '快递公司',
      title2: '物品类型',
      title3: '取件时间',
      placeholder1: '',
      remark: '',
      isAgreement: true,
      serviceTimeTip: '00:00~00:00',
      estimateLogisticsFee: 0,
      takeStartTime: '',
      takeEndTime: ''
    }
  },
  computed: {
    isShowShipOrderCurrentShiperAddress () {
      let that = this
      that.shipOrderCurrentShiperAddress = that.$store.state.shipOrderCurrentShiperAddress
      return that.$store.state.shipOrderCurrentShiperAddress !== null
    },
    isShowShipOrderCurrentConsigneeAddress () {
      let that = this
      that.shipOrderCurrentConsignessAddress = that.$store.state.shipOrderCurrentConsignessAddress
      return that.$store.state.shipOrderCurrentConsignessAddress !== null
    }
  },
  components: {
    PopupPicker,
    XNumber,
    Toast
  },
  created () {
    let that = this
    that.shipOrderNumber = that.$route.query.ship_order_number
    if (that.shipOrderNumber === undefined) {
      that.$router.push({
        name: 'order'
      })
      that.$vux.toast.text('没有订单记录', 'middle', 100)
      return
    }
    that.http(that.configs.apiTop + '/page/user-ship', 'get', '', function (res) {
      let msg = res.data
      if (msg.code === 0) {
        let data = msg.data
        // 快递公司
        for (let i = 0; i < data.logistics_companies.length; i++) {
          that.logisticsCompanies.push({
            name: data.logistics_companies[i].logistics_company_name,
            value: String(data.logistics_companies[i].logistics_company_id),
            parent: 0
          })
        }
        // 物品类型
        for (let j = 0; j < data.logistics_goods_categories.length; j++) {
          that.logisticsGoodsCategories.push({
            name: data.logistics_goods_categories[j].logistics_goods_category_name,
            value: String(data.logistics_goods_categories[j].logistics_goods_category_id),
            parent: 0
          })
        }
        that.takeTimes = that.formattedTimeInit(data.service_time.start_time, data.service_time.end_time)
        that.serviceTimeTip = data.service_time.start_time + '~' + data.service_time.end_time
        that.http(that.configs.apiTop + '/order/ship-order-detail/' + that.shipOrderNumber, 'get', '', function (res) {
          let resData = res.data
          if (resData.code === 0) {
            let data = resData.data
            that.$store.dispatch('chooseShipOrderCurrentShiperAddress', {
              'shiperAddressId': data.shipper_address_id,
              'shiperName': data.shipper_name,
              'shiperPhone': data.shipper_phone,
              'shiperFullAddress': data.shipper_full_address
            })
            that.$store.dispatch('chooseShipOrderCurrentConsigneeAddress', {
              'consigneeAddressId': data.consignee_address_id,
              'consigneeName': data.consignee_name,
              'consigneePhone': data.consignee_phone,
              'consigneeFullAddress': data.consignee_full_address
            })
            that.shipOrderGoodsNumber = data.ship_order_goods_number
            that.estimateWeight = data.estimate_weight
            that.placeholder1 = data.take_start_time.substring(5, 16) + '~' + data.take_end_time.substring(5, 16)
            that.takeStartTime = data.take_start_time
            that.takeEndTime = data.take_end_time
            that.remark = data.remark
            that.currentLogisticsCompany = [String(data.logistics_company_id)]
            that.currentLogisticsGoodsCategory = [String(data.logistics_goods_category_id)]
          } else {
            that.$router.push({
              name: 'order'
            })
            that.$vux.toast.text('没有订单记录', 'middle', 100)
            return
          }
        })
      } else {
        that.$vux.toast.text(msg.message, 'middle', 100)
      }
    })
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
    onChange (val) {
    },
    onShow () {
    },
    onHide (type) {
    },
    change (val) {
    },
    submitBtn () {
      let that = this
      // document.getElementById('submitBtn').setAttribute('disabled', false)
      if (!that.isAgreement) {
        that.$vux.toast.text('请同意共享快递哥协议', 'middle', 100)
        return false
      }
      if (that.remark.lenght === 30) {
        that.$vux.toast.text('请输入30字符内的说明', 'middle', 100)
        return false
      }
      if (that.currentLogisticsCompany.length <= 0) {
        that.$vux.toast.text('请选择快递公司', 'middle', 100)
        return false
      }
      let currentLogisticsCompanyId = that.currentLogisticsCompany[0]
      if (that.currentLogisticsGoodsCategory.length <= 0) {
        that.$vux.toast.text('请选择物品类型', 'middle', 100)
        return false
      }
      if (that.currentTakeTime.length > 0) {
        if (that.currentTakeTime[1] === '-') {
          that.takeStartTime = that.formatDateTime(new Date(), 'yyyy/MM/dd hh:mm:00')
          that.takeEndTime = that.formatDateTime(new Date(new Date().getTime() + 60 * 60 * 1000), 'yyyy/MM/dd hh:mm:00')
        } else {
          let arr = that.currentTakeTime[1].split('~')
          that.takeStartTime = arr[0]
          that.takeEndTime = arr[1]
        }
      }
      let currentLogisticsGoodsCategoryId = that.currentLogisticsGoodsCategory[0]
      let data = qs.stringify({
        'logistics_company_id': currentLogisticsCompanyId,
        'logistics_goods_category_id': currentLogisticsGoodsCategoryId,
        'estimate_weight': that.estimateWeight,
        'take_start_time': that.takeStartTime,
        'take_end_time': that.takeEndTime,
        'remark': that.remark,
        'ship_order_goods_number': that.shipOrderGoodsNumber
      })
      this.http(that.configs.apiTop + '/ship-order/update/' + that.shipOrderNumber, 'post', data, function (res) {
        let msg = res.data
        // document.getElementById('submitBtn').setAttribute('disabled', true)
        if (msg.code === 0) {
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
    getEstimateLogisticsFee () {
      let that = this
      let currentLogisticsCompanyId = that.currentLogisticsCompany[0]
      this.http(that.configs.apiTop + '/ship-order/get-estimate-logistics-fee?logistics_company_id=' + currentLogisticsCompanyId + '&estimate_weight=' + that.estimateWeight + '&consignee_address_id=' + that.shipOrderCurrentConsignessAddress.consigneeAddressId, 'get', '', function (res) {
        let msg = res.data
        if (msg.code === 0) {
          let arr = msg.data
          that.estimateLogisticsFee = arr.estimate_logistics_fee
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    }
  },
  watch: {
    estimateWeight: function () {
      this.getEstimateLogisticsFee()
    },
    shipOrderCurrentShiperAddress: function () {
      this.getEstimateLogisticsFee()
    }
  }
}
</script>

<style lang="less">
.weui-cell {
    padding: 0
}
</style>

<style lang="scss" >
@import '../../../static/assets/css/px2rem.scss';
@import '../../../static/assets/css/express.scss';

.express_company {}

// .scroller-indicator {
//     background-color: #fff;
// }

.vux-flexbox .vux-flexbox-item {
    color: #366931;
}

.express_company .vux-cell-box .weui-cell_access,
.weui-cell {
    padding: 0;
}

.weui-cell,
.vux-tap-active,
.weui-cell_access {
    padding: 0;
}

// .weui-cell__ft {
//     width: px2rem(40);
//     height: px2rem(40);
//     background: url('/static/assets/images/more_list.png') no-repeat center;
//     background-size: px2rem(40);
//     display: inline-block;
//     right: px2rem(0);
//     top: px2rem(28);
//     margin-right: 0;
// }

// .vux-number-round .vux-number-selector {
//     width: px2rem(60);
//     height: px2rem(60);
//     border: 0;
//     border-radius: px2rem(10);
// }

// .vux-number-round .vux-number-input {
//     width: px2rem(88);
//     height: px2rem(58);
//     border: 1px solid #bfbfbf;
//     margin: 0 px2rem(18);
//     border-radius: px2rem(10);
// }
</style>
<style lang="scss">
.send_warp {
    .weui-cell {
        padding: 0
    }
}
</style>
