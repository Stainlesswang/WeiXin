//index.js
var functions=require('../functions.js')
var url ='https://api.douban.com/v2/movie/in_theaters'
var pageSize=20
var app = getApp()
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading:true,
    start: 0,
    userInfo: {}
  },
 onPullDownRefresh:function(){

console.log(' onpillDownRefresh',new Date())
 },
 scroll:function(e){
console.log('------>'+e)
 },

 scrolltolower: function () {
   var that = this
   functions.getCity(function (city) {
     functions.fetchFilms.call(that, url, city, that.data.start, pageSize, function (data) { })
   })
 }, viewDetail: function (e) {
   var ds = e.currentTarget.dataset;
   wx.navigateTo({
     url: '../detail/detail?id=' + ds.id + '&title=' + ds.title + '&type=ing'
   })
 },
  onLoad: function () {
    console.log('onLoad'+this.data.films.length)
     var that = this
     //豆瓣加载电影
     functions.getCity(function(city){
       functions.fetchFilms.call(that,url,city,0,pageSize,function(data){
         that.setData({
           showLoading:false
         })
       })
     }),
     
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
