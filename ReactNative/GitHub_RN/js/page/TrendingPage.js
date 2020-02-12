import React,{Component } from "react";
import {StyleSheet, View, Text } from "react-native";

export default class TrendingPage extends Component {
    render() {
        return (
            <View style={styles.constainer}>
                <Text style={styles.welcome}>TrendingPage</Text>
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