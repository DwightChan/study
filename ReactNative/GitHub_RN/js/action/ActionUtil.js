import ProjectModel from "../model/ProjectModel";
import Utils from "../util/Utils";
// import {  } from "../expand/dao/FavoriteDao";
/***
 * 处理下拉刷新的数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 * @param favoriteDao
 */
export function handleData(actionType, dispatch, storeName, data, pageSize, favoriteDao) {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    }else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  // console.log("data.data.items[0]:-----", JSON.stringify(data.data.items[0]));
  // dispatch({
  //   type: actionType,
  //   items: fixItems,
  //   projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), //第一次要加载的数据
  //   storeName,
  //   pageIndex: 1,
  // })
  // 第一次要加载的数据
  let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  _projectModels(showItems, favoriteDao, projectModels => {
    dispatch({
      type: actionType,
      items: fixItems,
      projectModels: projectModels,
      storeName,
      pageIndex: 1,
    })
  });
}

export async function _projectModels(showItems, favoriteDao, callBack) {
  let keys = [];
  try {
    // 获取收藏的Key
    keys = await favoriteDao.getFavoriteKeys();
  } catch (error) {
    console.log(error);
  }
  let projectModels = [];
  for (let i = 0, len = showItems.length; i < len; i++) {
    let model = new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys))
    projectModels.push(model);
  }
  if (typeof callBack === 'function') {
    callBack(projectModels);
  }
}