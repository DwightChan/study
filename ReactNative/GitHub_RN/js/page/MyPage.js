import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import actions from "../action";
import { connect } from "react-redux";
import NavigationUtil from "../navigator/NavigationUtil";

class MyPage extends Component {
    render() {
        const{navigation} = this.props;
        return (
            <View style={styles.container}>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

