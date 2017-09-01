<template>
    <div id="header" class="por">
        <a class="orientation poa">深圳<i></i></a>
        <ul>
            <li class="user_message" v-if="userid != userid">
                <div class="photo">
                    <img src="/static/assets/images/btn_ji.png" />
                    <div class="grade">
                        <grade class="icon_user_1"></grade>
                    </div>
                </div>
                <h3 class="name">张余</h3>
                <p><label for="">快递豆：</label><span>150</span><i class="icon_bean"></i></p>
            </li>
            <li class="courier_message" v-else-if="express != express">
                <h4 class="identify">您的快递宝宝</h4>
                <div class="photo">
                    <img src="/static/assets/images/btn_ji.png" />
                    <div class="grade">
                        <grade class="icon_express_1"></grade>
                    </div>
                </div>
                <h3 class="name">张余<a class="icon_tel" href="tel:18681587662"></a></h3>
                <p><label for="">工号：</label><span>1510</span></p>
            </li>
            <li class="not_login" v-else>
                <div class="photo">
                    <img src="/static/assets/images/head_def.png" />
                </div>
                <h3 class="name notLogin">未登录</h3>
            </li>
        </ul>
    </div>
</template>

<script>
import Grade from '../../../components/grade'
export default {
    data(){
        return{
            token:'',
            userid:'',
            express:''
        }
    },
    components:{
        Grade
    },
}
</script>

<style lang="scss" scoped>
    @import '../../../../static/assets/css/home.scss';
</style>

