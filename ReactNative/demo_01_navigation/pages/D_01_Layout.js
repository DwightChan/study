/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  // Header,
  // LearnMoreLinks,
  Colors,
  // DebugInstructions,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class D_01_Layout extends React.Component {
  render() {
    return <View>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView> */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              {/* 这里如果是ios 这需要在xcode 对 info.plist 文件中 手动导入 */}
              <Text>矢量图标</Text>
              <Ionicons
                name={'ios-analytics'}
                size={50}
                style={{color: '#ff0000'}}
              />
              <Ionicons name={'ios-apps'} size={50} style={{color: 'blue'}} />
            </View>
          </View>
          <Text>
            flexDirection enum('row', 'column','row-reverse','column-reverse')
            flexDirection属性定义了父视图中的子元素沿横轴或侧轴方片的排列方式。
          </Text>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            默认是 上到下排布 flexDirection: 'column'
          </Text>
          <View style={{backgroundColor: '#ddeeff', marginTop: 1}}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>4</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            flexDirection: 'column-reverse',表示从下往上排布
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 1,
              flexDirection: 'column-reverse',
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>4</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            flexDirection: 'row-reverse', row 表示行排布, 从左往右排布显示
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 20,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>4</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            flexDirection: 'row-reverse', row-reverse表示行排布,从右往左排布显示
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              flexDirection: 'row-reverse',
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>4</Text>
            </View>
          </View>
          <Text>flexWrap enum('wrap', 'nowrap')</Text>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            flexWrap: 'wrap', 表示允许换行操作
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <View
              style={{
                width: 300,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 300,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            flexWrap: 'nowrap',表示不允许换行
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              flexDirection: 'row',
              flexWrap: 'nowrap',
            }}>
            <View
              style={{
                width: 300,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 300,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            flexWrap: 'wrap-reverse', 表示倒序换行, 也就是最后的放在最上面,
            可能出现下面一行有多个, 最上面一行只有一个
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              flexDirection: 'row',
              flexWrap: 'wrap-reverse',
            }}>
            <View
              style={{
                width: 150,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 150,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 150,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            flexWrap: 'wrap-reverse', 表示倒序换行, 也就是最后的放在最上面,
            可能出现下面一行有多个, 最上面一行只有一个
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              flexDirection: 'row',
              flexWrap: 'wrap-reverse',
            }}>
            <View
              style={{
                width: 150,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 150,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 150,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
          </View>
          <Text style={{fontSize: 32, fontWeight: '700'}}>justifyContent</Text>
          <Text style={{fontSize: 18, fontWeight: '400'}}>
            justifyContent enum('flex-start', 'flex-end', 'center',
            'space-between', 'space-around')
          </Text>
          <Text style={{fontSize: 14, fontWeight: '400'}}>
            justifyContent属性定义了浏览器如何分配顺着父容器主轴的弹性（flex）元素之间及其周围的空间，默认为flex-start。
            flex-start(default)
            从行首开始排列。每行第一个弹性元素与行首对齐，同时所有后续的弹性元素与前一个对齐。
            flex-end
            从行尾开始排列。每行最后一个弹性元素与行尾对齐，其他元素将与后一个对齐。
            center
            伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。
            space-between
            在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。
            space-around
            在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半。
          </Text>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            flex-start(default)
            从行首开始排列。每行第一个弹性元素与行首对齐，同时所有后续的弹性元素与前一个对齐。
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              flexDirection: 'row',
              flexWrap: 'wrap-reverse',
            }}>
            <View
              style={{
                width: 50,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            flex-end
            从行尾开始排列。每行最后一个弹性元素与行尾对齐，其他元素将与后一个对齐。
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              flexDirection: 'row',
              flexWrap: 'wrap-reverse',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: 50,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            center
            伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              flexDirection: 'row',
              flexWrap: 'wrap-reverse',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 50,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            space-between
            在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>4</Text>
            </View>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>5</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            space-around
            在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半。
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>4</Text>
            </View>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>5</Text>
            </View>
          </View>
          <Text style={{fontSize: 32, fontWeight: '700'}}>alignItems</Text>
          <Text style={{fontSize: 18, fontWeight: '400'}}>
            alignItems enum('flex-start', 'flex-end', 'center', 'stretch')
            alignItems属性以与justify-content相同的方式在侧轴方向上将当前行上的弹性元素对齐，默认为stretch。
          </Text>
          <Text style={{fontSize: 14, fontWeight: '400'}}>
            flex-start 元素向侧轴起点对齐。 flex-end 元素向侧轴终点对齐。 center
            元素在侧轴居中。如果元素在侧轴上的高度高于其容器，那么在两个方向上溢出距离相同。
            stretch 弹性元素被在侧轴方向被拉伸到与容器相同的高度或宽度。
          </Text>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            space-around
            在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半。
          </Text>
          <View
            style={{
              backgroundColor: '#ddeeff',
              marginTop: 2,
              // flexDirection: 'row',
              // flexWrap: 'wrap',
              // justifyContent: 'space-around',
              // justifyContent: 'center',
              // justifyContent: 'flex-start',
              // justifyContent: 'flex-end',
              // justifyContent: 'space-between',
              // justifyContent: 'space-evenly',
              // alignItems: 'flex-end',
              // alignItems: 'flex-start',
              alignItems: 'stretch',
              // alignItems: 'center',
            }}>
            <View
              style={{
                // alignItems: 'flex-start',
                // width: 100,
                // height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                // alignItems: 'flex-end',
                // width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                // alignItems: 'center',
                // width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
            <View
              style={{
                // alignItems: 'stretch',
                // width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>11231234</Text>
            </View>
            <View
              style={{
                // width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>5</Text>
            </View>
          </View>
          <Text style={{fontSize: 24, fontWeight: '700'}}>子视图属性</Text>
          <View
            style={{
              backgroundColor: '#cccccc',
              marginTop: 2,
              // flexDirection: 'row',
              // flexWrap: 'wrap',
              // justifyContent: 'space-around',
              // justifyContent: 'center',
              // justifyContent: 'flex-start',
              // justifyContent: 'flex-end',
              // justifyContent: 'space-between',
              // justifyContent: 'space-evenly',
              // alignItems: 'flex-end',
              // alignItems: 'flex-start',
              // alignItems: 'stretch',
              alignItems: 'center',
            }}>
            <View
              style={{
                alignSelf: 'flex-start',
                // width: 100,
                // height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>1</Text>
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
                // width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>2</Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                // width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>3</Text>
            </View>
            <View
              style={{
                alignSelf: 'stretch',
                // width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>11231234</Text>
            </View>
            <View
              style={{
                alignSelf: 'auto',
                // width: 100,
                height: 40,
                backgroundColor: 'darkcyan',
                margin: 5,
              }}>
              <Text style={{fontSize: 16}}>5</Text>
            </View>
          </View>
          <Text style={{fontSize: 24, fontWeight: '700'}}>flex</Text>
          <Text style={{fontSize: 16, fontWeight: '400'}}>
            flex: number; flex 属性定义了一个可伸缩元素的能力，默认为0。
          </Text>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: 'darkgray',
              marginTop: 20,
              borderBottomColor: 'red',
              borderBottomWidth: 3,
            }}>
            <View style={{flex: 1, backgroundColor: 'darkcyan', margin: 5}}>
              <Text style={{fontSize: 16}}>flex:1</Text>
            </View>
            <View style={{flex: 2, backgroundColor: 'darkcyan', margin: 5}}>
              <Text style={{fontSize: 16}}>flex:2</Text>
            </View>
            <View style={{flex: 3, backgroundColor: 'darkcyan', margin: 5}}>
              <Text style={{fontSize: 16}}>flex:3</Text>
            </View>
          </View>
        </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

