import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Actions} from 'react-native-router-flux';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {connect} from 'react-redux';
import {loadLocalData, saveLocalData} from '../actions';

const nem = {key:'nem', color: 'red'};
const igen = {key:'igen', color: 'green'};

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentdate: '',
      title:'',
      completed: '',
      goals: []
    };
  }

  componentWillMount(){
    this.props.loadLocalData();
  }

  componentDidMount () {
    console.log(this.props)
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({
      currentdate: year +'-'+ month +'-'+ date
    });
  }

  /*componentWillUnmount(){
    this.props.saveLocalData()
  }*/
  
  render(){
    console.log(this.props)
    return(
      <View>
        <View style={styles.headerStyle}>
          <View>
            <Text style={styles.headerText}>Goals</Text>
          </View>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonText} onPress={() =>  Actions.AddGoals({valueJSON: this.state.valueJSON})}> + </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.headerStyle2}>
            <Text style={styles.headerText2}>Célok</Text>
            <Text style={styles.headerText2}>
              Mai dátum: {this.state.currentdate}
            </Text>
          </View>
          <View>
            {this.props.data.goals.map((item, i) => {
              console.log(item)
              return (                    
                <View style={styles.card}>
                  <Text>{item.title}</Text> 
                  <TouchableWithoutFeedback onPress={()=> console.log('hey')}>
                    <Text>Kész</Text>
                  </TouchableWithoutFeedback>
                </View>
              ) 
            })}
            <Text>{this.props.data.goals.title}</Text>
          </View>
          <Calendar
            markedDates={{
              '2019-05-18': {dots: [igen, igen]},
              '2019-05-20': {dots: [nem, igen]}
            }}
            markingType={'multi-dot'}
          />
        </View>
      </View>
    )
  }
};

const styles = {
  headerStyle:{
    backgroundColor: '#383f51',
    marginTop:40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    height: 60,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    padding: 25,
    color: 'white'
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
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  headerStyle2:{
    backgroundColor: '#3c4f76',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    height: 40,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText2: {
    fontSize: 15,
    padding: 25,
    color: 'white'
  },
  card: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
	},
};

export default connect(
  ({ data }) => ({ data }),
  {
    loadLocalData,
    saveLocalData
  },
)(Goals);