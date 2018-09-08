import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';

import CircleRating from '../components/CircleRating';

class ViewLogScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: moment(navigation.state.params.log.date).format('MM/DD'),
      headerLeft: (
        <TouchableOpacity style={{ left: 16 }} onPress={() => navigation.goBack()}>
          <Ionicons name={'ios-arrow-dropleft'} size={32} />
        </TouchableOpacity>
      )
    };
  };

  render() {
    const log = this.props.navigation.getParam('log', {});

    return (
      <ScrollView style={styles.container}>
        <View style={styles.strainContainer}>
          <Text style={styles.strain}>{log.strain}</Text>
        </View>
        <View style={styles.finalRatingContainer}>
          <Text style={styles.label}>FINAL RATING</Text>
          <StarRating
            disabled={true}
            maxStars={5}
            starStyle={{ fontSize: 32 }}
            containerStyle={{ padding: 8, height: 48, width: '100%' }}
            rating={log.finalRating}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.moodChartContainer}>
          <View style={styles.left} />
          <View style={styles.moodChartRight}>
            <Text style={styles.label}>MOOD CHART</Text>
          </View>
        </View>
        <View style={styles.ratingsContainer}>
          <View style={styles.left}>
            <Text style={styles.rating}>Happy</Text>
            <Text style={styles.rating}>Creative</Text>
            <Text style={styles.rating}>Active</Text>
            <Text style={styles.rating}>Relaxed</Text>
            <Text style={styles.rating}>Hungry</Text>
            <Text style={styles.rating}>Sleepy</Text>
          </View>
          <View style={styles.right}>
            <CircleRating disabled={true} rating={log.happy} />
            <CircleRating disabled={true} rating={log.creative} />
            <CircleRating disabled={true} rating={log.active} />
            <CircleRating disabled={true} rating={log.relaxed} />
            <CircleRating disabled={true} rating={log.hungry} />
            <CircleRating disabled={true} rating={log.sleepy} />
          </View>
        </View>
        {log.tags && <View style={styles.line} />}
        {log.tags && (
          <Text style={[styles.label, { paddingLeft: 16, marginTop: 16 }]}>GOOD FOR</Text>
        )}
        <View style={styles.tagsContainer}>
          {(log.tags || []).map((tag, i) => {
            return (
              <View style={styles.button} key={i}>
                <Text style={styles.buttonText}>{tag}</Text>
              </View>
            );
          })}
        </View>
        {log.notes && <View style={styles.line} />}
        {log.notes && <Text style={styles.notes}>"{log.notes}"</Text>}
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => this.props.navigation.push('CreateNewLog', { log })}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>EDIT</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff'
  },
  strainContainer: {
    backgroundColor: '#F4F3EF',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 32
  },
  strain: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay-Regular'
  },
  label: {
    fontSize: 16,
    fontFamily: 'WorkSans'
  },
  finalRatingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    marginLeft: '10%',
    paddingBottom: 24,
    width: '80%'
  },
  moodChartContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 16
  },
  left: {
    width: '50%'
  },
  right: {
    width: '50%'
  },
  moodChartRight: {
    width: '50%',
    alignItems: 'center'
  },
  ratingsContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16
  },
  rating: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight: 48,
    color: '#9B9B9B'
  },
  line: {
    marginLeft: '10%',
    width: '80%',
    borderBottomWidth: 1,
    borderColor: '#d8d8d8'
  },
  tagsContainer: {
    marginTop: 16,
    marginBottom: 16,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    margin: 4,
    height: 48,
    minWidth: 80
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'WorkSans'
  },
  notes: {
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Regular',
    paddingLeft: '10%',
    width: '80%',
    marginTop: 16,
    paddingBottom: 32,
    color: '#9B9B9B'
  },
  editButton: {
    left: '10%',
    width: '80%',
    marginBottom: 48,
    backgroundColor: '#000'
  }
});

export default ViewLogScreen;
