import { combineReducers } from "redux";
import theme from "./theme";
import popular from "./popular";
import {rootCom, RootNavigator } from "../navigator/AppNavigators";


// 
/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({

  theme: theme,
  popular: popular
});

export default index;