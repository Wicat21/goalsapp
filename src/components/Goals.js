import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { 
  loadLocalData, 
  saveLocalData, 
  markGoal, 
  deleteGoal,
  newDate
} from "../actions";
import Icon from 'react-native-vector-icons/EvilIcons';

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentdate: "",
      onedate: [{today:'', goals: [{title:"", marked:false}]}],
      weekly: [{monday:'', goals: [{ title:"", marked: false}]}],
      monthly: [{first:'', goals: [{ title:"", marked: false}]}]
    };
  }
  
  componentWillMount() {
    var date = new Date().getDate();
    if(date <= 9)
      date = '0'+date;
    var month =  new Date().getMonth() + 1;
    if(month <= 9)
      month = '0'+month;
    var year = new Date().getFullYear();
    const currentdate = year + "-" + month + "-" + date;
    const onedate = this.props.data.onedate
    const last = this.props.data.onedate[Object.keys(onedate).length-1];
    const goalCopy = this.props.data.onedate[Object.keys(onedate).length-1].goals.slice();
    
    this.props.loadLocalData();
    
    if (last.today != currentdate) { 
      this.props.newDate({onedate, currentdate, goalCopy});
    } 
  }

  /*componentWillUnmount(){
    this.props.saveLocalData()
  }*/
  
  onEditPress(){
    this.props.navigation.navigate("EditGoal");
  }

  render() {
    console.log(this.props);
    const onedate = this.props.data.onedate;
    //var idx = 0;
    var idx = Object.keys(onedate).length-1;
    //var idx = Object.keys(onedate).length-2;
    console.log(Object.keys(onedate).length-2); //onedate.undefined miatt kell
    const data = this.props.data.onedate[idx].goals;
    return (
      <View>
        <View style={styles.headerStyle}>
            <Text style={styles.headerText}>Goals</Text>
            <TouchableOpacity onPress={() =>  console.log('settings')} style={styles.buttonStyle}>
              <Icon
                size={30}
                color={'white'}
                name={'gear'}
              />
            </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.headerStyle2}>
            <View style={styles.freq}>
              <TouchableOpacity onPress={() =>  console.log('daily')} style={styles.freqButton}>
                <Text style={styles.headerText2}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  console.log('weekly')} style={styles.freqButton}>
                <Text style={styles.headerText2}>Weekly</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  console.log('monthly')} style={styles.freqButton}>
                <Text style={styles.headerText2}>Monthly</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.today}>
              Today: {this.state.currentdate}
            </Text>
          </View>
          <View>
            {this.props.data.onedate[idx].goals.map((item, i) => {
              console.log(item);
              const markedColor = item.marked ? "green" : "red";
              const markedIcon = item.marked ? 'check' : 'minus';
              const yo = item.title;
              return (
                <View style={[styles.card, { borderColor: markedColor }]}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      data[i].marked = !item.marked;
                      this.props.markGoal(data);
                    }}
                    style={{ flex: 1 }}
                  >
                    <Icon
                      size={40}
                      color={markedColor}
                      name={markedIcon}
                    />
                  </TouchableOpacity>
                  <View style={styles.editDelete}>
                  <TouchableOpacity
                    onPress={() => this.onEditPress(this.props.navigation.navigate("EditGoal"))}
                    style={{ flex: 2 }}
                  >
                    <Icon
                      size={30}
                      color={'black'}
                      name={'pencil'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      data.splice(i, 1);
                      console.log(data);
                      this.props.deleteGoal(data);
                    }}
                    style={{ flex: 2 }}
                  >
                    <Icon
                      size={30}
                      color={'black'}
                      name={'trash'}
                    />
                  </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
  buttonStyle: {
    position: 'relative',
    backgroundColor: '#3c4f76',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    left: -10
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
  today: {
    paddingRight: 25,
    flex:1,
    fontSize: 10,
    color: "white",
    flexDirection: 'row'
  },  
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,
    height: 75,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    flex:4,
    paddingLeft: 10
  },
  editDelete: {
    flex:1,
    alignItems: 'flex-end',
    padding: 5
  }
};

export default connect(
  ({ data }) => ({ data }),
  {
    loadLocalData,
    saveLocalData,
    markGoal,
    deleteGoal,
    newDate
  }
)(Goals);
