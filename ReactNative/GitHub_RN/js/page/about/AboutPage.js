/**
 * aboutpage 加载的详情页面
 * 显示 自定义到导航栏, 导航栏有返回
 */

import React, {Component} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import {WebView} from "react-native-webview";
import NavigationBar from "../../common/NavigationBar";
import ViewUtil, {THEME_COLOR} from "../../util/ViewUtil";
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
    let RouteName, params = {};
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage';
        params.title = '教程';
        params.url = 'https://www.baidu.com';        
        break;
      default:
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(params, RouteName);
    }
  }
  
  getItem(menu) {
    return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR);
  }
  render() {
    const content = <View>
      {this.getItem(MORE_MENU.Tutorial)}
      <View style={GlobalStyles.line}/>
      {this.getItem(MORE_MENU.About_Author)}
      <View style={GlobalStyles.line}/>
      {this.getItem(MORE_MENU.Feedback)}
    </View>
    return this.aboutCommon.render(connect, this.state.data.app);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});