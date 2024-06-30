import React, { Component } from "react";
import { StyleSheet,
  View, 
  Text, 
  TouchableOpacity,
  DeviceEventEmitter } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation" ;
import NavigationUtil from "../../navigator/NavigationUtil";
import actions from "../../action/index";
import { connect } from "react-redux";
import NavigationBar from "../../common/NavigationBar";
import TrendingDialog, { TimeSpans } from "../../common/TrendingDialog";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TrendingTabPage from "./TrendingTabPage";
import ArrayUtil from "../../util/ArrayUtil";
import { FLAG_LANGUAGE } from "../../expand/dao/LanguageDao";

const EVENT_TYPE_TIME_SPAN_CHANGE = "EVENT_TYPE_TIME_SPAN_CHANGE"
const URL = 'https://github.com/trending/';
// const QUERY_STR = '?since=daily';
type Props = {};

class TrendingPage extends Component<Props> {
  constructor(props) {
    super(props)
    console.log(NavigationUtil.navigation)
    this.state = {
      timeSpan: TimeSpans[0],
    };

    const {onLoadLanguage} = this.props;
    onLoadLanguage(FLAG_LANGUAGE.flag_language);
    this.preKeys = [];
  }

  _getTabs() {
      const tabs = {};
      const {keys, theme} = this.props;
      this.preKeys = keys
      // this.preKeys = keys.filter((item) => {
      //   if (item.checked) {
      //     return item;
      //   }
      // });
      this.preKeys.forEach((item, index) => {
        if (item.checked) {
          // 这里 tab${index} 是key 唯一标识
          tabs[`tab${index}`] = {
              screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item.name} theme={theme}/>,
              navigationOptions: {
                  title: item.name,
              },
          };
        }
      });
      return tabs;
  }

  onSelectTimeSpan(tab) {
    this.dialog.dismiss();
    this.setState({
      timeSpan: tab
    })
    // 发送事件
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);
  }

  renderTrendingDialog() {
    return <TrendingDialog
      ref={dialog => this.dialog = dialog}
      onSelect={tab => this.onSelectTimeSpan(tab)}
    />
  }

  renderTitleView() {
    return (<View>
      <TouchableOpacity
        underlayColor='transparent'
        onPress={() => this.dialog.show()}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: '400'
          }}>趋势 {this.state.timeSpan.showText}</Text>
          <MaterialIcons
            name={'arrow-drop-down'}
            size={22}
            style={{color: 'white'}}
          />
        </View>
      </TouchableOpacity>
    </View>);
  }

  _tabNav() {
    // if(!this.tabNav) { //优化效率：根据需要选择是否重新创建建TabNavigator，通常tab改变后才重新创建
    //优化效率：根据需要选择是否重新创建建TabNavigator，通常tab改变后才重新创建
    const {theme} = this.props;
    //注意：主题发生变化需要重新渲染top tab
    if (theme !== this.theme || !this.tabNav || !ArrayUtil.isEqual(this.preKeys, this.props.keys)) {//优化效率：根据需要选择是否重新创建建TabNavigator，通常tab改变后才重新创建
      this.theme = theme;
      this.tabNav = createAppContainer(createMaterialTopTabNavigator(
        this._getTabs(), {
          tabBarOptions: { 
            tabStyle: styles.tabStyle,
            upperCaseLabel: false, // 是否使用标签大写, 默认问 true,
            scrollEnabled: true, // 是否支持 选项卡滚动, 默认 false
            style: {
              backgroundColor: theme.themeColor, // tabbar 的背景色
              height: 50, //fix 修复开启scrollEnabled后在 Android上初始化加载时闪烁问题
            },
            indicatorStyle: styles.indicatorStyle, // 标签指示器的样式
            labelStyle: styles.labelStyle, // 文字的样式
          },
          lazy: true,
        },
      ));
    }
    return this.tabNav;
  }

  render() {
    const {keys, theme} = this.props;
    let statusBar = {
      backgroundColor: theme.themeColor, //'orange',
      // barStyle: 'light-content',
      barStyle: 'default',
      hidden: false,
    };
    
    let navigationBar = <NavigationBar
      titleView={this.renderTitleView()}
      statusBar={statusBar}
      style={theme.styles.navBar}
    />;
    
    const TabNavigator = (Array.isArray(keys) && keys.length) ? this._tabNav() : null;
    return (<View style={[styles.constainer]}>
      {navigationBar}
      {/* <TabNavigator /> */}
      {TabNavigator && <TabNavigator/>}
      {this.renderTrendingDialog()}
    </View>);
  }
}


const mspTrendingStateToProps = state => ({
  keys: state.language.languages,
  theme: state.theme.theme,
});
const mspTrendingDispatchToProps = dispatch => ({
  onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mspTrendingStateToProps, mspTrendingDispatchToProps)(TrendingPage);


const styles = StyleSheet.create({
  constainer: {
      flex: 1,
      // marginTop: 33,
  },
  tabStyle: {
      minWidth: 50,
  },
  indicatorStyle: {
      height: 2,
      backgroundColor: 'white',
  },
  labelStyle: {
      fontSize: 13,
      marginTop: 6,
      marginBottom: 6,
  },
  indicator: {
    color: 'red',
    marginTop: 10,
  }
});
