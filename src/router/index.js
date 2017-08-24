import Vue from 'vue'
import Router from 'vue-router'
import Banner from '@/components/banner'
import User from '@/components/user/index'
import explain from '@/components/user/explain'
import Person from '@/components/user/person'
import advise from '@/components/user/advise'
import league from '@/components/user/league'
import Changename from '@/components/user/changename'
import editaddr from '@/components/user/editaddr'
import balance from '@/components/user/balance'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'user', component: User },
    { path: '/person', name: 'Person', component: Person },//个人资料
    { path: '/explain', name: 'explain', component: explain }, //服务与说明
    { path: '/advise', name: 'advise', component: advise }, //投诉与建议
    { path: '/league', name: 'league', component: league }, //加盟我们
    { path: '/name', name: 'changename', component: Changename },//昵称
    { path: '/editaddr', name: 'editaddr', component: editaddr },//编辑地址
    { path: '/balance', name: 'balance', component: balance },//余额
  ]
})
