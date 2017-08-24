import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/base/home'
import Detail from '@/components/base/detail'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(Router)
Vue.use(VueAwesomeSwiper)

export default new Router({
    routes: [{
        path: '/home',
        name: 'Home',
        component: Home
    }, {
        path: '/detail',
        name: 'Detail',
        component: Detail
    }]
})