import React, {Component} from 'react';
import { Text, View, TextInput, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {createGoal, formUpdate, saveLocalData} from '../actions';

class AddGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'ez a title'
    };
  }

  onAddPress() {
		const { goals } = this.props.data;
		const title = this.state.title
    this.props.createGoal({ goals, title });
    this.props.navigation.navigate("Goals");
  }
  render() {
    return (
      <View>
        <View stlye={styles.form}>
          <Text>Cél neve</Text>
          <TextInput
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
	form: {
		flex: 1,
		paddingTop: 50,
		paddingBottom: 10,
		paddingRight: 20,
		paddingLeft: 20,
		justifyContent: 'space-between',
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