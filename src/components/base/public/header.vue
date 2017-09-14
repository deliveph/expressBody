<template>
    <div id="header" class="por">
        <router-link :to="{name:'suggest'}" class="orientation poa">
            {{address.start || position.address || '深圳'}}
            <i></i>
        </router-link>
        <ul>
            <li class="user_message" v-if="userid != 'userid'">
                <div class="photo">
                    <img v-bind:src="user_avatar" />
                    <div class="grade">
                        <grade class="icon_user_1"></grade>
                    </div>
                </div>
                <h3 class="name">{{user_nickname}}</h3>
                <p>
                    <label for="">快递豆：</label>
                    <span>{{user_balance}}</span>
                    <i class="icon_bean"></i>
                </p>
            </li>
            <li class="courier_message" v-else-if="express != 'express'">
                <h4 class="identify">您的快递宝宝</h4>
                <div class="photo">
                    <img :src="service_avatar" />
                    <div class="grade">
                        <grade class="icon_express_1" :src="service_level_logo"></grade>
                    </div>
                </div>
                <h3 class="name">{{service_nickname}}
                    <a class="icon_tel" v-on:click="tel(service_tell)"></a>
                </h3>
                <p>
                    <label for="">工号：</label>
                    <span>{{express}}</span>
                </p>
            </li>
            <!-- <li class="not_login" v-else>
                <div class="photo">
                    <img src="/static/assets/images/head_def.png" />
                </div>
                <h3 class="name notLogin">未登录</h3>
            </li> -->
        </ul>
    </div>
</template>

<script>
import Grade from '../../../components/grade'
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
    data() {
        return {
            token: '',
            userid: '',
            express: '',
            user_avatar:'/static/assets/images/head_def.png',
            user_nickname:'快递宝宝',
            service_avatar:'/static/assets/images/head_def.png',
            service_nickname:'快递宝宝',
            user_balance:'0',
            service_tel:'18681587662',
            user_level_logo:'/static/assets/images/user_level/icon_1_shaowei.png',
            service_level_logo:'/static/assets/images/platform_level/liebing_s1.png'
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
        position(oldVal,newVal) {}
    },
    created() {
        let that = this
        let user = that.$parent.user
        let service = that.$parent.service
        that.userid =  user.user_id
        that.service = service.service_id
        that.user_avatar = user.user_avatar
        that.user_nickname = user.user_nickname 
        that.user_balance  = user.user_balance
        that.user_level_logo = user.user_level.user_level_logo
        if(service){
            that.service_avatar = service.service_avatar
            that.service_nickname = service.service_nickname
            that.service_tel = service.service_tel
            that.service_level_logo = service.service_level.service_level_logo
        }
    },
    methods: {
        tel(msg) {
            window.location.href="tel:"+msg
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../static/assets/css/home.scss';
</style>

