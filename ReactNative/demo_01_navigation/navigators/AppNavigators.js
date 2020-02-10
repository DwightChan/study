import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import HomePage from '../pages/HomePage';
import Layout from '../pages/D_01_Layout.js';
import {Button, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const BottomTabNavigator = createBottomTabNavigator(
  {// 在这里配置页面的路由
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        tabBarLabel: ({tintColor, focused}) => (// 自定义tab 文字
          <Text style={{color: focused ? 'orange' : 'skyblue'}}>自定义文字</Text>
          // <Text style={{color: focused ? 'orange' : 'grey'}}>Page2</Text>
        ),
        // tabBarLabel: 'page2',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons 
            name={'ios-people'}
            size={26}
            style={{color: focused ? 'orange' : 'skyblue'}}
          />
        )
      }
    },
    Page1: {
      screen: Page1,
      navigationOptions: {
        tabBarLabel: 'Page1',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons 
            name={'ios-home'}
            size={26}
            style={{color: tintColor}}
          />
        )
      }
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        tabBarLabel: ({tintColor, focused}) => (// 自定义tab 文字
          <Text style={{color: focused ? 'orange' : 'skyblue'}}>自定义文字</Text>
          // <Text style={{color: focused ? 'orange' : 'grey'}}>Page2</Text>
        ),
        // tabBarLabel: 'page2',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons 
            name={'ios-people'}
            size={26}
            style={{color: focused ? 'orange' : 'skyblue'}}
          />
        )
      }
    }
  },
  { 
    tabBarOptions: {
      // activeTintColor: 'red'
      activeTintColor: 'red'
    }
  }
)

// 这个地方只是配置 导航路由
// 第一个参数是个对象,
// 第一个参数的第一个元素 也就是 默认的导航, 
export const AppStackNavigator = createStackNavigator(
  {
    HomePage: {
      screen: BottomTabNavigator,
      navigationOptions: {
        title: '底部导航',
        headerRight: null
      }
    },
    // HomePage: 是路由名称
    // HomePage: {
    //   screen: HomePage, // 这个HomePage 路由导入的文件 import HomePage from '../pages/HomePage';
    // },
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
        // 这里如果是 空的时候容易闪退, 所以设置默认值 为空对象
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
