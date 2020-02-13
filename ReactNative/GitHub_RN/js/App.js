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

export default class App extends Component {
  render() {
    //
    return <Provider>
      <AppNavigators/>
    </Provider>
  }
}