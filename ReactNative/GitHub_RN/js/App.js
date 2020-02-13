/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigators from "./navigator/AppNavigators";
import store from "./store";

export default class App extends Component {
  render() {
    /**
     * 3. 将store 传递给app 框架
     */
    return <Provider store={store}>
      <AppNavigators/>
    </Provider>
  }
}