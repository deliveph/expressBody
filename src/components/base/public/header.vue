<template>
    <div id="header" class="por">
        <router-link :to="{name:'suggest'}" class="orientation poa">
            {{address.start || position.address || '深圳'}}
            <i></i>
        </router-link>
        <ul>
            <li class="user_message">
                <router-link :to="{path:'/Userindex'}">
                    <div class="photo">
                        <img v-bind:src="user_avatar" />
                        <div class="grade">
                            <grade :src="user_level_logo"></grade>
                        </div>
                    </div>
                    <h3 class="name">{{user_nickname}}</h3>
                    <p>
                        <label for="">快递豆：</label>
                        <span>{{user_balance}}</span>
                        <i class="icon_bean"></i>
                    </p>
                </router-link>
            </li>
            <li class="courier_message" v-if="express">
                <h4 class="identify">您的专属快递哥</h4>
                <router-link to="" href="javascript:;">
                    <div class="photo">
                        <img :src="service_avatar" />
                        <div class="grade">
                            <grade :src="service_level_logo"></grade>
                        </div>
                    </div>
                </router-link>
                <h3 class="name">
                    <span>{{service_nickname}}</span>
                    <a class="icon_tel" @click="tel(service_tel)"></a>
                </h3>
                <p>
                    <label for="">工号：</label>
                    <span>{{service_id}}</span>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import Grade from '../../../components/grade'
import { mapState } from 'vuex'
export default {
  props: ['headerObject', 'express'],
  data () {
    return {
      token: '',
      userid: '',
      user_avatar: '/static/assets/images/head_def.png',
      user_nickname: '共享快递哥',
      service_avatar: '/static/assets/images/head_def.png',
      service_nickname: '雷锋',
      user_balance: '0',
      service_tel: '0769-82138159',
      user_level_logo: '/static/assets/images/user_level/icon_1_shaowei.png',
      service_level_logo: '/static/assets/images/platform_level/shangshi_s5.png',
      service_id: '80001'
    }
  },
  components: {
    Grade
  },
  computed: {
    ...mapState([
      'position',
      'address'
    ])
  },
  watch: {
    position (oldVal, newVal) { },
    headerObject () {
      let that = this
      let user = that.headerObject.user
      let service = that.headerObject.service
      let service1 = JSON.stringify(service)
      that.userid = user.user_id
      that.user_avatar = user.user_avatar
      that.user_nickname = user.user_nickname
      that.user_balance = user.user_balance
      that.user_level_logo = user.user_level.user_level_logo
      if (service1 !== '{}') {
        that.express = true
        that.service_id = service.service_id
        that.service_avatar = service.service_avatar
        that.service_nickname = service.service_nickname
        that.service_tel = service.service_phone
        let serviceLevel = service.service_level
        that.service_level_logo = serviceLevel.service_level_logo
      }
    },
    express () {
      return this.express
    }
  },
  created () {
  },
  methods: {
    tel (msg) {
      window.location.href = 'tel:' + msg
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../static/assets/css/home.scss';
</style>

