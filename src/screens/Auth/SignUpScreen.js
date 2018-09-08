import React from 'react';
import { AsyncStorage, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';

class SignUpScreen extends React.Component {
  state = {
    email: '',
    password: '',
    hasError: false,
    isLoading: false
  };

  async onSignUp() {
    const { email, password } = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          AsyncStorage.setItem('userId', user.uid);
          firebase
            .database()
            .ref(`users/${user.uid}`)
            .set({ email });
          this.props.navigation.navigate('App');
        } else {
          AsyncStorage.setItem('userId', '');
        }
      });
    } catch (error) {
      console.log(error);
      this.setState({ hasError: true, isLoading: false });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Signing up...'}
          textStyle={{ color: '#FFF', fontFamily: 'PlayfairDisplay-Regular' }}
        />
        <View style={styles.top}>
          <TextInput
            style={styles.input}
            placeholder={'email'}
            onChangeText={email => this.setState({ email, hasError: false })}
            autoCapitalize={'none'}
          />
          <TextInput
            style={styles.input}
            placeholder={'password'}
            onChangeText={password => this.setState({ password, hasError: false })}
            secureTextEntry
          />
        </View>
        <View style={styles.bottom}>
          {this.state.hasError && <Text style={styles.error}>Invalid email or password.</Text>}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#000' }]}
            onPress={() => {
              this.setState({ isLoading: true });
              this.onSignUp();
            }}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
            <Text style={[styles.buttonText, { color: '#000' }]}>BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '100%',
    // width: '100%'
  },
  top: {
    height: '50%',
    backgroundColor: '#F4F3EF',
    justifyContent: 'flex-end'
  },
  bottom: {
    height: '50%',
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  input: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular',
    borderBottomWidth: 1,
    // borderColor: '#d8d8d8',
    padding: 8,
    marginBottom: 16,
    width: '80%',
    left: '10%'
  },
  button: {
    width: '80%',
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: '10%',
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 16
  },
  error: {
    fontSize: 16,
    fontFamily: 'WorkSans',
    color: '#f00',
    left: '20%',
    top: 8,
    marginBottom: 4
  },
});

export default SignUpScreen;
