import React, {Component} from 'react';
import { Text, View, TextInput, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {createGoal, formUpdate, saveLocalData} from '../actions';

class AddGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'ez a title',
      currentdate:'',
      date: ''
    };
  }

  componentDidMount() {
    var date = new Date().getDate();
    if(date <= 9)
      date = '0'+date;
    var month =  new Date().getMonth() + 1;
    if(month <= 9)
      month = '0'+month;
    var year = new Date().getFullYear();
    this.setState({
      currentdate: year + "-" + month + "-" + date
    });
  }

  onAddPress() {
		const { goals } = this.props.data.onedate;
    const title = this.state.title
    const currdate = this.state.currentdate
    this.props.createGoal({ goals, title, currdate });
    this.props.navigation.navigate("Goals");
  }
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
            <Text style={styles.headerText}>Új cél</Text>
        </View>
        <View stlye={styles.form}>
          <TextInput
            placeholder={'Ide írj...'}
            textInputStyle={styles.fieldStyles}
            value={this.props.data.onedate.goals.title}
            onChangeText={value =>
              this.setState({title: value})
            }
          />
        </View>
        <View style={styles.addButton}>
          <Button
            onPress={this.onAddPress.bind(this)}
            title="Mentés"
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
		formUpdate,
		saveLocalData
  },
)(AddGoals);