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

import BlackButton from '../components/BlackButton';

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

  state = {
    email: ''
  };

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    const snapshot = await firebase
      .database()
      .ref(`/users/${userId}/email`)
      .once('value');
    const email = snapshot.val();

    this.setState({ email });
  }

  async logout() {
    await AsyncStorage.clear();
    await firebase.auth().signOut();
    this.props.navigation.navigate('AuthLoading');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.email}>{this.state.email}</Text>
        <BlackButton onPress={() => this.logout()} text={'LOG OUT'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  email: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular',
    height: 32,
    marginBottom: 32
  }
});

export default MeScreen;
