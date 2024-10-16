// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: 6,
    flag: true,
    list: [
      'zs',
      'ls',
      'zl',
      'zs'
    ],
    list2: [
      { id: 0, name: '张三' },
      { id: 1, name: '张三2' },
      { id: 2, name: '张三3' }
    ],
    name: '',
    page: 1,
    msglist: [1,2,3,4,5,6,7,8,9,10]
  },

  btnTap: function() {
    this.setData({
      flag: !this.data.flag
    })
  },

  iptHandler: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  btn2Handler: function() {
    wx.startPullDownRefresh()
  },

  add: function() {
    console.log(this.data.name)
    const userInfo = {id: this.data.list2.length, name: this.data.name}
    const arr = this.data.list2
    arr.unshift(userInfo)
    this.setData({
      list2: arr
    })
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
    console.log('触发了下拉刷新的事件')
    this.setData({
      list: ['zs', 'ls']
    })

    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 先让页码值自增+1
    this.setData({
      page: this.data.page + 1
    })

    const newArr = []
    for(let i = 1; i <=10; i++) {
      const c = (this.data.page - 1) * 10 + i
      newArr.push(c)
    }

    this.setData({
      msglist: [...this.data.msglist, ...newArr]
    })
  },

  onPageScroll(obj) {
    console.log('当前页面在垂直方向已经滚动了' + obj.scrollTop + 'px')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (obj) {
    console.log(obj)

    return {
      title: '测试转发标题',
      path: '/pages/main/main',
      imageUrl: 'http://www.itcast.cn/images/newslide/homepageandphone/20191908091959895.jpg'
    }
  },
  onTabItemTap(item) {
    console.log(item)
  }
})