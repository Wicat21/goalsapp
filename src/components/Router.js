import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Goals from './Goals';
import AddGoals from './AddGoals';
import CalendarScene from './CalendarScene';

const RouterComponent = () => {
	return (
		<Router hideNavBar>
			<Scene key="root" tabs={true}>
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
						key="Calendar" 
						component={CalendarScene} 
						title="Calendar"
						hideNavBar={true}
					/>
			</Scene>
		</Router>
	);
};

export default RouterComponent;