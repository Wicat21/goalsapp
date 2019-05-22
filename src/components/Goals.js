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
  deleteGoal 
} from "../actions";
import Icon from 'react-native-vector-icons/EvilIcons';

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentdate: "",
      title: "",
      marked: "",
      goals: []
    };
  }

  componentWillMount() {
    this.props.loadLocalData();
  }

  componentDidMount() {
    console.log(this.props);
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({
      currentdate: year + "-" + month + "-" + date
    });
  }

  /*componentWillUnmount(){
    this.props.saveLocalData()
  }*/
  
  onEditPress(){
    this.props.navigation.navigate("EditGoal");
  }

  render() {
    console.log(this.props);
    const data = this.props.data.goals;
    return (
      <View>
        <View style={styles.headerStyle}>
            <Text style={styles.headerText}>Goals</Text>
        </View>
        <View>
          <View style={styles.headerStyle2}>
            <Text style={styles.headerText2}>Célok</Text>
            <Text style={styles.headerText2}>
              Mai dátum: {this.state.currentdate}
            </Text>
          </View>
          <ScrollView>

            {this.props.data.goals.map((item, i) => {
              console.log(item);
              const markedColor = item.marked ? "red" : "green";
              const markedIcon = item.marked ? 'minus' : 'check';
              return (
                <View style={[styles.card, { borderColor: markedColor }]}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      data[i].marked = true;
                      console.log(data);
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
                    onPress={() => this.onEditPress.bind(this)}
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

          </ScrollView>
        </View>
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
    fontSize: 15,
    padding: 25,
    color: "white"
  },
  card: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
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
    deleteGoal
  }
)(Goals);
