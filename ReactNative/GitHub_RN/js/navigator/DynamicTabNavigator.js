import React,{ Component } from "react";
import {StyleSheet, View, Text, Image } from "react-native";
import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
// 导入自定义控制页面
import PopularPage from '../page/PopularPage/index';
import TrendingPage from '../page/TrendingPage/index';
import FavoritePage from '../page/FavoritePage/index';
import MyPage from '../page/Mine/MyPage';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from "react-redux";
import action from "../action";
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";

const TABS = { // 这里配合页面的路由
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons 
          name={'whatshot'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    },
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons 
          name={'md-trending-up'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    },
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons
          name={'favorite'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    },
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor, focused}) => (
        <Entypo
          name={'user'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    },
  },
};

class DynamicTabNaivgator extends Component<Props> {
  constructor(props) {
    super(props);
    console.disableYellowBox = true; // 关闭黄色警告弹框;
  }
  _tabNavigator() {
    if (this.Tabs) {
      return this.Tabs;
    }
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
    // const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
    PopularPage.navigationOptions.tabBarLabel = '最热123'; // 动态修改 tab 属性
    return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
      tabBarComponent: props => {
        return <TabBarComponent theme={this.props.theme} {...props}/>;
      }
    }));
  }

  render() {
    // 这里必须先导出 Tab 在使用, 不能直接return this._tabNavigator(); 
    const Tab = this._tabNavigator();
    return <Tab
      onNavigationStateChange={(prevState, newState, action) => {
        // 发送底部tabbar item切换的事件
        EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, { 
          from: prevState.index,
          to: newState.index,
        });
      }}
    />;
  }
}

class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    };
  }
  render() {
    return <BottomTabBar
      {...this.props}
      activeTintColor={this.props.theme.themeColor}
    />;
  }
}

const styles = StyleSheet.create({
  constainer: {
      flex: 1,
      justifyContent:  'center',
      alignItems: 'center',
      backgroundColor: '#f5fcff',
  },
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },
});

// 在动态 daynamicTabNavigator 使用这个 
const mapStateToProps = state => ({
  theme: state.theme.theme,
});
export default connect(mapStateToProps)(DynamicTabNaivgator);

// 这页面中使用这个
// const mapDispatchToProps = dispatch => ({
//   onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
// });

// export default connect(null, mapDispatchToProps)(DynamicTabNaivgator);
