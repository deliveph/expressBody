<template>
    <div class="wrapper">
        <div class="nom">
            <div class="nom-info">

                <dl class="nom-info-box col-9">
                    <dt>
                        <router-link :to="{path:'/person',query:{type:'user'}}"><img :src="data.user_avatar == undefined ? '/static/assets/images/head_def.png': data.user_avatar" alt=""></router-link>
                    </dt>
                    <dd>
                        <p class="nom-info-name">
                            <router-link to="" href="javascript:;" v-if="data.user_nickname == undefined">未登录</router-link>
                            <router-link :to="{path:'/person',query:{type:'user'}}" v-else>{{ data.user_nickname }}</router-link>
                        </p>
                        <router-link :to="{path:'level',query:user_level}">
                            <grade class="m0" :src="user_level_logo"></grade>
                        </router-link>
                    </dd>
                </dl>
                <div class="col-1 nom-arrow">
                    <router-link :to="{path:'/person',query:{type:'user'}}">
                        <span></span>
                    </router-link>
                </div>

            </div>
        </div>
        <div class="actions">
            <ul>
                <li>
                    <router-link to="/balance">
                        <div class="actions-num">
                            <em>{{data.user_balance}}</em>
                            <i class="balace"></i>
                        </div>
                        <span class="dis t-c">我的金额(豆)</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/coupon">
                        <div class="actions-num">
                            <em>{{items.user_coupon_number}}</em>
                            <i class="coupon"></i>
                        </div>
                        <span class="dis t-c">我的优惠券(张)</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/friends">
                        <div class="actions-num">
                            <em>{{data.user_total_invite}}</em>
                            <i class="friend"></i>
                        </div>
                        <span class="dis t-c">我的好友(个)</span>
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="cen-list">
            <div class="cen-item">
                <div class="all-order">
                    <span>全部订单</span>
                    <router-link :to="{name:'order'}">查看全部订单
                        <i class="arrow-right"></i>
                    </router-link>
                </div>
                <ul class="order-list">
                    <li>
                        <router-link :to="{path:'waitaccept',query:{express_order_status:'wait_order'}}">
                            <i class="oicon1"></i>
                            <em>待接单</em>
                            <span v-if="items.total_wait_order != 0">{{items.total_wait_order}}</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path:'accept',query:{express_order_status:'have_order'}}">
                            <i class="oicon2"></i>
                            <em>已接单</em>
                            <span v-if="items.total_have_order != 0">{{items.total_have_order}}</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path:'waitpay',query:{express_order_status:'unpaid'}}">
                            <i class="oicon3"></i>
                            <em>待支付</em>
                            <span v-if="items.total_unpaid_order != 0">{{items.total_unpaid_order}}</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path:'finish',query:{express_order_status:'wait_comment'}}">
                            <i class="oicon4"></i>
                            <em>待评价</em>
                            <span v-if="items.total_wait_comment_order != 0">{{items.total_wait_comment_order}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="cen-item">
                <ul class="some-item">
                    <li @click="share = !share">
                        <router-link to="" href="javascript:;">
                            <span>
                                <i class="icon1"></i>邀请好友</span>
                            <em>
                                <i class="arrow-right"></i>
                            </em>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/league">
                            <span>
                                <i class="icon2"></i>加盟我们</span>
                            <em>
                                <i class="arrow-right"></i>
                            </em>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/address/shipper">
                            <span>
                                <i class="icon3"></i>地址列表</span>
                            <em>
                                <i class="arrow-right"></i>
                            </em>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="cen-item">
                <ul class="some-item">
                    <li>
                        <router-link to="/advise">
                            <span>
                                <i class="icon4"></i>投诉与建议</span>
                            <em>
                                <i class="arrow-right"></i>
                            </em>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/explain">
                            <span>
                                <i class="icon5"></i>服务与说明</span>
                            <em>
                                <i class="arrow-right"></i>
                            </em>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <shareshade v-show="share" @click.native="share = !share"></shareshade>
    </div>
</template>
<script>
import Grade from '../../components/grade'
import Shareshade from '../base/public/shareShade'
export default {
  components: {
    Grade,
    Shareshade
  },
  data () {
    return {
      items: [],
      data: {},
      share: false,
      user_level: {},
      user_level_logo: '/static/assets/images/user_level/icon_1_shaowei.png'
    }
  },
  created () {
    let that = this
    this.http(that.configs.apiTop + '/page/user-personal-center', 'get', '', function (res) {
      let msg = res.data
      if (msg.code == 0) {
          that.items = msg.data
          that.data = msg.data.user
          that.user_level = that.data.user_level
          that.user_level_logo = that.user_level.user_level_logo
        }
    })
  }
}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss" scoped>
@import '../../../static/assets/css/px2rem.scss';
</style>