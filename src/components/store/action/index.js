// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
import cookie from '../../../utils/cookie'
import pageUtil from '../../../utils/page'

/* 导出actions方法 */
import {showLoading, hideLoading, showFullscreenImg, hideFullscreenImg} from './widgetUi'
import {initNimSDK} from './initNimSDK'
import {deleteSession, setCurrSession, resetCurrSession} from './session'
import {sendMsg, sendFileMsg, sendMsgReceipt, sendRobotMsg, revocateMsg, getHistoryMsgs, resetNoMoreHistoryMsgs, continueRobotMsg} from './msgs'

function connectNim ({state, commit, dispatch}, obj) {
  let {force} = Object.assign({}, obj)
  console.log({force})
  // 操作为内容页刷新页面，此时无nim实例
  if (!state.nim || force) {
    // let loginInfo = {
    //   uid: cookie.readCookie('uid'),
    //   sdktoken: cookie.readCookie('sdktoken'),
    // }
    let loginInfo = {
      uid: 'deliveph',
      sdktoken: 'e10adc3949ba59abbe56e057f20f883e'
    }
    console.log(loginInfo)
    if (!loginInfo.uid) {
      // 无cookie，直接跳转登录页
      pageUtil.turnPage('无历史登录记录，请重新登录', 'login')
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