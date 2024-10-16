import wepy from 'wepy'

const baseURL = 'https://www.zhengzhicheng.cn/api/public/v1'

// const baseURL = 'https://api.zbztb.cn/api/public/v1'

/**
 * 弹框提示一个无图标的 Toast 消息
 * @str 要提示的消息内容
 */
wepy.baseToast = function(str = '获取数据失败！') {
  wepy.showToast({
    title: str,
    // 弹框期间不会携带任何图标
    icon: 'none',
    duration: 1500
  })
}

/**
 * 发起 get 请求的 API
 * @url 请求的地址，为相对路径，必须以 / 开头
 * @data 请求的参数对象
 */
wepy.get = function(url, data = {}) {
  return wepy.request({
    url: baseURL + url,
    method: 'GET',
    data
  })
}

/**
 * 发起 post 请求的 API
 * @url 请求的地址，为相对路径，必须以 / 开头
 * @data 请求的参数对象
 */
wepy.post = function (url, data = {}) {  
  return wepy.request({
    url: baseURL + url,
    method: 'POST',
    data
  })
}
