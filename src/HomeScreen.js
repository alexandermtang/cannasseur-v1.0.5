import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'LOG BOOK'
  };

  state = {
    logs: []
  };

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    const snapshot = await firebase
      .database()
      .ref(`logs/${userId}`)
      .once('value');
    const logs = snapshot.val();
    this.setState({ logs: Object.keys(logs).map(date => ({ date, ...logs[date] })) });
    // console.log(logs, logsArray);
  }

  onPress() {
    console.log(this.state);
  }

  render() {
    console.log(this.state);
    return (
      <View>
        <View style={styles.searchInputContainer}>
          <Ionicons style={styles.searchIcon} name="ios-search" size={32} />
          <TextInput style={styles.searchInput} placeholder={'Search'}/>
        </View>
        <Text>LOG BOOK</Text>
      </View>
    );
  }
}

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  searchInputContainer: {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'flex-start'
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 100,
    top: 8,
    left: 8
  },
  searchInput: {
    height: 48,
    fontFamily: 'PlayfairDisplay-Regular',
    backgroundColor: '#FFF',
    padding: 8,
    paddingLeft: 40,
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2'
  }
});

export default HomeScreen;
