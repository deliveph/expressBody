import mutations from './mutations'
import Vue from 'vue'
import state from './state'

// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
import cookie from '../../utils/cookie'
import pageUtil from '../../utils/page'

/* 导出actions方法 */
import {showLoading, hideLoading, showFullscreenImg, hideFullscreenImg} from './action/widgetUi'
import {initNimSDK} from './action/initNimSDK'
import {deleteSession, setCurrSession, resetCurrSession} from './action/session'
import {sendMsg, sendFileMsg, sendMsgReceipt, sendRobotMsg, revocateMsg, getHistoryMsgs, resetNoMoreHistoryMsgs, continueRobotMsg} from './action/msgs'

// console.log(123)
function connectNim ({state, commit, dispatch}, obj) {
  let {force} = Object.assign({}, obj)
  console.log({force})
  // 操作为内容页刷新页面，此时无nim实例
  if (!state.nim || force) {
    let loginInfo = {
      uid: cookie.readCookie('uid'),
      sdktoken: cookie.readCookie('sdktoken')
    }
    // let loginInfo = {
    //   uid: 'deliveph',
    //   sdktoken: 'e10adc3949ba59abbe56e057f20f883e'
    // }
    // console.log(loginInfo,"$%%$#$@%@#%")
    if (!loginInfo.uid) {
      // 无cookie，直接跳转登录页
      // pageUtil.turnPage('无历史登录记录，请重新登录', 'login')
    } else {
      // 有cookie，重新登录
      dispatch('initNimSDK', loginInfo)
    }
  }
}

function connectChatroom ({state, commit, dispatch}, obj) {
  let {chatroomId} = Object.assign({}, obj)
  const nim = state.nim
  if (nim) {
    dispatch('showLoading')
    nim.getChatroomAddress({
      chatroomId,
      done: function getChatroomAddressDone (error, obj) {
        if (error) {
          alert(error.message)
          location.href = '#/room'
          return
        }
        dispatch('initChatroomSDK', obj)
      }
    })
  }
}

