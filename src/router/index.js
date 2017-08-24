import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/base/home'
import Detail from '@/components/base/detail'
import Recharge from '@/components/base/recharge'
import Collection from '@/components/base/collectionExpress'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(Router)
Vue.use(VueAwesomeSwiper)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/detail', name: 'Detail', component: Detail },
    { path: '/recharge', name: 'Recharge', component: Recharge },
    { path: '/collection', name: 'Collection', component: Collection }
    
  ]
})
