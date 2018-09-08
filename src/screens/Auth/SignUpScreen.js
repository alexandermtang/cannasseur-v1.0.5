import React from 'react';
import { AsyncStorage, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';

class SignUpScreen extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    isLoading: false
  };

  async onSignUp() {
    const { name, email, password, confirmPassword } = this.state;
    if (name === '') {
      return this.setState({ error: 'Missing name.', isLoading: false });
    }

    if (email === '') {
      return this.setState({ error: 'Missing email.', isLoading: false });
    }

    if (password !== confirmPassword) {
      return this.setState({ error: 'Passwords must match.', isLoading: false });
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          AsyncStorage.setItem('userId', user.uid);
          firebase
            .database()
            .ref(`users/${user.uid}`)
            .set({ name, email });
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
          textContent={'Creating account...'}
          textStyle={{ color: '#FFF', fontFamily: 'PlayfairDisplay-Regular' }}
        />
        <TextInput
          style={styles.input}
          placeholder={'name'}
          onChangeText={name => this.setState({ name, error: '' })}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.input}
          placeholder={'email'}
          onChangeText={email => this.setState({ email, error: '' })}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.input}
          placeholder={'password'}
          onChangeText={password => this.setState({ password, error: '' })}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder={'confirm password'}
          onChangeText={confirmPassword => this.setState({ confirmPassword, hasError: false })}
          secureTextEntry
        />
        <Text style={styles.error}>{this.state.error}</Text>}
        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={() => {
            this.setState({ isLoading: true });
            this.onSignUp();
          }}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: 120 }]}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: '#000' }]}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#F4F3EF'
  },
  input: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular',
    borderBottomWidth: 1,
    padding: 8,
    marginTop: 16,
    width: '80%'
  },
  button: {
    width: '80%',
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  signUpButton: {
    backgroundColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8
  },
  error: {
    fontSize: 16,
    fontFamily: 'WorkSans',
    color: '#f00',
    height: 24,
    marginTop: 8
  }
});

export default SignUpScreen;
