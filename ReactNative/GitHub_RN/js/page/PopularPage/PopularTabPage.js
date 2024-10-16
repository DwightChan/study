import React, { Component } from "react";
import { StyleSheet, View, Text, RefreshControl, FlatList, ActivityIndicator, Platform } from "react-native";
import NavigationUtil from "../../navigator/NavigationUtil";
import actions from "../../action/index";
import { connect } from "react-redux";
import PopularItem from "../../common/PopularItem";
import Toast from "react-native-easy-toast";
import { THEME_COLOR } from "../../util/ViewUtil";

import FavoriteDao from "../../expand/dao/FavoriteDao";
import FavoriteUtil from "../../util/FavoriteUtil";

import EventBus from "react-native-event-bus";
import EventTypes from "../../util/EventTypes";

import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

type Props = {};

const pageSize = 8; // 设置为常量, 防止修改
class PopularTab extends Component<Props> {
    constructor(props) {
      super(props)
      const {tabLabel} = this.props;
      this.storeName = tabLabel;
      this.isFavoriteChanged = false;
    }

    componentDidMount() {
      this.loadData();
      EventBus.getInstance().addListener(EventTypes.favorite_changed_popular, this.favoriteChangeListener = () => {
        this.isFavoriteChanged = true;
      });
      EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectedListener = (data) => {
        if (data.to === 0 && this.isFavoriteChanged) {
          this.loadData(null, true);
        }
      });
    }
    componentWillUnmount() {
      EventBus.getInstance().removeListener(this.favoriteChangeListener);
      EventBus.getInstance().removeListener(this.bottomTabSelectedListener);
    }

    loadData(loadMore, refreshFavorite) {
      const {onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite} = this.props;
      const store = this._store()
      const url = this.genFetchUrl(this.storeName);
      if (loadMore) {
        // console.log(`storeName:${this.storeName}, pageIndex:${store.pageIndex}, pageSize:${pageSize}, items:${store.imtes}, projectModels:${store.projectModels}`);
        store.pageIndex += 1;
        onLoadMorePopular(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao, (msg) => {
          console.log(msg);
          console.log("没有更多数据");
          this.refs.toast.show(msg);
        });
        // console.log(`storeName:${this.storeName}, pageIndex:${store.pageIndex}, pageSize:${pageSize}, projectModels:${store.projectModels.length}`);
      }else if (refreshFavorite) {
        onFlushPopularFavorite(this.storeName, store, pageIndex, pageSize, store.item, favoriteDao);
      }else {
        onRefreshPopular(this.storeName, url, pageSize, FavoriteDao);
      }
    }
    /**
     * 获取当前页面有关的数据
     * @returns {*}
     * @private 私有方法
     */
    _store() {
      const {popular} = this.props;
      let store = popular[this.storeName];
      if (!store) {
        store = {
          items: [],
          isLoading: false,
          projectModels: [], //要显示的数据
          hideLoadingMore: true, // 默认是隐藏加载更多
        }
      }
      return store;
    }
    // 获取url
    genFetchUrl(key) {
      return URL + key + QUERY_STR;
    }
    
    renderItem(data) {
      const item = data.item;
      const {theme} = this.props;
      return <PopularItem
        theme={theme}
        projectModel={item}
        onSelect={(callBack) => {
          console.log("我被选中了");
          NavigationUtil.goPage({
            projectModel: item,
            flag: FLAG_STORAGE.flag_popular,
            theme: theme,
            callBack,
          }, 'DetailPage');
        }}
        onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}
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
      return (<View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.item.id}
          refreshControl={
            <RefreshControl
              title={'下拉加载更多'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={THEME_COLOR}
            >
            </RefreshControl>
          }
          ListFooterComponent={() => this.getInndicator()}
          // 已经被拉到底
          onEndReached={() => {
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
  popular: state.popular,
  // theme: state.theme,
});
const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshPopular(storeName, url, pageSize, favoriteDao)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
  onFlushPopularFavorite: (storeName, url, pageSize, items, favoriteDao) => dispatch(actions.onFlushPopularFavorite(storeName, url, pageSize, items, favoriteDao))
});
//注意：connect只是个function，并不应定非要放在export后面
export default PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  indicatorContainer: {
      alignItems: "center"
  },
  indicator: {
      color: 'red',
      margin: 10
  }
});