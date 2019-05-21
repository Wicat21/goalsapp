import React, {Component} from 'react';
import { Text, View, TextInput, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {createGoal, formUpdate, saveLocalData} from '../actions';

class AddGoals extends Component {
	onAddPress(){
		const {goals} = this.props.data;
		this.props.createGoal({goals});
		this.props.saveLocalData({goals});
		this.props.navigation.navigate('Goals');
	}
  	render(){
    return(
	      <View>
	        <View stlye={styles.form}>
	          <Text>Cél neve</Text>
	          <TextInput 
	          	textInputStyle={styles.fieldStyles} 
	          	value={this.props.data.goals.title}
	          	onChangeText={value => this.props.formUpdate({prop:'title', value})}
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
	    )
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