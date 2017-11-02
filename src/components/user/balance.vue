<template>
    <div class="wrapper">
        <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="onPullupLoading" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
        <div class="banlance-wrapper">
            <div class="balace-banner">
                <ul class="document">
                    <li>
                        <router-link to="/payset">设置</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'Detail',query:{type:'user_balance_help'}}">使用帮助</router-link>
                    </li>
                </ul>
                <div class="bal-img"></div>
                <h6>{{sun}}</h6>
                <p>快递豆总余额(个)</p>
            </div>
            <ul class="balace-option">
                <li>
                    <router-link :to="{name:'Recharge'}">充值</router-link>
                </li>
                <li>
                    <button @click="share = !share">邀请好友</button>
                </li>
            </ul>
            <div class="structure mt20">
                <h1>收支明细</h1>
                <ul class="income-item" v-if="items.length != 0">
                    <li v-for="(item,i) in items" :key="i">
                        <div class="income-info col-6">
                            <p>{{item.consume_category_name}}
                                <em v-if="parseInt(item.flow_number.length) > 0">
                                        （订单号：{{item.flow_number}}）
                                    </em>
                            </p>
                            <span>{{item.create_time}}</span>
                        </div>
                        <div class="income-add col-6">
                            <p class="add t-r" v-if="parseInt(item.consume) > 0"> + {{item.consume}}</p>
                            <p class="subtract t-r" v-else-if="parseInt(item.consume) < 0">{{item.consume}}</p>
                        </div>
                    </li>
                </ul>
                <div class="no-balance" v-else>
                    <img src="/static/assets/images/no_record.png" alt="">
                    <p>暂无余额明细</p>
                </div>
            </div>
        </div>
        <shareshade v-show="share" @click.native="share = !share"></shareshade>
        <!--pullup slot-->
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
            <span v-show="status.pullupStatus === 'default'"></span>
            <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
            <span v-show="status.pullupStatus === 'loading'">
                <spinner type="ios-small"></spinner>
            </span>
        </div>    
        </scroller>
    </div>
</template>

<script>
import Shareshade from '../base/public/shareShade'
import { Scroller, Spinner, LoadMore } from 'vux'
export default {
  data () {
    return {
      n: 20,
      page: 1,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      items: [],
      sun: '',
      share: false
    }
  },
  components: {
    Shareshade,
    Scroller,
    Spinner,
    LoadMore
  },
  created () {
    let that = this
    that.http(that.configs.apiTop + '/page/user-balance?page=' + that.page, 'get', '', function (res) {
      let msg = res.data
      if (msg.code === 0) {
        let data = msg.data
        that.sun = data.user_balance
        if (data.user_finance_log.length > that.n) {
          data.user_finance_log.pop()
        } else {
          that.$nextTick(() => {
            that.$refs.scroller.disablePullup()
          })
        }
        that.items = data.user_finance_log
      } else {
        that.$vux.toast.text(msg.message, 'middle', 100)
      }
    })
  },
  methods: {
    onPullupLoading () {
      let that = this
      that.page++
      that.http(that.configs.apiTop + '/page/user-balance?page=' + that.page, 'get', '', function (res) {
        let msg = res.data
        if (msg.code === 0) {
          let data = msg.data
          that.$refs.scroller.donePullup()
          that.sun = data.user_balance
          if (data.user_finance_log.length > that.n) {
            data.user_finance_log.pop()
          } else {
            that.$refs.scroller.disablePullup()
          }
          that.items.push(...data.user_finance_log)
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
    refresh () {
      let that = this
      that.page = 1
      that.http(that.configs.apiTop + '/page/user-balance?page=' + that.page, 'get', '', function (res) {
        let msg = res.data
        if (msg.code === 0) {
          let data = msg.data
          that.$refs.scroller.donePulldown()
          that.sun = data.user_balance
          if (data.user_finance_log.length > that.n) {
            data.user_finance_log.pop()
            that.$refs.scroller.enablePullup()
          } else {
            that.$refs.scroller.disablePullup()
          }
          that.items = data.user_finance_log
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
    shareClick () {
      this.share = true
    }
  }
}
</script>

<style lang="scss" scoped src="../../../static/assets/css/user.scss">
    
</style>

<style lang="scss" scoped>
    @import '../../../static/assets/css/px2rem.scss';
    .no-balance {
        padding-bottom: px2rem(80);
    }
</style>