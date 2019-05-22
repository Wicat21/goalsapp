import React, {Component} from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {createGoal, formUpdate} from '../actions';
//import Icon from 'react-native-vector-icons/EvilIcons';

class AddGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'ez a title'
    };
	}
	
	/*static navigationOptions = {
		tabBar: {
				label: 'Add Goal',
				icon: ({ tintColor }) => (
					<Icon
							name={'plus'}
							size={50} 
							style={{ color: tintColor }}
					/>
			)
		}
	}*/

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
          <TouchableOpacity onPress={this.onAddPress.bind(this)} stlye={styles.button}>
            <Text>Mentés</Text>
          </TouchableOpacity>
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
		borderColor: '#3c4f76'
	},
	addButton: {
		marginTop: 20
	},
	button: {
		color: '#3c4f76',
		height: 50,
		justifyContent: 'center',
		alignContent: 'center',
		borderRadius: 10,
		borderColor: 'white'
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