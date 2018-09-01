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
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

class MeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'PROFILE',
      headerLeft: (
        <TouchableOpacity style={{ left: 16 }} onPress={() => navigation.goBack()}>
          <Ionicons name={'ios-arrow-dropleft'} size={32} />
        </TouchableOpacity>
      )
    };
  };

  async logout() {
    console.log('logging out');
    await AsyncStorage.clear();
    await firebase.auth().signOut();
    this.props.navigation.navigate('AuthLoading');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%'
  },
  logoutButton: {
    top: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 8,
    left: '10%'
  },
  logoutText: {
    color: '#FFF',
    fontFamily: 'WorkSans',
    fontSize: 16
  }
});

export default MeScreen;
