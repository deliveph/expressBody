<template>
    <div class="img">
        <mt-button type="primary" @click="showIm">
        选择操作
        </mt-button>
        <mt-actionsheet cancel-text="" :actions="actions" :visible.sync="sheetVisible">
        </mt-actionsheet>
        <mt-button type="danger" @click="loa">
        选择操作1
        </mt-button>
    </div>
</template>

<script>
import { Toast, MessageBox, Indicator } from 'mint-ui'

export default {
  data () {
    return {
      sheetVisible: false,
      actions: [{
        name: '展示 Toast',
        method: this.showToast
      }, {
        name: '展示 Message Box',
        method: this.showMsgbox
      }]
    }
  },
  methods: {
    showToast () {
      Toast('这是一个 Toast')
    },
    showMsgbox () {
      MessageBox('提示', '这是一个 Message Box')
    },
    showIm () {
      this.sheetVisible = !this.sheetVisible
      console.log(document.getElementsByClassName('mint-actionsheet')[0].style.display)
      var dis = document.getElementsByClassName('mint-actionsheet')[0].style.display = 'block'
      if (dis === 'none') {
        dis = 'block'
      } else {
        dis = 'block'
      }
    },
    loa () {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      })
      setTimeout(function () {
        Indicator.close()
      }, 2000)
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
