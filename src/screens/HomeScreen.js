import React from 'react';
import {
  Animated,
  AsyncStorage,
  ActivityIndicator,
  Easing,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

import ListItem from '../components/ListItem';
import BlackButton from '../components/BlackButton';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'LOG BOOK',
      headerRight: (
        <TouchableOpacity style={{ right: 16 }} onPress={() => navigation.push('Me')}>
          <Ionicons name={'ios-contact-outline'} size={32} />
        </TouchableOpacity>
      )
    };
  };

  state = {
    allLogs: [],
    filteredLogs: [],
    isLoading: true,
    isEmpty: false,
    showModal: false,
    filterText: 'MOST RECENT',
    bottomAnim: new Animated.Value(-600)
  };

  async getLogs() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const snapshot = await firebase
        .database()
        .ref(`logs/${userId}`)
        .orderByKey()
        .once('value');

      const logs = snapshot.val();
      const allLogs = Object.keys(logs)
        .reverse()
        .map(date => ({ date, ...logs[date] }));

      this.setState({
        allLogs,
        filteredLogs: allLogs,
        isLoading: false
      });
    } catch (error) {
      // console.error(error);
      this.setState({ isLoading: false, isEmpty: true });
    }
  }

  async componentDidMount() {
    this.getLogs();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.forceUpdate) {
      this.getLogs();
    }
  }

  search(searchText) {
    if (searchText === '') {
      this.setState({ filteredLogs: this.state.allLogs });
    } else {
      const filteredLogs = this.state.allLogs.reduce((logs, log) => {
        const isInclude =
          log.strain.toLowerCase().includes(searchText.toLowerCase()) ||
          (log.tags || []).some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
        return isInclude ? [...logs, log] : logs;
      }, []);

      this.setState({ filteredLogs });
    }
  }

  showModal() {
    Animated.timing(
      // Animate over time
      this.state.bottomAnim, // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 1 (opaque)
        duration: 250 // Make it take a while
      }
    ).start();
    this.setState({ showModal: true });
  }

  hideModal() {
    Animated.timing(
      // Animate over time
      this.state.bottomAnim, // The animated value to drive
      {
        toValue: -600, // Animate to opacity: 1 (opaque)
        duration: 250 // Make it take a while
      }
    ).start(finished => {
      console.log('finished', finished);
      this.setState({ showModal: false });
    });
  }

  sortBy(type = 'mostRecent') {
    const tempLogs = [...this.state.allLogs];
    let filterText = '';

    if (type === 'mostRecent') {
      tempLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
      filterText = 'MOST RECENT';
    } else if (type === 'topRated') {
      tempLogs.sort((a, b) => b.finalRating - a.finalRating);
      filterText = 'TOP RATED';
    } else {
      tempLogs.sort((a, b) => b[type] - a[type]);
      filterText = `MOOD: ${type.toUpperCase()}`;
    }

    this.setState({ filteredLogs: tempLogs, showModal: false, filterText });
  }

  render() {
    const strainsSet = new Set();
    this.state.allLogs.forEach(log => strainsSet.add(log.strain));
    const numStrains = strainsSet.size;
    // console.log('logs', this.state.filteredLogs);

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Ionicons style={styles.searchIcon} name={'ios-search'} size={32} />
            <TextInput
              style={styles.searchInput}
              placeholder={'Search strain or tag'}
              onChangeText={searchText => this.search(searchText)}
            />
          </View>
          <TouchableOpacity style={styles.filterContainer} onPress={() => this.showModal()}>
            <Ionicons style={styles.filterIcon} name={'ios-funnel'} size={32} />
            <Text style={styles.filterText}>{this.state.filterText}</Text>
          </TouchableOpacity>
        </View>
        {this.state.isLoading ? (
          <ActivityIndicator size="large" color="#9b9b9b" />
        ) : (
          <ScrollView style={styles.logsContainer}>
            <FlatList
              data={this.state.filteredLogs}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({ item }) => (
                <ListItem
                  item={item}
                  onPress={() => {
                    this.props.navigation.push('ViewLog', { log: item });
                  }}
                />
              )}
            />
          </ScrollView>
        )}
        <View style={styles.footerContainer}>
          <BlackButton
            onPress={() => this.props.navigation.navigate('CreateNewLog')}
            text={'CREATE NEW LOG'}
          />
          <View style={styles.strainsContainer}>
            <Text style={styles.numStrains}>{numStrains}</Text>
            <Text style={styles.strainsRecorded}>
              STRAIN
              {numStrains === 1 ? '' : 'S'} RECORDED
            </Text>
          </View>
        </View>
        {this.state.showModal && (
          <View style={styles.modal}>
            <TouchableHighlight style={styles.top} onPress={() => this.hideModal()}>
              <View />
            </TouchableHighlight>
            <Animated.View style={[styles.bottom, { bottom: this.state.bottomAnim }]}>
              <View style={styles.modalHeaderContainer}>
                <Ionicons
                  style={styles.closeIcon}
                  name={'ios-close'}
                  size={32}
                  onPress={() => this.hideModal()}
                />
                <Text style={styles.filterOptionsHeaderText}>Filter Options</Text>
              </View>
              <ScrollView style={{ paddingBottom: 56 }}>
                <FilterButton onPress={() => this.sortBy('mostRecent')} text={'MOST RECENT'} />
                <FilterButton onPress={() => this.sortBy('topRated')} text={'TOP RATED'} />
                <FilterButton onPress={() => this.sortBy('happy')} text={'MOOD: HAPPY'} />
                <FilterButton onPress={() => this.sortBy('creative')} text={'MOOD: CREATIVE'} />
                <FilterButton onPress={() => this.sortBy('active')} text={'MOOD: ACTIVE'} />
                <FilterButton onPress={() => this.sortBy('relaxed')} text={'MOOD: RELAXED'} />
                <FilterButton onPress={() => this.sortBy('hungry')} text={'MOOD: HUNGRY'} />
                <FilterButton onPress={() => this.sortBy('sleepy')} text={'MOOD: SLEEPY'} />
              </ScrollView>
              <View />
            </Animated.View>
          </View>
        )}
      </View>
    );
  }
}

