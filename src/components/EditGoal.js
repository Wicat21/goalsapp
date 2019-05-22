import React, {Component} from 'react';
import { Text, View, TextInput, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {createGoal, formUpdate, saveLocalData} from '../actions';

class AddGoals extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      title: 'ez a title'
    };*/
  }

  onAddPress() {
		const { goals } = this.props.data;
		const title = this.state.title
    this.props.editGoal({ goals, title });
    this.props.navigation.navigate("Goals");
  }
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
            <Text style={styles.headerText}>Változtatás</Text>
        </View>
        <View stlye={styles.form}>
          <TextInput
            placeholder={'Ide írj...'}
            textInputStyle={styles.fieldStyles}
            value={this.props.data.goals.title}
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