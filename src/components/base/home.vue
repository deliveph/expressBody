<template>
  <div id="home" class="home">
      <Vheader></Vheader>
      <div class="hg20"></div>
      <banner></banner>
      <div class="entrance_list">
        <ul>
            <li>
                <a href="#">
                    <img src="/static/assets/images/btn_shou@2x.png" />
                    <p>代收快递</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="/static/assets/images/btn_ji.png" />
                    <p>代寄快递</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="/static/assets/images/btn_cha.png" />
                    <p>查询快递</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="/static/assets/images/btn_me.png" />
                    <p>个人中心</p>
                </a>
            </li>
        </ul>
      </div>
      <div class="hg30"></div>
      <div class="advertisement_banner">
        <img src="/static/assets/images/banner.png" />
      </div>
      <div class="footer_btn">
        <ul>
            <li>
                <a href="javascript:;" v-on:click="messageBox">免费寄快递</a>
            </li>
            <li>
                <a href="#">免费代收快递</a>
            </li>
        </ul>
      </div>
      <layer></layer>
  </div>
</template>

<script>
import Vheader from '../base/public/header'
import Banner from '../base/public/banner'
import Layer from '../base/public/layer'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import { MessageBox } from 'mint-ui'
export default {
    components:{
      Vheader,
      Banner,
      Layer,
      MessageBox
    },
    methods:{
        messageBox(){
            MessageBox.confirm('', {
                message: 'xxx,你确定？',
                title: '提示',
                confirmButtonText: 'abc',
                cancelButtonText: '123'
            }).then(action => {
                if (action == 'confirm') {
                    console.log('abc');
                }
            }).catch(err => {
                if (err == 'cancel') {
                    console.log('123');
                }
            });
        }  
    },
    computed:{
        // messageBox(){
        //     MessageBox({
        //         title: '提示',
        //         message: '确定执行此操作?',
        //         showCancelButton: true
        //     });
        // }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../../static/assets/css/home.scss';
</style>
