import {createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomePage from '../pages/HomePage'
import Page1 from '../pages/Page1'
import Login from '../pages/Login'
import Layout from '../pages/D_01_Layout'
import { Header } from 'react-native/Libraries/NewAppScreen'

const AppStack = createStackNavigator(
    {
        Home: {
            screen: HomePage,
        },
        Layout: {
          screen: Layout,
        },
        Page1: {
            screen: Page1,
        },
    }
);
const AuthStack = createStackNavigator(
    {
        Login: {
            screen: Login,
            header: null,
        }
    }
);
export default createSwitchNavigator(
    {
        Auth: {
            screen: AuthStack
        },
        App: AppStack
    }
)