import {
  LOAD_LOCAL_DATA_SUCCESS,
  LOAD_LOCAL_DATA_FAILURE,
  SAVE_LOCAL_DATA,
  FORM_UPDATE,
  CREATE_GOAL,
  MARK_GOAL,
  DELETE_GOAL
} from "./constants";

import AsyncStorage from "@react-native-community/async-storage";

const LOCALS_STORAGE = "@goals:locals";

export const loadLocalData = () => async (dispatch, getState) => {
  const value = await AsyncStorage.getItem(`${LOCALS_STORAGE}`);
  if (value !== null) {
    console.log(value);
    dispatch({ type: LOAD_LOCAL_DATA_SUCCESS, goals: JSON.parse(value) });
  } else {
    dispatch({ type: LOAD_LOCAL_DATA_FAILURE, error: "error" });
  }
};

export const saveLocalData = () => async (dispatch, getState) => {
  const goals = getState().data.goals;
  console.log(goals);
  await AsyncStorage.setItem(`${LOCALS_STORAGE}`, JSON.stringify(goals));
  dispatch({ type: SAVE_LOCAL_DATA });
};

export const formUpdate = ({ prop, value }) => {
  return {
    type: FORM_UPDATE,
    payload: { prop, value }
  };
};

export const createGoal = ({ goals, title }) => {
  return dispatch => {
    dispatch({
      type: CREATE_GOAL,
      payload: goals.concat([{ title: title, marked: false }])
    });
    dispatch(saveLocalData());
  };
};

export const markGoal = data => {
  return dispatch => {
    dispatch({
      type: MARK_GOAL,
      data: data
    });
    dispatch(saveLocalData());
  };
};

export const deleteGoal = data => {
	return dispatch => {
		/*remove()
        .then(() => {*/
            dispatch({
				type: DELETE_GOAL,
				data: data
			});
			dispatch(saveLocalData());
        //});
	};
  };
