import React,{ Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";

export default class WelcomePage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>WelcomePage</Text>
            </View>
        );
    }
    // view 显示完成
    componentDidMount() {
        this.timer = setTimeout(() => {
            // 跳转到首页
            console.log('2秒了, 我要跳转了哦');
            console.log(this.props);
            NavigationUtil.resetToHomePage(this.props);
            console.log('准备清除定时器');
        }, 200);
    }

    // componentWillMount() {
    // }
    componentWillUnmount() {
        // 页面销毁时, 清空计时器
        this.timer && clearTimeout(this.timer);
        console.log('已经清楚定时器');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});