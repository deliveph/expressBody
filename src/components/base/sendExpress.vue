<template>
    <div id="sendExpress" class="send_warp">
        <div class="receiveSend_add">
            <ul>
                <router-link :to="{path:'address/shipper'}" tag="li" class="send pdlf30">
                    <i class="icon_send"></i>
                    <div class="msg por" v-if="JSON.stringify(default_shipper_address) != '{}'">
                        <p>
                            <span class="name">{{default_shipper_address.shipper_name == ''?'暂无': default_shipper_address.shipper_name}}</span>
                            <span class="tel">{{default_shipper_address.shipper_phone == ''?'暂无': default_shipper_address.shipper_phone}}</span>
                        </p>
                        <p class="add">{{default_shipper_address.shipper_full_address == ''?'暂无': default_shipper_address.shipper_full_address}}</p>
                        <i class="poa"></i>
                    </div>
                    <div class="msg por" v-else>
                        <div class="nomsg">
                            <i class="icon_site"></i>
                            <p>添加新地址</p>
                        </div>
                        <i class="poa"></i>
                    </div>
                </router-link>
                <router-link :to="{path:'address/consignee'}" tag="li" class="receive pdlf30">
                    <i class="icon_receive"></i>
                    <div class="msg por" v-if="JSON.stringify(default_consignee_address) != '{}'">
                        <p>
                            <span class="name">{{default_consignee_address.consignee_name == ''?'暂无': default_consignee_address.consignee_name}}</span>
                            <span class="tel">{{default_consignee_address.consignee_phone == ''?'暂无': default_consignee_address.consignee_phone}}</span>
                        </p>
                        <p class="add">{{default_consignee_address.consignee_full_address == ''?'暂无': default_consignee_address.consignee_full_address}}</p>
                        <i class="poa"></i>
                    </div>
                    <div class="msg por" v-else>
                        <div class="nomsg">
                            <i class="icon_site"></i>
                            <p>添加新地址</p>
                        </div>
                        <i class="poa"></i>
                    </div>
                </router-link>
            </ul>
        </div>
        <div class="express_company pdlf30 express_list">
            <popup-picker :title="title1" :data="list1" v-model="value1" :columns="1" ref="picker3" :display-format="format" @on-change="onChangeOfLogisticsCompanies"></popup-picker>
        </div>
        <div class="express_stdmode pdlf30 express_list">
            <popup-picker :title="title2" :data="list2" v-model="value2" :placeholder="placeholder2" :columns="1" :display-format="format" @on-change="onChangeOfLogisticsGoodsCategories"></popup-picker>
        </div>
        <div class="estimated_weight pdlf30 express_list">
            <x-number :title="estimated_title" v-model="roundValue" button-style="round" :max="100" :min="0"></x-number>
        </div>
        <div class="delivery_time pdlf30  express_list">
            <popup-picker :title="title3" :data="list3" :columns="3" v-model="value3" :display-format="format" @on-change="onChangePickUpTime"></popup-picker>
        </div>
        <div class="explain pdlf30">
            <label for="">备注说明：</label>
            <textarea name="explain" id="" cols="30" rows="10" placeholder="请输入30字符内的说明" v-model="remark" maxlength="30"></textarea>
        </div>
        <div class="readAgreement">
            <input type="checkbox" v-model="checkbox">
            <span>我已阅读并同意</span>
            <router-link :to="{name:'Detail',query:{type:'agreement'}}">《共享快递哥》</router-link>
        </div>
        <div class="submit">
            <div class="row">
                <p class="predict_money">预计金额：
                    <span>
                        <em>{{estimateLogisticsFee}}</em>快递豆</span>
                </p>
                <p class="servicing_time ">服务时间：
                    <span class="time_quantum">{{time_quantum == '' ? '00:00~00:00':time_quantum}}</span>
                </p>
            </div>
            <div class="btn">
                <button @click="submitBtn" class="active">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
