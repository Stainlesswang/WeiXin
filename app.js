//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    //把上下文对象this 赋值为that 方便使用
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          console.log(res.userInfo)
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
 
//定义全局变量 globalData
  globalData: {
    userInfo: null
  }
})
