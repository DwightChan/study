import Types from '../../action/types';

const defaultState = {};

/**
 * popular:{
 *     java:{
 *         items:[],
 *         isLoading:false
 *     },
 *     ios:{
 *         items:[],
 *         isLoading:false
 *     }
 * }
 * 0.state树，横向扩展
 * 1.如何动态的设置store，和动态获取store(难点：store key不固定)；
 * @param state
 * @param action
 * @returns {{theme: (onAction|*|string)}}
 */
export default function onAction(state = defaultState, action) {
  // console.log("action-----------", action.type);
  // console.log("action:",JSON.stringify(action));
  // console.log("...state[action.storeName]----------");
  // console.log("state:", JSON.stringify(...state[action.storeName]));
  // console.log(...state);
  // console.log("...state-----------");
  
  switch (action.type) {
    case Types.TRENDING_REFRESH_SUCCESS: { // 下拉刷新成功
      const result = {
        ...state,
        [action.storeName]: {
          ...state[action.storeName], 
          items: action.items, // 原始数据
          projectModels: action.projectModels, // 此次要展示的数据
          isLoading: false,
          hideLoadingMore: false,
          // hideLoadingMore: true,
          pageIndex: action.pageIndex
        }
      };
      // console.log("result:-----------", JSON.stringify(result));    
      // console.log("action.items:", JSON.stringify(action.items));
      return result;
    }
    case Types.TRENDING_REFRESH: // 下拉刷新
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,
          isLoading: true,
          hideLoadingMore: true,
        }
     }
    case Types.TRENDING_REFRESH_FAIL: {// 下拉刷新失败
      const result = {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
          hideLoadingMore: true,
        }
      };
      return result;
    }
    case Types.TRENDING_LOAD_MORE_SUCCESS: // 上拉加载更多成功
      return {
        ...state, //Object.assign @http://www.devio.org/2018/09/09/ES6-ES7-ES8-Feature/
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        }
      };
    case Types.TRENDING_LOAD_MORE_FAIL: // 上拉加载更多失败
      return {
        ...state, //Object.assign @http://www.devio.org/2018/09/09/ES6-ES7-ES8-Feature/
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        }
      };
    case Types.FLUSH_TRENDING_FAVORITE: // 刷新收藏状态
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
        }
      };
    default:
      return state;
  }
}