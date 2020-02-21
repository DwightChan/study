import React, { Component } from "react";
import { StyleSheet,
  View, 
  Text, 
  RefreshControl, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity,
  DeviceEventEmitter } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation" ;
import NavigationUtil from "../navigator/NavigationUtil";
// import DetailPage from "../page/DetailPage";
import actions from "../action/index";
import { connect } from "react-redux";
import TrendingItem from "../common/TrendingItem";
import Toast from "react-native-easy-toast";
import NavigationBar from "../common/NavigationBar";
import TrendingDialog, { TimeSpans } from "../common/TrendingDialog";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const EVENT_TYPE_TIME_SPAN_CHANGE = "EVENT_TYPE_TIME_SPAN_CHANGE"
const URL = 'https://github.com/trending/';
const QUERY_STR = '?since=daily';
const THEME_COLOR = '#678';
type Props = {};

export default class TrendingPage extends Component<Props> {
  constructor(props) {
    super(props)
    console.log(NavigationUtil.navigation)
    this.tabNames = ['', 'C', 'C#', 'swift', 'Java', 'PHP', 'JavaScript'];
    this.state = {
      timeSpan: TimeSpans[0],
    }
  }

  _getTabs() {
      const tabs = {};
      this.tabNames.forEach((item, index) => {
          // 这里 tab${index} 是key 唯一标识
          tabs[`tab${index}`] = {
              screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item}/>,
              navigationOptions: {
                  title: item === '' ? "All" : item,
              },
          };
      });
      return tabs;
  }

  onSelectTimeSpan(tab) {
    this.dialog.dismiss();
    this.setState({
      timeSpan: tab
    })
    // 可能是监听事件
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);
  }

  renderTrendingDialog() {
    return <TrendingDialog
      ref={dialog => this.dialog = dialog}
      onSelect={tab => this.onSelectTimeSpan(tab)}

    />
  }

  renderTitleView() {
    return (<View>
      <TouchableOpacity
        underlayColor='transparent'
        onPress={() => this.dialog.show()}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: '400'
          }}>趋势 {this.state.timeSpan.showText}</Text>
          <MaterialIcons
            name={'arrow-drop-down'}
            size={22}
            style={{color: 'white'}}
          />
        </View>
      </TouchableOpacity>
    </View>);
  }

  _tabNav() {
    if(!this.tabNav) { //优化效率：根据需要选择是否重新创建建TabNavigator，通常tab改变后才重新创建
      this.tabNav = createAppContainer(createMaterialTopTabNavigator(
        this._getTabs(), {
          tabBarOptions: { 
            tabStyle: styles.tabStyle,
            upperCaseLabel: false, // 是否使用标签大写, 默认问 true,
            scrollEnabled: true, // 是否支持 选项卡滚动, 默认 false
            style: {
              backgroundColor: '#678', // tabbar 的背景色
              height: 50, //fix 修复开启scrollEnabled后在 Android上初始化加载时闪烁问题
            },
            indicatorStyle: styles.indicatorStyle, // 标签指示器的样式
            labelStyle: styles.labelStyle, // 文字的样式
          }
        }
      ));
    }
    return this.tabNav;
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR, //'orange',
      // barStyle: 'light-content',
      barStyle: 'default',
      hidden: false,
    };
    let navigationBar = <NavigationBar
      titleView={this.renderTitleView()}
      statusBar={statusBar}
      // style={{backgroundColor: THEME_COLOR}}
    />;
    const TabNavigator = this._tabNav();
    return (<View style={[styles.constainer]}>
      {navigationBar}
      <TabNavigator />
      {this.renderTrendingDialog()}
    </View>);
  }
}

const pageSize = 10; // 设置为常量, 防止修改
class TrendingTab extends Component<Props> {
    constructor(props) {
      super(props)
      const {tabLabel, timeSpan} = this.props;
      this.storeName = tabLabel;
      this.timeSpan = timeSpan;
    }

    componentDidMount() {
      this.loadData();
      // 这里添加监听动作
      this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
        this.timeSpan = timeSpan;
        this.loadData();
      });
    }

    componentWillUnmount() {
      // 一定要移除监听
      if (this.timeSpanChangeListener) {
        this.timeSpanChangeListener.remove();
      }
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
      return URL + key + this.timeSpan.searchText;//QUERY_STR;
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
