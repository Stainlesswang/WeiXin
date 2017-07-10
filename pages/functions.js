var store=require('/store.js')
var config=require('/config.js')
module.exports={

  getLocation: function (cb) {
    var location = store.location
    if (location) {
      cb(location)
      return;
    }
    wx.getLocation({
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + config.baiduAK + '&location=' + locationParam + '1&output=json&pois=1',
          header: {
            "Content-Type": "json",
          },
          success: function (res) {
            var data = res.data
            store.location = data.result
            cb(data.result)
          }
        })
      },
    })
  },

  getCity: function (cb) {
    this.getLocation(function (location) {
      cb(location.addressComponent.city.replace('市', ''))
    })
  },

  //获取影片的json
  fetchFilms: function (url, city, start, count, cb) {
    var that = this
    wx.request({
      url: url + '?city=' + city + '&start=' + start + '&count=' + count,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        console.log(res.data)
        var data = res.data
        //判断取出来的json数据里边是否有数据，如果没有数据，就将hasMore设为false
        if (data.subjects.length === 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          //为films[]数组赋值，并且更新当前的start
          that.setData({
            films: that.data.films.concat(data.subjects),
            start: that.data.start + data.subjects.length
          })
       
        }
        cb(data)
      }
    })
  },

}