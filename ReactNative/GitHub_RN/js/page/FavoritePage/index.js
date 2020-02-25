import React, { Component } from "react";
import { StyleSheet, View, Text, RefreshControl, FlatList, ActivityIndicator, Platform } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation" ;
import NavigationUtil from "../../navigator/NavigationUtil";
// import DetailPage from "../page/DetailPage";
import actions from "../../action/index";
import { connect } from "react-redux";
import PopularItem from "../../common/PopularItem";
import TrendingItem from "../../common/TrendingItem";
import Toast from "react-native-easy-toast";
import NavigationBar from "../../common/NavigationBar";
import { THEME_COLOR } from "../../util/ViewUtil";

import FavoriteDao from "../../expand/dao/FavoriteDao";
import FavoriteUtil from "../../util/FavoriteUtil";

import EventBus from "react-native-event-bus";
import EventTypes from "../../util/EventTypes";
import FavoriteTabPage from "./FavoriteTabPage";


import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
// const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

type Props = {};

export default class FavoritePage extends Component<Props> {
  constructor(props) {
    super(props);
    console.log(NavigationUtil.navigation)
    this.tabNames = ['最热', '趋势'];
  }

  render() {
    let statusBar = {
        backgroundColor: THEME_COLOR,
        barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
        title={'最热'}
        statusBar={statusBar}
        style={{backgroundColor: THEME_COLOR}}
    />;
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator({
      'Popular': {
        screen: props => <FavoriteTabPage {...props} flag={'popular'}/>,
        //初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
        navigationOptions: {
          title: '最热',
        },
      },
      'Trending': {
        screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending}/>,
        //初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
        navigationOptions: {
          title: '趋势',
        },
      },
    }, {
      tabBarOptions: {
        tabStyle: styles.tabStyle,
        upperCaseLabel: false,//是否使标签大写，默认为true
        style: {
          backgroundColor: THEME_COLOR,//TabBar 的背景颜色
          height: 50,//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
        },
        indicatorStyle: styles.indicatorStyle,//标签指示器的样式
        labelStyle: styles.labelStyle,//文字的样式
      },
    },));
    return <View style={{flex: 1}}>
      {navigationBar}
      <TabNavigator/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  tabStyle: {
      // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
      padding: 0
  },
  indicatorStyle: {
      height: 2,
      backgroundColor: 'white'
  },
  labelStyle: {
      fontSize: 13,
      margin: 0,
  },
  indicatorContainer: {
      alignItems: "center"
  },
  indicator: {
      color: 'red',
      margin: 10
  }
});
