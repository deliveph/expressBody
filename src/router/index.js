import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/base/home'
import Detail from '@/components/base/detail'
import Recharge from '@/components/base/recharge'
import Collection from '@/components/base/collectionExpress'
import User from '@/components/user/index'
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
<<<<<<< HEAD
import Result from '@/components/base/inquireResult'
import Send from '@/components/base/sendExpress'
=======
>>>>>>> 9cd89c6c896c732015be5e92859d52a5bdd04c2b

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home }, /*首页*/
    { path: '/detail', name: 'Detail', component: Detail }, //公共详情
    { path: '/recharge', name: 'Recharge', component: Recharge }, //充值
    { path: '/collection', name: 'Collection', component: Collection }, //代收
    { path: '/user', name: 'user', component: User }, //个人主页面
    { path: '/person', name: 'Person', component: Person },//个人资料
    { path: '/explain', name: 'explain', component: explain }, //服务与说明
    { path: '/advise', name: 'advise', component: advise }, //投诉与建议
    { path: '/league', name: 'league', component: league }, //加盟我们
    { path: '/name', name: 'changename', component: Changename },//昵称
    { path: '/editaddr', name: 'editaddr', component: editaddr },//编辑地址
    { path: '/balance', name: 'balance', component: balance }, //余额
    { path: '/inquire', name: 'Inquire', component: Inquire },  //查询快递
<<<<<<< HEAD
    { path: '/result', name: 'Result', component: Result },  //快递结果
    { path: '/send', name: 'Send', component: Send }  //寄快递
=======
>>>>>>> 9cd89c6c896c732015be5e92859d52a5bdd04c2b
    { path: '/Invite', name: 'Invite', component: Invite }, //邀请好友
    { path: '/result', name: 'payResult', component: payResult }, //充值结果（成功/失败）
    { path: '/payset', name: 'payset', component: payset },//支付设置
    { path: '/findpaypwd', name: 'findpaypwd', component: findpaypwd },//找回支付密码
    { path: '/coupon', name: 'coupon', component: coupon },//我的优惠券
  ]
})