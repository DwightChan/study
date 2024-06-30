import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import { THEME_COLOR } from "../util/ViewUtil";

export default class BaseItem extends Component {
  // prop的定义属性类型检查
  static propTypes = {
    projectModel: PropTypes.object, // object 对象类型, 只能接受对象
    onSelect: PropTypes.func,   // 定义为函数类型, 只能接受函数
    onFavorite: PropTypes.func, // 函数
  }

  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.projectModel.isFavorite,
    }
  }

  // componentWillReceiveProps(nextProps)
  /**
   * 牢记: https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md
   * componentWillReceiveProps 在新版React 中不能在使用了
   * @param {*} nextProps 
   * @param {*} prevState 
   */
  static getDeriveStateFromProps(nextProps, prevState) {
    const isFavorite = nextProps.projectModel.isFavorite;
    if (prevState.isFavorite !== isFavorite) {
      return {
        isFavorite: isFavorite,
      };
    }
    return null;
  }

  // 在item(cell)中更新isFavorite 状态值
  setFavoriteState(isFavorite) {
    this.props.projectModel.isFavorite = isFavorite;
    this.setState({
      isFavorite: isFavorite,
    });
  }

  onItemClick() {
    this.props.onSelect(isFavorite => {
      this.setFavoriteState(isFavorite);
    })
  }

  // 点击了 收藏按钮, 设置对应的数据,
  // 1. 修改当前item(cell) UI 显示;
  // 2. 修改外部整体数据的 
  onPressFavorite() {
    this.setFavoriteState(!this.props.projectModel.isFavorite);
    // this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite)
    this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite);
  }
  
  _favoriteIcon() {
    const {theme} = this.props;
    return <TouchableOpacity
      style={{padding: 6}}
      underlayColor='gray'
      onPress={() => this.onPressFavorite()}
    >
      <FontAwesome 
        name={this.state.isFavorite ? 'star' : 'star-o'}
        size={26}
        style={{color: theme.themeColor}}
      />
    </TouchableOpacity>
  }
};
