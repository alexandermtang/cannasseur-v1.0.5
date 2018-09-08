import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    hasError: false,
    isLoading: false
  };

  async onPress() {
    const { email, password } = this.state;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

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
      this.setState({ error: 'Invalid email or password.', isLoading: false });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Logging in...'}
          textStyle={{ color: '#FFF', fontFamily: 'PlayfairDisplay-Regular' }}
        />
        <Image source={require('../../../assets/cannabis.png')} style={styles.logo} />
        <Text style={styles.title}>cannasseur</Text>
        <View style={styles.inputs}>
          <TextInput
            autoCapitalize={'none'}
            placeholder={'email'}
            onChangeText={email => this.setState({ email, error: '' })}
            style={styles.input}
          />
          <TextInput
            autoCapitalize={'none'}
            placeholder={'password'}
            onChangeText={password => this.setState({ password, error: '' })}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <Text style={styles.error}>{this.state.error}</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            this.setState({ isLoading: true });
            this.onPress();
          }}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
          <Text style={[styles.buttonText, { color: '#000' }]}>GO BACK</Text>
        </TouchableOpacity>
      </View>
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
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F3EF'
  },
  title: {
    bottom: 16,
    fontSize: 40,
    fontFamily: 'PlayfairDisplay-Italic'
  },
  inputs: {
    width: '80%'
  },
  input: {
    fontFamily: 'PlayfairDisplay-Regular',
    marginBottom: 8,
    fontSize: 20,
    borderColor: '#000',
    borderBottomWidth: 1,
    padding: 8
  },
  error: {
    fontSize: 16,
    fontFamily: 'WorkSans',
    color: '#f00',
    height: 24
  },
  loginButton: {
    width: '80%',
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#000'
  },
  buttonText: {
    fontFamily: 'WorkSans',
    fontSize: 16
  },
  backButton: {
    width: '80%',
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 88
  }
});

export default LoginScreen;
