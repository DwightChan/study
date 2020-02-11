import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
// createBottomTabNavigator: 底部导航器, 就是ios中的tabbar
// createMaterialTopTabNavigator: 顶部导航
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Page4 from '../pages/Page4';
import Page5 from '../pages/Page5';
import HomePage from '../pages/HomePage';
import Layout from '../pages/D_01_Layout.js';
import {Button, Text, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer'
// import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import SwitchNavigator from './SwitchNavigator';

const DrawerNav = createDrawerNavigator(
  {
    Page4: {
      screen: Page4,
      navigationOptions: {
        drawerLabel: 'Page4',
        // drawerIcon: ({tintColor, focused}) => (
        //   <MaterialIcons name={'drafts'}/>
        // )
        drawerIcon: ({tintColor, focused}) => (
          <MaterialIcons 
            name={'favorite'}
            size={26}
            style={{color: focused ? 'orange' : 'skyblue'}}
          />
        )
      }
    },
    Page5: {
      screen: Page5,
      navigationOptions: {
        drawerLabel: 'Page5',
        drawerIcon: ({tintColor, focused}) => (
          <MaterialIcons 
            name={'android'}
            size={26}
            style={{color: focused ? 'orange' : 'skyblue'}}
          />
        )
      }
    },
    Page1: {
      screen: Page1,
      navigationOptions: {
        drawerLabel: 'Page1',
        // drawerIcon: ({tintColor, focused}) => (
        //   <MaterialIcons name={'drafts'}/>
        // )
        drawerIcon: ({tintColor, focused}) => (
          <MaterialIcons 
            name={'favorite'}
            size={26}
            style={{color: focused ? 'orange' : 'skyblue'}}
          />
        )
      }
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        drawerLabel: 'Page2',
        drawerIcon: ({tintColor, focused}) => (
          <MaterialIcons 
            name={'android'}
            size={26}
            style={{color: focused ? 'orange' : 'skyblue'}}
          />
        )
      }
    },
    Page3: {
      screen: Page3,
      navigationOptions: {
        drawerLabel: 'Page3',
        // drawerIcon: ({tintColor, focused}) => (
        //   <MaterialIcons name={'drafts'}/>
        // )
        drawerIcon: ({tintColor, focused}) => (
          <MaterialIcons 
            name={'favorite'}
            size={26}
            style={{color: focused ? 'orange' : 'skyblue'}}
          />
        )
      }
    },
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        drawerLabel: 'HomePage',
        // drawerIcon: ({tintColor, focused}) => (
        //   <MaterialIcons name={'drafts'}/>
        // )
        drawerIcon: ({tintColor, focused}) => (
          <MaterialIcons 
            name={'favorite'}
            size={26}
            style={{color: focused ? 'orange' : 'skyblue'}}
          />
        )
      }
    }
  },
  {
    contentComponent: (props) => ( // 自定义侧拉抽屉
      <ScrollView style={{backgroundColor: '#098', flex: 1}}>
        <SafeAreaView forceInset={{top: 'always'}}>
          <DrawerNavigatorItems {...props}/>
        </SafeAreaView>
      </ScrollView>
    ),
    contentOptions: {
      activeTintColor: 'white'
    }
  }
)
// 顶部导航
const MaterialTopTabNavigator = createMaterialTopTabNavigator(
  {// 这里配置页面的路由
    Page1: {
      screen: Page1,
      navigationOptions: {
        tabBarLabel: 'Page1',
      }
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        tabBarLabel: ({tintColor, focused}) => (
          <Text style={{color: focused ? 'orange' : 'grey'}}>文本Page2</Text>
        )
      }
    },
    Page3: {
      screen: Page3,
      navigationOptions: {
        tabBarLabel: 'Page3'
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'skyblue',
      tabStyle: { // tab
        // 最小宽度 为50
        minWidth: 50
      }, 
      upperCaseLabel: false, // 是否标签大写, 默认是true
      style: {
        backgroundColor: '#ccc'
      },
      indicatorStyle: { // 指示器样式
        height: 2,
        backgroundColor: 'white'
      },
      labelStyle: { // 文字的样式
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6
      }
    }
  }
)

// 底部导航 tabbar
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
    MaterialTopTabNavigator: {
      screen: MaterialTopTabNavigator,
      navigationOptions: {
        title: '顶部导航器',
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
    // HomePage: {
    //   screen: BottomTabNavigator,
    //   navigationOptions: {
    //     title: '底部导航',
    //     headerRight: null
    //   }
    // },
    // HomePage: 是路由名称
    HomePage: {
      screen: HomePage, // 这个HomePage 路由导入的文件 import HomePage from '../pages/HomePage';
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
    DrawerNav: DrawerNav,
    SwitchNav: SwitchNavigator,
    MaterialTopTabNavigator: {
      screen:  MaterialTopTabNavigator,
      navigationOptions: {
        title: '顶部导航'
      }
    },
    BottomTabNavigator: {
      screen: BottomTabNavigator,
      navigationOptions: {
        title: '底部导航',
        header: null
      }
    },
  },
  {
    defaultNavigationOptions: {
      //全局默认属性，对当前导航器的所有页面有效
      // header: null //可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    },
  },
);
