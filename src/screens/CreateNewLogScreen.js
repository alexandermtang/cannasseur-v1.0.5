import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

class CreateNewLogScreen extends React.Component {
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

  render() {
    return <Text>CREATE NEW LOG</Text>;
  }
}

export default CreateNewLogScreen;
