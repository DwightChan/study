/**
 * AboutPage 页面
 * 显示 自定义到导航栏, 导航栏有返回
 */

import React, {Component} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Linking } from "react-native";
import {WebView} from "react-native-webview";
import NavigationBar from "../../common/NavigationBar";
import ViewUtil from "../../util/ViewUtil";
import NavigationUtil from "../../navigator/NavigationUtil";
import BackPressComponent from "../../common/BackPressComponent";
import AboutCommon, {FLAG_ABOUT} from "./AboutCommon";
import config from "../../res/data/config";
import { MORE_MENU } from "../../common/MORE_MENU";
import GlobalStyles from "../../res/styles/GlobalStyles";
import connect from "react-redux/es/connect/connect";

type Props={}

export default class AboutPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params;
    // console.log(props);
    console.log(JSON.stringify(props.navigation.state.params));
    this.aboutCommon = new AboutCommon({
      ...this.params,
      navigation: this.props.navigation,
      flagAbout: FLAG_ABOUT.flag_about_me,
    }, data => this.setState({...data}));

    this.state = {
      data: config,
    }
    this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
  }
  onClick(menu) {
    const {theme} = this.params;
    let RouteName, params = {theme};
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage';
        params.title = '教程';
        params.url = 'https://www.baidu.com';        
        break;
      case MORE_MENU.About_Author:
        RouteName = 'AboutMePage';
        break;
      case MORE_MENU.Feedback:
        // 注意要打开其他应用, 除了 http 或者HTTPS 开头的 其他的都要在 ios中配置 LSApplicationQueriesSchemes
        // 打开地图：Linking.openURL("geo:37.2122 , 12.222") 传入一个坐标
        // 打电话：Linking.openURL("tel:10086") 传入一个电话号码
        // 打开网站:Linking.openURL("http://www.baidu.com") 传入一个网址，http:// 不能少
        // 发送短信:Linking.openURL("smsto:10086")
        // 发送邮件：Linking.openURL("mailto:10000@qq. com")
        // 打开其他APP：Linking.openURL('flutter://li.zhuoyuan') //其他app定义的scheme以及host。
        const url = 'smsto:10086'//'mailto://crazycodeboy@gmail.com'; //'https:www.baidu.com';//'suncityGroup://'; // 
        Linking.canOpenURL(url)
          .then(support => {
            debugger
            if (!support) {
              console.log('Can\'t handle url: ' + url);
            } else {
              Linking.openURL(url);
            }
          }).catch(e => {
          console.error('An error occurred', e);
        });
        break;
      default:
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(params, RouteName);
    }
  }
  
  getItem(menu) {
    return ViewUtil.getMenuItem(() => this.onClick(menu), menu, this.params.theme.themeColor);
  }
  render() {
    const content = <View>
      {this.getItem(MORE_MENU.Tutorial)}
      <View style={GlobalStyles.line}/>
      {this.getItem(MORE_MENU.About_Author)}
      <View style={GlobalStyles.line}/>
      {this.getItem(MORE_MENU.Feedback)}
      <View style={GlobalStyles.line}/>
    </View>
    return this.aboutCommon.render(content, this.state.data.app);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
