/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//  // 01 Layout
// import React from 'react';
// import D_01_Layout from './pages/D_01_Layout';
// const App: () => React$Node = () => {
//   return (
//       <D_01_Layout />
//   );
// };
// export default App;

// 02
import {AppStackNavigator} from './navigators/AppNavigators';
import {createAppContainer} from 'react-navigation';
export default createAppContainer(AppStackNavigator);
