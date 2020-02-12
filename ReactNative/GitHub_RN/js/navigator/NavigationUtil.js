export default class NavigationUtil {

    /**
     * 重置到首页
     * @param {*} params 
     */
    static resetToHomePage(params) {
        console.log(params, 123);
        const {navigation} = params;
        console.log(navigation, 321);
        navigation.navigate('Main');
    }
}