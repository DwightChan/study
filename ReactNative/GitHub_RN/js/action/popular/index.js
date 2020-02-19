import Types from "../types";
import DataStore from "../../expand/dao/DataStore";

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @returns {function(*=)}
 */
export function onRefreshPopular(storeName, url, pageSize) {
  console.log("进入 方法 onLoadPopularData");
  return dispatch => {
    dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
    let dataStore = new DataStore();
    dataStore.fetchData(url)// 异步action 与数据流
      .then(data => {
        // console.log("获取数据成功---", storeName);
        handleData(dispatch, storeName, data, pageSize)
      })
      .catch(error => {
        // console.log("获取数据失败");
        console.log(error);
        dispatch({
          type: Types.POPULAR_REFRESH_FAIL,
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
 * @param dataArrar 原始数据
 * @param callBack  回调函数, 可以通过回调函数来向调用页面通讯: 比如异常信息的展示, 没有跟多等待 等等,
 * @returns {function (*)}
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) { 
  return dispatch => {
    setTimeout(() => { // 模拟网络请求延时
      if ((pageIndex - 1) * pageSize >= dataArray.length) { // 已经加载完全数据
        if (typeof callBack === 'function') {
          callBack('no more');
        }
        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: "no more",
          storeName: storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray
        })
      }else {
        // 本次和加载的最大数量
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        dispatch({
          type: Types.POPULAR_LOAD_MORE_SUCCESS,
          storeName, 
          pageIndex,
          projectModes: dataArray.slice(0, max),
        })
      }
    }, 500);
  }
}

/***
 * 处理下拉刷新的数据
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 */
function handleData(dispatch, storeName, data, pageSize) {
  let fixItems = [];
  if (data && data.data && data.data.items) {
    fixItems = data.data.items;
  }
  // console.log("data.data.items[0]:-----", JSON.stringify(data.data.items[0]));
  dispatch({
    type: Types.POPULAR_REFRESH_SUCCESS,
    imtes: fixItems,
    projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), //第一次要加载的数据
    storeName,
    pageIndex: 1
  })
}