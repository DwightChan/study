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
import NavigationUtil from "../../navigator/NavigationUtil";
// import DetailPage from "../page/DetailPage";
import actions from "../../action/index";
import { connect } from "react-redux";
import TrendingItem from "../../common/TrendingItem";
import Toast from "react-native-easy-toast";
import NavigationBar from "../../common/NavigationBar";
import TrendingDialog, { TimeSpans } from "../../common/TrendingDialog";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ViewUtil, {THEME_COLOR} from "../../util/ViewUtil";

import FavoriteDao from "../../expand/dao/FavoriteDao";
import FavoriteUtil from "../../util/FavoriteUtil";

import EventBus from "react-native-event-bus";
import EventTypes from "../../util/EventTypes";

import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);

const EVENT_TYPE_TIME_SPAN_CHANGE = "EVENT_TYPE_TIME_SPAN_CHANGE"
const URL = 'https://github.com/trending/';
// const QUERY_STR = '?since=daily';
type Props = {};

const pageSize = 10; // 设置为常量, 防止修改
class TrendingTab extends Component<Props> {
    constructor(props) {
      super(props)
      const {tabLabel, timeSpan} = this.props;
      this.storeName = tabLabel;
      this.timeSpan = timeSpan;
      this.isFavoriteChanged = false;
    }

    componentDidMount() {
      this.loadData();
      this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
        this.timeSpan = timeSpan;
        this.loadData();
      });
      EventBus.getInstance().addListener(EventTypes.favorite_changed_popular, this.favoriteChangeListener = () => {
        this.isFavoriteChanged = true;
      });
      EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectedListener = () => {
        if (data.to === 0 && this.isFavoriteChanged) {
          this.loadData(null, true);
        }
      });
    }
    componentWillUnmount() {
      if (this.timeSpanChangeListener) {
        this.timeSpanChangeListener.remove();
      }
      EventBus.getInstance().removeListener(this.favoriteChangeListener);
      EventBus.getInstance().removeListener(this.bottomTabSelectedListener);
    }

    loadData(loadMore, refreshFavorite) {
      const {onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite} = this.props;
      const store = this._store()
      const url = this.genFetchUrl(this.storeName);
      if (loadMore) {
        console.log(`storeName:${this.storeName}, pageIndex:${store.pageIndex}, pageSize:${pageSize}, items:${store.imtes}, projectModels:${store.projectModels}`);
        store.pageIndex += 1;
        onLoadMoreTrending(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao, (msg) => {
          console.log(msg);
          console.log("没有更多数据");
          this.refs.toast.show(msg);
        });
        console.log(`storeName:${this.storeName}, pageIndex:${store.pageIndex}, pageSize:${pageSize}, projectModels:${store.projectModels.length}`);
      }else if (refreshFavorite) {
        onFlushTrendingFavorite(this.storeName, store.pageIndex, pageSize, store.items);
        this.isFavorite = true;
      }else {
        onRefreshTrending(this.storeName, url, pageSize, favoriteDao);
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
          projectModels: [], //要显示的数据
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
        projectModel={item}
        onSelect={(callBack) => {
          console.log("我被选中了");
          NavigationUtil.goPage({
            projectModel: item,
            flag: FLAG_STORAGE.flag_trending,
            callBack,
          }, 'DetailPage');
        }}
        onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}
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
          data={store.projectModels}
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
  onRefreshTrending: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
  onLoadMoreTrending: (storeName, url, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreTrending(storeName, url, pageSize, items, favoriteDao, callBack)),
  onFlushTrendingFavorite: (storeName, url, pageSize, items, favoriteDao) => dispatch(actions.onFlushTrendingFavorite(storeName, url, pageSize, items, favoriteDao))
});
//注意：connect只是个function，并不应定非要放在export后面
export default TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)


const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        // marginTop: 33,
    },
    indicatorContainer: {
      alignItems: "center",
    },
    indicator: {
      color: 'red',
      marginTop: 10,
    }
});
