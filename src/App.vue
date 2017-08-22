<template>
  <div id="app">
      <Vheader></Vheader>
      <banner></banner>
      <page></page>
  </div>
</template>

<script>
// import '../src/static/assets/js/adaptive_mobile.js';
import Vheader from './components/base/public/header'
import Banner from './components/base/public/banner'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import Page from './components/page'
export default {
    components:{
      Vheader,
      Banner,
      Page
    },
    methods:{      
    }
}
</script>

<style>
/* @import '/static/assets/css/base.css'; */
#app {
  font-family: 'Avenir', 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
