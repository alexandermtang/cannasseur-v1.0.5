import React from 'react';
import { Text, TouchableOpacity, View, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import * as firebase from 'firebase';

import BlackButton from '../components/BlackButton';

class SubmitLogScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: moment().format('MM/DD'),
      headerLeft: (
        <TouchableOpacity style={{ left: 16 }} onPress={() => navigation.goBack()}>
          <Ionicons name={'ios-arrow-dropleft'} size={32} />
        </TouchableOpacity>
      )
    };
  };

  state = {
    finalRating: 0,
    notes: ''
  };

  async onSubmit() {
    const userId = await AsyncStorage.getItem('userId');
    const log = this.props.navigation.getParam('log', {});
    const { finalRating, notes } = this.state;
    await firebase
      .database()
      .ref(`logs/${userId}/${moment().format()}`)
      .set({
        ...log,
        finalRating,
        notes
      });
    this.props.navigation.navigate('Home', { forceUpdate: true });
  }

  render() {
    const log = this.props.navigation.getParam('log', {});
    console.log('params', log);
    // console.log('params', this.props.navigation.state.params);

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Final Rating</Text>
        <View style={styles.starRatingContainer}>
          <StarRating
            disabled={false}
            maxStars={5}
            starStyle={{ fontSize: 32 }}
            containerStyle={{ padding: 8, height: 48 }}
            rating={this.state.finalRating}
            selectedStar={rating => this.setState({ finalRating: rating })}
          />
        </View>
        <Text style={styles.label}>Any Other Notes?</Text>
        <Text style={styles.sublabel}>(Optional)</Text>
        <TextInput
          multiline={true}
          numberOfLines={3}
          placeholder={'This strain makes me feel on top of the world!'}
          style={styles.notesInput}
        />
        <View style={styles.buttonContainer}>
          <BlackButton onPress={() => this.onSubmit()} text={'SUBMIT'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    height: '100%'
  },
  label: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular'
  },
  sublabel: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Regular'
  },
  starRatingContainer: {
    marginTop: 24,
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#d8d8d8'
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'WorkSans',
    fontSize: 16
  },
  notesInput: {
    borderWidth: 1,
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 8,
    height: 72,
    padding: 16,
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Regular'
  },
  buttonContainer: {
    paddingLeft: 16,
    paddingRight: 16
  }
});

export default SubmitLogScreen;
