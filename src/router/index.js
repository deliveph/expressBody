import Vue from 'vue'
import Router from 'vue-router'
import configs from '../configs'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'login',
    component (resolve) {
      require(['../components/base/login'], resolve)
    },
    meta: {
      title: '共享快递哥'
    }
  }, /* 首次进入未登录页面 */
  {
    path: '/detail',
    name: 'Detail',
    component (resolve) {
      require(['../components/base/detail'], resolve)
    },
    meta: {
      title: '详情'
    }
  }, // 公共详情
  {
    path: '/recharge',
    name: 'Recharge',
    component (resolve) {
      require(['../components/base/recharge'], resolve)
    },
    meta: {
      title: '充值'
    }
  }, // 充值
  {
    path: '/collection',
    name: 'Collection',
    component (resolve) {
      require(['../components/base/collectionExpress'], resolve)
    },
    meta: {
      title: '代收件'
    }
  }, // 代收
  {
    path: '/update-collection-order',
    name: 'updateCollectionOrder',
    component (resolve) {
      require(['../components/base/updateCollectionOrder'], resolve)
    },
    meta: {
      title: '代收件'
    }
  },
  {
    path: '/open',
    name: 'open',
    component (resolve) {
      require(['../components/base/open'], resolve)
    },
    meta: {
      title: '申请开通'
    }
  }, // 申请开通
  {
    path: '/Userindex',
    name: 'Userindex',
    component (resolve) {
      require(['../components/user/index'], resolve)
    },
    meta: {
      title: '个人中心'
    }
  }, // 个人主页面
  {
    path: '/person',
    name: 'Person',
    component (resolve) {
      require(['../components/user/person'], resolve)
    },
    meta: {
      title: '个人资料'
    }
  }, // 个人资料
  {
    path: '/explain',
    name: 'explain',
    component (resolve) {
      require(['../components/user/explain'], resolve)
    },
    meta: {
      title: '服务与说明'
    }
  }, // 服务与说明
  {
    path: '/advise',
    name: 'advise',
    component (resolve) {
      require(['../components/user/advise'], resolve)
    },
    meta: {
      title: '投诉与建议'
    }
  }, // 投诉与建议
  {
    path: '/league',
    name: 'league',
    component (resolve) {
      require(['../components/user/league'], resolve)
    },
    meta: {
      title: '加盟我们'
    }
  }, // 加盟我们
  {
    path: '/name',
    name: 'changename',
    component (resolve) {
      require(['../components/user/changename'], resolve)
    },
    meta: {
      title: '修改昵称'
    }
  }, // 昵称
  {
    path: '/editaddr',
    name: 'editaddr',
    component (resolve) {
      require(['../components/user/editaddr'], resolve)
    },
    meta: {
      title: '编辑地址'
    }
  }, // 编辑地址
  {
    path: '/balance',
    name: 'balance',
    component (resolve) {
      require(['../components/user/balance'], resolve)
    },
    meta: {
      title: '余额'
    }
  }, // 余额
  {
    path: '/inquire',
    name: 'Inquire',
    component (resolve) {
      require(['../components/base/inquireExpress'], resolve)
    },
    meta: {
      title: '查询快递'
    }
  }, // 查询快递
  {
    path: '/result',
    name: 'Result',
    component (resolve) {
      require(['../components/base/inquireResult'], resolve)
    },
    meta: {
      title: '快递详情'
    }
  }, // 快递结果
  {
    path: '/send',
    name: 'Send',
    component (resolve) {
      require(['../components/base/sendExpress'], resolve)
    },
    meta: {
      title: '寄快递'
    }
  }, // 寄快递
  {
    path: '/update-ship-order',
    name: 'updateShipOrder',
    component (resolve) {
      require(['../components/base/updateShipOrder'], resolve)
    },
    meta: {
      title: '寄快递'
    }
  }, // 寄快递
  {
    path: '/Invite',
    name: 'Invite',
    component (resolve) {
      require(['../components/user/invite'], resolve)
    },
    meta: {
      title: '邀请好友',
      isNeedLogin: false
    }
  }, // 邀请好友
  {
    path: '/payresult',
    name: 'payResult',
    component (resolve) {
      require(['../components/user/payResult'], resolve)
    },
    meta: {
      title: '充值结果'
    }
  }, // 充值结果（成功/失败）
  {
    path: '/payset',
    name: 'payset',
    component (resolve) {
      require(['../components/user/paysetting'], resolve)
    },
    meta: {
      title: '支付设置'
    }
  }, // 支付设置
  {
    path: '/findpaypwd',
    name: 'findpaypwd',
    component (resolve) {
      require(['../components/user/findpaypwd'], resolve)
    },
    meta: {
      title: '找回支付密码'
    }
  }, // 找回支付密码
  {
    path: '/coupon',
    name: 'coupon',
    component (resolve) {
      require(['../components/user/coupon'], resolve)
    },
    meta: {
      title: '我的优惠券'
    }
  }, // 我的优惠券
  {
    path: '/order',
    name: 'order',
    component (resolve) {
      require(['../components/user/order'], resolve)
    },
    meta: {
      title: '全部订单'
    }
  }, // 全部订单
  {
    path: '/waitaccept',
    name: 'waitaccept',
    component (resolve) {
      require(['../components/user/waitaccept'], resolve)
    },
    meta: {
      title: '待接单'
    }
  }, // 待接单
  {
    path: '/accept',
    name: 'accept',
    component (resolve) {
      require(['../components/user/accept'], resolve)
    },
    meta: {
      title: '已接单'
    }
  }, // 已接单
  {
    path: '/waitpay',
    name: 'waitpay',
    component (resolve) {
      require(['../components/user/waitpay'], resolve)
    },
    meta: {
      title: '待支付'
    }
  }, // 待支付
  {
    path: '/finish',
    name: 'finish',
    component (resolve) {
      require(['../components/user/finish'], resolve)
    },
    meta: {
      title: '已完成'
    }
  }, // 已完成
  {
    path: '/evaluate',
    name: 'evaluate',
    component (resolve) {
      require(['../components/user/evaluate'], resolve)
    },
    meta: {
      title: '去评价'
    }
  }, // 去评价
  {
    path: '/evalresult',
    name: 'evalresult',
    component (resolve) {
      require(['../components/user/evalresult'], resolve)
    },
    meta: {
      title: '评价'
    }
  }, // 评价结果页面
  {
    path: '/confirm',
    name: 'confirm',
    component (resolve) {
      require(['../components/user/confirm'], resolve)
    },
    meta: {
      title: '确认订单'
    }
  }, // 确认订单
  {
    path: '/orderdetail',
    name: 'orderdetail',
    component (resolve) {
      require(['../components/user/orderdetail'], resolve)
    },
    meta: {
      title: '订单详情'
    }
  }, // 订单详情
  {
    path: '/repget',
    name: 'repget',
    component (resolve) {
      require(['../components/user/repget'], resolve)
    },
    meta: {
      title: '订单详情'
    }
  }, // 代收订单详情
  {
    path: '/ordercancel',
    name: 'ordercancel',
    component (resolve) {
      require(['../components/user/ordercancel'], resolve)
    },
    meta: {
      title: '取消订单'
    }
  }, // 订单取消
  {
    path: '/discount',
    name: 'discount',
    component (resolve) {
      require(['../components/user/discount'], resolve)
    },
    meta: {
      title: '领劵中心'
    }
  }, // 领劵中心
  {
    path: '/friends',
    name: 'friends',
    component (resolve) {
      require(['../components/user/friends'], resolve)
    },
    meta: {
      title: '好友列表'
    }
  }, // 好友列表
  {
    path: '/invitesuc',
    name: 'invitesuc',
    component (resolve) {
      require(['../components/user/invitesuc'], resolve)
    },
    meta: {
      title: '扫码关注二维码'
    }
  }, // 好友成功列表
  {
    path: '/address/:attribute',
    name: 'address',
    component (resolve) {
      require(['../components/user/address'], resolve)
    },
    meta: {
      title: '地址列表'
    }
  }, // 地址列表
  {
    path: '/modifypwd',
    name: 'modifypwd',
    component (resolve) {
      require(['../components/user/modifypwd'], resolve)
    },
    meta: {
      title: '修改密码'
    }
  }, // 修改密码
  {
    path: '/editaddress/:attribute',
    name: 'editAddress',
    component (resolve) {
      require(['../components/address'], resolve)
    },
    meta: {
      title: '地址'
    }
  }, // 添加地址和编辑地址（通过type来做判断）
  {
    path: '/oldPassword',
    name: 'Oldpassword',
    component (resolve) {
      require(['../components/payment/oldPassword'], resolve)
    },
    meta: {
      title: '修改支付密码'
    }
  }, // 修改支付密码（旧密码）
  {
    path: '/level',
    name: 'level',
    component (resolve) {
      require(['../components/user/level'], resolve)
    },
    meta: {
      title: '等级'
    }
  }, // 等级
  {
    path: '/service',
    name: 'service',
    component (resolve) {
      require(['../components/base/express'], resolve)
    },
    meta: {
      title: '个人中心'
    }
  }, // 快递宝宝首页
  {
    path: '/statistics',
    name: 'statistics',
    component (resolve) {
      require(['../components/user/statistics'], resolve)
    },
    meta: {
      title: '我的统计'
    }
  }, // 我的统计
  {
    path: '/user',
    name: 'user',
    component (resolve) {
      require(['../components/base/home'], resolve)
    },
    meta: {
      title: '共享快递哥'
    }
  }, //
  {
    path: '/suggest',
    name: 'suggest',
    component (resolve) {
      require(['../components/suggest/suggest'], resolve)
    },
    meta: {
      title: '切换城市'
    }
  },
    // 客服全部订单
  {
    path: '/serviceOrder',
    name: 'serviceOrder',
    component (resolve) {
      require(['../components/service/order'], resolve)
    },
    meta: {
      title: '全部订单'
    }
  },
        // 设置支付密码
  {
    path: '/setpaypw',
    name: 'setpaypw',
    component (resolve) {
      require(['../components/payment/settingpaypw'], resolve)
    },
    meta: {
      title: '设置支付密码'
    }
  },
        // 最近消息列表（会话）
  {
    path: '/session',
    name: 'session',
    component (resolve) {
      require(['../pages/Session'], resolve)
    },
    meta: {
      title: '消息'
    }
  }, // 聊天记录
  {
    path: '/chat/:sessionId',
    name: 'chat',
    component (resolve) {
      require(['../pages/Chat'], resolve)
    },
    meta: {
      title: '聊天'
    }
  }, // 聊天历史记录
  {
    path: '/chathistory/:sessionId',
    name: 'chathistory',
    component (resolve) {
      require(['../pages/ChatHistory'], resolve)
    },
    meta: {
      title: '历史记录'
    }
  }
  ]
})

// 全局配置
router.beforeEach((to, from, next) => {
  let loginToken = to.query.token
  if (loginToken !== undefined) {
    // 持久化登录
    localStorage.setItem('loginTokenData', JSON.stringify({
      'loginToken': loginToken,
      'time': new Date().getTime()
    }))
  }
  if (to.meta.isNeedLogin !== undefined && to.meta.isNeedLogin === false) {
    next()
  } else {
    let loginTokenDataOfLocalStorage = JSON.parse(localStorage.getItem('loginTokenData'))
    if (loginTokenDataOfLocalStorage === null ||
        loginTokenDataOfLocalStorage.loginToken === undefined ||
        loginTokenDataOfLocalStorage.time === undefined ||
        (new Date().getTime() - loginTokenDataOfLocalStorage.time) > 7180 * 1000) {
        // 微信授权登录
      location.href = configs.apiDomain + '/weixin/auth-gateway?redirect_uri=' + encodeURIComponent(location.href)
      next(false)
    } else {
      loginToken = loginTokenDataOfLocalStorage.loginToken
      next()
    }
  }
  configs.loginToken = loginToken
})

export default router
