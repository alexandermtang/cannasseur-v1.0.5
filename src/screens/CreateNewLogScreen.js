import React from 'react';
import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

import StarRating from 'react-native-star-rating';

const CircleRating = props => (
  <StarRating
    {...props}
    disabled={false}
    maxStars={3}
    emptyStar={'circle'}
    emptyStarColor={'#d8d8d8'}
    fullStar={'circle'}
    starStyle={{ fontSize: 32 }}
    containerStyle={{ padding: 8, height: 48 }}
    // selectedStar={rating => props.onStarRatingPress(rating)}
  />
);

class CreateNewLogScreen extends React.Component {
  state = {
    happy: 0,
    creative: 0,
    active: 0,
    relaxed: 0,
    hungry: 0,
    sleepy: 0
  };

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

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    // return <Text>CREATE NEW LOG</Text>;
    return (
      <View style={styles.container}>
        <View style={styles.nameOfStrainContainer}>
          <Text style={styles.nameOfStrain}>NAME OF STRAIN</Text>
          <TextInput style={styles.strainInput} placeholder={'Pineapple Express'} />
        </View>
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
            <CircleRating
              rating={this.state.happy}
              selectedStar={rating => this.setState({ happy: rating })}
            />
            <CircleRating
              rating={this.state.creative}
              selectedStar={rating => this.setState({ creative: rating })}
            />
            <CircleRating
              rating={this.state.active}
              selectedStar={rating => this.setState({ active: rating })}
            />
            <CircleRating
              rating={this.state.relaxed}
              selectedStar={rating => this.setState({ relaxed: rating })}
            />
            <CircleRating
              rating={this.state.hungry}
              selectedStar={rating => this.setState({ hungry: rating })}
            />
            <CircleRating
              rating={this.state.sleepy}
              selectedStar={rating => this.setState({ sleepy: rating })}
            />
          </View>
        </View>
        <Text style={styles.label}>GOOD FOR</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  nameOfStrainContainer: {
    // padding: 16
    // paddingTop: 16,
    // paddingBottom: 16,
    // paddingLeft: 32,
    // paddingRight: 32
  },
  strainInput: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular',
    borderColor: '#9B9B9B',
    borderBottomWidth: 1
  },
  moodChartContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 8
  },
  label: {
    fontSize: 16,
    fontFamily: 'WorkSans'
  },
  moodChartRight: {
    width: '50%',
    alignItems: 'center'
  },
  ratingsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16
    // padding: 16
  },
  left: {
    width: '50%'
  },
  right: {
    width: '50%'
  },
  nameOfStrain: {
    fontSize: 16,
    fontFamily: 'WorkSans'
  },
  // center: {
  //   justifyContent: 'center',
  //   // alignItems: 'center'
  // },
  rating: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight: 48,
    color: '#9B9B9B'
  }
});

export default CreateNewLogScreen;
