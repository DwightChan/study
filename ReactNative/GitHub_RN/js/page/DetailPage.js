/**
 * webview 加载的详情页面
 * 显示 自定义到导航栏, 导航栏有返回+分享按钮;
 */

import React, {Component} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {WebView} from "react-native-webview";
import NavigationBar from "../common/NavigationBar";
import ViewUtil, {THEME_COLOR} from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TRENDING_URL = 'https://github.com';
type Props={}

export default class DetailPage extends Component<Props> {
  constructor(props) {
    super(props)
    // console.log(props);
    console.log(JSON.stringify(props.navigation.state));
    this.params = this.props.navigation.state.params;
    const {projectMode} = this.params;
    this.url = projectMode.html_url || (TRENDING_URL + projectMode.url);
    const title = projectMode.full_name || projectMode.fullName;
    this.state = {
      title: title,
      url: this.url,
      canGoBack: false,
    }
    this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
  }
  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    this.onBack();
    return true;
  }

  // 这里没有使用闭包定义 那么调用者是谁 this 就是谁, 如果中间加了 箭头函数 那this 就是这个 页面
  // 返回上一级
  onBack() {
    console.log('返回上一级');
    if (this.state.canGoBack) {
      this.webView.goBack();
    }else {
      NavigationUtil.goBack(this.props.navigation);
    }
  }

  renderRightButton() {
    return <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          console.log('点击了right button');
        }}
        // underlayColor={'linggray'}
      >
        <FontAwesome 
          // name={'stor-o'}
          name={'star-o'}
          size={20}
          style={{color: 'white', marginRight: 12}}
        />
      </TouchableOpacity>
      {ViewUtil.getShareButton(() => {

      })}
    </View>
  }
  
  onNavigationStateChange(navState) {
    this.setState ({
      canGoBack: navState.canGoBack,
      url: navState.url,
    })
  }
  render() {
    const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null
    let navigationBar = <NavigationBar
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      title={this.state.title}
      style={{backgroundColor: THEME_COLOR}}
      titleLayoutStyle={titleLayoutStyle}
      rightButton={this.renderRightButton()}
    />;
    return (
      <View style={styles.container}>
        {navigationBar}
        {/* <Text style={styles.welcome}>详情页面</Text> */}
        <WebView 
          ref={webview => this.webView = webview}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
          source={{uri: this.state.url}}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f5fcff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});