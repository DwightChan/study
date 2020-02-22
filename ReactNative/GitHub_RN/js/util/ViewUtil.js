import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const THEME_COLOR = '#678';

export default class ViewUtil {
  /**
   * 获取左侧返回按钮
   * @param {*} callBack 
   * returns {xml}
   */
  static getLeftBackButton(callBack) {
    return <TouchableOpacity
      style={{padding: 8, paddingLeft: 12}}
      // 按下去的背景色为灰色
      underlayColor={'gray'}
      onPress={callBack}
    >
      <Ionicons 
        name={'ios-arrow-back'}
        // name={'arrow-back'}
        size={26}
        style={{color: 'white'}}
      />
    </TouchableOpacity>
  }

  /**
   * 获取分享按钮
   * @param {*} callBack 
   * returns {xml}
   */
  static getShareButton(callBack) {
    return <TouchableOpacity
      underlayColor={'gray'} // transparent 透明
      onPress={callBack}
    >
      <Ionicons 
        name={'md-share'}
        size={20}
        style={{opacity: 0.9, marginRight: 10, color: 'white'}}
      />
    </TouchableOpacity>
  }
}