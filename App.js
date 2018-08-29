import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Font } from 'expo';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    username: '',
    password: ''
  };

  async componentDidMount() {
    await Font.loadAsync({
      'PlayfairDisplay-Italic': require('./assets/fonts/PlayfairDisplay-Italic.ttf'),
      PlayfairDisplay: require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
      WorkSans: require('./assets/fonts/WorkSans-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  onPress() {
    console.log(this.state);
  }

  render() {
    return (
      this.state.fontLoaded && (
        <View style={styles.container}>
          <View style={styles.top}>
            <Image source={require('./assets/cannabis.png')} style={styles.logo} />
            <Text style={styles.title}>cannasseur</Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.inputs}>
              <TextInput
                autoCapitalize={'none'}
                placeholder={'username'}
                onChangeText={username => this.setState({ username })}
                style={styles.input}
              />
              <TextInput
                autoCapitalize={'none'}
                placeholder={'password'}
                onChangeText={password => this.setState({ password })}
                style={styles.input}
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={styles.login} onPress={() => this.onPress()}>
              <Text style={styles.loginText}>LOG IN</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.border} /> */}
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logo: {
    width: 200,
    height: 200,
    top: '40%'
  },
  border: {
    borderColor: '#000',
    borderWidth: 2,
    height: '90%',
    width: '90%',
    position: 'absolute',
    zIndex: 100,
    left: '5%',
    top: '5%'
  },
  top: {
    height: '50%',
    alignItems: 'center',
    backgroundColor: '#F4F3EF'
  },
  title: {
    top: '40%',
    fontSize: 40,
    fontFamily: 'PlayfairDisplay-Italic'
  },
  bottom: {
    height: '50%',
    backgroundColor: '#F4F3EF'
  },
  inputs: {
    top: '10%',
    left: '15%',
    zIndex: 200,
    position: 'absolute',
    width: '70%'
  },
  input: {
    fontFamily: 'WorkSans',
    marginBottom: 8,
    fontSize: 20,
    borderColor: '#000',
    borderBottomWidth: 1,
    padding: 8
  },
  login: {
    width: '80%',
    height: 48,
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: '10%',
    borderRadius: 8,
    top: '40%',
    position: 'absolute',
    zIndex: 200
  },
  loginText: {
    color: '#fff',
    fontFamily: 'WorkSans',
    fontSize: 16,
    position: 'absolute',
    zIndex: 200
  }
});
