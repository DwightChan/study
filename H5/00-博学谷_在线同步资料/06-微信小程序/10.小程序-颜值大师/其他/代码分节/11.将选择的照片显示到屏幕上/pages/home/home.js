// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 窗口可用的高度
    wh: 0,
    // 摄像头的朝向 front back
    position: 'front',
    // 图片的地址
    src: '',
    // 是否真实选择的照片
    isShowPic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sysInfo = wx.getSystemInfoSync()

    this.setData({
      wh: sysInfo.windowHeight
    })
  },

  // 点击按钮，切换摄像头
  reverseCamera() {
    const newPosition = this.data.position === 'front' ? 'back' : 'front'

    this.setData({
      position: newPosition
    })
  },

  // 拍照
  takePhoto() {
    // 创建相机的实例对象
    const ctx = wx.createCameraContext()

    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })

        console.log(this.data.src)
      },
      fail: () => {
        this.setData({
          src: ''
        })
        console.log('拍照失败')
      }
    })
  },

  // 从相册选择照片
  choosePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: (res) => {
        console.log(res)
        if (res.tempFilePaths.length > 0) {
          this.setData({
            src: res.tempFilePaths[0],
            isShowPic: true
          })
        }
      },
      fail: () => {
        console.log('选择照片失败')
      }
    })
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