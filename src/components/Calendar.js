import React, {Component} from 'react';
import { Text, View} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';

//import Icon from 'react-native-vector-icons/EvilIcons';

class Calendar extends Component {
  
  /*static navigationOptions = {
    tabBar: {
        label: 'CALENDAR',
        icon: ({ tintColor }) => (
            <Icon
                name={'calendar'}
                size={50} 
                style={{ color: tintColor }}
            />
        )
    }
  }*/

  render() {
    return (
      <View>
        <Text>Calendar</Text>
      </View>
    );
  }
};


export default Calendar;