<template>
<transition enter-active-class="animated fadeInRight">
    <div class="suggest" v-wechat-title="$route.meta.title">
      <suggest-head></suggest-head>
      <autocomplete-list></autocomplete-list>
      <suggest-list></suggest-list>
    </div>
</transition>
</template>
<script>
import {mapState} from 'vuex'
import suggestHead from '@/components/suggest/suggestHead.vue'
import suggestList from '@/components/suggest/suggestList.vue'
import autocompleteList from '@/components/suggest/autocompleteList.vue'

export default {
  computed: {
    ...mapState([
      'popupVisible',
      'isChoosed'
    ])
  },
  components: {
    suggestHead,
    suggestList,
    autocompleteList
  }
}
</script>
<style>
.suggest{
  position: relative;
  z-index: 999;
  height: 100%;
  animation-duration: .5s;
}
.amap{
  height: 94%;
  width: 100%;
  position: absolute;
  z-index: 800;
  /*background-color: green;*/
}
.mint-popup.mint-popup-right{
  width: 100%;
  height: 100%;
  background-color: #f3f4f5;
}
</style>
