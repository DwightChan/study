import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class HomePage extends React.Component {
    //在这里定义页面的导航属性
    static navigationOptions = {
        title: 'Home',
        // 这个是调到别的页面 显示当前的文本显示
        headerBackTitle: '返回',//设置返回此页面的返回按钮文案，有长度限制，Android不支持
    };

    render() {
        const {navigation} = this.props;
        return <View style={{flex: 1, paddingTop: 30}}>
            <Text style={styles.text}>欢迎来到HomePage</Text>
            <Button title={'Go to Layout'} onPress={() => {
              navigation.navigate('Layout', {name: 'Layout布局'});
            }} />
            <Button title={'Go to Page1'} onPress={() => {
                navigation.navigate('Page1', {name: '动态的'});
            }}/>
            <Button title={'Go to Page2'} onPress={() => {
                navigation.navigate('Page2');
            }}/>
            <Button title={'Go to Page3'} onPress={() => {
                // navigation.navigate('Page3', {name: '123'});
                navigation.navigate('Page3');
            }}/>
        </View>
    }

}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#999'
    }
});