import React, { Component } from "react";
// Platform: 是获取平台
// ViewPropTypes 是做校验
import { StyleSheet, View, ViewPropTypes, Text, StatusBar, DeviceInfo, Platform} from "react-native";
import {PropTypes} from "prop-types";
import {STATUS_BAR_HEIGHT, NAV_BAR_HEIGHT} from "../res/styles/GlobalStyles";

const StatusBarShape = { // 设置状态栏所接受的属性
  // 转态选择
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};
export default class NavigationBar extends Component {
  // 提供属性的类型检查
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    leftButton: PropTypes.element,
  };
  // 设置默认属性
  static defaultProps = {
    statusBar: {
      // barStyle: 'light-content',
      barStyle: 'default',
      hidden: false,
    },
    hide: false
  };

  render() {
    let statusBar = !this.props.statusBar.hidden ? <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar}/>
      </View> : null;

    let titleView = this.props.titleView ? this.props.titleView : <View>
        <Text
          ellipsizeMode={'head'}
          numberOfLines={1}
          style={styles.title}
        >{this.props.title}</Text>
      </View> 

    let content = this.props.hide ? null : <View style={styles.navBar}>
        {this.getButtonElement(this.props.leftButton)}
        <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
          {titleView}
        </View>
        {this.getButtonElement(this.props.rightButton)}
      </View>;
    
    return (<View style={[styles.container, this.props.style]}>
      {statusBar}
      {content}
    </View>);
  };

  getButtonElement(data) {
    return (<View style={styles.navBarButton}>
      {data ? data : null}
    </View>)
  };
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#2196f3',
  },
  navBarButton: {
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: NAV_BAR_HEIGHT,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  }, 
  title: {
    fontSize: 20,
    color: 'white',
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
});
