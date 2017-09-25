import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 定义路由
// 每个路由应该映射一个组件。 其中"component"是一个组件配置对象。
const routes = [
  // 设置聊天列表页面为首页
  { 
    path: '/', 
    redirect: {
      name: 'session'
    }
  },
  // 最近消息列表（会话）
  {
    path: '/session',
    name: 'session',
    component (resolve) {
      require(['../pages/Session'], resolve)
    }
  },
  // 聊天记录
  {
    path: '/chat/:sessionId',
    name: 'chat',
    component (resolve) {
      require(['../pages/Chat'], resolve)
    }
  },
  // 聊天历史记录
  {
    path: '/chathistory/:sessionId',
    name: 'chathistory',
    component (resolve) {
      require(['../pages/ChatHistory'], resolve)
    }
  }
]

let router = new VueRouter({
  history: true,
  routes
})

export default router
