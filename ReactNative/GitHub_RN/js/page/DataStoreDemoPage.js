import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import DataStore from "../expand/dao/DataStore";
// import moment from "moment";

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
    
    this.dataStore.fetchData(url) 
      .then(data => {
        console.log("已经获取到结果");
        // 时间格式转换 存在问题
        // console.log(new Data(1581906228754));
        // console.log(`初次数据加载时间:${typeof data.timestamp}`);
        // console.log(`初次数据加载时间:${new Data(1581906228754)}`);
        // let showData = `初次数据加载时间: ${new Data(data.timestamp)}\n${JSON.stringify(data.data)}`;
        let showData = JSON.stringify(data.timestamp);
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