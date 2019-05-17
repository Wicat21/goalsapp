import {
	LOAD_LOCAL_DATA_SUCCESS,
	LOAD_LOCAL_DATA_FAILURE,
	SAVE_LOCAL_DATA,
	FORM_UPDATE,
	CREATE_GOAL
} from './constants';

import AsyncStorage from '@react-native-community/async-storage';

const LOCALS_STORAGE = '@goals:locals';

export const loadLocalData = () => async (dispatch, getState) => {
		const value = await AsyncStorage.getItem(`${LOCALS_STORAGE}`);
		if (value !== null) {
			console.log(value)
			dispatch({type: LOAD_LOCAL_DATA_SUCCESS, title: JSON.parse(value)});
		} else {
		dispatch({type:LOAD_LOCAL_DATA_FAILURE, error: "error"})
		}
};

export const saveLocalData = () => async (dispatch, getState) => {
	/*const {
		title,
	} = getState();*/
	await AsyncStorage.setItem(`${LOCALS_STORAGE}`, JSON.stringify(this.props.data.goals));
	dispatch({type: SAVE_LOCAL_DATA});
};

export const formUpdate = ({prop, value}) => {
	return {
		type: FORM_UPDATE,
		payload: {prop,value},
	};
};

export const createGoal = (dispatch, title) => {
	dispatch({
		type: CREATE_GOAL,
		payload: title
	});
};