export default class NavigationUtil {
  /**
   * 跳转到指定页面
   * @param params 要传递参数
   * @param page 要跳转到页面名称(页面路由名称)
   */
  static goPage(params, page) {
    console.log('---goPage---');
    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      console.log('NavigationUtil.navigaiton can not be ull');
      return
    }
    // console.log('以及跳转到页面_', page);
    navigation.navigate(page, {
      ...params,
    });
  }

    /**
     * 重置到首页
     * @param {*} params 
     */
    static resetToHomePage(params) {
        const {navigation} = params;
        navigation.navigate('Main');
    }
}