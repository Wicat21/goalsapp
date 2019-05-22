import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const nem = { key: "nem", color: "red" };
const igen = { key: "igen", color: "green" };

class CalendarScene extends Component {
  render(){
    return(
      <View>
        <View>
          <Text>Calendar</Text>
          <Calendar
            markedDates={{
              "2019-05-18": { dots: [igen, igen] },
              "2019-05-20": { dots: [nem, igen] }
            }}
            markingType={"multi-dot"}
          />
        </View>
      </View>
    )
  }
};


export default CalendarScene;