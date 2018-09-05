import React from 'react';
import { Font } from 'expo';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import AuthLoadingScreen from './src/screens/Auth/AuthLoadingScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import SignUpLoginScreen from './src/screens/Auth/SignUpLoginScreen';

import HomeScreen from './src/screens/HomeScreen';
import MeScreen from './src/screens/MeScreen';
import CreateNewLogScreen from './src/screens/CreateNewLogScreen';
import SubmitLogScreen from './src/screens/SubmitLogScreen';
import ViewLogScreen from './src/screens/ViewLogScreen';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    // SignUp: SignUpScreen,
    SignUpLogin: SignUpLoginScreen
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
    CreateNewLog: CreateNewLogScreen,
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

  constructor() {
    super();
    const config = {
      apiKey: 'AIzaSyAhvETpCtA9thHsBvq9Nms08jXB8X93kWc',
      authDomain: 'cannasseur-3e6f3.firebaseapp.com',
      databaseURL: 'https://cannasseur-3e6f3.firebaseio.com',
      projectId: 'cannasseur-3e6f3',
      storageBucket: 'cannasseur-3e6f3.appspot.com',
      messagingSenderId: '59531614040'
    };
    firebase.initializeApp(config);
  }

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
