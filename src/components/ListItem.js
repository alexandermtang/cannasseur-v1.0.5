import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
import StarRating from 'react-native-star-rating';

const ListItem = ({ item, onPress, onPressDelete }) => {
  const date = moment(item.date).format('MM/DD');
  const strain = item.strain.length > 22 ? `${item.strain.slice(0, 22)}...` : item.strain;

  const swipeoutBtns = [
    {
      text: 'DELETE',
      onPress: () => onPressDelete(),
      backgroundColor: '#000',
      color: '#fff'
    }
  ];
  return (
    <Swipeout autoClose right={swipeoutBtns}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{`${date}\t${strain}`}</Text>
        <StarRating
          disabled={true}
          rating={item.finalRating}
          starStyle={{ fontSize: 16 }}
          containerStyle={{ paddingRight: 16, width: '30%' }}
        />
      </TouchableOpacity>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    backgroundColor: '#FFF',
    borderColor: '#d8d8d8',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Regular'
  }
});

export default ListItem;
