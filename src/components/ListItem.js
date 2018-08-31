import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const ListItem = ({ item, onPress }) => {
  const date = moment(item.date).format('MM/DD');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{date}      {item.strain}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    backgroundColor: '#FFF',
    borderColor: '#e2e2e2',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Regular'
  }

})

export default ListItem;
