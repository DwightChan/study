import React,{ Component } from "react";
import {StyleSheet, View, Text } from "react-native";
import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";
// 导入自定义控制页面
import PopularPage from '../page/PopularPage'
import TrendingPage from './TrendingPage'
import FavoritePage from '../page/FavoritePage'
import MyPage from '../page/MyPage'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class HomePage extends Component {
    _tabNavigator() {
        return createAppContainer(
            createBottomTabNavigator({
                PopularPage: {
                    screen: PopularPage,
                    navigationOptions: {
                        tabBarLabel: '最热',
                        tabBarIcon: ({tintColor, focused}) => (
                            <MateralIcons 
                                name={'whatshot'}
                                size={26}
                                style={{color: tintColor}}
                            />
                        ),
                    },
                },
                TrendingPage: {
                    screen: TrendingPage,
                    navigationOptions: {
                        tabBarLabel: '趋势',
                        tabBarIcon: ({tintColor, focused}) => (
                            <Ionicons 
                                name={'md-trending-up'}
                                size={26}
                                style={{color: tintColor}}
                            />
                        )
                    }
                },
                FavoritePage: {
                    screen: FavoritePage,
                    navigationOptions: {
                        tabBarLabel: '收藏',
                        tabBarIcon: ({tintColor, focused}) => (
                            <MaterialIcons
                                name={'favorite'}
                                size={26}
                                style={{color: tintColor}}

                            />
                        ),
                    },
                },
                MyPage: {
                    screen: MyPage,
                    navigationOptions: {
                        tabBarLabel: '我的',
                        tabBarIcon: ({tintColor, focused}) => (
                            <Entypo
                                name={'user'}
                                size={26}
                                style={{color: tintColor}}

                            />
                        ),
                    },
                },
            })
        )
    }
    render() {
        return (
            <View style={styles.constainer}>
                <Text style={styles.welcome}>PopularPage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent:  'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});