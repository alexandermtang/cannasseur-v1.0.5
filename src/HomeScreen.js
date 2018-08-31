import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'LOG BOOK',
  };

  onPress() {
    console.log(this.state);
  }

  render() {
    
    return (
      <View>
        <Text>LOG BOOK</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  });

export default HomeScreen;
