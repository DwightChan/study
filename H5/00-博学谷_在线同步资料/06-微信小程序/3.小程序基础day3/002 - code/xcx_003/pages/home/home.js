// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: 'init data',
    array: [{msg: '1'}, {msg: '2'}],
    id: 0,
    flag: false
  },

  btnTapHandler: function(event) {
    console.log('ok')
    console.log(event)
  },

  iptHandler: function(e) {
    // console.log(e)
    // 1. 获取到最新的值
    console.log(e.detail.value)
    // 2. 调用 this.setData({}) 为 data 中的数据重新赋值
    this.setData({
      info: e.detail.value
    })
  },

  btnHandler2: function(e) {
    console.log('ok')
    console.log(e)
    console.log(e.target.dataset.info)
    console.log(e.target.dataset.msg)
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