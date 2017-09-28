<template>
    <div class="collection">
        <tab :line-width=2 active-color='#356931' v-model="index">
            <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
        </tab>
        <div class="collection_wrap" v-model="index">
            <div class="forthwith_box" v-if=" index == 0 ">
                <h3 class="title">快递信息</h3>
                <div class="ex_msg forthwith_msg">
                    <div class="ex_odd ex_li forthwith_li">
                        <label for="">快递单号：</label>
                        <input type="number" name="odd" placeholder="请输入快递单号" value="" v-model="realCode">
                    </div>
                    <div class="ex_phone ex_li forthwith_li">
                        <label for="">快递员电话：</label>
                        <input type="number" name="phone" placeholder="请输入快递员手机号码(选填)" v-model="realExpressPhone">
                    </div>
                    <div class="logisticFee addressee_li forthwith_li">
                        <label for="">代收物流费：</label>
                        <input type="text" name="logisticFee" placeholder="请输入代收物流金额(选填)" value="" v-model="realLogisticFee">
                    </div>
                </div>
                <h3 class="title">收件人信息</h3>
                <div class="addressee_msg forthwith_msg">
                    <div class="addressee_name addressee_li forthwith_li">
                        <label for="">收件人：</label>
                        <input type="text" name="name" placeholder="请输入收件人姓名" value="" v-model="realName">
                    </div>
                    <div class="addressee_phone addressee_li forthwith_li">
                        <label for="">手机号码：</label>
                        <input type="number" name="phone" placeholder="请输入手机号码" value="" v-model="realPhone">
                    </div>
                    <div class="addressee_add addressee_li forthwith_li">
                        <label for="">详细地址：</label>
                        <input type="text" name="address" placeholder="请输入收货详细地址" value="" v-model="realAddress">
                    </div>
                    <div class="default">
                        <input type="checkbox" v-model="defaultFalse" @click="defaultMsg">
                        <span>默认快递宝宝</span>
                    </div>
                </div>
                <div class="expect_time">
                    <popup-picker :title="title3" :data="list3" :columns="3" v-model="value1" :display-format="format" :placeholder="placeholder3"></popup-picker>
                    <!--<label for="">期望上门时间</label>
                    <select name="" id="">
                        <option value="">一小时内</option>
                        <option value="">08:00 ~ 09:00</option>
                        <option value="">09:00 ~ 10:00</option>
                        <option value="">10:00 ~ 11:00</option>
                        <option value="">11:00 ~ 12:00</option>
                    </select>
                    <i></i>-->
                </div>
                <div class="readAgreement">
                    <input type="checkbox" v-model="readfalse">
                    <span>我已阅读并同意</span>
                    <router-link :to="{name:'Detail',query:{type:'agreement'}}">《快递宝宝协议》</router-link>
                </div>
                <div class="submit">
                    <p>服务时间：
                        <span>08:00-21:00</span>
                    </p>
                    <div class="btn">
                        <button @click="realSubmit">确定</button>
                    </div>
                </div>
            </div>
            <div class="forthwith_box" v-else>
                <h3 class="title">快递信息</h3>
                <div class="ex_msg forthwith_msg">
                    <div class="ex_odd ex_li forthwith_li">
                        <label for="">快递单号：</label>
                        <input type="text" name="odd" placeholder="请输入快递单号" value="" v-model="reservationCode">
                    </div>
                    <div class="ex_phone ex_li forthwith_li">
                        <label for="">快递员电话：</label>
                        <input type="number" name="phone" placeholder="请输入快递员手机号码(选填)" v-model="reservationExpressPhone">
                    </div>
                    <div class="logisticFee addressee_li forthwith_li">
                        <label for="">代收物流费：</label>
                        <input type="text" name="logisticFee" placeholder="请输入代收物流金额(选填)" value="" v-model="reservationLogisticFee">
                    </div>
                    <div class="ex_time expect_time">
                        <popup-picker :title="title2" :data="list3" :columns="3" v-model="value2" :display-format="format" :placeholder="placeholder2"></popup-picker>
                        <!--<label for="">预约收件时间：</label>
                        <select name="" id="">
                            <option value="">今天</option>
                            <option value="">08:00 ~ 09:00</option>
                            <option value="">09:00 ~ 10:00</option>
                            <option value="">10:00 ~ 11:00</option>
                            <option value="">11:00 ~ 12:00</option>
                        </select>
                        <i></i>-->
                    </div>
                </div>
                <h3 class="title">收件人信息</h3>
                <div class="addressee_msg forthwith_msg">
                    <div class="addressee_name addressee_li forthwith_li">
                        <label for="">收件人：</label>
                        <input type="text" name="name" placeholder="请输入收件人姓名" value="" v-model="reservationName">
                    </div>
                    <div class="addressee_phone addressee_li forthwith_li">
                        <label for="">手机号码：</label>
                        <input type="number" name="phone" placeholder="请输入手机号码" value="" v-model="reservationPhone">
                    </div>
                    <div class="addressee_add addressee_li forthwith_li">
                        <label for="">详细地址：</label>
                        <input type="text" name="add" placeholder="请输入收货详细地址" v-model="reservationAddress">
                    </div>
                    
                    <div class="default">
                        <input type="checkbox" v-model="defaultFalse1" @click="defaultMsg1">
                        <span>默认快递宝宝</span>
                    </div>
                </div>
                <div class="expect_time">
                    <popup-picker :title="title3" :data="list3" :columns="3" v-model="value3" :display-format="format" :placeholder="placeholder3"></popup-picker>
                </div>
                <!--<div class="expect_time">
                    <label for="">期望上门时间</label>
                    <select name="" id="">
                        <option value="">一小时内</option>
                        <option value="">08:00 ~ 09:00</option>
                        <option value="">09:00 ~ 10:00</option>
                        <option value="">10:00 ~ 11:00</option>
                        <option value="">11:00 ~ 12:00</option>
                    </select>
                    <i></i>
                </div>-->
                <div class="readAgreement">
                    <input type="checkbox" v-model="readfalse1">
                    <span>我已阅读并同意</span>
                    <router-link :to="{name:'Detail',query:{type:'agreement'}}">《快递宝宝协议》</router-link>
                </div>
                <div class="submit">
                    <p>服务时间：
                        <span>08:00-21:00</span>
                    </p>
                    <div class="btn">
                        <button @click="reservationSubmit">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import { PopupPicker } from 'vux'
