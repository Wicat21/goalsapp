import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Goals from './Goals';
import AddGoals from './AddGoals';
import EditGoal from './EditGoal';
import Calendar from './Calendar';
//import { StackNavigator, TabNavigator} from 'react-navigation';

/*const RouterComponent = TabNavigator({
    Goals: { screen: Goals },
    AddGoals: { screen: AddGoals },
    Calendar: { screen: Calendar },
}, {
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#80cbc4',
        swipeEnabled: true,
        showLabel: false,
        style: {
            backgroundColor: '#26a69a',
        },
    },
});*/


const RouterComponent = () => {
	return (
		<Router hideNavBar>
			<Scene key="root">
					<Scene 
						key="Goals" 
						component={Goals} 
						title="Goals"
						initial
						hideNavBar={true}
					/>
					<Scene 
						key="AddGoals" 
						onLeft={() => Actions.List()}
						component={AddGoals} 
						title="Add a new goal"
						hideNavBar={true}
					/>
					<Scene 
						key="EditGoal" 
						component={EditGoal} 
						title="Edit goal"
						hideNavBar={true}
					/>
					<Scene 
						key="Calendar" 
						component={Calendar} 
						title="Edit goal"
						hideNavBar={true}
					/>
			</Scene>
		</Router>
	);
};

export default RouterComponent;