import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import * as firebase from 'firebase';

class MeScreen extends React.Component {
  async logout() {
    console.log('logging out')
    await AsyncStorage.clear();
    await firebase.auth().signOut();
    this.props.navigation.navigate('AuthLoading');
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.logout()}>
        <Text>LOG OUT</Text>
      </TouchableOpacity>
    );
  }
}

export default MeScreen;
