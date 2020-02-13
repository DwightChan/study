import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import NavigationUtil from "../navigator/NavigationUtil";
// import DetailPage from "../page/DetailPage";
import { createAppContainer } from "react-navigation";

export default class PopularPage extends Component {
    constructor(props) {
        super(props)
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    }
    _getTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            // 这里 tab${index} 是key 唯一标识
            tabs[`tab${index}`] = {
                screen: props => <PopularTab {...props } tabLabel = { item }/>,
                navigationOptions: {
                    title: item,
                },
            };
        });
        return tabs;
    }
    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._getTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    // 默认是大小字母
                    upperCaseLabel: false,
                    // 默认是无法滚动
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#a0a',
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,
                },
            },
        ));
        return ( <View style = { styles.constainer } >
            <TabNavigator /> 
            { /* <Text style={styles.welcome}>PopularPage123</Text> */ } 
          </View>
        );
    }
}

class PopularTab extends Component {
    constructor(props) {
        super(props)
        console.log(props);
        console.log('-----props after');
        console.log(props.tabLabel);
        console.log('-----props tabLabel');
    }
    render() {
      const{navigation} = this.props;
      return (<View> 
        { /* <Text>PopularTab</Text> */ } 
        <Text style={styles.textPressStyle}
          onPress={() => {
            NavigationUtil.goPage({}, 'DetailPage');
          }}
        >{this.props.tabLabel}_跳转到详情页面</Text>
        {/* <Button title = {'修改主题'}
          onPress = {() => navigation.setParams({
            theme: {
              tintColor: '#3f4',
              updateTime: new Date().getTime(),
            }},)
          }
        />  */}
        </View>
      );
    }
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#f5fcff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tabStyle: {
        // minWidth: 10,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: '#111',
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    },
    textPressStyle: {
        backgroundColor: '#ccc',
        // width: 100,
        height: 30,
    }
});