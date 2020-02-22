/**
 * 监听, 并处理 Android 物理返回键
 */
import React from "react";
import {BackHandler} from "react-native";

/**
 * Android 物理回退键处理
 * 这个类没有继承自 react 中的 Component 所以没有 父类也就没有super(props);
 * 包括以下方法 componentDidMount, componentWillUnmount 都属于自定方法;
 */
export default class BackPressComponent {
  constructor(props) {
      this._hardwareBackPress = this.onHardwareBackPress.bind(this);
      this.props = props;
  }

  componentDidMount() {
      if (this.props.backPress) BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
  }

  componentWillUnmount() {
      if (this.props.backPress) BackHandler.removeEventListener('hardwareBackPress', this._hardwareBackPress);
  }

  onHardwareBackPress(e) {
      return this.props.backPress(e);
  }
}