import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';

class LoginScreen extends React.Component {
  state = {
    username: '',
    password: ''
  };

  async onPress() {
    const { username, password } = this.state;
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(username, password);

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          AsyncStorage.setItem('userId', user.uid);
          this.props.navigation.navigate('App');
        } else {
          AsyncStorage.setItem('userId', '');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <View style={styles.top}>
          <Image source={require('../../../assets/cannabis.png')} style={styles.logo} />
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
          <TouchableOpacity style={styles.loginButton} onPress={() => this.onPress()}>
            <Text style={styles.loginText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.border} /> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    bottom: 16
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
    justifyContent: 'flex-end',
    backgroundColor: '#F4F3EF'
  },
  title: {
    bottom: 16,
    fontSize: 40,
    fontFamily: 'PlayfairDisplay-Italic'
  },
  bottom: {
    height: '50%',
    zIndex: 200,
    backgroundColor: '#FFF'
  },
  inputs: {
    top: 16,
    left: '15%',
    position: 'absolute',
    width: '70%'
  },
  input: {
    fontFamily: 'PlayfairDisplay-Regular',
    marginBottom: 8,
    fontSize: 20,
    borderColor: '#000',
    borderBottomWidth: 1,
    padding: 8
  },
  loginButton: {
    width: '80%',
    height: 48,
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: '10%',
    borderRadius: 8,
    top: 136
  },
  loginText: {
    color: '#FFF',
    fontFamily: 'WorkSans',
    fontSize: 16
  }
});

export default LoginScreen;
