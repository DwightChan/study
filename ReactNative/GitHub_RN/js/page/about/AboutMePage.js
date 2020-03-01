/**
 * AboutMePage 页面
 * 显示 自定义到导航栏, 导航栏有返回
 */

import React, {Component} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Clipboard } from "react-native";
import {WebView} from "react-native-webview";
import NavigationBar from "../../common/NavigationBar";
import ViewUtil from "../../util/ViewUtil";
import NavigationUtil from "../../navigator/NavigationUtil";
import BackPressComponent from "../../common/BackPressComponent";
import AboutCommon, {FLAG_ABOUT} from "./AboutCommon";
// import config from "../../res/data/config";
import config from "../../res/data/config.json";
import { MORE_MENU } from "../../common/MORE_MENU";
import GlobalStyles from "../../res/styles/GlobalStyles";
import connect from "react-redux/es/connect/connect";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-easy-toast";

type Props={}

export default class AboutMePage extends Component<Props> {
  constructor(props) {
    super(props)
    // console.log(props);
    console.log(JSON.stringify(props.navigation.state.params));
    this.params = this.props.navigation.state.params;
    this.aboutCommon = new AboutCommon({
      ...this.params,
      navigation: this.props.navigation,
      flagAbout: FLAG_ABOUT.flag_about_me,
    }, data => this.setState({...data}));

    this.state = {
      data: config,
      showTutorial: true,
      showBlog: false,
      showQQ: false,
      showContact: false,
    }
    // this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
  }
  onClick(tab) {
    if (!tab) return;
    if (tab.url) {
      NavigationUtil.goPage({
        title: tab.title,
        url: tab.url,
      }, 'WebViewPage');
      return;
    }
    // 邮箱
    if (tab.account && tab.account.indexOf('@') > -1) {
      let url = 'mailto://' + tab.account;
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('can not handle url:' + url);
        }else {
          return Linking.openURL(url);
        }
      })
      .catch(e => {
        console.log('An error occurred', e);
      })
      return;
    }
    if (tab.account) {
      Clipboard.setString(tab.account);
      this.toast.show(tab.title + tab.account + '已复制到剪贴板.')
    }
  }
  
  getItem(menu) {
    return ViewUtil.getMenuItem(() => this.onClick(menu), menu, this.params.theme.themeColor);
  }
  _item(data, isShow, key) {
    return ViewUtil.getSettingItem(() => {
      this.setState({
        [key]: !this.state[key]
      })
    }, data.name, this.params.theme.themeColor, Ionicons, data.icon, isShow ? 'ios-arrow-up' : 'ios-arrow-down');
  }
  renderItems(dic, isShowAccount) {
    if (!dic) return null;
    let views =[];
    for (const i in dic) {
      let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
      views.push(
        <View key={i}>
          {ViewUtil.getSettingItem(() => this.onClick(dic[i]), title, this.params.theme.themeColor)}
          <View style={GlobalStyles.line}/>
        </View>
      )
    }
    return views;
  }
  render() {
    const content = <View>
      {this._item(this.state.data.aboutMe.Tutorial, this.state.showTutorial, 'showTutorial')}
      <View style={GlobalStyles.line}/>
      {this.state.showTutorial ? this.renderItems(this.state.data.aboutMe.Tutorial.items, false) : null}

      {this._item(this.state.data.aboutMe.Blog, this.state.showBlog, 'showBlog')}
      <View style={GlobalStyles.line}/>
      {this.state.showBlog ? this.renderItems(this.state.data.aboutMe.Blog.items) : null}

      {this._item(this.state.data.aboutMe.QQ, this.state.showQQ, 'showQQ')}
      <View style={GlobalStyles.line}/>
      {this.state.showQQ ? this.renderItems(this.state.data.aboutMe.QQ.items, true) : null}

      {this._item(this.state.data.aboutMe.Contact, this.state.showContact, 'showContact')}
      <View style={GlobalStyles.line}/>
      {this.state.showContact ? this.renderItems(this.state.data.aboutMe.Contact.items, true) : null}
    </View>
    return <View style={{flex: 1}}>
      {this.aboutCommon.render(content, this.state.data.author)}
      <Toast ref={toast => this.toast = toast}
        // style={{position: 'center'}}
        position={'center'}
      />
    </View>
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});