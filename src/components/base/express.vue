<template>
    <div>
        <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="onPullupLoading" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
            <div id="express" v-wechat-title="$route.meta.title">
                <div id="header" class="por express_head">
                    <ul>
                        <li class="courier_message">
                            <div class="photo">
                                <img :src="service.service_avatar == 'undefined' ? '/static/assets/images/head_def.png' : service.service_avatar" />
                                <div class="grade">
                                    <grade class="icon_express_1" :src="service_level_logo"></grade>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <router-link class="service_message poa" :to="{path: '/session'}">
                        <i v-if="unreadLen > 0"></i>
                    </router-link>
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
                            <router-link :to="{name:'Inquire',query:{status:'service'}}">
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
                <div class="order_list" v-if="isShow && items.length > 0">
                    <ul>
                        <div v-for="(item,i) in items" :key="i">
                            <div v-if="item.express_order_type == 'ship'">
                                <div v-for="(ship,s) in ships" :key="s">
                                    <div v-if="item.express_order_number == ship.ship_order_number">
                                        <li class="send">
                                            <router-link :to="{path:'orderdetail',query:{ship_order_number:ship.ship_order_number,status:'service'}}">
                                                <i class="icon_send"></i>
                                                <div class="odd">
                                                    <p class="order_number">订单号：
                                                        <span>{{ship.ship_order_number}}</span>
                                                    </p>
                                                    <div class="site">
                                                        <div class="starting">
                                                            <h4>{{ship.shipper_address_city_region_name}}</h4>
                                                            <p>{{ship.shipper_name}}</p>
                                                        </div>
                                                        <div class="center">
                                                        </div>
                                                        <div class="receipt">
                                                            <h4>{{ship.consignee_address_city_region_name}}</h4>
                                                            <p>{{ship.consignee_name}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="time">
                                                    <p>{{ship.ship_order_create_time}}</p>
                                                </div>
                                            </router-link>
                                        </li>
                                    </div>
                                </div>
                            </div>
                            <div v-if="item.express_order_type == 'collection'">
                                <div v-for="(collection,c) in collections" :key="c">
                                    <div v-if="item.express_order_number == collection.collection_order_number">
                                        <li class="put">
                                            <router-link :to="{path:'repget',query:{collection_order_number:collection.collection_order_number,status:'service'}}">
                                                <i class="icon_put"></i>
                                                <div class="odd">
                                                    <p class="order_number">订单号：
                                                        <span>{{collection.collection_order_number}}</span>
                                                    </p>
                                                    <p class="express_number">快递单号：
                                                        <span>{{collection.logistics_code}}</span>
                                                    </p>

                                                </div>
                                                <div class="time">
                                                    <p>{{collection.collection_order_create_time}}</p>
                                                </div>
                                            </router-link>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
                <div class="no-order" v-else>
                    <div class="no-img"></div>
                    <p>暂无订单</p>
                </div>
            </div>
            <!--pullup slot-->
            <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                <span v-show="status.pullupStatus === 'default'"></span>
                <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
                <span v-show="status.pullupStatus === 'loading'">
                    <spinner type="ios-small"></spinner>
                </span>
            </div>    
        </scroller>
        <LayerPw v-bind:Info="result"></LayerPw>
    </div>
</template>

<script>
import Grade from '../../components/grade'
import LayerPw from '../base/public/layer_pw'
import { Scroller, Spinner, LoadMore } from 'vux'
import Config from '../../configs'

export default {
  components: {
    Grade,
    LayerPw,
    Scroller,
    Spinner,
    LoadMore
  },
  computed: {
    unreadLen () {
      let unRead = 0
      for (let k in this.$store.state.sessionlist) {
        unRead += this.$store.state.sessionlist[k].unread
      }
      return unRead
    },
    isShow () {
      let that = this
      if (that.$store.state.isVerifyServiceStatus) {
        that.http(that.configs.apiTop + '/page/service-home', 'get', '', function (res) {
          let msg = res.data
          if (msg.code === 0) {
            let data = msg.data
            that.result = msg.data
            that.service = msg.data.service
            let service = data.service
            let serviceLevel = service.service_level
            that.service_level_logo = serviceLevel.service_level_logo
          }
        })
        that.orderlist()
        return true
      } else {
        return true
      }
    }
  },
  data () {
    return {
      n: 10,
      page: 1,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      layerPwhide: true,
      data: {},
      result: {},
      service: {},
      items: [],
      ships: [],
      collections: [],
      service_level_logo: Config.apiUpload + '/images/service_levels/1_liebing_s.png',
      unread: 0
    }
  },
  created () {
  },
  methods: {
    messageBox () {
    },
    onPullupLoading () {
      let that = this
      that.page++
      this.http(that.configs.apiTop + '/order/orders?express_order_status=wait_order&page=' + that.page, 'get', '', function (res) {
        let msg = res.data
        if (msg.code === 0) {
          let data = msg.data
          that.$refs.scroller.donePullup()
          that.ships = Object.assign(that.ships, data.ships)
          that.collections = Object.assign(that.collections, data.collections)
          if (data.items.length > that.n) {
            data.items.pop()
          } else {
            that.$refs.scroller.disablePullup()
          }
          that.items.push(...data.items)
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
    refresh () {
      let that = this
      that.page = 1
      this.http(that.configs.apiTop + '/order/orders?express_order_status=wait_order&page=' + that.page, 'get', '', function (res) {
        let msg = res.data
        if (msg.code === 0) {
          let data = msg.data
          that.$refs.scroller.donePulldown()
          that.ships = data.ships
          that.collections = data.collections
          if (data.items.length > that.n) {
            data.items.pop()
            that.$refs.scroller.enablePullup()
          } else {
            that.$refs.scroller.disablePullup()
          }
          that.items = data.items
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
    orderlist () {
      let that = this
      that.http(that.configs.apiTop + '/order/orders?page=1&express_order_status=wait_order', 'get', '', function (res) {
        let msg = res.data
        if (msg.code === 0) {
          let data = msg.data
          that.ships = data.ships
          that.collections = data.collections
          if (data.items.length > that.n) {
            data.items.pop()
          } else {
            that.$nextTick(() => {
              that.$refs.scroller.disablePullup()
            })
          }
          that.items = data.items
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    }
  },
  updated: function () {
  }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/px2rem.scss';
@import '../../../static/assets/css/home.scss';
.no-order {
    margin-top: px2rem(102);
    .no-img {
        background: url('/static/assets/images/no_indent.png') no-repeat;
        background-size: cover;
        width: px2rem(250);
        height: px2rem(250);
        margin: 0 auto;
    }
    p {
        text-align: center;
        font-size: px2rem(28);
        color: #999;
        margin-top: px2rem(40);
    }
}

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
    .service_message {
        top: px2rem(16);
        right: px2rem(30);
        width: px2rem(44);
        height: px2rem(44);
        background: url('/static/assets/images/btn_person_news.png') no-repeat center;
        background-size: px2rem(44);
        i {
            width:px2rem(14);
            height: px2rem(14);
            background-color:red;
            border-radius: 50%;
            position: absolute;
            top:px2rem(-1);
            right:px2rem(-1);
        }
    }
}

.statistics {
    height: px2rem(130);
    background-color: #fff;
    ul {
        display: flex;
        padding: px2rem(20) px2rem(10);
    }
    li {
        flex: 1;
        text-align: center;
        border-right: 1px solid #f0f2f5;
        height: px2rem(90);
        &:last-child {
            border-right: 0;
        }
        p {
            font-size: px2rem(28);
            color: #333;
            &.number {
                font-size: px2rem(30);
                color: #fd2073;
                margin-bottom: px2rem(16);
            }
        }
    }
}

.entrance_list {
    background-color: #fff;
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
        a {
            width: 100%;
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
        .time {
            font-size: px2rem(28);
            color: #999;
            height: px2rem(80);
            line-height: px2rem(80);
            border-top: 1px solid #e5e5e5;
            padding-left: px2rem(72);
            margin-top: px2rem(40);
            p {}
        }
    }
}
</style>
