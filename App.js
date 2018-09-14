console.disableYellowBox = true;

import React from 'react';
import { Font } from 'expo';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import Sentry from 'sentry-expo';

import AuthLoadingScreen from './src/screens/Auth/AuthLoadingScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import SignUpLoginScreen from './src/screens/Auth/SignUpLoginScreen';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPasswordScreen';

import HomeScreen from './src/screens/HomeScreen';
import MeScreen from './src/screens/MeScreen';
import LogNewSessionScreen from './src/screens/LogNewSessionScreen';
import SubmitLogScreen from './src/screens/SubmitLogScreen';
import ViewLogScreen from './src/screens/ViewLogScreen';

// Remove this once Sentry is correctly setup.
// Sentry.enableInExpoDevelopment = true;
Sentry.config('https://a1cda1492c96487c9f552d2fda4aa5ce@sentry.io/1277442').install();
// Sentry.captureException(new Error('Oops!'))

firebase.initializeApp({
  apiKey: 'AIzaSyAhvETpCtA9thHsBvq9Nms08jXB8X93kWc',
  authDomain: 'cannasseur-3e6f3.firebaseapp.com',
  databaseURL: 'https://cannasseur-3e6f3.firebaseio.com',
  projectId: 'cannasseur-3e6f3',
  storageBucket: 'cannasseur-3e6f3.appspot.com',
  messagingSenderId: '59531614040'
});

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    SignUpLogin: SignUpLoginScreen,
    ForgotPassword: ForgotPasswordScreen
  },
  {
    initialRouteName: 'SignUpLogin',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Me: MeScreen,
    LogNewSession: LogNewSessionScreen,
    SubmitLog: SubmitLogScreen,
    ViewLog: ViewLogScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#F4F3EF'
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontFamily: 'WorkSans'
      }
    }
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'PlayfairDisplay-Italic': require('./assets/fonts/PlayfairDisplay-Italic.ttf'),
      'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
      WorkSans: require('./assets/fonts/WorkSans-Regular.ttf'),
      'WorkSans-Bold': require('./assets/fonts/WorkSans-Bold.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded && <SwitchNavigator />;
  }
}

export default App;
