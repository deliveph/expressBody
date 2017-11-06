let config = {
  isAllowRecord: false,
  loginToken: '',
  roleType: 'none',
  tokenId: '',
  localToken: '',
  curTime: new Date().getTime(),
  accreditUrl: 'http://api.1kgx.com/weixin/auth-gateway',
  apiTop: 'http://api.1kgx.com',
  apiUpload: 'http://static.1kgx.com',

  // 用户自定义的登录注册地址
  loginUrl: '/',
  registUrl: '/',
  homeUrl: '/session',

  // 资源路径根目录，为了方便用户部署在二级以上URL路径上
  resourceUrl: 'http://yx-web.nos.netease.com/webdoc/h5',
  // 用户logo地址
  logo: 'http://yx-web.nos.netease.com/webdoc/h5/im/logo.png',
  // 默认用户头像
  defaultUserIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-icon.png',
  // 系统通知图标
  noticeIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/notice-icon.png',
  // 我的手机图标
  myPhoneIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/my-phone.png',
  // 本地消息显示数量，会影响性能
  localMsglimit: 50
}

const env = 'online'

let appConfig = {
  // 用户的appkey
  // 用于在web demo中注册账号异步请求demo 服务器中使用
  test: {
    appkey: 'fe416640c8e8a72734219e1847ad2547',
    postUrl: 'https://apptest.netease.im'
  },
  online: {
    appkey: '45c6af3c98409b18a84451215d0bdd6e',
    postUrl: 'https://app.netease.im'
  }
}

config = Object.assign(config, appConfig[env])

export default config