export default {
  chooseShipAddress({
    commit
  }, shipAddress) {
    commit('CHOOSESHIPADDRESS', shipAddress)
  },
  chooseConsigneeAddress({
    commit
  }, consigneeAddress) {
    commit('CHOOSECONSIGNEEADDRESS', consigneeAddress)
  },
  chooseCoupon({
    commit
  }, coupon) {
    commit('CHOOSECOUPON', coupon)
  },
  // 手机号输入
  telephone_input({
    commit
  }) {
    commit('TELEPHONE_INPUT')
  },
  // 关闭遮罩
  close_mask({
    commit
  }) {
    commit('CLOSE_MASK')
  },
  // 菜单切换 active
  switch_nav({
    commit
  }, index) {
    commit('SWITCH_NAV', index)
  },
  // 菜单切换
  switch_navList({
    commit
  }) {
    commit('SWITCH_NAVLIST')
  },
  //选址
  show_suggest({
    commit
  }, key) {
    commit('SHOW_SUGGEST', key)
  },
  // 关闭选址
  close_suggest({
    commit
  }) {
    commit('CLOSE_SUGGEST')
  },
  switch_input_city({
    commit
  }) {
    commit('SWITCH_INPUT_CITY')
  },
  // 关闭定位错误提示
  close_location_error({
    commit
  }) {
    commit('CLOSE_LOCATION_ERROR')
  },
  //获取详细定位
  getCurrentPosition({
    commit,
    state
  }, map) {
    AMap.plugin(['AMap.Geolocation', 'AMap.Autocomplete'], function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        extensions: 'all'
      });
      geolocation.getCurrentPosition(function (status, result) {
        // console.log(result)
        if (result.aois && result.aois.length > 0) {
          console.log(result)
          commit('SET_POSITON', result)
          map.addControl(geolocation);
        } else {
          if (state.hasLocation) {
            // console.log(123)
            return false
          } else {
            state.ismask = true
            state.location = true
            state.hasLocation = true
          }
        }
      })
    })
  },

  // 选择城市，地图中心切换
  choose_city_name({
    commit
  }, index) {
    commit('CHOOSE_CITY_NAME', index)
    AMap.plugin('AMap.Geocoder', function () {
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      });
      geocoder.getLocation(state.position.city, function (status, result) {
        var center = [result.geocodes[0].location.lng, result.geocodes[0].location.lat]
        var map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 16,
          center: center
        });
        console.log(result)
        map.addControl(geocoder)
      });

    })
  },
  // 手机正则
  check_telephone({
    commit
  }, telephone) {
    commit('CHECK_TELEPHONE', telephone)
  },
  // 验证码
  toMessageConfirm({
    commit
  }, telephone) {
    commit('TOMESSAGECONFIRM', telephone)
  },
  // 验证码倒计时
  time({
    commit,
    state
  }, value) {
    state.tips = value
    state.timeCount = true
    state.tipsContent = `${state.tips}秒后重发`
    // Interval = null
    console.log(state.Interval)
    clearInterval(state.Interval)
    state.Interval = setInterval(() => {
      state.tips--
        if (state.tips < 1) {
          state.timeCount = false
          clearInterval(state.Interval)
        } else {
          state.tipsContent = `${state.tips}秒后重发`
        }
    }, 1000)
  },
  // 下单呼叫倒计时
  time_order({
    commit,
    state
  }, value) {
    clearInterval(state.Interval)
    state.Interval = setInterval(() => {
      value--
      state.tipsContent = `${value}`
    }, 1000)
  },

  // 保存手机号至本地
  save_telephone({
    commit,
    state
  }) {
    commit('SAVE_TELEPHONE')
  },
  // 首次加载确认用户登录
  get_telephone({
    commit
  }) {
    commit('GET_TELEPHONE')
  },
  // 关闭侧边栏
  close_usersidebar({
    commit
  }) {
    console.log('actions')
    commit('CLOSE_USERSIDEBAR')
  },
  //地址输入提示
  autocomplete({
    commit,
    state
  }, value) {
    console.log(value)
    AMap.plugin('AMap.Autocomplete', function () {
      var autocomplete = new AMap.Autocomplete({})
      autocomplete.search(value, function (status, result) {
        state.autocompleteList = result.tips
      })
    })
  },
  //选择地址
  choose_address({
    commit
  }, index) {
    commit('CHOOSER_ADDRESS', index)
    commit('CLOSE_SUGGEST')
  },
  close_autocompletelist({
    commit
  }) {
    commit('CLOSE_AUTOCOMPLETELIST')
  },

  // im
  updateRefreshState ({commit}) {
    commit('updateRefreshState')
  },
  // UI 及页面状态变更
  showLoading,
  hideLoading,
  showFullscreenImg,
  hideFullscreenImg,
  continueRobotMsg,

  // 连接sdk请求，false表示强制重连
  connect (store, obj) {
    // console.log(123)
    let {type} = Object.assign({}, obj)
    // type 可为 nim chatroom
    type = type || 'nim'
    switch (type) {
      case 'nim':
        connectNim(store, obj)
        break
      case 'chatroom':
        connectChatroom(store, obj)
        break
    }
  },

  // 用户触发的登出逻辑
  logout ({ state, commit }) {
    cookie.delCookie('uid')
    cookie.delCookie('sdktoken')
    if (state.nim) {
      state.nim.disconnect()
    }
    pageUtil.turnPage('', 'login')
  },

  // 初始化 重新连接SDK
  initNimSDK,
  // 删除会话
  deleteSession,
  // 设置当前会话
  setCurrSession,
  // 重置当前会话
  resetCurrSession,
  // 发送消息
  sendMsg,
  sendFileMsg,
  sendRobotMsg,
  // 发送消息已读回执
  sendMsgReceipt,
  // 消息撤回
  revocateMsg,
  getHistoryMsgs,
  // 重置历史消息状态
  resetNoMoreHistoryMsgs
  // 标记系统消息已读
  // markSysMsgRead,
}
