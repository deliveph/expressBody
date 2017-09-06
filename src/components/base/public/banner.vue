<template>
    <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
        <!-- slides -->
        <swiper-slide class="swiper-item" v-for="(s,i) in slider" :key="i">
            <a href="http://baidu.com">
                <img class="recommand-swiper-img" :src="s.src" />
            </a>
        </swiper-slide>
        <!--optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
</template>

<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import qs from 'qs'
let i = 1
export default {
    data(){
        return {
            loadingState:"正在加载中，请稍后。。。",
            slider: [{
                'src':'/static/assets/images/banner.png'
            }],
            swiperOption: {
                notNextTick: true,
                autoplay: 3000,
                //direction: 'vertical',
                effect: "coverflow",
                grabCursor: true,
                setWrapperSize: true,
                pageination: '.swiper-pagination',
                paginationClickable : true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                mousewheelControl:true,
                observeParents:true,
            }
        }
    },
    components:{
        swiper,
        swiperSlide
    },
    computed:{
        swiper(){
            return this.$refs.mySwiper.swiper
        }
    },
    mounted(){

    },
    created() {
        // let that = this
        // let msg = qs.stringify({
        //     'goods_id':178
        // })
        // this.$ajax({
        //     url:'/api/Api/Index/index',
        //     method:'post',
        //     data:msg,
        //     withCredentials:true
        // }).then(function(data){
        //     that.slider = data.data.data.banner
        // }).catch(function(err){
        //     that.loadingState = "加载失败"
        // })
        // console.log(i);
    }
}
</script>

<style lang="scss" scoped>
    @import '../../../../static/assets/css/px2rem.scss';
    .swiper-container{
        width: 100%;
        height:px2rem(470);
        overflow: hidden;
        .swiper-slide{
            font-size:16px;
            width: 100%;
            height:px2rem(470);
            float: left;
            overflow: hidden;
            a{
                width: 100%;
                height:px2rem(470);
            }
            img{
                width: 100%;
                height:px2rem(470);
            }
        }
    }
</style>

