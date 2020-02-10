import React from 'react';
import {Button, StyleSheet, Text, View, TextInput} from 'react-native';

export default class Page3 extends React.Component {

    render() {
        const {navigation} = this.props;
        console.log(navigation)
        const {state, setParams} = navigation;
        const {params} = state;
        const showText = params && params.mode === 'edit' ? '正在编辑' : '编辑完成';

        return <View style={{flex: 1, backgroundColor: "white", paddingTop: 30}}>
            <Text style={styles.text}>欢迎来到Page3</Text>
            <Text style={styles.showText}>{showText}</Text>
            <Button title={'Go Back'} onPress={() => {
                navigation.goBack();
            }}/>
            <TextInput
                style={styles.input}
                onChangeText={text => {
                    setParams({name: text});
                    console.log(state)
                    
                }
                }
            />
        </View>
    }
    // componentWillMount() {
    //     const {navigation} = this.props;
    //     console.log(navigation)
    //     const {setParams} = navigation;
    //     setParams({name: '测试标题'});
    // }
    // 已经渲染完成 则调用这个方法
    // componentDidMount() {
        // const {navigation} = this.props;
        // console.log(navigation)
        // const {setParams} = navigation;
        // setParams({name: '测试标题'});
        // this.setState({name: '测试标题'})
    // }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'white'
    },
    showText: {
        marginTop: 20,
        fontSize: 20,
        color: 'red'
    },
    input: {
        height: 50,
        borderWidth: 1,
        marginTop: 10,
        borderColor: 'black'
    }
});