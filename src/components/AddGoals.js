import React, {Component} from 'react';
import { Text, View, TextInput, StyleSheet, Button} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as actions from '../actions';

class AddGoals extends Component {
	onAddPress(){
		const {title} = this.props;
		this.props.createNewGoal({title});
		this.props.navigation.navigate('Goals');
	}
  	render(){
    return(
	      <View>
	        <View stlye={styles.form}>
	          <Text>Cél neve</Text>
	          <TextInput 
	          	textInputStyle={styles.fieldStyles} 
	          	value={this.props.title}
	          	onChangeText={value => this.props.formUpdate({prop:'title', value})}
	          	/>
	        </View>
	        <View style={styles.addButton}>
				<Button 
					onPress={this.onAddPress.bind(this)}
					title="Mentés"
					color="blue"
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

const mapStateToProps = state => {
	const {title} = state;
	return {title};
}

export default connect (mapStateToProps, actions)(AddGoals);