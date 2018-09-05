import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

class SignUpLoginScreen extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.top}>
          <Image source={require('../../../assets/cannabis.png')} style={styles.logo} />
          <Text style={styles.title}>cannasseur</Text>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#000', marginTop: 48 }]}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginTop: 16 }]}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#F4F3EF'
  },
  logo: {
    width: 150,
    height: 150,
    bottom: 16
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
  button: {
    borderRadius: 8,
    borderWidth: 1,
    width: '80%',
    left: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48
  }
});
export default SignUpLoginScreen;
