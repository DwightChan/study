import React,{Component } from "react";
import {StyleSheet, View, Text, Button } from "react-native";

export default class TrendingPage extends Component {
    
    render() {
      const {navigation} = this.props;
        return (
            <View style={styles.constainer}>
                <Text style={styles.welcome}>TrendingPage</Text>
                <Button 
                  title={'修改主题'}
                  onPress={() => navigation.setParams(
                    {
                      theme: {
                        tintColor: 'yellow',
                        updateTime: new Date().getTime(),
                      },
                    },
                  )}
                />
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