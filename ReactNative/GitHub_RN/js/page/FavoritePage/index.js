import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation" ;
import NavigationUtil from "../../navigator/NavigationUtil";
import { connect } from "react-redux";
import actions from "../../action/index";
import NavigationBar from "../../common/NavigationBar";
import FavoriteTabPage from "./FavoriteTabPage";
import Toast from "react-native-easy-toast";
import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
import FavoriteUtil from "../../util/FavoriteUtil";

type Props = {};

class FavoritePage extends Component<Props> {
  constructor(props) {
    super(props);
    console.log(NavigationUtil.navigation)
  }

  render() {
    const {theme} = this.props;
    let statusBar = {
        backgroundColor: theme.themeColor,
        barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
        title={'收藏'}
        statusBar={statusBar}
        style={theme.styles.navBar}
    />;
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator({
      'Popular': {
        screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular} theme={theme}/>,
        //初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
        navigationOptions: {
          title: '最热',
        },
      },
      'Trending': {
        screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending} theme={theme}/>,
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
          backgroundColor: theme.themeColor,//TabBar 的背景颜色
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

const mapFavoriteStateToProps = state => ({
  theme: state.theme.theme,
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapFavoriteStateToProps)(FavoritePage);

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
