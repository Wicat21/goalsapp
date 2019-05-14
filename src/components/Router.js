import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Goals from './Goals';
import AddGoals from './AddGoals';
import EditGoal from './EditGoal';

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
			</Scene>
		</Router>
	);
};

export default RouterComponent;