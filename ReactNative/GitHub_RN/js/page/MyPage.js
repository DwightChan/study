import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import actions from "../action";
import { connect } from "react-redux";
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
// import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

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

  getLeftButton() {
    return <View style={{flexDirection: 'row'}}>
      <TouchableOpacity 
        onPress={() => {
          console.log('left 被点击了');
        }}
      >
        <View style={{padding: 5, marginLeft: 8}}>
          <Ionicons
            name={'ios-arrow-back'}
            size={26}
            style={{color: 'white'}}
          />
        </View>
      </TouchableOpacity>
    </View>
  }

  render() {
    let statusBar = {
      backgroundColor: 'green',
      // barStyle: 'light-content',
      barStyle: 'default',
      hidden: false,
    };

    let navigationBar = <NavigationBar
      title={'我的'}
      // statusBar={statusbar}
      style={{backgroundColor: 'pink'}}
      rightButton={this.getRightButton()}
      leftButton={this.getLeftButton()}
    />;

    const{navigation} = this.props;
      return (
          <View style={styles.container}>
            {navigationBar}
              <Text style={styles.welcome}>
                  MyPage
              </Text>
              <Button title={'修改主题'}
                onPress={() => this.props.onThemeChange('skyblue')}
              />
              { /* <Text>PopularTab</Text> */ } 
      <Text style={styles.textPressStyle}
        onPress={() => {
          NavigationUtil.goPage({}, 'DetailPage');
        }}
      >{this.props.tabLabel}_跳转到详情页面</Text>
      <Button 
        title={"Fetch使用"}
        onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, "FetchDemoPage")
        }}
      />
      <Button 
        title={"asyncStore 使用"}
        onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, "AsyncStorageDemoPage")
        }}
      />
      <Button 
        title={"离线缓存demo"}
        onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, "DataStoreDemoPage")
        }}
      />
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});

export default connect(null, mapDispatchToProps)(MyPage);

