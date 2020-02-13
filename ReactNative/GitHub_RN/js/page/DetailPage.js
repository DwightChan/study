import React, {Component} from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default class DetailPage extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>详情页面</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});