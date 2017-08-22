import Vue from 'vue'
import Router from 'vue-router'
import Banner from '@/components/base/public/banner'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(Router)
Vue.use(VueAwesomeSwiper)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Banner',
      component: Banner
    }
  ]
})
