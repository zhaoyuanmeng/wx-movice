// pages/movice/more-movice/more-movice.js
var util = require('../../../utils/utils.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放电影信息
    movices:[],
    // 判断起始的电影数据是否为空
    isEmpty:true,
    // start的相关计数设置
    total:0,
    // 保存每次请求的地址
    requestUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 接受url传递的数据 category
    var category = options.category
    this.setData({
      navegateTitle: category
    })
    // 设置接口url
    var dataUrl = ''
    switch (category) {
      case "top250":
        dataUrl = app.globalData.g_http + '/v2/movie/top250'
        break
      case "正在热映":
        dataUrl = app.globalData.g_http + '/v2/movie/in_theaters'
        break
      case "将要上映":
        dataUrl = app.globalData.g_http + '/v2/movie/coming_soon'
        break
    }
    // 保存请求地址
    this.data.requestUrl = dataUrl
    // 发送请求
    util.http(dataUrl, this.processDoubanData)
  },
  // 处理成功返回的数据
  processDoubanData(douban) {
    var movies = []
    for (var idx in douban.subjects) {
      var subject = douban.subjects[idx]
      var title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6)
      }
      var temp = {
        stars: util.toStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    
    var totalMovice = []
    // 判断是不是第一次获取数据 如果不是就要合并数据 数组合并的方式
    if (!this.data.isEmpty){
      // 说明不是第一次 所以要合并数据
      totalMovice = this.data.movices.concat(movies)
    }else{
      // 设置成false表示已经不是第一次获取了
      this.data.isEmpty = false
      totalMovice = movies
    }
    this.setData({
      movices: totalMovice
    })
    // 更新start
    this.data.total += 20
    // 关闭loading
    wx.hideNavigationBarLoading()

  },
  // grid-tem模板中的滑动到底部触发的函数
  onScrollLower(event){
    // 设置下次的url 主要是改变start 因为他访问的主url没变只是start这个参数变了
    // 可以把每次的开始序号存放在this.data里
    var newUrl = this.data.requestUrl +"?start="+this.data.total+"&count=20"
    // 然后发送请求 获取到数据 
    util.http(newUrl, this.processDoubanData)
    // 在处理数据函数processDoubanData()中 合并数据
    wx.showNavigationBarLoading()
    
  },
  pull(){
    console.log('pull')
    var refreshUrl = this.data.requestUrl + "?start=0&count=20"
    // 将之前的数据清空要不就会加载下面的
    this.data.movices = []
    this.data.isEmpty = true
    // 然后发送请求 获取到数据 
    util.http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
    setTimeout(() => wx.stopPullDownRefresh(),3000)
    
  },
  store(){
    console.log('aaaa')
  },

  // 跳转到详情页
  onTapImg(event) {
    var searchId = event.currentTarget.dataset.searchid;
    wx.navigateTo({
      url: '../movice-detail/movice-detail?id=' + searchId,
    })
  },
  // 下拉刷新自动触发的函数
  onPullDownRefresh(){
    var refreshUrl = this.data.requestUrl + "?start=0&count=20"
    // 将之前的数据清空要不就会加载下面的
    this.data.movices = []
    this.data.isEmpty = true
    // 然后发送请求 获取到数据 
    util.http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    // 这个不能写在onload里面 写在别的里面都可以
    wx.setNavigationBarTitle({
      title: this.data.navegateTitle
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})