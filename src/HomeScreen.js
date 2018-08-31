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
import { ScrollView } from 'react-native-gesture-handler';

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

  render() {
    console.log(this.state);
    return (
      <View>
        <View style={styles.searchInputContainer}>
          <Ionicons style={styles.searchIcon} name="ios-search" size={32} />
          <TextInput style={styles.searchInput} placeholder={'Search'} />
        </View>
        <ScrollView style={styles.logsContainer}>
          <FlatList
            data={this.state.logs}
            renderItem={({ item }) => {
              // console.log(item);
              return <Text>{item.strain}</Text>;
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchInputContainer: {
    display: 'flex'
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
  },
  logsContainer: {
    height: '100%',
    width: '100%'

  }
});

export default HomeScreen;
