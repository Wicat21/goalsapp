import React from 'react';
import {Text, View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';

const GoalItem = (props) => {
	return (
		<View style={styles.card}>
			<Text>{this.props.title}</Text> 
			<TouchableWithoutFeedback onPress={()=> console.log('hey')}>
				<Text>Kész</Text>
			</TouchableWithoutFeedback>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		marginTop: 20,
		height: 100,
		backgroundColor: 'red',
	},
	title: {
		top: 20,
		left: 80,
		fontSize: 24,
	},
	image: {
		height: 100
	},
	action: {
		backgroundColor: 'black',
		color: 'white'
	},
	icon: {
		position: 'absolute',
		top: 15,
		left: 0,
		color: 'white',
		backgroundColor: 'rgba(255,255,255,0)',
	},
});

export default GoalItem;