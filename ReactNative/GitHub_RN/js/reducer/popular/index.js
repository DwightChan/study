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
    case Types.LOAD_POPULAR_SUCCESS: {
      const result = {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,
          isLoading: false,
        }
      };
      console.log("result:-----------", JSON.stringify(result));    
      // console.log("action.items:", JSON.stringify(action.items));
      return result;
    }
    case Types.POPULAR_REFRESH: 
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,
          isLoading: true,
        }
     }
    case Types.LOAD_POPULAR_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        }
      }
    default:
      return state;
  }
}