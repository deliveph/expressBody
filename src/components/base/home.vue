<template>
    <div id="home" class="home">
        <el-amap vid="amap" :plugin="plugin" class="amap-demo hide" :center="center">
        </el-amap>
        <div class="toolbar hide">
            <span v-if="loaded">
                location: lng = {{ lng }} lat = {{ lat }}
            </span>
            <span v-else>正在定位</span>
        </div>
        <Vheader :header-object="dataobject" :express="true"></Vheader>
        <div class="hg10"></div>
        <banner :carousel-category-id="1"></banner>
        <div class="entrance_list">
            <ul>
                <li>
                    <router-link :to="{name:'Collection'}">
                        <img src="/static/assets/images/btn_shou@2x.png" />
                        <p>代收快递</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Send'}">
                        <img src="/static/assets/images/btn_ji.png" />
                        <p>代寄快递</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Inquire',query:{status:'user'}}">
                        <img src="/static/assets/images/btn_cha.png" />
                        <p>查询快递</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Userindex'}">
                        <img src="/static/assets/images/btn_me.png" />
                        <p>个人中心</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="hg10"></div>
        <div class="advertisement_banner" v-if="homeTipImageUrl !== ''">
            <router-link :to="{name:'Detail',query:{type:'home_tip'}}">
                <img :src="homeTipImageUrl" />
            </router-link>
        </div>
        <div class="footer_btn">
            <ul>
                <li>
                    <router-link :to="{name:'Detail',query:{type:'bottom_menu'}}">免费寄快递</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Detail',query:{type:'bottom_menu'}}">免费代收快递</router-link>
                </li>
            </ul>
        </div>
        <!--完善资料弹出层  -->
        <div class="layer_warp layer_phone" v-if="is_perfect">
            <div class="layer_table">
                <div class="layer_table_cell">
                    <div class="layer_box">
                        <div class="layer_container">
                            <div class="message_box">
                                <p>为了方便您的使用</p>
                                <p>请完善您的资料</p>
                            </div>
                        </div>
                        <div class="layer_footer">
                            <div class="layer_footer_cancel">
                                <router-link tag="li" to="/"></router-link>
                                <button @click="cancel">取消</button>
                            </div>
                            <div class="layer_footer_confirm">
                                <button @click="confirm">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <draggable :header-object="dataobject"></draggable>
    </div>
</template>

<script>
import Vheader from '../base/public/header'
import Banner from '../base/public/banner'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueAMap from 'vue-amap'
import { Toast } from 'vux'
import qs from 'qs'
import draggable from '..//base/public/draggable'

// let map
export default {
  data () {
    let self = this
    return {
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      service: [],
      user: [],
      carousels: [],
      dataobject: {},
      is_perfect: false,
      plugin: [{
        pName: 'Geolocation',
        events: {
          init (o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              self.result = result
              if (result && result.position) {
                let that = self
                let data = qs.stringify({
                  'province_region_name': result.addressComponent.province,
                  'city_region_name': result.addressComponent.city,
                  'district_region_name': result.addressComponent.district,
                  'community_region_name': result.addressComponent.township,
                  'full_address': result.formattedAddress,
                  'latitude': result.position.lng,
                  'longitude': result.position.lat
                })
                that.http(that.configs.apiTop + '/user/report-user-location', 'post', data, function (res) {
                  let msg = res.data
                  if (msg.code !== 0) {
                    that.$vux.toast.text(msg.message, 'middle', 100)
                  }
                })
              }
            })
          }
        }
      }],
      homeTipImageUrl: ''
    }
  },
  components: {
    Vheader,
    Banner,
    VueAMap,
    Toast,
    qs,
    draggable
  },
  methods: {
    messageBox () {
    },
    confirm () {
      let that = this
      that.$router.push({ path: '/person', query: { type: 'user', is_perfect: 0 } })
    },
    cancel () {
      let that = this
      console.log('22312312312312')
      that.is_perfect = false
    }
  },
  computed: {
  },
  created () {
    let that = this
    let isPerfect = this.$route.query.is_perfect
    if (isPerfect === '0') {
      that.is_perfect = true
    } else {
      that.is_perfect = false
    }
    this.http(that.configs.apiTop + '/page/user-home', 'get', '', function (res) {
      let msg = res.data
      if (msg.code === 0) {
        let data = msg.data
        that.dataobject = data
        that.service = data.service
        that.carousels = data.carousels
        that.homeTipImageUrl = data.home_tip_image_url
      } else {
        that.$vux.toast.text(msg.message, 'middle', 100)
      }
    })
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import '../../../static/assets/css/px2rem.scss';
@import '../../../static/assets/css/home.scss';

.layer_warp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    .layer_table {
        width: 100%;
        height: 100%;
        display: table;
        text-align: center;
    }
    .layer_table_cell {
        display: table-cell;
        vertical-align: middle;
    }
    .layer_box {
        width: px2rem(600); // height: px2rem(460);
        background-color: #fff;
        display: inline-block;
        border-radius: px2rem(10);
    }
    .layer_title {
        font-size: px2rem(30);
        color: #fff;
        height: px2rem(88);
        line-height: px2rem(88);
        background-color: #366931;
        border-top-left-radius: px2rem(10);
        border-top-right-radius: px2rem(10);
    }
    .layer_container {}
    .layer_footer {
        height: px2rem(90);
        border-top: 1px solid #e0e0e0;
        display: flex;
        line-height: px2rem(90);
    }
    .layer_footer_cancel,
    .layer_footer_confirm,
    .layer_footer_cancel button,
    .layer_footer_confirm button {
        flex: 1;
        border-right: 1px solid #e0e0e0;
        text-align: center;
        font-size: px2rem(34);
        color: #007aff;
    }
    .layer_footer button {
        width: 100%;
        height: px2rem(90);
    }
    .layer_footer_confirm,
    .layer_footer_cancel button,
    .layer_footer_confirm button {
        border-right: 0
    }
}

.message_box {
    padding: px2rem(40) px2rem(66) px2rem(36);
    p {
        font-size: px2rem(34);
        color: #333;
        line-height: px2rem(50);
    }
}
</style>
