import React, {Component} from 'react';
import { Text, View, TextInput, StyleSheet, Button, Picker} from 'react-native';
import {connect} from 'react-redux';
import {createGoal, createWeek, createMonth, formUpdate, saveLocalData} from '../actions';

class AddGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      currentdate:'',
      date: '',
      freq: 'daily'
    };
  }

  onAddPress() {
    const title = this.state.title;
    const onedate = this.props.data.onedate;
    const weekly = this.props.data.weekly;
    const monthly = this.props.data.monthly;
    if (this.state.freq =='daily') {
      console.log('daily');
      this.props.createGoal({ title, onedate});
      this.props.navigation.navigate("Goals");
    } if (this.state.freq =='weekly') {
      console.log('weekly');
      this.props.createWeek({ title, weekly});
      this.props.navigation.navigate("Goals");
    } if (this.state.freq =='monthly') {
      console.log('monthly');
      this.props.createMonth({ title, monthly});
      this.props.navigation.navigate("Goals");
    } else {
      this.props.navigation.navigate("Goals");
    }
  }
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
            <Text style={styles.headerText}>New Goal</Text>
        </View>
        <View stlye={styles.form}>
          <TextInput
            style={{paddingLeft: 25}}
            placeholder={'Write here...'}
            textInputStyle={styles.fieldStyles}
            value={this.state.title}
            onChangeText={value =>
              this.setState({title: value})
            }
          />
          <Picker
            selectedValue={this.state.freq}
            style={{height: 100, width: 120, alignSelf:'center'}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({freq: itemValue})
            }>
            <Picker.Item label="Daily" value="daily" />
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Monthly" value="monthly" />
          </Picker>
        </View>
        <View style={styles.addButton}>
          <Button
            onPress={this.onAddPress.bind(this)}
            title="Save"
            color="#3c4f76"
          />
        </View>
      </View>
    );
  }
};


const styles = StyleSheet.create({
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
  form: {
		marginTop: 20,
		marginBottom: 20,
		marginRight: 20,
    marginLeft: 20,
    paddingLeft: 25
	},
	fieldStyles: {
		height: 50,
		color: 'orange',
	},
	addButton: {
		marginTop: 20
	}
});


export default connect(
  ({ data }) => ({ data }),
  {
    createGoal,
    createWeek,
    createMonth,
		formUpdate,
		saveLocalData
  },
)(AddGoals);