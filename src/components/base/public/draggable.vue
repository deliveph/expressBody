<template>
    <div>
        <router-link :to="{path:'/chat/p2p-service_'+items.service_id }">
             <img src="/static/assets/images/btn_relation.png" class="draggable" id="draggable"/>
        </router-link>
    </div>
</template>

<script>
import $ from 'jquery'
let dom = null
export default {
    props: ['headerObject'],
    data() {
        return {
            items:[]
        }
    },
    components: {
    },
    methods: {
    },
    mounted: function () {
            var div1 = document.querySelector('#draggable');
            var maxW = document.body.clientWidth - div1.offsetWidth;
            var maxH = document.body.clientHeight - div1.offsetHeight;
            console.log(maxW,maxH)
            var oL,oT
            div1.addEventListener('touchstart', function (e) {
                var ev = e || window.event;
                var touch = ev.targetTouches[0];
                oL = touch.clientX - div1.offsetLeft;
                oT = touch.clientY - div1.offsetTop;
                document.addEventListener("touchmove", defaultEvent, false);
            })


            div1.addEventListener('touchmove', function (e) {
                var ev = e || window.event;
                var touch = ev.targetTouches[0];
                var oLeft = touch.clientX - oL;
                var oTop = touch.clientY - oT;
                if (oLeft < 0) {
                    oLeft = 0;
                } else if (oLeft >= maxW) {
                    oLeft = maxW;
                }
                if (oTop < 0) {
                    oTop = 0;
                } else if (oTop >= maxH) {
                    oTop = maxH;
                }

                div1.style.left = oLeft + 'px';
                div1.style.top = oTop + 'px';

            })
            div1.addEventListener('touchend', function () {
                document.removeEventListener("touchmove", defaultEvent);
            })

            function defaultEvent(e) {
                e.preventDefault();
            }
    },
    created() {
    },
    watch:{
        headerObject() {
            let that = this
            that.items = that.headerObject.user
        }
    }
}


</script>


<style lang="scss" scoped>
@import '../../../../static/assets/css/px2rem.scss';
.drag-content{
    position:absolute;
    top:px2rem(100);
    right:px2rem(50);
    z-index:3;
    .demo-basic{
        position: relative;
        
    }
}

.draggable{
    width:px2rem(146);
    height:px2rem(146);
    position: absolute;
    z-index:999;
    top:px2rem(300);
    right:0;
}
</style>
