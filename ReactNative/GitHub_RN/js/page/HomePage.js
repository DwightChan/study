import React,{ Component } from "react";
import {StyleSheet, View, Text } from "react-native";
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import NavigationUtil from "../navigator/NavigationUtil";

export default class HomePage extends Component {
  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />;
  }
}