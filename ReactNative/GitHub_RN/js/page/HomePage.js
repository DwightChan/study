import React,{ Component } from "react";
import {StyleSheet, View, Text } from "react-native";
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'

export default class HomePage extends Component {
  render() {
    return <DynamicTabNavigator />
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