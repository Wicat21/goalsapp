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
  markAll,
  deleteGoal,
  newDate,
  newWeek,
  newMonth,
  createDates
} from "../actions";
import Icon from "react-native-vector-icons/EvilIcons";
import BackgroundJob from "react-native-background-job";
import store from "../store";
import { dispatch } from 'redux';
const regularJobKey = "regularJobKey";

BackgroundJob.register({
  jobKey: regularJobKey,
  job: () => console.log('megy')
  //store.dispatch(newDate()) - nem működik - nem találtam megoldást órák alatt :()
  /*store.dispatch(newWeek());
  store.dispatch(newMonth());*/
});

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      currentdate: "",
      show: "daily",
      data: [],
      onedate: [
      ],
      weekly: [
      ],
      monthly: [
      ]
    };
    this.props.loadLocalData();
  }

  componentWillMount() {
    var currenthour = new Date().getHours();
    var currentmin = new Date().getMinutes();
    const currenttime = (currenthour * 60 + currentmin) * 60000;
    const fulltime = 86400000;
    //var difftime = fulltime - currenttime + 1000;
    var difftime = 60000;
    BackgroundJob.schedule({
      jobKey: regularJobKey,
      notificationTitle: "Notification title",
      notificationText: "Notification text",
      timeout: difftime,
      period: 60000,
      allowExecutionInForeground: true
    });
  }

  onEditPress() {
    this.props.navigation.navigate("EditGoal");
  }

  /* checkmarked(){
    const onedate = this.props.data.onedate;
    const now = Object.keys(onedate).length-1;
    const nowgoals = onedate[now].goals;
    const nowmarked = onedate[now].allmarked
    if (nowgoals.filter(element => element.marked = false).length >0) {
      this.setState({nowmarked : false})
    } else {
      this.setState({nowmarked : true})
    }
    console.log(nowmarked)
  }*/

  render() {
    const onedate = this.props.data.onedate;
    const weekly = this.props.data.weekly;
    const monthly = this.props.data.monthly;
    var idx = Object.keys(onedate).length - 1;
    var idw = Object.keys(weekly).length - 1;
    var idm = Object.keys(monthly).length - 1;
    console.log(this.state.data);
    const ddata = this.props.data.onedate[idx].goals;
    const wdata = this.props.data.weekly[idw].goals;
    const mdata = this.props.data.monthly[idm].goals;
    const data = this.state.data;
    return(
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>Goals</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Settings")}
            style={styles.buttonStyle}
          >
            <Icon size={30} color={"white"} name={"gear"} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.headerStyle2}>
            <View style={styles.freq}>
              <TouchableOpacity
                onPress={() => this.setState({ data: ddata })}
                style={styles.freqButton}
              >
                <Text style={styles.headerText2}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ data: wdata })}
                style={styles.freqButton}
              >
                <Text style={styles.headerText2}>Weekly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ data: mdata })}
                style={styles.freqButton}
              >
                <Text style={styles.headerText2}>Monthly</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {data.map((item, i) => {
              console.log(item);
              const markedColor = item.marked ? "green" : "red";
              const markedIcon = item.marked ? "check" : "minus";
              const yo = item.title;
              return (
                <View
                  key={i}
                  style={[styles.card, { borderColor: markedColor }]}
                >
                  <Text style={styles.titleText}>{item.title}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      data[i].marked = !item.marked;
                      this.props.markGoal(data);
                    }}
                    style={{ flex: 1 }}
                  >
                    <Icon size={40} color={markedColor} name={markedIcon} />
                  </TouchableOpacity>
                  <View style={styles.editDelete}>
                    <TouchableOpacity
                      onPress={() => {
                        data.splice(i, 1);
                        this.props.deleteGoal(data);
                        this.onEditPress(
                          this.props.navigation.navigate("EditGoal")
                        );
                      }}
                      style={{ flex: 2 }}
                    >
                      <Icon size={30} color={"black"} name={"pencil"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        data.splice(i, 1);
                        console.log(data);
                        this.props.deleteGoal(data);
                      }}
                      style={{ flex: 2 }}
                    >
                      <Icon size={30} color={"black"} name={"trash"} />
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
    position: "relative",
    backgroundColor: "#3c4f76",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
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
    flex: 2,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  freqButton: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  today: {
    paddingRight: 25,
    flex: 1,
    fontSize: 10,
    color: "white",
    flexDirection: "row"
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
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 4,
    paddingLeft: 10
  },
  editDelete: {
    flex: 1,
    alignItems: "flex-end",
    padding: 5
  }
};

export default connect(
  ({ data }) => ({ data }),
  {
    loadLocalData,
    saveLocalData,
    markGoal,
    markAll,
    deleteGoal,
    newDate,
    newWeek,
    newMonth,
    createDates
  }
)(Goals);
