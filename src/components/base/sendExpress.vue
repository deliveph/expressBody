<template>
    <div id="sendExpress" class="send_warp">
        <div class="receiveSend_add">
            <ul>
                <router-link :to="{path:'address/shipper'}" tag="li" class="send pdlf30">
                    <i class="icon_send"></i>
                    <div class="msg por">
                        <p>
                            <span class="name">彭老鬼</span>
                            <span class="tel">18681587662</span>
                        </p>
                        <p class="add">广东省深圳市南山区</p>
                        <i class="poa"></i>
                    </div>
                </router-link>
                <router-link :to="{path:'address/consignee'}" tag="li" class="receive pdlf30">
                    <i class="icon_receive"></i>
                    <div class="msg por">
                        <p>
                            <span class="name">彭老鬼</span>
                            <span class="tel">18681587662</span>
                        </p>
                        <p class="add">广东省深圳市南山区</p>
                        <i class="poa"></i>
                    </div>
                </router-link>
            </ul>
        </div>
        <div class="express_company pdlf30 express_list">
            <popup-picker :title="title1" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :placeholder="placeholder1"></popup-picker>
        </div>
        <div class="express_stdmode pdlf30 express_list">
            <popup-picker :title="title2" :data="list2" v-model="value2" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :placeholder="placeholder2"></popup-picker>
        </div>
        <div class="estimated_weight pdlf30 express_list">
            <x-number :title="estimated_title" v-model="roundValue" button-style="round" :max="5" :min="0"></x-number>
        </div>
        <div class="delivery_time pdlf30  express_list">
            <popup-picker :title="title3" :data="list3" :columns="3" v-model="value3" show-name></popup-picker>
        </div>
        <!-- <div class="delivery_time pdlf30  express_list">
            <x-address :title="title2" v-model="value6" raw-value :list="addressData" value-text-align="left"></x-address>
        </div> -->
        <div class="explain pdlf30">
            <label for="">备注说明：</label>
            <textarea name="explain" id="" cols="30" rows="10" placeholder="请输入30字符内的说明"></textarea>
        </div>
        <div class="readAgreement">
            <input type="checkbox">
            <span>我已阅读并同意</span>
            <router-link :to="{name:'Detail',query:{type:'agreement'}}">《快递宝宝协议》</router-link>
        </div>
        
        <div class="submit">
            <div class="row">
                <p class="predict_money">预计金额：<span><em>200</em>快递豆</span></p>
                <p class="servicing_time ">服务时间：<span>08:00-21:00</span></p>
            </div>
            <div class="btn">
                <button @click="submitBtn">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
import { PopupPicker } from 'vux'
import { XNumber } from 'vux'
export default {
    data() {
        return {
            title1: '快递公司',
            title2: '物品类型',
            title3: '联动显示值',
            list1: [['默认', '中通快递', '顺丰快递', '申通快递', '圆通快递', '韵达快递', 'EMS']],
            list2: [['生活用品', '数码产品', '文件', '服饰', '食品']],
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
            value1: ['申通快递'],
            value2: ['文件'],
            value3: ['广西001'],
            placeholder1: '请选择快递公司',
            placeholder2: '请选择物品类型',
            roundValue: 0,
            estimated_title: '预估重量',
            format: function(value, name) {
                return `${value[0]}:${value[1]}`
            }
        }
    },
    computed: {        
    },
    components: {
        PopupPicker,
        XNumber
    },
    created() {
        // console.log(this.addressData)
    },
    methods: {
        onChange(val) {
            console.log('val change', val)
        },
        onShow() {
            console.log('on show')
        },
        onHide(type) {
            console.log('on hide', type)
        },
        change(val) {
            console.log('change', val)
        },
        submitBtn(){
            this.$router.push({path: '/detail'})
        }
    }
}
</script>

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

.express_company .vux-cell-box .weui-cell_access,.weui-cell{
    padding:0;
}

.weui-cell,.vux-tap-active,.weui-cell_access{
    padding:0;
}

.weui-cell__ft{
    width: px2rem(40);
    height: px2rem(40);
    background: url('/static/assets/images/more_list.png') no-repeat center;
    background-size:px2rem(40); 
    display: inline-block;
    right: px2rem(0);
    top:px2rem(28);
    margin-right: 0;
}

.vux-number-round .vux-number-selector{
    width:px2rem(60);
    height: px2rem(60);
    border:0;
    border-radius: px2rem(10);
}
.vux-number-round .vux-number-input{
    width: px2rem(88);
    height: px2rem(58);
    border:1px solid #bfbfbf;
    margin:0 px2rem(18);
    border-radius: px2rem(10);
}
</style>
