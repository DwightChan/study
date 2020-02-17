import React, { Component } from "react";
import { StyleSheet, View, Text, RefreshControl, FlatList } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import NavigationUtil from "../navigator/NavigationUtil";
// import DetailPage from "../page/DetailPage";
import { createAppContainer } from "react-navigation";
import actions from "../action/index";
import { connect } from "react-redux";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';
type Props={};

export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props)
        console.log(NavigationUtil.navigation)
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    }

    _getTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            // 这里 tab${index} 是key 唯一标识
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            };
        });
        return tabs;
    }

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
          this._getTabs(), {
            tabBarOptions: {
              tabStyle: styles.tabStyle,
              // 默认是大小字母
              upperCaseLabel: false,
              // 默认是无法滚动
              scrollEnabled: true,
              style: {
                  backgroundColor: '#a0a',
              },
              indicatorStyle: styles.indicatorStyle,
              labelStyle: styles.labelStyle,
            },
          },
        ));
        return (<View style={styles.constainer}>
            <TabNavigator /> 
            { /* <Text style={styles.welcome}>PopularPage123</Text> */ } 
          </View>
        );
    }
}

class PopularTab extends Component<Props> {
    constructor(props) {
      super(props)
      const {tabLabel} = this.props;
      this.storeName = tabLabel;
    }

    componentDidMount() {
      this.loadData();
    }

    loadData() {
      const {onLoadPopularData} = this.props;
      const url = this.genFetchUrl(this.storeName);
      onLoadPopularData(this.storeName, url);
    }

    genFetchUrl(key) {
      return URL + key + QUERY_STR;
    }
    
    renderItem(data) {
      const item = data.item;
      console.log("item----");
      console.log(item);      
      return <View style={{marginBottom: 10}}>
        {/* <Text>{JSON.stringify(item)}</Text> */}
        {/* <Text>123</Text> */}
      </View>
    }
    render() {
      // const{navigation} = this.props;
      const {popular} = this.props;
      let store = {}
      store = popular ? popular[this.storeName] : null; // 动态获取state
      if (!store) {
        console.log("popular", popular);
        store = {
          items: [],
          isLoading: false,
        }
      }
      console.log("popular=======", popular);
      return (<View style={styles.constainer}>
        <FlatList
          data={store.items}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={THEME_COLOR}
            />
          }
        >
        </FlatList>
      </View>);
    }
}

const mapStateToProps = state => ({
  popular: state.popular
});
const mapDispatchToProps = dispatch => ({
  onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
});
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)


const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#f5fcff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tabStyle: {
        // minWidth: 10,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: '#111',
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    },
    textPressStyle: {
        backgroundColor: '#ccc',
        // width: 100,
        height: 30,
    }
});