import { XNumber } from 'vux'
import { Toast } from 'vux'
import qs from 'qs'
const list = () => ['即时收件', '预约收件']
export default {
    data() {
        return {
            list2: list(),
            demo2: '即时收件',
            index: 0,
            readfalse:true,
            readfalse1:true,
            title1:'预约收件时间',
            title2:'预约收件时间',
            title3: '期望上门时间',
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
            },{
                name: '10:00~11:00',
                value: 'time_quantum1011',
                parent: 'tomorrow'
            },{
                name: '12:00~13:00',
                value: 'time_quantum1213',
                parent: 'tomorrow'
            },{
                name: '08:00~09:00',
                value: 'time_quantum0809',
                parent: 'dopodomani'
            },{
                name: '10:00~11:00',
                value: 'time_quantum1011',
                parent: 'dopodomani'
            },{
                name: '12:00~13:00',
                value: 'time_quantum1213',
                parent: 'dopodomani'
            }],
            value1: ['一小时内'],
            value2: ['一小时内'],
            value3: ['一小时内'],
            placeholder2: '请选择预约收件时间',
            placeholder3: '请选择期望上门时间',
            format: function(value, name) {
                if(name){
                    return `${name}`
                }else{
                    return `${value}`
                }
            },
            // 即时收件
            realCode: '',
            realExpressPhone:'',
            realLogisticFee:'',
            realName:'',
            realPhone:'',
            realAddress:'',
            defaultFalse:false,
            // 预约收件
            reservationCode:'',
            reservationExpressPhone:'',
            reservationLogisticFee:'',
            reservationName:'',
            reservationPhone:'1',
            reservationAddress:'',
            defaultFalse1:false,

            // 
            items:[],
            stage:{},
            service_time:{}
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
        realSubmit() {
            let that = this;
            if(that.realCode == ''){
                that.$vux.toast.text('请输入快递单号', 'middle', 100)
                return false
            }else if(that.realName == ''){
                that.$vux.toast.text('请输入收货人名称', 'middle', 100)
                return false
            }else if(that.realPhone == ''){
                that.$vux.toast.text('请输入收货人手机', 'middle', 100)
                return false
            }else if(that.realAddress == ''){
                that.$vux.toast.text('请输入收货人地址', 'middle', 100)
                return false
            }else if(!that.readfalse){
                that.$vux.toast.text('请同意共享快递哥协议', 'middle', 100)
                return false
            }
            
            if(that.realLogisticFee == ''){
                that.realLogisticFee = 0
            }

            let data = qs.stringify({
                'logistics_code': that.realCode,
                'courier_phone': that.realExpressPhone,
                'collection_logistics_fee':that.realLogisticFee,
                'delivery_start_time':'2017-09-22 16:00:00',
                'delivery_end_time':'2017-09-22 17:00:00',
                'consignee_name':that.realName,
                'consignee_phone':that.realPhone,
                'consignee_address':that.realAddress
            })
            this.http(that.configs.apiTop + "/order/submit-consignee-order", "post", data, function(res) {
                let msg = res.data
                if (msg.code == 0) {
                   that.$vux.toast.text(msg.message, 'middle', 100);
                   setTimeout(function(){ 
                       that.$router.push({path: '/order'}) 
                   }, 200);
                } else if (msg.code == 40004) {
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        },
        defaultMsg(){
            let that = this
            let stage = that.stage
            if(!that.defaultFalse){
                if(stage.current_service != ''){
                    that.defaultFalse = true
                    that.realName = stage.current_service.service_nickname
                    that.realPhone = stage.current_service.service_phone
                    that.realAddress = stage.stage_full_address
                }
            }else{
                that.defaultFalse = false
                that.realName = ''
                that.realPhone = ''
                that.realAddress = ''
            }
        },
        defaultMsg1(){
            let that = this
            if(that.defaultFalse1){

            }
        },
        reservationSubmit(){
            this.$router.push({ path: '/detail' })
        }
    },
    created(){
        let that = this
        this.http(that.configs.apiTop + "/page/user-collection", "get", '', function(res) {
            let msg = res.data
            if (msg.code == 0) {
                that.items = msg.data
                that.stage = msg.data.stage
                let stage = msg.data.stage
                if(that.stage.current_service != ''){
                    // that.defaultFalse = true
                    // that.realName = stage.current_service.service_nickname
                    // that.realPhone = stage.current_service.service_phone
                    // that.realAddress = stage.stage_full_address
                }
                that.servicing_time = msg.data.servicing_time
            } else if (msg.code == 40004) {
            } else {
                that.$vux.toast.text(msg.message, 'middle', 100);
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/px2rem.scss';
@import '../../../static/assets/css/express.scss';

.collection{

}

.expect_time.vux-cell-box{

}
</style>
<style lang="less" scoped>
    .forthwith_box{
        .expect_time{
            .vux-cell-box{
                width:100%;
            }
        }
    }
</style>
