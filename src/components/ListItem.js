import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';

const ListItem = ({ item, onPress, onPressDelete }) => {
  const date = moment(item.date).format('MM/DD');

  const swipeoutBtns = [
    {
      text: 'Delete',
      onPress: () => onPressDelete(),
      backgroundColor: '#000',
      color: '#fff'
    }
  ];
  return (
    <Swipeout right={swipeoutBtns}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{`${date}\t${item.strain}`}</Text>
      </TouchableOpacity>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    display: 'flex',
    justifyContent: 'center',
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
