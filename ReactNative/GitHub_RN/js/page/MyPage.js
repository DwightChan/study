import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import actions from "../action";
import { connect } from "react-redux";
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import { THEME_COLOR } from "../util/ViewUtil";
// import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MORE_MENU } from "../common/MORE_MENU";
import ViewUtil from "../util/ViewUtil";
import GlobalStyles from "../res/styles/GlobalStyles";
import types from "../action/types";

class MyPage extends Component {

  getRightButton() {
    return <View style={{flexDirection: 'row'}}>
      <TouchableOpacity 
        onPress={() => {
          console.log('right 被点击了');
        }}
      >
        <View style={{padding: 5, marginRight:8}}>
          <Feather
            name={'search'}
            size={24}
            style={{color: 'white'}}
          />
        </View>

      </TouchableOpacity>
    </View>
  }
  onClick(menu) {
    let RouteName, params = {};
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage';
        params.title = '教程';
        params.url = 'https://coding.m.imooc.com/';
        break;
      default:
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(params,RouteName);
    }
  }
  getItem(menu) {
    return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR, null);
  }
  render() {
    let statusBar = {
      backgroundColor: 'green',
      barStyle: 'light-content',
      // barStyle: 'default',
      hidden: false,
    };

    let navigationBar = <NavigationBar
      title={'我的'}
      // statusBar={statusbar}
      style={{backgroundColor: THEME_COLOR}}
      rightButton={this.getRightButton()}
    />;

    const{navigation} = this.props;
      return (<View style={GlobalStyles.root_container}>
        {navigationBar}
        <ScrollView>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.onClick(MORE_MENU.About)}
          >
            <View style={styles.about_left}>
              <MORE_MENU.About.Icons 
                name={MORE_MENU.About.icon}
                size={40}
                style={{
                  marginRight: 10,
                  color: THEME_COLOR,
                }}
              />
              <Text>GitHub Popular</Text>
            </View>
            <Ionicons 
              name={'ios-arrow-forward'}
              size={16}
              style={{
                marginRight: 10,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <View style={GlobalStyles.line}/>
          {/* 教程 */}
          {this.getItem(MORE_MENU.Tutorial)}
          {/* 趋势管理 */}
          <Text style={styles.groupTitle}>趋势管理</Text>
          {/* 自定义语言 */}
          {this.getItem(MORE_MENU.Custom_Language)}
          {/* 语言排序 */}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Sort_Language)}

          {/* 最热管理 */}
          <Text style={styles.groupTitle}>最热管理</Text>
          {/* 自定义标签 */}
          {this.getItem(MORE_MENU.Custom_Key)}
          {/* 标签排序 */}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Sort_Key)}
          {/* 标签移除 */}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Remove_Key)}

          {/* 设置 */}
          <Text style={styles.line}>设置</Text>
          {/* 自定义主题 */}
          {this.getItem(MORE_MENU.Custom_Theme)}
          {/* 关于作者 */}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.About_Author)}
          {/* 反馈 */}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Feedback)}

        </ScrollView>
      </View>)
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    about_left: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    item: {
      backgroundColor: '#fff',
      height: 90,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    groupTitle: {
      marginHorizontal: 10,
      marginVertical: 5,
      fontSize: 12,
      color: 'gray',
    }
});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});

export default connect(null, mapDispatchToProps)(MyPage);
