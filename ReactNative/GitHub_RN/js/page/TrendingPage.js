import React, { Component } from "react";
import { StyleSheet, View, Text, RefreshControl, FlatList, ActivityIndicator } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation" ;
import NavigationUtil from "../navigator/NavigationUtil";
// import DetailPage from "../page/DetailPage";
import actions from "../action/index";
import { connect } from "react-redux";
import TrendingItem from "../common/TrendingItem";
import Toast from "react-native-easy-toast";
import NavigationBar from "../common/NavigationBar";

const URL = 'https://github.com/trending/';
const QUERY_STR = '?since=daily';
const THEME_COLOR = '#678';
type Props = {};

export default class TrendingPage extends Component<Props> {
    constructor(props) {
      super(props)
      console.log(NavigationUtil.navigation)
      this.tabNames = ['', 'C', 'C#', 'swift', 'Java', 'PHP', 'JavaScript'];
    }

    _getTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            // 这里 tab${index} 是key 唯一标识
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item === '' ? "All" : item,
                },
            };
        });
        return tabs;
    }

    render() {
      let statusBar = {
        backgroundColor: THEME_COLOR, //'orange',
        // barStyle: 'light-content',
        barStyle: 'default',
        hidden: false,
      };

      let navigationBar = <NavigationBar
        title={'趋势'}
        statusBar={statusBar}
        // style={{backgroundColor: "yellow"}}
      />;

      const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
        this._getTabs(), {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            // 默认是大小字母
            upperCaseLabel: false,
            // 默认是无法滚动
            scrollEnabled: true,
            style: {
                backgroundColor: '#a0a',
            },
            indicatorStyle: styles.indicatorStyle,
            labelStyle: styles.labelStyle,
          },
        },
      ));
      return (<View style={[styles.constainer]}>
        {navigationBar}
        <TabNavigator /> 
      </View>);
    }
}

const pageSize = 10; // 设置为常量, 防止修改
class TrendingTab extends Component<Props> {
    constructor(props) {
      super(props)
      const {tabLabel} = this.props;
      this.storeName = tabLabel;
    }

    componentDidMount() {
      this.loadData();
    }

    loadData(loadMore) {
      const {onRefreshTrending, onLoadMoreTrending} = this.props;
      const store = this._store()
      const url = this.genFetchUrl(this.storeName);
      if (loadMore) {
        console.log(`storeName:${this.storeName}, pageIndex:${store.pageIndex}, pageSize:${pageSize}, items:${store.imtes}, projectModes:${store.projectModes}`);
        store.pageIndex += 1;
        onLoadMoreTrending(this.storeName, store.pageIndex, pageSize, store.items, (msg) => {
          console.log(msg);
          console.log("没有更多数据");
          this.refs.toast.show(msg);
        });
        console.log(`storeName:${this.storeName}, pageIndex:${store.pageIndex}, pageSize:${pageSize}, projectModes:${store.projectModes.length}`);
      }else {
        onRefreshTrending(this.storeName, url, pageSize);
      }
    }
    /**
     * 获取当前页面有关的数据
     * @returns {*}
     * @private 私有方法
     */
    _store() {
      const {trending} = this.props;
      let store = trending[this.storeName];
      if (!store) {
        store = {
          items: [],
          isLoading: false,
          projectModes: [], //要显示的数据
          hideLoadingMore: true, // 默认是隐藏加载更多
        }
      }
      // if (!Array.isArray(store.items)) {
      //   store.items = [];
      // }
      return store;
    }
    // 获取url
    genFetchUrl(key) {
      return URL + key + QUERY_STR;
    }
    
    renderItem(data) {
      const item = data.item;
      return <TrendingItem
        item={item}
        onSelect={() => {
          console.log("我被选中了", "index:", data.index);
          
        }}
      />
    }

    getInndicator() {
      return this._store().hideLoadingMore ? null :
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            style={styles.indicator}
          />
          <Text>正在加载更多...</Text>
        </View>
    }
    render() {
      let store = this._store();
      return (<View style={styles.constainer}>
        <FlatList
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={THEME_COLOR}
            />
          }
          ListFooterComponent={() => this.getInndicator()}
          // 已经被拉到底
          onEndReached={() => {
            console.log('----onEndReached----', new Date());
            // this.loadData(true);
            // this.canLoadMore = false
            setTimeout(() => {
              if (this.canLoadMore && store.items.length > pageSize) {// fix 滚动是两次调用 onEndReached https://github.com/facebook/react-native/issues/14015
                this.loadData(true);
                this.canLoadMore = false
              }
            }, 100);
          }}
          onEndReachedThreshold
          onEndReachedThreshold={0.1}
          // 开始滚动事件
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
            console.log("----onMomentScrollBegin-----");
          }}
          // // 滚动结束
          // onMomentumScrollEnd={() => {
          //   this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
          //   console.log("----onMomentumScrollEnd-----");
          // }}
        />
        <Toast 
          ref={"toast"}
          position={'center'}
        />
      </View>);
    }
}

const mapStateToProps = state => ({
  trending: state.trending,
});
const mapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
  onLoadMoreTrending: (storeName, url, pageSize, items, callBack) => dispatch(actions.onLoadMoreTrending(storeName, url, pageSize, items, callBack))
});
//注意：connect只是个function，并不应定非要放在export后面
const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)


const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        // marginTop: 33,
    },
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: '#111',
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    },
    textPressStyle: {
        backgroundColor: '#ccc',
        // width: 100,
        height: 30,
    },
    indicatorContainer: {
      alignItems: "center",
    },
    indicator: {
      color: 'red',
      marginTop: 10,
    }
});
