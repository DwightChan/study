import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import DataStore from "../expand/dao/DataStore";

type Props = {};
const KEY = 'save_key';

export default class DataStoreDemoPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showText: ''
    }
    this.dataStore = new DataStore();
  }

  loadData() {
    // console.log("点击了获取");
    let url = `https://api.github.com/search/repositories?q=${this.value}`;
    console.log(`这个是url:${url}`);
    
    this.dataStore.fetchLocalData(url) 
      .then(data => {
        let showData = `初次数据加载时间: ${new Data(data.timestamp)}\n${JSON.stringify(data.data)}`;
        this.setState({
          showText: showData
        }).catch(error => {
          error && console.error(error.toString());
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>离线缓存框架设计</Text>
        <TextInput 
          style={styles.input} 
          onChangeText={ text => {
            this.value = text;
          }}
        />
        <Text 
          onPress={() => {
            this.loadData();
          }}
        >获取
        </Text>
        <Text>
          {this.state.showText}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 30,
    borderColor: 'black',
    borderWidth: 2,
    marginRight: 10,
  },
  inpute_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})