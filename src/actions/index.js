import {
	LOAD_LOCAL_DATA_SUCCESS,
	LOAD_LOCAL_DATA_FAILURE,
	SAVE_LOCAL_DATA
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
	await AsyncStorage.setItem(`${LOCALS_STORAGE}`, JSON.stringify("title"));
	dispatch({type: SAVE_LOCAL_DATA});
};

