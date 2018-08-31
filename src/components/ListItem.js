import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ListItem = ({ item, onPress }) => {
  console.log(item);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{item.date}</Text>
      <Text style={styles.text}>{item.strain}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
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
