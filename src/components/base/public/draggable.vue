<template>
    <div v-if="isShow">
        <router-link :to="{path:'/chat/p2p-service_'+items.service_id }">
             <img src="/static/assets/images/btn_relation.png" class="draggable" id="draggable"/>
        </router-link>
    </div>
</template>

<script>
export default {
  props: ['headerObject'],
  data () {
    return {
      items: {}
    }
  },
  components: {
  },
  methods: {
    defaultEvent (e) {
      e.preventDefault()
    }
  },
  mounted: function () {
  },
  created () {
  },
  watch: {
    headerObject () {
      let that = this
      that.items = that.headerObject.service
    }
  },
  computed: {
    isShow () {
      let that = this
      if (that.$store.state.userUID !== null && Object.keys(that.items).length > 0) {
        that.$nextTick(() => {
          let div1 = document.querySelector('#draggable')
          let maxW = document.body.clientWidth - div1.offsetWidth
          let maxH = document.body.clientHeight - div1.offsetHeight
          let oL, oT
          div1.addEventListener('touchstart', function (e) {
            let ev = e || window.event
            let touch = ev.targetTouches[0]
            oL = touch.clientX - div1.offsetLeft
            oT = touch.clientY - div1.offsetTop
            document.addEventListener('touchmove', that.defaultEvent, false)
          })
          div1.addEventListener('touchmove', function (e) {
            let ev = e || window.event
            let touch = ev.targetTouches[0]
            let oLeft = touch.clientX - oL
            let oTop = touch.clientY - oT
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
        })
        return true
      } else {
        return false
      }
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
    z-index:9;
    top:px2rem(40);
    right:0;
    left:0;
    margin: 0 auto
}
</style>
