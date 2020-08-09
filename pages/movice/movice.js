// pages/movice/movice.js
// 引入文件 utils.js
var util = require('../../utils/utils.js')

// 引入全局变量 app.js中的
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 默认的初始展示 就是开始加载的界面 一搜索完以后就变为false
    moviceShow:true,
    // 搜索完的展示
    searchShow:false,
    // 搜索的条件
    search:''
  },
  // 点击更多的触发事件
  onMoreTap(event){
    // 获取传来的数据
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movice/more-movice?category='+category
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.g_http+'/v2/movie/in_theaters'+'?start=1&count=3'
    var comingSoonUrl = app.globalData.g_http + '/v2/movie/coming_soon' + '?start=3&count=3'
    var top250Url = app.globalData.g_http + '/v2/movie/top250' + '?start=3&count=3'
    // 这里是异步调用很难决定先后  promise可以实现同步问题es6
    this.getMoviceListData(top250Url,'top250','top250')
    this.getMoviceListData(inTheatersUrl,'inTheaters','正在热映')
    this.getMoviceListData(comingSoonUrl,'comingSoon','将要上映')

    console.log('111')
  },
  // 发送HTTP请求的封装函数
  getMoviceListData(url,key,categoryTitle){
    var that = this
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': '' // 这里必须为空
      },
      success(res) {
        console.log(res.data)
        that.processDoubanData(res.data, key, categoryTitle)
      },
      fail() {
        console.log('false')
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 将数据绑定到data上
  processDoubanData(douban, key, categoryTitle){
    var movies = []
    for (var idx in douban.subjects){
      var subject = douban.subjects[idx]
      var title = subject.title
      if(title.length >= 6){
        title = title.substring(0,6)
      }
      var temp = {
        stars: util.toStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
       
      }
      movies.push(temp)
    }
    // 这里可以用this 因为上一个已经只过去了
    // 使用动态添加属性的方式把数据放起来
    // 格式是{
    // top250:{},
    // inTheaters:{},
    // }
    var data = {}
    data[key] = {
      movices:movies,
      categoryTitle: categoryTitle
    }
    this.setData(data)
  },

  // input 获取焦点事件
  onBindFocus(event){
    this.setData({
      moviceShow: false,
      searchShow: true
    })
   
  },
  // 失去焦点事件
  onBindblur(event){
    
    var text = event.detail.value
    var searchUrl = app.globalData.g_http + '/v2/movie/search?q='+text
    // 把search的结果绑定到data
    this.getMoviceListData(searchUrl,'searchData','')
   
  },
  // 关闭搜索
  close(){
    this.setData({
      moviceShow: true,
      searchShow: false,
    })
    // 清空搜索框的值
    this.setData({
      search: ''
    })
  },
  // 跳转到详情页
  onTapImg(event){
    var searchId = event.currentTarget.dataset.searchid;
    wx.navigateTo({
      url: 'movice-detail/movice-detail?id=' + searchId,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})