import { PopupPicker } from 'vux'
import { XNumber } from 'vux'
import { Toast, Confirm } from 'vux'
import qs from 'qs'
export default {
    data() {
        return {
            checkbox: true,
            default_shipper_address: {},
            default_consignee_address: {},
            time_quantum: '',
            remark: '',
            title1: '快递公司',
            title2: '物品类型',
            title3: '取件时间',
            list1: [{
                name: '默认',
                value: '0',
                parent: 0
            }],
            list2: [],
            list3: [{
                name: '今天',
                value: 'today',
                parent: 0
            }, {
                name: '明天',
                value: 'tomorrow',
                parent: 0
            }, {
                name: '后天',
                value: 'dopodomani',
                parent: '0'
            }, {
                name: '一小时内',
                value: 'within_hour',
                parent: 'today'
            }, {
                name: '11:00~12:00',
                value: 'time_quantum1112',
                parent: 'today'
            }, {
                name: '13:00~14:00',
                value: 'time_quantum1314',
                parent: 'today'
            }, {
                name: '08:00~09:00',
                value: 'time_quantum0809',
                parent: 'tomorrow'
            }, {
                name: '10:00~11:00',
                value: 'time_quantum1011',
                parent: 'tomorrow'
            }, {
                name: '12:00~13:00',
                value: 'time_quantum1213',
                parent: 'tomorrow'
            }, {
                name: '08:00~09:00',
                value: 'time_quantum0809',
                parent: 'dopodomani'
            }, {
                name: '10:00~11:00',
                value: 'time_quantum1011',
                parent: 'dopodomani'
            }, {
                name: '12:00~13:00',
                value: 'time_quantum1213',
                parent: 'dopodomani'
            }],
            value1: [''],
            value2: [''],
            value3: ['一小时内'],
            placeholder1: '请选择快递公司',
            placeholder2: '请选择物品类型',
            roundValue: 1,
            estimated_title: '预估重量',
            format: function(value, name) {
                if (name) {
                    return `${name}`
                } else {
                    return `${value}`
                }
            },
            //时间
            begin: '',
            end: '',
            benginTm1: '',
            benginTm: '',
            endTm1: '',
            endTm: '',
            len: '',
            itemList: new Array,
            timeList: new Array,
            formatTm: new Array,
            timeList1: new Array,
            timeList2: new Array,
            estimateLogisticsFee: 0,
            logisticsGoodsCategoryId: 0,
            logisticsCompanyId: 0,
            pickUpTime: '',
            timeday: '',
            timequantum: '-',
            items: []
        }
    },
    computed: {
    },
    components: {
        PopupPicker,
        XNumber,
        Toast
    },
    created() {
        let that = this        
        let chooseConsigneeAddress = that.$store.state.chooseConsigneeAddress
        let chooseShipAddress = that.$store.state.chooseShipAddress
        this.http(that.configs.apiTop + "/page/user-ship", "get", '', function(res) {
            let msg = res.data
            if (msg.code == 0) {
                let arr = msg.data
                let logistics_companies = []
                let logistics_goods_categories = []
                let arr2 = {
                    name: '',
                    value: '',
                    parent: ''
                }
                let arr3 = {
                    name: '',
                    value: '',
                    parent: ''
                }
                if (JSON.stringify(chooseConsigneeAddress) == '{}') {
                    that.default_consignee_address = arr.default_consignee_address
                } else {
                    that.default_consignee_address = {
                        'consignee_address_id': chooseConsigneeAddress.consignee_address_id,
                        'consignee_name': chooseConsigneeAddress.consignee_name,
                        'consignee_phone': chooseConsigneeAddress.consignee_phone,
                        'consignee_full_address': chooseConsigneeAddress.consignee_full_address
                    }
                }
                if (JSON.stringify(chooseShipAddress) == '{}') {
                    that.default_shipper_address = arr.default_shipper_address
                } else {
                    that.default_shipper_address = {
                        'shipper_address_id': chooseShipAddress.shipper_address_id,
                        'shipper_name': chooseShipAddress.shipper_name,
                        'shipper_phone': chooseShipAddress.shipper_phone,
                        'shipper_full_address': chooseShipAddress.shipper_full_address
                    }
                }
                // 快递公司
                for (let i = 0; i < arr.logistics_companies.length; i++) {
                    if (i == 0) {
                        that.value1[0] = arr.logistics_companies[i].logistics_company_name
                        that.logisticsCompanyId = String(arr.logistics_companies[i].logistics_company_id)
                    }
                    logistics_companies.push({
                        name: arr.logistics_companies[i].logistics_company_name,
                        value: String(arr.logistics_companies[i].logistics_company_id),
                        parent: 0,
                    })
                }
                that.list1 = logistics_companies
                // 物品类型
                for (let j = 0; j < arr.logistics_goods_categories.length; j++) {
                    if (j == 0) {
                        that.value2[0] = arr.logistics_goods_categories[j].logistics_goods_category_name
                        that.logisticsGoodsCategoryId = String(arr.logistics_goods_categories[j].logistics_goods_category_id)
                    }
                    logistics_goods_categories.push({
                        name: arr.logistics_goods_categories[j].logistics_goods_category_name,
                        value: String(arr.logistics_goods_categories[j].logistics_goods_category_id),
                        parent: 0
                    })
                }
                that.list2 = logistics_goods_categories
                that.time_quantum = arr.service_time.start_time + '~' + arr.service_time.end_time
                that.begin = arr.service_time.start_time
                that.end = arr.service_time.end_time
                //时间段
                that.formattedTimeInit()
            } else if (msg.code == 40004) {
                location.href = that.configs.accreditUrl
            } else {
                that.$vux.toast.text(msg.message, 'middle', 100);
            }
        })
    },
    methods: {
        // 计算时间段
        // 时间格式化
        formatDateTime: function(e, t) {
            var r = function(e) {
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
            return t || (t = "yyyy-MM-dd hh:mm:ss"), t.replace(/([a-z])(\1)*/gi, function(e) {
                return n[e]
            })
        },
        // 格式化今天明天后天
        getDateStr(AddDayCount) {
            let dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
            let y = dd.getFullYear();
            let m = dd.getMonth() + 1; //获取当前月份的日期 
            let d = dd.getDate();
            return y + "-" + m + "-" + d;
        },
        // 格式时间段()
        formattedTimeInit() {
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
            let newDate = that.formatDateTime(new Date, "yyyy/MM/dd")
            let startDate = newDate + " " + that.begin + ":00"
            let endDate = newDate + " " + that.end + ":00"
            let startDateTimestamp = new Date(startDate).getTime()
            let endDateTimestamp = new Date(endDate).getTime()
            let step = 60 * 60 * 1000
            let currentTimestamp = new Date().getTime()
            // 今天
            for (let timestamp = startDateTimestamp; timestamp <= endDateTimestamp; timestamp += step) {
                if (timestamp >= currentTimestamp) {
                    let tmp1 = that.formatDateTime(new Date(timestamp), "yyyy/MM/dd hh:mm:ss")
                    let tmp2 = that.formatDateTime(new Date(Math.min(timestamp + step, endDateTimestamp)), "yyyy/MM/dd hh:mm:ss")
                    that.arr.push({
                        name: tmp1.split(" ")[1].substring(0, 5) + "~" + tmp2.split(" ")[1].substring(0, 5),
                        value: tmp1 + "~" + tmp2,
                        parent: '1'
                    })
                }
            }
            let step1 = 24 * 60 * 60 * 1000
            // 明天
            endDateTimestamp = endDateTimestamp + step1
            for (let timestamp = startDateTimestamp + step1; timestamp <= endDateTimestamp; timestamp += step) {
                let tmp1 = that.formatDateTime(new Date(timestamp), "yyyy/MM/dd hh:mm:ss")
                let tmp2 = that.formatDateTime(new Date(Math.min(timestamp + step, endDateTimestamp)), "yyyy/MM/dd hh:mm:ss")
                that.arr.push({
                    name: tmp1.split(" ")[1].substring(0, 5) + "~" + tmp2.split(" ")[1].substring(0, 5),
                    value: tmp1 + "~" + tmp2,
                    parent: '2'
                })
            }
            // 后天
            endDateTimestamp = endDateTimestamp + step1
            for (let timestamp = startDateTimestamp + 2 * step1; timestamp <= endDateTimestamp; timestamp += step) {
                let tmp1 = that.formatDateTime(new Date(timestamp), "yyyy/MM/dd hh:mm:ss")
                let tmp2 = that.formatDateTime(new Date(Math.min(timestamp + step, endDateTimestamp)), "yyyy/MM/dd hh:mm:ss")
                that.arr.push({
                    name: tmp1.split(" ")[1].substring(0, 5) + "~" + tmp2.split(" ")[1].substring(0, 5),
                    value: tmp1 + "~" + tmp2,
                    parent: '3'
                })
            }
            that.list3 = that.arr
        },
        onChange(val) {
        },
        onShow() {
        },
        onHide(type) {
        },
        change(val) {
        },
        submitBtn() {
            let that = this;
            if (that.default_shipper_address.shipper_address_id == '') {
                that.$vux.toast.text('请选择寄件地址', 'middle', 100)
                return false
            } else if (that.default_consignee_address.consignee_address_id == '') {
                that.$vux.toast.text('请选择寄件地址', 'middle', 100)
                return false
            } else if (!that.checkbox) {
                that.$vux.toast.text('请同意共享快递哥协议', 'middle', 100)
                return false
            } else if (that.remark.lenght == 30) {
                that.$vux.toast.text('请输入30字符内的说明', 'middle', 100)
                return false
            } else if (that.logisticsGoodsCategoryId <= 0) {
                that.$vux.toast.text('请选择物品类型', 'middle', 100)
                return false
            }

            let take_start_time = ''
            let take_end_time = ''
            // if (that.timeday == 1) {
            //     that.timeday = that.getDateStr(0)
            // } else if (that.timeday == 2) {
            //     that.timeday = that.getDateStr(1)
            // } else if (that.timeday == 3) {
            //     that.timeday = that.getDatStr(2)
            // }
            // let arr = that.timequantum.split("~")
            // take_start_time = that.timeday + ' ' + arr[0] + ':00'
            // take_end_time = that.timeday + ' ' + arr[1] + ':00'
            if (that.timequantum == "-") { // 一小时内
                take_start_time = that.formatDateTime(new Date(), "yyyy/MM/dd hh:mm:00")
                take_end_time = that.formatDateTime(new Date(new Date().getTime() + 60 * 60 * 1000), "yyyy/MM/dd hh:mm:00")
            } else {
                let arr = that.timequantum.split("~")
                take_start_time = arr[0]
                take_end_time = arr[1]
            }

            let data = qs.stringify({
                'shipper_address_id': that.default_shipper_address.shipper_address_id,
                'consignee_address_id': that.default_consignee_address.consignee_address_id,
                'logistics_company_id': that.logisticsCompanyId,
                'logistics_goods_category_id': that.logisticsGoodsCategoryId,
                'estimate_weight': that.roundValue,
                'take_start_time': take_start_time,
                'take_end_time': take_end_time,
                'remark': that.remark
            })
            this.http(that.configs.apiTop + "/order/submit-ship-order", "post", data, function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                    setTimeout(function() {
                        that.$router.push({ path: '/order' })
                    }, 200);
                } else if (msg.code == 40004) {
                } else {
                    if (msg.code == 40014) {
                        that.showPlugin(msg.message)
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                }
            })
        },
        showPlugin(content) {
            let that = this
            this.$vux.confirm.show({
                title: '提示',
                content: content,
                onShow() {
                },
                onHide() {
                },
                onCancel() {
                },
                onConfirm() {
                    that.$router.push({ path: '/open' })
                }
            })
        },
        getEstimateLogisticsFee() {
            let that = this
            this.http(that.configs.apiTop + "/ship-order/get-estimate-logistics-fee?logistics_company_id=" + this.logisticsCompanyId + "&estimate_weight=" + this.roundValue + "&consignee_address_id=" + that.default_consignee_address.consignee_address_id, "get", '', function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    let arr = msg.data
                    that.estimateLogisticsFee = arr.estimate_logistics_fee
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        },
        onChangeOfLogisticsGoodsCategories(values) {
            this.logisticsGoodsCategoryId = values[0]
        },
        onChangeOfLogisticsCompanies(values) {
            this.logisticsCompanyId = values[0]
        },
        onChangePickUpTime(values) {
            this.timeday = values[0]
            this.timequantum = values[1]
        }
    },
    watch: {
        roundValue: function() {
            this.getEstimateLogisticsFee();
        },
        logisticsCompanyId: function() {
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

<style lang="scss" scoped>
@import '../../../static/assets/css/px2rem.scss';
@import '../../../static/assets/css/express.scss';

.express_company {}

.scroller-indicator {
    background-color: #fff;
}

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

.weui-cell__ft {
    width: px2rem(40);
    height: px2rem(40);
    background: url('/static/assets/images/more_list.png') no-repeat center;
    background-size: px2rem(40);
    display: inline-block;
    right: px2rem(0);
    top: px2rem(28);
    margin-right: 0;
}

.vux-number-round .vux-number-selector {
    width: px2rem(60);
    height: px2rem(60);
    border: 0;
    border-radius: px2rem(10);
}

.vux-number-round .vux-number-input {
    width: px2rem(88);
    height: px2rem(58);
    border: 1px solid #bfbfbf;
    margin: 0 px2rem(18);
    border-radius: px2rem(10);
}
</style>
<style lang="scss">
.send_warp {
    .weui-cell {
        padding: 0
    }
}
</style>
