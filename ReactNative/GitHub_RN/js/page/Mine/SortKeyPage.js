import React, {Component} from 'react';
import {Alert, TouchableHighlight, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../action/index'
import NavigationUtil from '../../navigator/NavigationUtil'
import NavigationBar from '../../common/NavigationBar';
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import BackPressComponent from "../../common/BackPressComponent";
import ViewUtil from "../../util/ViewUtil";
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrayUtil from "../../util/ArrayUtil";
import SortableListView from 'react-native-sortable-listview';
import { THEME_COLOR } from "../../util/ViewUtil";
import EventBus from "react-native-event-bus";
import EventTypes from '../../util/EventTypes';

type Props = {};

class SortKeyPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
    this.LanguageDao = new LanguageDao(this.params.flag);
    this.languageDao = new LanguageDao(this.params.flag);
    this.state = {
      checkedArray: SortKeyPage._keys(this.props),
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const checkedArray = SortKeyPage._keys(nextProps, null, prevState);
    if (prevState.keys !== checkedArray) {
      return {
        keys: checkedArray,
      }
    }
    return null;
  }

  componentDidMount() {
    this.backPress.componentDidMount();
    // 如果props 中标签为空, 则从本地存储中获取标签;
    if(SortKeyPage._keys(this.props).length === 0) {
      let {onLoadLanguage} = this.props;
      onLoadLanguage(this.params.flag);
    }
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }
  /**
   * 获取标签
   * @param {*} props 
   * @param {*} state 
   * @returns
   */
  static _keys(props, state) {
    // 如果 state中有checkedArray则使用state中的checkedArray
    if (state && state.checkedArray && state.checkedArray.length) {
      return state.checkedArray;
    }
    // 否则从原始数据中获取到 checkedArray
    const flag = SortKeyPage._flag(props);
    let dataArray = props.language[flag] || [];
    let keys = [];
    for (let i = 0, j = dataArray.length; i < j; i++) {
      let data = dataArray[i];
      if (data.checked) { 
        keys.push(data);
      }
    }
    return keys;
  }
  static _flag(props) {
    const {flag} = props.navigation.state.params;
    return flag === FLAG_LANGUAGE.flag_key ? 'keys' : 'languages';
  }

  onBackPress(e) {
    this.onBack();
    return true;
  }

  onSave(hasChecked) {
    if (!hasChecked) {
      //如果没有排序则直接返回
      if (ArrayUtil.isEqual(SortKeyPage._keys(this.props), this.state.checkedArray)) {
        NavigationUtil.goBack(this.props.navigation);
        return;
      }
    }
    //保存排序后的数据
    //获取排序后的数据
    //更新本地数据
  
    this.languageDao.save(this.getSortResult());
    //重新加载排序后的标签，以便其他页面能够及时更新
    const {onLoadLanguage} = this.props;
    //更新store
    onLoadLanguage(this.params.flag);
    NavigationUtil.goBack(this.props.navigation);
  }
  /**
   * 获取排序后的标签结果
   * @returns {Array}
   */
  getSortResult() {
    const flag = SortKeyPage._flag(this.props);
    // 从原始数据中复制一份数据出来, 以便对这份数据 进行排序;
    let sortResultArray = ArrayUtil.clone(this.props.language[flag]);
    // 获取排序之前的排序列顺序;
    const originalCheckedArray = SortKeyPage._keys(this.props);
    // 遍历排序之前的数据, 用排序之后的数据checkedArray 进行替换;
    for (let i = 0, j = originalCheckedArray.length; i < j; i++) {
      let item = originalCheckedArray[i];
      // 找到要替换的元素所在位置
      let index = this.props.language[flag].indexOf(item);
      // 进行替换
      sortResultArray.splice(index, 1, this.state.checkedArray[i]);
    }
    return sortResultArray;
  }
  
  
  onBack() {
    if (!ArrayUtil.isEqual(SortKeyPage._keys(this.props), this.state.checkedArray)) {
      Alert.alert('提示', '要保持修改吗?', [
        {
          text: '否', onPress: () => {
            NavigationUtil.goBack(this.props.navigation);
          }
        }, {
          text: '是', onPress: () => {
            this.onSave(true);
          }
        }
      ]);
    }else {
      NavigationUtil.goBack(this.props.navigation);
    }
  }

  _checkedImage(chended) {
    return <Ionicons 
      name={checked ? 'ios-checkbox' : 'md-square-outline'}
      size={20}
      style={{
        color: THEME_COLOR,
      }}
    />
  }
  renderCheckBox(data, index) {
    return <CheckBox 
      style={{flex:1, padding: 10}}
      onClick={() => this.onClick(data, index)}
      isChecked={data.checked}
      checkedImage={this._checkedImage(true)}
      unCheckedImage={this._checkedImage(false)}
      rightText={data.name}
    />
  }

  render() {
    const {theme} = this.params;
    let title = this.params.flag === FLAG_LANGUAGE.flag_language ? '语言排序' : '标签排序';
    let navigationBar = <NavigationBar 
      title={title}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBackPress())}
      style={{backgroundColor: theme.themeColor}}
      rightButton={ViewUtil.getRightButton('保存', () => this.onSave())}
    />;
    return <View style={styles.container}>
      {navigationBar}
      <SortableListView
        data={this.state.checkedArray}
        order={Object.keys(this.state.checkedArray)}
        onRowMoved={e => {
          this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
          this.forceUpdate()
        }}
        renderRow={row => <SortCell data={row} {...this.params}/>}
      />

    </View>
  }
}

class SortCell extends Component {
  render() {
    return <TouchableHighlight 
      underlayColor={'#eee'}
      style={this.props.data.checked ? styles.item : styles.hidden}
      {...this.props.sortHandlers}
    > 
      <View style={{marginLeft: 10, flexDirection: 'row'}}>
        <MaterialCommunityIcons 
          name={'sort'}
          size={16}
          style={{marginRight: 10, color: THEME_COLOR}}
        />
        <Text>{this.props.data.name}</Text>
      </View>
    </TouchableHighlight>
  }
}

const mapPopularStateToProps = state => ({
  language: state.language,
});
const mapPopularDispatchToProps = dispatch => ({
  onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(SortKeyPage);


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  hidden: {
      height: 0
  },
  item: {
      backgroundColor: "#F8F8F8",
      borderBottomWidth: 1,
      borderColor: '#eee',
      height: 50,
      justifyContent: 'center'
  },
});
