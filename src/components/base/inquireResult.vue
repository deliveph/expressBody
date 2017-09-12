<template>
    <div id="expressResult">
        <div class="result_title">
            <p>承运公司：
                <span>{{company_name}}</span>
            </p>
            <p class="mt20">运单编号：
                <span>{{code}}</span>
            </p>
        </div>
        <div class="logistics_tracking">
            <h3>物流跟踪</h3>
            <ul>
                <li :class="k==0?'first':''" v-for="(item,k) in items" :key="k">
                    <i></i>
                    <div class="msg">
                        <p class="txt">{{item.station}}</p>
                        <p class="time">{{item.time}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            company_name: '暂无',
            code: '暂无',
            items: []
        }
    },
    components: {

    },
    methods: {

    },
    created() {
        let that = this
        let logistics_code = this.$route.query.code
        this.http(that.configs.apiTop + "/logistics/query-logistics?logistics_code=" + logistics_code, "get", '', function(res) {
            let msg = res.data
            if (msg.code == 0) {
                that.company_name = msg.data.logistics_company_name
                that.code = msg.data.logistics_code
                that.items = msg.data.logistics_log
                // location.reload();
            } else if (msg.code == 40004) {
                // location.href = that.configs.accreditUrl
            } else {
                that.$vux.toast.text(msg.message, 'middle', 100);
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/px2rem.scss';
.result_title {
    margin-top: px2rem(20);
    padding: px2rem(30);
    font-size: px2rem(30);
    color: #333;
    background-color: #fff;
}

.logistics_tracking {
    background-color: #fff;
    margin-top: px2rem(20);
    h3 {
        height: px2rem(88);
        line-height: px2rem(88);
        font-size: px2rem(30);
        color: #333;
        border-bottom: 1px solid #dddddc;
        padding: 0 px2rem(30);
    }
    ul {
        padding: px2rem(0) px2rem(30) px2rem(24);
        margin-top: px2rem(32);
    }
    li {
        font-size: px2rem(28);
        color: #999;
        border-left: 2px solid #dddddc;
        padding-left: px2rem(60);
        position: relative;
        &.first {
            color: #27ba4e;
            i {
                width: px2rem(30);
                height: px2rem(30);
                background: url('/static/assets/images/icon_logistics_record.png') no-repeat center;
                background-size: px2rem(30);
                top: px2rem(-10);
                left: px2rem(-16);
            }
        }
        &:last-child {
            .msg {
                border-bottom: 0;
            }
        }
        i {
            width: px2rem(16);
            height: px2rem(16);
            background: url('/static/assets/images/icon_logistics_record2.png') no-repeat center;
            background-size: px2rem(16);
            display: inline-block;
            position: absolute;
            left: px2rem(-10);
            top: px2rem(10);
        }
        .msg {
            padding: px2rem(32) px2rem(0) px2rem(24);
            border-bottom: 1px solid #dddddc;
            p {
                line-height: px2rem(44)
            }
        }
        .time {
            margin-top: px2rem(26);
            font-size: px2rem(24);
        }
    }
}
</style>
