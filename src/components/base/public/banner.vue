<template>
    <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
        <!-- slides -->
        <swiper-slide class="swiper-item" v-for="(s,i) in slider" :key="i">
            <a :href="s.carousel_href">
                <img class="recommand-swiper-img" :src="s.carousel_url" />
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
    props:['bannerObject'],
    data(){
        return {
            loadingState:"正在加载中，请稍后。。。",
            slider: [{
                'carousel_url':'/static/assets/images/banner.png',
                'carousel_href':'http://www.baidu.com/'
            }],
            swiperOption: {
                notNextTick: true,
                autoplay: 3000,
                //direction: 'vertical',
                effect: "coverflow",
                grabCursor: true,
                setWrapperSize: true,
                pagination: '.swiper-pagination',
                paginationClickable : true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                mousewheelControl:true,
                observeParents:true
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
    watch:{
        bannerObject(){
            this.slider = this.bannerObject
        }
    },
    mounted(){

    },
    created() {
        let that = this
        // that.slider = that.$parent.carousels        
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
        position: relative;
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

    .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
        bottom: px2rem(20);
        left: 0;
        width: 100%;
    }
    .swiper-pagination {
        position: absolute;
        text-align: center;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        transition: .3s;
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        -o-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
        z-index: 10;
    }
    .swiper-container-horizontal{
        .swiper-pagination-bullets{
             .swiper-pagination-bullet {
                 margin: 0 px2rem(10);
             }
             .swiper-pagination-bullet {
                width: px2rem(16);
                height: px2rem(16);
                display: inline-block;
                border-radius: 100%;
                background: #000;
                opacity: .2;
                &.swiper-pagination-bullet-active {
                    opacity: 1;
                    background: #007aff;
                }
            }
        }
        
    }
    
    
</style>

