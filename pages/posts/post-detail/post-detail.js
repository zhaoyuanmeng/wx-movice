// pages/posts/post-detail/post-detail.js
var postData = require('../../../data/post-data.js')
//获取全局数据
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 退回上一个页面的时候 全局变量不会改变 只有真正退出了以后全局变量才会改变  
    // 获取传递页面中的id   
    var postId = options.id
    var data = postData.postList[postId]
    // 绑定数据
    this.setData(data)
    this.setData({
      cid: postId
    })

    // 获取缓存
    var postCollected = wx.getStorageSync('post_collected')
    // 判断缓存里面是不是存在
    if (postCollected) {
      // 存在就获取对应的值
      var postCollected = postCollected[postId]
      // 再次判断里面对应的文章有没有值
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      // 不存在
      var postCollected = {}
      postCollected[postId] = false
      wx.setStorageSync('post_collected', postCollected)
    }
    // 设置isplayMusic  这里只有一种情况他才为空 就是上一次播放状态进入自己的页面才显示播放
    if (app.globalData.g_isPlayMusic && app.globalData.g_cid === postId) {
      // 这里代表的是当前页面在播放
      this.setData({
        isPlayMusic: true
      })
    }
  },
  // 收藏功能
  onCollection(event) {
    // 首先获取缓存的值
    var postCollected = wx.getStorageSync('post_collected')
    // 获得对应的文章收藏信息
    var post_collected = postCollected[this.data.cid]
    // 把收藏变成不收藏 不收藏变成收藏
    post_collected = !post_collected;
    postCollected[this.data.cid] = post_collected
    // 更新缓存
    wx.setStorageSync('post_collected', postCollected)
    // 更新数据绑定
    this.setData({
      collected: post_collected
    })
    wx.showToast({
      title: post_collected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })

  },

  // 底部转发功能
  onShare(event) {
    var list = [
      "分享到微信好友",
      "分享到朋友圈",
      "分想到微博"
    ]
    wx.showActionSheet({
      itemList: list,
      itemColor: "#405f80",
      success(res) {
        // res.cancel  用户是不是点击了
        // res.tapIndex 点击的是哪一个数组元素下标  从0开始 
        wx.showModal({
          title: '用户分享到了' + list[res.tapIndex],
          content: '现在无法分享',
        })
      }
    })
  },
  // 音乐触发 背景音乐方式
  onAudio(event) {
    const backgroundAudioManager = wx.getBackgroundAudioManager() //获取背景音频实例
    backgroundAudioManager.title = '欢快的背景'
    backgroundAudioManager.singer = 'toky'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000' //封面图 URL
    // 设置了 src 之后会自动播放（src为云开发中云存储空间文件的链接）
    backgroundAudioManager.src = 'http://music.163.com/song/media/outer/url?id=108220.mp3'

  },
  // 音乐触发 背景音乐方式
  onAudio1(){
    var isPlayMusic = this.data.isPlayMusic
    // 判断有没有在播放 如果是播放说明之前有播放的 
    if (isPlayMusic){
      // 暂停播放
      wx.pauseBackgroundAudio()
      // 设置成未播放
     this.setData({
       isPlayMusic:false
     })
    }else{
      wx.playBackgroundAudio({
        dataUrl: this.data.music.url,
        title: this.data.music.title,
        coverImgUrl: this.data.music.img
      })
      // 设置成播放
      this.setData({
        isPlayMusic: true
      })
    }
    // 监听播放的时候
    var that = this
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isPlayMusic:true
      })
      // 改变全局的播放属性
      app.globalData.g_isPlayMusic = true
      app.globalData.g_cid = that.data.cid
    })
    // 监听中断的时候
    wx.onBackgroundAudioPause(function(){
      that.setData({
        isPlayMusic:false
      })
      // 改变全局的播放属性
      console.log(that.data.music.url)
      app.globalData.g_isPlayMusic = false
      app.globalData.g_cid = null
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