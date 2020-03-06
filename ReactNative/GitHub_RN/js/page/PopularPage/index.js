import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation" ;
import NavigationUtil from "../../navigator/NavigationUtil";

import NavigationBar from "../../common/NavigationBar";
import PopularTabPage from "./PopularTabPage";
import actions from "../../action/index";
import { connect } from "react-redux";
import { FLAG_LANGUAGE } from "../../expand/dao/LanguageDao";
import EventBus from "react-native-event-bus";
import EventTypes from "../../util/EventTypes";
import Ionicons from 'react-native-vector-icons/Ionicons'


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

type Props = {};

class PopularPage extends Component<Props> {
  constructor(props) {
    super(props)
    console.log(NavigationUtil.navigation)
    // this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    this.loadData();
  }

  componentDidMount() {
    EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.listener = data => {
      console.log("data:" + JSON.stringify(data));
      this.loadData();
    });
  }
  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }
  loadData() {
    const {onLoadLanguage} = this.props;
    onLoadLanguage(FLAG_LANGUAGE.flag_key);
  }

  renderRightButton() {
    const {theme} = this.props;
    return <TouchableOpacity
      onPress={() => {
        NavigationUtil.goPage({theme}, 'SearchPage')
      }}
    >
      <View style={{padding: 5, marginRight: 8}}>
        <Ionicons
          name={'ios-search'}
          size={24}
          style={{
            marginRight: 8,
            alignSelf: 'center',
            color: 'white',
          }}/>
      </View>
    </TouchableOpacity>
  }

  _getTabs() {
    const tabs = {};
    const {keys, theme} = this.props;
    keys.forEach((item, index) => {
      if (item && item.checked) {
        tabs[`tab${index}`] = {
          screen: props => <PopularTabPage {...props} tabLabel={item.name} theme={theme}/>,
          navigationOptions: {
            title: item.name
          }
        }
      }
    });

    // keys.forEach((item, index) => {
    //   // 这里 tab${index} 是key 唯一标识
    //   tabs[`tab${index}`] = {
    //     screen: props => <PopularTabPage {...props} tabLabel={item.name}/>,
    //     navigationOptions: {
    //       title: item.name,
    //     },
    //   };
    // });
    return tabs;
  }

  render() {
    let {keys, theme} = this.props;
    let statusBar = {
      backgroundColor: theme.themeColor, //'orange',
      // barStyle: 'light-content',
      barStyle: 'default',
      hidden: false,
    };
    let navigationBar = <NavigationBar
      title={'最热6'}
      statusBar={statusBar}
      style={theme.styles.navBar}
      rightButton={this.renderRightButton()}
    />;
    
    const TabNavigator = keys.length ? createAppContainer(createMaterialTopTabNavigator(
      this._getTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          // 默认是大小字母
          upperCaseLabel: false,
          // 默认是无法滚动
          scrollEnabled: true,
          style: {
              backgroundColor: theme.themeColor, //'#a0a',
                height: 45,//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
        },
        lazy: true,
      },
    )) : null;
    return (<View style={styles.container}>
      {navigationBar}
      {/* <TabNavigator />  */}
      {TabNavigator && <TabNavigator />}
    </View>);
  }
}

const mapPopularStateToProps = state => ({
  keys: state.language.keys,
  theme: state.theme.theme,
});
const mapPopularDispatchToProps = dispatch => ({
  onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(PopularPage);


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
  indicator: {
      color: 'red',
      margin: 10
  }
});