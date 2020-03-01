/**
 * 全局样式
 */
import React from "react";
import { Platform, DeviceInfo  } from "react-native";

const NAV_BAR_HEIGHT_IOS = 44; // 导航栏在ios中的高度
const NAV_BAR_HEIGHT_ANDROID = 50; //导航栏在Android 中的高度;
const STATUS_BAR_HEIGHT_IPHONEX = 44;//iphone x 的status 高度
const STATUS_BAR_HEIGHT_IPHONE = 20; //iPhone 的status 的高度
const STATUS_BAR_HEIGHT_IOS = DeviceInfo.isIPhoneX_deprecated ? STATUS_BAR_HEIGHT_IPHONEX : STATUS_BAR_HEIGHT_IPHONE;
const STATUS_BAR_HEIGHT_ANDROID = 0; // Android 的status 被系统保留
const isIOS = Platform.OS === "ios" ? true : false;

// 状态栏的高度
export let STATUS_BAR_HEIGHT = isIOS ? STATUS_BAR_HEIGHT_IOS : STATUS_BAR_HEIGHT_ANDROID;
// 导航栏高度
export let NAV_BAR_HEIGHT = isIOS ?  NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;
// export const THEME_COLOR = '#678';

const  BACKGROUND_COLOR = '#f3f3f4';
export default {
  line: {
    height: 1,
    opacity: 0.5,
    backgroundColor: 'lightgray',
  },
  root_container:{
    flex:1,
    backgroundColor: BACKGROUND_COLOR
  }
}
