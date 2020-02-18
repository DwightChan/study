import Types from "../types";
import DataStore from "../../expand/dao/DataStore";

export function onLoadPopularData(storeName, url) {
  console.log("进入 方法 onLoadPopularData");
  return dispatch => {
    dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
    let dataStore = new DataStore();
    dataStore.fetchData(url)// 异步action 与数据流
      .then(data => {
        // console.log("获取数据成功---", storeName);
        handleData(dispatch, storeName, data)
      })
      .catch(error => {
        // console.log("获取数据失败");
        console.log(error);
        dispatch({
          type: Types.LOAD_POPULAR_SUCCESS,
          storeName,
          error,
        })
      })
  }
}

function handleData(dispatch, storeName, data) {
  // console.log("data.data.items[0]:-----", JSON.stringify(data.data.items[0]));
  dispatch({
    type: Types.LOAD_POPULAR_SUCCESS,
    items: data && data.data && data.data.items,
    storeName
  })
}