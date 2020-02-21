import Types from "../types";
import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
import { handleData } from "../ActionUtil";

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @returns {function(*=)}
 */
export function onRefreshTrending(storeName, url, pageSize) {
  console.log("进入方法 onRefreshTrending");
  return dispatch => {
    dispatch({type: Types.TRENDING_REFRESH, storeName: storeName});
    let dataStore = new DataStore();
    dataStore.fetchData(url, FLAG_STORAGE.flag_trending)// 异步action 与数据流
      .then(data => {
        console.log("获取数据成功---", storeName);
        // handleData(dispatch, storeName, data, pageSize)
        handleData(Types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
      })
      .catch(error => {
        // console.log("获取数据失败");
        console.log(error);
        dispatch({
          type: Types.TRENDING_REFRESH_FAIL,
          storeName,
          error,
        })
      })
  }
}
/***
 * 加载更多
 * @param storeName tabbar 标题 也就是分类
 * @param pageIndex 第几页
 * @param pageSize  每页展示条数
 * @param allArray 所有数据
 * @param dataArray 原始数据
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 */
export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], callBack) {
  return dispatch => {
    setTimeout(() => { // 模拟网络请求延时
      console.log(`storeName:${storeName}, pageIndex:${pageIndex}, pageSize:${pageSize}, dataArray.length:${dataArray.length}`);
      // console.log(`(pageIndex - 0) * pageSize:${(pageIndex - 0) * pageSize}`);
      if ((pageIndex - 1) * pageSize >= dataArray.length) {//已加载完全部数据
        if (typeof callBack === 'function') {
          // callBack();
          callBack('no more Trending Data');
          // console.log("callBack 是个函数");
        }
        dispatch({
          type: Types.TRENDING_LOAD_MORE_FAIL,
          error: "没有更多数据...",
          storeName: storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray
        })
      }else {
        // 本次和加载的最大数量
        console.log(`pageSize * pageIndex:${pageSize * pageIndex}, dataArray.length:${dataArray.length}`);
        //本次和载入的最大数量
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        dispatch({
          type: Types.TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        })
      }
    }, 500);
  }
}