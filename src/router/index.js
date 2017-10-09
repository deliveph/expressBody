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
                title: '快递宝宝'
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
            component: Collection
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
            component: Userindex
        }, //个人主页面 
        {
            path: '/person',
            name: 'Person',
            component: Person
        }, //个人资料 
        {
            path: '/explain',
            name: 'explain',
            component: explain
        }, //服务与说明 
        {
            path: '/advise',
            name: 'advise',
            component: advise
        }, //投诉与建议 
        {
            path: '/league',
            name: 'league',
            component: league
        }, //加盟我们 
        {
            path: '/name',
            name: 'changename',
            component: Changename
        }, //昵称 
        {
            path: '/editaddr',
            name: 'editaddr',
            component: editaddr
        }, //编辑地址 
        {
            path: '/balance',
            name: 'balance',
            component: balance
        }, //余额 
        {
            path: '/inquire',
            name: 'Inquire',
            component: Inquire
        }, //查询快递 
        {
            path: '/result',
            name: 'Result',
            component: Result
        }, //快递结果 
        {
            path: '/send',
            name: 'Send',
            component: Send
        }, //寄快递 
        {
            path: '/Invite',
            name: 'Invite',
            component: Invite
        }, //邀请好友 
        {
            path: '/payresult',
            name: 'payResult',
            component: payResult
        }, //充值结果（成功/失败） 
        {
            path: '/payset',
            name: 'payset',
            component: payset
        }, //支付设置 
        {
            path: '/findpaypwd',
            name: 'findpaypwd',
            component: findpaypwd
        }, //找回支付密码 
        {
            path: '/coupon',
            name: 'coupon',
            component: coupon
        }, //我的优惠券 
        {
            path: '/order',
            name: 'order',
            component: order
        }, //全部订单 
        {
            path: '/waitaccept',
            name: 'waitaccept',
            component: waitaccept
        }, //待接单 
        {
            path: '/accept',
            name: 'accept',
            component: accept
        }, //已接单 
        {
            path: '/waitpay',
            name: 'waitpay',
            component: waitpay
        }, //待支付 
        {
            path: '/finish',
            name: 'finish',
            component: finish
        }, //已完成 
        {
            path: '/evaluate',
            name: 'evaluate',
            component: evaluate
        }, //去评价 
        {
            path: '/evalresult',
            name: 'evalresult',
            component: evalresult
        }, //评价结果页面 
        {
            path: '/confirm',
            name: 'confirm',
            component: confirm
        }, //确认订单 
        {
            path: '/orderdetail',
            name: 'orderdetail',
            component: orderdetail
        }, //订单详情 
        {
            path: '/repget',
            name: 'repget',
            component: repget
        }, //代收订单详情 
        {
            path: '/ordercancel',
            name: 'ordercancel',
            component: ordercancel
        }, //订单取消 
        {
            path: '/discount',
            name: 'discount',
            component: discount
        }, //领劵中心 
        {
            path: '/friends',
            name: 'friends',
            component: friends
        }, //好友列表
        {
            path: '/invitesuc',
            name: 'invitesuc',
            component: invitesuc
        }, //好友成功列表 
        {
            path: '/address/:attribute',
            name: 'address',
            component: address
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
            component: editAddress
        }, //添加地址和编辑地址（通过type来做判断） 
        {
            path: '/oldPassword',
            name: 'Oldpassword',
            component: Oldpassword
        }, //修改支付密码（旧密码） 
        {
            path: '/level',
            name: 'level',
            component: level
        }, //修改支付密码（旧密码） 
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
                title: '城市选择'
            }
        },
        // {
        //     path: '/session',
        //     name: 'session',
        //     component: session,
        //     meta: {
        //         title: '聊天'
        //     }
        // },
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
            component: setpaypw
        },
        // 最近消息列表（会话）
        {
            path: '/session',
            name: 'session',
            component: session,
            meta:{
                title: '消息'
            }
            // component (resolve) {
            //     require(['../pages/Session'], resolve)
            // }
        },
        // 聊天记录
        {
            path: '/chat/:sessionId',
            name: 'chat',
            component: chat
            // component (resolve) {
            //     require(['../pages/Chat'], resolve)
            // }
        },
        // 聊天历史记录
        {
            path: '/chathistory/:sessionId',
            name: 'chathistory',
            component: chathistory,
            meta:{
                title: '历史记录'
            }
            // component (resolve) {
            //     require(['../pages/ChatHistory'], resolve)
            // }
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