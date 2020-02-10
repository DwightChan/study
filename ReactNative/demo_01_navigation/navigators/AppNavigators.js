import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import HomePage from '../pages/HomePage';
import Layout from '../pages/D_01_Layout.js';
import {Button} from 'react-native';

export const AppStackNavigator = createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
    },
    Layout: {
      screen: Layout,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params && 
          navigation.state.params.name}页面`, // 动态设置 navigationOptions
      }),
    },
    Page1: {
      screen: Page1,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params &&
          navigation.state.params.name}页面名`, //动态设置navigationOptions
      }),
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        title: 'Page2',
        // header:null
      },
    },
    Page3: {
      screen: Page3,
      navigationOptions: props => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params = {}} = state;
        return {
          title: params.name ? params.name : 'This is Page3',
          headerRight: (
            <Button
              title={params.mode === 'edit' ? '保存' : '编辑'}
              onPress={() => {
                setParams({mode: params.mode === 'edit' ? '' : 'edit'});
              }}
            />
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      //全局默认属性，对当前导航器的所有页面有效
      // header: null //可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    },
  },
);
