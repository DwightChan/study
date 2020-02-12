import React,{ Component } from "react";
import {StyleSheet, View, Text } from "react-native";
import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
// 导入自定义控制页面
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

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

export default class DynamicTabNaivgator extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true; // 关闭黄色警告弹框;
  }
  _tabNavigator() {
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
    PopularPage.navigationOptions.tabBarLabel = '最热123'; // 动态修改 tab 属性
    return createAppContainer(createBottomTabNavigator(
      tabs,
      {
        tabBarComponent: TabBarComponent,
      }
    ));
  }

  render() {
    // 这里必须先导出 Tab 在使用, 不能直接return this._tabNavigator(); 
    const Tab = this._tabNavigator();
    return <Tab/>;
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
    const {routes, index} = this.props.navigation.state;
    if (routes[index].params) {
      const {theme} = routes[index].params;
      // 以最新的 更新时间为主, 繁殖被其他tab 之前的修改覆盖
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }
    return <BottomTabBar
      {...this.props}
      activeTintColor={this.theme.tintColor || this.props.activeTintColor}
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