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
      items: {},
      isShow1: false
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
    },
    isShow1 () {
      let that = this
      if (that.isShow1) {
        var div1 = document.querySelector('#draggable')
        var maxW = document.body.clientWidth - div1.offsetWidth
        var maxH = document.body.clientHeight - div1.offsetHeight
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
      }
    }
  },
  computed: {
    isShow () {
      this.isShow1 = this.$store.state.userUID !== null
      return this.isShow1
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
