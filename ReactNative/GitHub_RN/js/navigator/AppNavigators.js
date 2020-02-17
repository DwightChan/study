import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from "../page/DetailPage";
import FetchDemoPage from "../page/FetchDemoPage";
import AsyncStorageDemoPage from "../page/AsyncStorageDemoPage";
import DataStoreDemoPage from "../page/DataStoreDemoPage";

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null,//隐藏头部
    },
  },
},);
const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,//隐藏头部
        },
    },
    // 值和名字一样 则可以省略
    DetailPage: {
      screen: DetailPage,
      navigationOptions: {
        title: '详情',
        headerBackTitle: '返回',
      }
    },
    FetchDemoPage: {
      screen: FetchDemoPage,
      navigationOptions: {
        title: 'FetchDemoPage',
        headerBackTitle: '返回',
      }
    },
    AsyncStorageDemoPage: {
      screen: AsyncStorageDemoPage,
      navigationOptions: {
        title: 'AsyncStorageDemoPage',
        headerBackTitle: '返回',
      }
    },
    DataStoreDemoPage: {
      screen: DataStoreDemoPage,
      navigationOptions: {
        title: '离线缓存',
        headerBackTitle: '返回',
      }
    }
});
export default createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null,
    },
}));