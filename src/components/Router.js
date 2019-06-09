import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Goals from './Goals';
import AddGoals from './AddGoals';
import EditGoal from './EditGoal';
import CalendarScene from './CalendarScene';
import Settings from './Settings';
import Icon from 'react-native-vector-icons/EvilIcons';

const RouterComponent = () => {
	return (
		<Router hideNavBar>
			<Scene key="root" hideNavBar>
				<Scene tabs={true}>
					<Scene 
						key="Goals" 
						component={Goals} 
						title="Goals"
						initial
						hideNavBar={true}
						icon={({ focused }) => (
							<Icon
								size={30}
								color={focused ? 'orange' : 'blue'}
								name={`navicon`}
								textStyle={focused ? styles.activeLabel : styles.label}
							/>
						)}
					>
					</Scene>
					<Scene 
						key="AddGoals" 
						component={AddGoals} 
						title="Add a new goal"
						hideNavBar={true}
						icon={({ focused }) => (
							<Icon
								size={40}
								color={focused ? 'orange' : 'blue'}
								name={`plus`}
								textStyle={focused ? styles.activeLabel : styles.label}
							/>
						)}
					/>
					<Scene 
						key="Calendar" 
						component={CalendarScene} 
						title="Feedback"
						hideNavBar={true}
						icon={({ focused }) => (
							<Icon
								size={30}
								color={focused ? 'orange' : 'blue'}
								name={`calendar`}
								textStyle={focused ? styles.activeLabel : styles.label}
							/>
						)}
					/>
				</Scene>
				<Scene 
					key="EditGoal"
					component={EditGoal}
					hideNavBar={true}
				/>
			<Scene 
					key="Settings"
					component={Settings}
					hideNavBar={true}
				/>
			</Scene>
		</Router>
	);
};

const styles = {
	activeLabel: {
		color: 'orange'
	},
	label: {
		color: 'blue'
	}
}

export default RouterComponent;