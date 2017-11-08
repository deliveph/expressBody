<template>
    <div class="wrapper">
        <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="onPullupLoading" @on-pulldown-loading="refresh" v-model="status" ref="scroller" v-if="invite_users.length != 0">
        <div class="invite-wrapper">
            <h4><span>已邀请<i class="ft-red">{{ data.user_total_invite }}</i>人</span><span class="ml60">已获得<i class="ft-red">{{ data.user_total_invite_reward }}</i>快递豆</span></h4>
            <table class="invite-table">
                <thead>
                    <tr>
                        <th>账号</th>
                        <th>注册时间</th>
                        <th>奖励</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in invite_users" :key="item">
                        <td>{{ item.to_user_phone }}</td>
                        <td>{{ item.from_user_create_time }}</td>
                        <td>{{ item.from_user_reward }}快递豆</td>
                    </tr>
                </tbody>
            </table>
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
        <div class="no-friends" v-else>
            <img src="/static/assets/images/no_friend.png" alt="">
            <p>你还没有好友哦，快去邀请吧</p>
        </div>
    </div>
</template>
<script>
import { Scroller, Spinner, LoadMore } from 'vux'
export default{
  data () {
    return {
      n: 20,
      page: 1,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      data: {},
      invite_users: []
    }
  },
  components: {
    Scroller,
    Spinner,
    LoadMore
  },
  created () {
    let that = this
    this.http(that.configs.apiTop + '/user/invite-users?page=' + this.page, 'get', '', function (res) {
      let msg = res.data
      if (msg.code === 0) {
        let data = msg.data
        that.data = msg.data
        if (data.invite_users.length > that.n) {
          data.invite_users.pop()
        } else {
          that.$nextTick(() => {
            that.$refs.scroller.disablePullup()
          })
        }
        that.invite_users = data.invite_users
      } else {
        that.$vux.toast.text(msg.message, 'middle', 100)
      }
    })
  },
  methods: {
    onPullupLoading () {
      let that = this
      that.page++
      that.http(that.configs.apiTop + '/user/invite-users?page=' + that.page, 'get', '', function (res) {
        let msg = res.data
        if (msg.code === 0) {
          let data = msg.data
          that.$refs.scroller.donePullup()
          if (data.invite_users.length > that.n) {
            data.invite_users.pop()
          } else {
            that.$refs.scroller.disablePullup()
          }
          that.invite_users.push(...data.invite_users)
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
    refresh () {
      let that = this
      that.page = 1
      that.http(that.configs.apiTop + '/user/invite-users?page=' + that.page, 'get', '', function (res) {
        let msg = res.data
        if (msg.code === 0) {
          let data = msg.data
          that.$refs.scroller.donePulldown()
          if (data.invite_users.length > that.n) {
            data.invite_users.pop()
            that.$refs.scroller.enablePullup()
          } else {
            that.$refs.scroller.disablePullup()
          }
          that.invite_users = data.invite_users
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>