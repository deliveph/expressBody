import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/base/home'
import Detail from '@/components/base/detail'
import Recharge from '@/components/base/recharge'
import Collection from '@/components/base/collectionExpress'
import Userindex from '@/components/user/index'
import explain from '@/components/user/explain'
import Person from '@/components/user/person'
import advise from '@/components/user/advise'
import league from '@/components/user/league'
import Changename from '@/components/user/changename'
import editaddr from '@/components/user/editaddr'
import balance from '@/components/user/balance'
import Inquire from '@/components/base/inquireExpress'
import Invite from '@/components/user/invite'
import payResult from '@/components/user/payResult'
import payset from '@/components/user/paysetting'
import findpaypwd from '@/components/user/findpaypwd'
import coupon from '@/components/user/coupon'
import Result from '@/components/base/inquireResult'
import Send from '@/components/base/sendExpress'
import order from '@/components/user/order'
import waitaccept from '@/components/user/waitaccept'
import accept from '@/components/user/accept'
import waitpay from '@/components/user/waitpay'
import finish from '@/components/user/finish'
import evaluate from '@/components/user/evaluate'
import evalresult from '@/components/user/evalresult'
import confirm from '@/components/user/confirm'
import orderdetail from '@/components/user/orderdetail'
import repget from '@/components/user/repget'
import ordercancel from '@/components/user/ordercancel'
import discount from '@/components/user/discount'
import friends from '@/components/user/friends'
import invitesuc from '@/components/user/invitesuc'
import address from '@/components/user/address'
import modifypwd from '@/components/user/modifypwd'
import editAddress from '@/components/address'
import Oldpassword from '@/components/payment/oldPassword'
import level from '@/components/user/level'
import service from '@/components/base/express'
import statistics from '@/components/user/statistics'
import login from '@/components/base/login'
import suggest from '@/components/suggest/suggest'
// import session from '@/components/Im/session'
import serviceOrder from '@/components/service/order'
import setpaypw from '@/components/payment/settingpaypw'
import chathistory from '@/pages/ChatHistory'
import session from '@/pages/Session'
import chat from '@/pages/Chat'
import Open from '@/components/base/open'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: login,
            meta: {
                title: '共享快递哥'
            }
        }, /*首次进入未登录页面*/
        {
            path: '/detail',
            name: 'Detail',
            component: Detail,
            meta: {
                title: '详情'
            }
        }, //公共详情 
        {
            path: '/recharge',
            name: 'Recharge',
            component: Recharge,
            meta: {
                title: '充值'
            }
        }, //充值 
        {
            path: '/collection',
            name: 'Collection',
            component: Collection,
            meta: {
                title: '收件'
            }
        }, //代收
        {
            path: '/open',
            name: 'open',
            component: Open,
            meta: {
                title: '申请开通'
            }
        }, //申请开通
        {
            path: '/Userindex',
            name: 'Userindex',
            component: Userindex,
            meta: {
                title: '个人中心'
            }
        }, //个人主页面 
        {
            path: '/person',
            name: 'Person',
            component: Person,
            meta: {
                title: '个人资料'
            }
        }, //个人资料 
        {
            path: '/explain',
            name: 'explain',
            component: explain,
            meta: {
                title: '服务与说明'
            }
        }, //服务与说明 
        {
            path: '/advise',
            name: 'advise',
            component: advise,
            meta: {
                title: '投诉与建议'
            }
        }, //投诉与建议 
        {
            path: '/league',
            name: 'league',
            component: league,
            meta: {
                title: '加盟我们'
            }
        }, //加盟我们 
        {
            path: '/name',
            name: 'changename',
            component: Changename,
            meta: {
                title: '修改昵称'
            }
        }, //昵称 
        {
            path: '/editaddr',
            name: 'editaddr',
            component: editaddr,
            meta: {
                title: '编辑地址'
            }
        }, //编辑地址 
        {
            path: '/balance',
            name: 'balance',
            component: balance,
            meta: {
                title: '余额'
            }
        }, //余额 
        {
            path: '/inquire',
            name: 'Inquire',
            component: Inquire,
            meta: {
                title: '查询快递'
            }
        }, //查询快递 
        {
            path: '/result',
            name: 'Result',
            component: Result,
            meta: {
                title: '快递详情'
            }
        }, //快递结果 
        {
            path: '/send',
            name: 'Send',
            component: Send,
            meta: {
                title: '寄快递'
            }
        }, //寄快递 
        {
            path: '/Invite',
            name: 'Invite',
            component: Invite,
            meta: {
                title: '邀请好友'
            }
        }, //邀请好友 
        {
            path: '/payresult',
            name: 'payResult',
            component: payResult,
            meta: {
                title: '充值结果'
            }
        }, //充值结果（成功/失败） 
        {
            path: '/payset',
            name: 'payset',
            component: payset,
            meta: {
                title: '支付设置'
            }
        }, //支付设置 
        {
            path: '/findpaypwd',
            name: 'findpaypwd',
            component: findpaypwd,
            meta: {
                title: '找回支付密码'
            }
        }, //找回支付密码 
        {
            path: '/coupon',
            name: 'coupon',
            component: coupon,
            meta: {
                title: '我的优惠券'
            }
        }, //我的优惠券 
        {
            path: '/order',
            name: 'order',
            component: order,
            meta: {
                title: '全部订单'
            }
        }, //全部订单 
        {
            path: '/waitaccept',
            name: 'waitaccept',
            component: waitaccept,
            meta: {
                title: '待接单'
            }
        }, //待接单 
        {
            path: '/accept',
            name: 'accept',
            component: accept,
            meta: {
                title: '已接单'
            }
        }, //已接单 
        {
            path: '/waitpay',
            name: 'waitpay',
            component: waitpay,
            meta: {
                title: '待支付'
            }
        }, //待支付 
        {
            path: '/finish',
            name: 'finish',
            component: finish,
            meta: {
                title: '已完成'
            }
        }, //已完成 
        {
            path: '/evaluate',
            name: 'evaluate',
            component: evaluate,
            meta: {
                title: '去评价'
            }
        }, //去评价 
        {
            path: '/evalresult',
            name: 'evalresult',
            component: evalresult,
            meta: {
                title: '评价'
            }
        }, //评价结果页面 
        {
            path: '/confirm',
            name: 'confirm',
            component: confirm,
            meta: {
                title: '确认订单'
            }
        }, //确认订单 
        {
            path: '/orderdetail',
            name: 'orderdetail',
            component: orderdetail,
            meta: {
                title: '订单详情'
            }
        }, //订单详情 
        {
            path: '/repget',
            name: 'repget',
            component: repget,
            meta: {
                title: '订单详情'
            }
        }, //代收订单详情 
        {
            path: '/ordercancel',
            name: 'ordercancel',
            component: ordercancel,
            meta: {
                title: '取消订单'
            }
        }, //订单取消 
        {
            path: '/discount',
            name: 'discount',
            component: discount,
            meta: {
                title: '领劵中心'
            }
        }, //领劵中心 
        {
            path: '/friends',
            name: 'friends',
            component: friends,
            meta: {
                title: '好友列表'
            }
        }, //好友列表
        {
            path: '/invitesuc',
            name: 'invitesuc',
            component: invitesuc,
            meta: {
                title: '扫码关注二维码'
            }
        }, //好友成功列表 
        {
            path: '/address/:attribute',
            name: 'address',
            component: address,
            meta: {
                title: '地址列表'
            }
        }, //地址列表 
        {
            path: '/modifypwd',
            name: 'modifypwd',
            component: modifypwd,
            meta: {
                title: '修改密码'
            }
        }, //修改密码 
        {
            path: '/editaddress/:attribute',
            name: 'editAddress',
            component: editAddress,
            meta: {
                title: '地址'
            }
        }, //添加地址和编辑地址（通过type来做判断） 
        {
            path: '/oldPassword',
            name: 'Oldpassword',
            component: Oldpassword,
            meta: {
                title: '修改支付密码'
            }
        }, //修改支付密码（旧密码） 
        {
            path: '/level',
            name: 'level',
            component: level,
            meta: {
                title: '等级'
            }
        }, //等级
        {
            path: '/service',
            name: 'service',
            component: service,
            meta: {
                title: '个人中心'
            }
        }, //快递宝宝首页 
        {
            path: '/statistics',
            name: 'statistics',
            component: statistics,
            meta: {
                title: '我的统计'
            }
        }, //我的统计
        {
            path: '/user',
            name: 'user',
            component: User
        }, //
        {
            path: '/suggest',
            name: 'suggest',
            component: suggest,
            meta: {
                title: '切换城市'
            }
        },
        //客服全部订单
        {
            path: '/serviceOrder',
            name: 'serviceOrder',
            component: serviceOrder,
            meta: {
                title: '全部订单'
            }
        },
        //设置支付密码
        {
            path: '/setpaypw',
            name: 'setpaypw',
            component: setpaypw,
            meta:{
                title: '设置支付密码'
            }
        },
        // 最近消息列表（会话）
        {
            path: '/session',
            name: 'session',
            component: session,
            meta:{
                title: '消息'
            }
        },
        // 聊天记录
        {
            path: '/chat/:sessionId',
            name: 'chat',
            component: chat,
            meta:{
                title: '聊天'
            }
        },
        // 聊天历史记录
        {
            path: '/chathistory/:sessionId',
            name: 'chathistory',
            component: chathistory,
            meta:{
                title: '历史记录'
            }
        }
    ]
})

// 全局配置
// router.beforeEach((to, from, next) => {
//   // Change doc title
//   document.title = to.meta.title || 'Unknow title'
//   document.querySelector('meta[name="keywords"]').setAttribute('content', 'keywords')
//   document.querySelector('meta[name="description"]').setAttribute('content', 'description')
// })