import React from 'react';
import { Font } from 'expo';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AppStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#F4F3EF',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontFamily: 'WorkSans'
      }
    }
  }
);

const SwitchNavigator = createSwitchNavigator({
  App: AppStack,
  Auth: AuthStack,
}, {
  initialRouteName: 'Auth'
});

class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'PlayfairDisplay-Italic': require('./assets/fonts/PlayfairDisplay-Italic.ttf'),
      'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
      WorkSans: require('./assets/fonts/WorkSans-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded && <SwitchNavigator />;
  }
}

export default App;
