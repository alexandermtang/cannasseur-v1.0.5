import React from 'react';
import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.finalRating}>Final Rating</Text>
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
        <Text style={styles.finalRating}>Any Other Notes?</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={'This strain makes me feel on top of the world!'}
          editable={true}
          style={{ borderWidth: 1 }}
        />
        <BlackButton onPress={() => this.props.navigation.replace('Home')} text={'SUBMIT'} />
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
  finalRating: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular'
  },
  starRatingContainer: {
    marginTop: 24,
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
  }
});

export default SubmitLogScreen;
