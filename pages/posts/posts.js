// pages/posts/posts.js
// 模块化引入 这里只能用相对路径
var postData = require('../../data/post-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 跳转触发函数
  onTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
     url: 'post-detail/post-detail?id='+postId,
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      // 如果是一个数组的时候要写一个名字
      post_key: postData.postList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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