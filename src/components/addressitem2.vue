<template>
    <div class="address">
        <ul class="address-list" v-if="items.length != 0">
            <li v-for="(item,k) in items" :key="k">
                <div class="address-info">
                    <dl>
                        <dt>{{item.consignee_name}}</dt>
                        <dd>{{item.consignee_phone}}</dd>
                    </dl>
                    <p>{{item.consignee_full_address}}</p>
                </div>
                <div class="address-tues">
                    <div class="address-default" v-if="item.is_default_consignee_address == 'Y'">
                        <span>
                            <i></i>默认地址</span>
                    </div>
                    <ul class="address-add">
                        <li class="addr-edit">
                            <!-- type 0寄件 1收件人 -->
                            <router-link :to="{path:'/editAddress/'+item.consignee_address_id,query:{type:1}}">
                                <span>
                                    <i></i>编辑</span>
                            </router-link>
                        </li>
                        <li class="addr-del" @click="ondelete(item.consignee_address_id)">
                            <span>
                                <i></i>删除</span>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="no-address" v-else>
            <img src="/static/assets/images/no_site.png" alt="" class="no-address-img">
            <p class="no-title">你尚未设置收货地址，现在去设置？</p>
        </div>
        <div class="add-address">
            <a v-on:click="addNew">添加新地址</a>
        </div>
    </div>
</template>
<script>
import { Confirm } from 'vux'
export default {
    data() {
        return {
            items: [],
            id: '',
            name:'',
            phone:'',
            address:'',
            is_default_shipper_address:'',
            show: false
        }
    },
    components: {
        Confirm
    },
    methods: {
        ondelete(id) {
            let that = this
            this.$vux.confirm.show({
                title: '提示',
                content: '您确定要删除此地址?',
                onShow() {
                },
                onHide() {

                },
                onCancel() {

                },
                onConfirm() {
                    that.http(that.configs.apiTop + "/address/delete-consignee-address/" + id, "get", '', function(res) {
                        let msg = res.data
                        if (msg.code == 0) {
                            location.reload();
                        } else if (msg.code == 40004) {
                            location.href = that.configs.accreditUrl
                        }
                    })
                }
            })
        },
        addNew() {
            let that = this
            let index = that.$parent.index
            this.$router.push({ name: 'editAddress', query: { type: index} })
        }
    },
    created() {
        let that = this
        let index = that.$parent.index
        if (index == 1) {
            this.http(that.configs.apiTop + "/address/consignee-addresses", "get", '', function(res) {
                let msg = res.data
                let consignee_addresses = msg.data.consignee_addresses
                console.log(consignee_addresses)
                if (msg.code == 0) {
                    that.items = consignee_addresses;
                    that.id = consignee_addresses.id;
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../static/assets/css/px2rem.scss';

.address-list {
    >li {
        margin-top: px2rem(20);
        padding: px2rem(30) 4%;
        background: #fff;
        .address-info {
            border-bottom: 1px solid #f1f1f1;
            dl {
                display: flex;
                dt,
                dd {
                    flex: 1;
                    font-size: px2rem(28);
                    color: #333;
                }
                dd {
                    text-align: right;
                }
            }
            p {
                font-size: px2rem(28);
                color: #666;
                line-height: px2rem(40);
                padding: px2rem(20) 0;
            }
        }
        .address-tues {
            display: flex;
            padding: px2rem(30) 0 0;
            .address-default {
                flex: 1;
                span {
                    color: #366931;
                    font-size: px2rem(28);
                    i {
                        width: px2rem(27);
                        height: px2rem(27);
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: px2rem(10);
                        background: url(../../static/assets/images/site_sel.png) no-repeat;
                        background-size: cover;
                    }
                }
            }
            .address-add {
                height: auto;
                display: flex;
                justify-content: flex-end;
                flex: 1;
                li {
                    margin-left: px2rem(20);
                    span {
                        font-size: px2rem(28);
                        color: #666;
                        i {
                            width: px2rem(28);
                            height: px2rem(28);
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: px2rem(10);
                        }
                    }
                    &.addr-edit {
                        i {
                            background: url(../../static/assets/images/site_redact.png) no-repeat;
                            background-size: cover;
                        }
                    }
                    &.addr-del {
                        i {
                            background: url(../../static/assets/images/site_delete.png) no-repeat;
                            background-size: cover;
                        }
                    }
                }
            }
        }
    }
}

.add-address {
    margin-top: px2rem(30);
    padding: 0 4%;
    a {
        display: block;
        height: px2rem(88);
        line-height: px2rem(88);
        text-align: center;
        color: #fff;
        font-size: px2rem(28);
        border-radius: px2rem(8);
        background: #366931;
    }
}

.no-address {
    padding-top: px2rem(400);
    .no-address-img {
        width: px2rem(250);
        height: px2rem(250);
        margin: 0 auto;
        display: block;
    }
    .no-title {
        font-size: px2rem(30);
        color: #666;
        margin-top: px2rem(40);
        text-align: center;
        padding-bottom: px2rem(120)
    }
}
</style>