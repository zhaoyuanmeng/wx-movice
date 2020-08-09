Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  // 点击的回调函数
  onTap:function(){
    // 这个相当于把之前的界面隐藏 所以会跳回来
    // wx.navigateTo({
    //   url: '../posts/posts',
    // })
    // 跳转到有tab选项的界面要使用switch
    wx.switchTab({
      url: '../posts/posts',
    })
    // 不能返回上一个 因为把之前的给删除了
  //  wx.redirectTo({
  //    url: '',
  //  })
  },
  // 验证事件的冒泡
  onContainerTap:function(){
   
  },
  onSonTap: function () {
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    console.log("page is onhide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('bei xiao hui le ')
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