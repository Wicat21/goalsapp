import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const nem = { key: "nem", color: "red" };
const igen = { key: "igen", color: "green" };

class CalendarScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onedate: [{today:'', goals: [{title:"", marked:false}]}],
      weekly: [{monday:'', goals: [{ title:"", marked: false}]}],
      monthly: [{first:'', goals: [{ title:"", marked: false}]}]
    };
  }
  render(){
    /*const onedate = this.props.data.onedate;
    /*onedate[i].today: {dots: [markedall=true? igen : nem]} 
    if (onedate[i].goals)
    onedate[i].goals */
    var markarray = [{marked:true}, {marked:false}]
    function markedall(currmarked) {
      return currmarked = true;
    }
    console.log(markarray.every(markedall))
    return(
      <View>
        <View>
          <View style={styles.headerStyle}>
              <Text style={styles.headerText}>Calendar</Text>
          </View>
          <Calendar
            markedDates={{
              "2019-06-01": { dots: [igen] },
              "2019-06-02": { dots: [nem] }
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