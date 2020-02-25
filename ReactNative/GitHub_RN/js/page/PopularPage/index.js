import React, { Component } from "react";
import { StyleSheet, View, Text, RefreshControl, FlatList, ActivityIndicator, Platform } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation" ;
import NavigationUtil from "../../navigator/NavigationUtil";

import actions from "../../action/index";
import { connect } from "react-redux";
import PopularItem from "../../common/PopularItem";
import Toast from "react-native-easy-toast";
import NavigationBar from "../../common/NavigationBar";
import { THEME_COLOR } from "../../util/ViewUtil";

import FavoriteDao from "../../expand/dao/FavoriteDao";
import FavoriteUtil from "../../util/FavoriteUtil";

import EventBus from "react-native-event-bus";
import EventTypes from "../../util/EventTypes";
import PopularTabPage from "./PopularTabPage";

import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

type Props = {};

export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props)
        console.log(NavigationUtil.navigation)
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    }

    _getTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            // 这里 tab${index} 是key 唯一标识
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            };
        });
        return tabs;
    }

    render() {
      let statusBar = {
        backgroundColor: THEME_COLOR, //'orange',
        // barStyle: 'light-content',
        barStyle: 'default',
        hidden: false,
      };

      let navigationBar = <NavigationBar
        title={'最热'}
        statusBar={statusBar}
        style={{backgroundColor: THEME_COLOR}}
      />;

      const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
        this._getTabs(), {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            // 默认是大小字母
            upperCaseLabel: false,
            // 默认是无法滚动
            scrollEnabled: true,
            style: {
                backgroundColor: THEME_COLOR, //'#a0a',
                 height: 45,//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
            },
            indicatorStyle: styles.indicatorStyle,
            labelStyle: styles.labelStyle,
          },
        },
      ));
      return (<View style={styles.container}>
        {navigationBar}
        <TabNavigator /> 
      </View>);
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