const FilterButton = ({ onPress, text }) => (
  <TouchableOpacity
    style={{ alignItems: 'center', justifyContent: 'center', height: 56 }}
    onPress={() => onPress()}
  >
    <Text style={{ fontSize: 16, fontFamily: 'WorkSans', lineHeight: 56 }}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFF'
  },
  headerContainer: {},
  searchIcon: {
    position: 'absolute',
    zIndex: 100,
    top: 12,
    left: 16
  },
  searchInput: {
    height: 56,
    fontFamily: 'PlayfairDisplay-Regular',
    backgroundColor: '#FFF',
    padding: 8,
    paddingLeft: 56,
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor: '#d8d8d8'
  },
  filterContainer: {
    height: 56,
    paddingRight: 32,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#d8d8d8'
  },
  filterIcon: {
    padding: 8
  },
  filterText: {
    fontSize: 16,
    fontFamily: 'WorkSans'
  },
  logsContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF'
  },
  footerContainer: {
    backgroundColor: '#F4F3EF',
    width: '100%',
    height: 148,
    borderTopWidth: 1,
    borderColor: '#d8d8d8',
    paddingTop: 16,
    paddingRight: 32,
    paddingLeft: 32
  },
  strainsContainer: {
    alignItems: 'flex-end'
  },
  numStrains: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 32
  },
  strainsRecorded: {
    fontFamily: 'WorkSans',
    fontSize: 16
  },

  modal: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 500
    // bottom: 90
  },
  top: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
    opacity: 0.7,
    position: 'absolute',
    zIndex: 300
  },
  bottom: {
    height: '60%',
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 400
  },
  modalHeaderContainer: {
    height: 56,
    borderBottomWidth: 1,
    borderColor: '#9b9b9b',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 12,
    paddingLeft: 16,
    paddingBottom: 12,
    paddingRight: 16
  },
  filterOptionsHeaderText: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular'
  },
  filterOptionsText: {
    fontSize: 16,
    fontFamily: 'WorkSans',
    padding: 16
  }
});

export default HomeScreen;
