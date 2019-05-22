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
          <View style={styles.headerStyle}>
              <Text style={styles.headerText}>Calendar</Text>
          </View>
          <Calendar
            markedDates={{
              "2019-05-22": { dots: [igen] },
              "2019-05-23": { dots: [nem] }
            }}
            markingType={"multi-dot"}
          />
        </View>
      </View>
    )
  }
};

const styles = {
  headerStyle: {
    backgroundColor: "#383f51",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    height: 60,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    padding: 25,
    color: "white"
  }
}

export default CalendarScene;