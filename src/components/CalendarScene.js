import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Icon from 'react-native-vector-icons/EvilIcons';
import { connect } from "react-redux";
import { 
  loadLocalData, 
  saveLocalData, 
  markGoal, 
  deleteGoal,
  newDate,
  newWeek,
  newMonth
} from "../actions";

class CalendarScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: 'daily',
      onedate: [{today:'', allmarked:false, goals: [{title:"", marked:false}]}],
      weekly: [{monday:'', allmarked:false, goals: [{ title:"", marked: false}]}],
      monthly: [{first:'', allmarked:false, goals: [{ title:"", marked: false}]}]
    };
  }

  renderDaily(){
    const nem = { key: "nem", color: "red" };
    const igen = { key: "igen", color: "green" };
    const onedate = this.props.data.onedate;
    dottArray = [];
    {Object.keys(onedate).map(key => {
      const date = onedate[key].today 
      const dott = onedate[key].allmarked ? igen : nem;
      dottArray.push({[date]: {dots: [dott]}});
      for (var i in dottArray) 
            {
              console.log(i);
            }
    })}
    return(
      <Calendar
          markedDates={{
            /*"2019-06-01": { dots: [igen] },
            "2019-06-02": { dots: [nem] },*/
          }}
          markingType={"multi-dot"}
        />
    );
  }

  renderWeekly(){
    const weekly = this.props.data.weekly;
    return (
      <View>
        <Text>Weekly feedback</Text>
        {Object.keys(weekly).map(key => {
          const markedColor = weekly[key].allmarked ? "green" : "red";
          const markedIcon = weekly[key].allmarked ? 'check' : 'minus';
          const week = weekly[key].monday.substring(0,7);
            return (
              <View key={key} style={{ flexDirection:'row' }}>
                <Text style={{ flex: 1}} >{week}</Text>
                <TouchableOpacity
                    onPress={() => { console.log('marked!!')
                      //data[i].marked = !item.marked;
                      //this.props.markGoal(data);
                    }}
                    style={{ flex: 1 }}
                  >
                    <Icon
                      size={20}
                      color={markedColor}
                      name={markedIcon}
                    />
                  </TouchableOpacity>
              </View>
            );
        })}
      </View>
    );
  }

  renderMonthly(){
    const monthly = this.props.data.monthly;
    return (
      <View>
        <Text>Monthly feedback</Text>
        {Object.keys(monthly).map(key => {
          const markedColor = monthly[key].allmarked ? "green" : "red";
          const markedIcon = monthly[key].allmarked ? 'check' : 'minus';
          const month = monthly[key].first.substring(0,7);
            return (
              <View key={key} style={{ flexDirection:'row' }}>
                <Text style={{ flex: 1}} >{month}</Text>
                <TouchableOpacity
                    onPress={() => { console.log('marked!!')
                      //data[i].marked = !item.marked;
                      //this.props.markGoal(data);
                    }}
                    style={{ flex: 1 }}
                  >
                    <Icon
                      size={20}
                      color={markedColor}
                      name={markedIcon}
                    />
                  </TouchableOpacity>
              </View>
            );
        })}
      </View>
    );
  }

  renderFeedback(){
    if (this.state.feedback == 'daily') {
      return (
      this.renderDaily()
      )
    } if (this.state.feedback == 'weekly'){
      return (
        this.renderWeekly()
      )
    } if (this.state.feedback == 'monthly'){
      return (
      this.renderMonthly()
      )
    }
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
              <Text style={styles.headerText}>Feedback</Text>
          </View>
          <View style={styles.headerStyle2}>
            <View style={styles.freq}>
              <TouchableOpacity onPress={() =>  this.setState({feedback: 'daily'})} style={styles.freqButton}>
                <Text style={styles.headerText2}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  this.setState({feedback: 'weekly'})} style={styles.freqButton}>
                <Text style={styles.headerText2}>Weekly</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  this.setState({feedback: 'monthly'})} style={styles.freqButton}>
                <Text style={styles.headerText2}>Monthly</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.renderFeedback()}
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
  },
  headerStyle2: {
    backgroundColor: "#3c4f76",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    height: 40,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText2: {
    fontSize: 12,
    color: "white"
  },
  freq: {
    paddingLeft: 25,
    paddingRight: 25,
    flex:2,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  freqButton: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  }, 
}

export default connect(
  ({ data }) => ({ data }),
  {
    loadLocalData,
    saveLocalData,
    markGoal,
    deleteGoal,
    newDate,
    newWeek,
    newMonth
  }
)(CalendarScene);