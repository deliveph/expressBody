<template>
    <div @click="getBackClick">
        <img src="/static/assets/images/btn_back_home.png" class="getBack" id="getBack"/>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    components: {
    },
    methods: {
        defaultEvent (e) {
            e.preventDefault()
        },
        getBackClick(){
            console.log(1)
            this.$router.back(-1)
        }
    },
    mounted: function () {
        let that = this
        var div1 = document.querySelector('#getBack')
        var maxW = document.body.clientWidth - div1.offsetWidth
        var maxH = document.body.clientHeight - div1.offsetHeight
        console.log(maxW,maxH)
        var oL, oT
        div1.addEventListener('touchstart', function (e) {
            var ev = e || window.event
            var touch = ev.targetTouches[0]
            oL = touch.clientX - div1.offsetLeft
            oT = touch.clientY - div1.offsetTop
            document.addEventListener('touchmove', that.defaultEvent, false)
        })

        div1.addEventListener('touchmove', function (e) {
            var ev = e || window.event
            var touch = ev.targetTouches[0]
            var oLeft = touch.clientX - oL
            var oTop = touch.clientY - oT
            if (oLeft < 0) {
                oLeft = 0
            } else if (oLeft >= maxW) {
                oLeft = maxW
            }
            if (oTop < 0) {
                oTop = 0
            } else if (oTop >= maxH) {
                oTop = maxH
            }

            div1.style.left = oLeft + 'px'
            div1.style.top = oTop + 'px'
            div1.style.right = 'initial'
        })
        div1.addEventListener('touchend', function () {
            document.removeEventListener('touchmove', that.defaultEvent)
        })
    },
    created () {
    },
    computed: {
        isShow1(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
     @import '../../static/assets/css/px2rem.scss';

    .getBack{
        width:px2rem(158);
        height:px2rem(98);
        position: absolute;
        z-index: 10;
        bottom: 10px;
    }
</style>
