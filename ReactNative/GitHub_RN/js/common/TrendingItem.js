import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HTMLView from "react-native-htmlview";
import BaseItem from "./BaseItem";

/**
 * fullName: "coolsnowwolf/lede"
url: "/coolsnowwolf/lede"
description: "Lean's OpenWrt source"
language: "C"
meta: "56 stars today"
contributors: (10) ["{&quot;event_type&quot;:&quot;explore.click&quot;,…since=weekly&quot;,&quot;user_id&quot;:11989769}}", "https://avatars3.githubusercontent.com/u/31687149?s=40&amp;v=4", "{&quot;event_type&quot;:&quot;explore.click&quot;,…since=weekly&quot;,&quot;user_id&quot;:11989769}}", "https://avatars3.githubusercontent.com/u/42570690?s=40&amp;v=4", "{&quot;event_type&quot;:&quot;explore.click&quot;,…since=weekly&quot;,&quot;user_id&quot;:11989769}}", "https://avatars3.githubusercontent.com/u/31819771?s=40&amp;v=4", "{&quot;event_type&quot;:&quot;explore.click&quot;,…since=weekly&quot;,&quot;user_id&quot;:11989769}}", "https://avatars2.githubusercontent.com/u/2138631?s=40&amp;v=4", "{&quot;event_type&quot;:&quot;explore.click&quot;,…since=weekly&quot;,&quot;user_id&quot;:11989769}}", "https://avatars2.githubusercontent.com/u/33008627?s=40&amp;v=4"]
contributorsUrl: "d-inline-block"
starCount: "7,584"
forkCount: "6,846"
__proto__: Object
 */
export default class TrendingItem extends BaseItem {
  render() {
      // const {item} = this.props;
      const {projectModel} = this.props;
      const {item} = projectModel;
      if (!item) return null;
      
      let description = '<p>' + item.description + '</p>';
      // let description = '<p><a href="https://m-pre.irainbow7.com/#/login?dlogin=true">&hearts; nice job!</a></p>';
      return (
          <TouchableOpacity
              onPress={() => this.onItemClick()}
          >
              <View style={styles.cell_container}>
                <Text style={styles.title}>
                  {item.fullName}
                </Text>
                  <HTMLView
                      value={description}
                      // 这里可以获取条跳转链接
                      onLinkPress={(url) => {
                        console.log(url);
                      }}
                      stylesheet={{
                          p: styles.description,
                          a: styles.description,
                      }}
                  />
                  <Text style={styles.description}>
                      {item.meta}
                  </Text>
                  <View style={styles.row}>
                      <View style={styles.row}>
                          <Text>Built by: </Text>
                          {item.contributors.map((result, i, arr) => {
                              return <Image
                                  key={i}
                                  style={{height: 22, width: 22, margin: 2}}
                                  source={{uri: arr[i]}}
                              />
                          })}
                      </View>
                      {this._favoriteIcon()}
                  </View>
              </View>

          </TouchableOpacity>
      )
  }
}

// const styles = StyleSheet.create({
//   cell_container: {
//     padding: 10,
//     // backgroundColor: 'white',
//     backgroundColor: '#11aa00',
//     borderColor: 'black',
//     marginLeft: 5,
//   },
//   row: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 5,
//   },
//   title: {
//     fontSize: 16,
//     // marginBottom: 2,
//     // marginLeft: 5,
//     margin: 5,
//     color: '#212121',
//     // shadowOpacity: 0.5,
//     // shadowColor: "#333",
//     // shadowOffset: 1,
//   },
//   description: {
//       fontSize: 14,
//       marginBottom: 2,
//       marginLeft: 5,
//       color: '#757575',
//   }
// });
const styles = StyleSheet.create({
  cell_container: {
      backgroundColor: 'white',
      padding: 10,
      marginLeft: 5,
      marginRight: 5,
      marginVertical: 3,
      borderColor: '#dddddd',
      borderWidth: 0.5,
      borderRadius: 2,
      shadowColor: 'gray',
      shadowOffset: {width: 0.5, height: 0.5},
      shadowOpacity: 0.4,
      shadowRadius: 1,
      elevation: 2
  },
  row: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
  },
  title: {
      fontSize: 16,
      marginBottom: 2,
      color: '#212121',
  },
  description: {
      fontSize: 14,
      marginBottom: 2,
      color: '#757575',
  }
}
);