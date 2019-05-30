import {
  LOAD_LOCAL_DATA_SUCCESS,
  LOAD_LOCAL_DATA_FAILURE,
  SAVE_LOCAL_DATA,
  GET_DATE,
  NEW_DATE,
  FORM_UPDATE,
  CREATE_GOAL,
  MARK_GOAL,
  DELETE_GOAL,
  EDIT_GOAL
} from "./constants";

import AsyncStorage from "@react-native-community/async-storage";

const LOCALS_STORAGE = "@goals:locals";

export const loadLocalData = () => async (dispatch, getState) => {
  const value = await AsyncStorage.getItem(`${LOCALS_STORAGE}`);
  if (value !== null) {
    console.log(value);
    dispatch({ type: LOAD_LOCAL_DATA_SUCCESS, onedate: JSON.parse(value) });
  } else {
    dispatch({ type: LOAD_LOCAL_DATA_FAILURE, error: "error" });
  }
};

export const saveLocalData = () => async (dispatch, getState) => {
  const onedate = getState().data.onedate;
  console.log(onedate);
  await AsyncStorage.setItem(`${LOCALS_STORAGE}`, JSON.stringify(onedate));
  dispatch({ type: SAVE_LOCAL_DATA });
};

export const newDate = ({onedate, currentdate, goalCopy}) => {
  return dispatch => {
    dispatch({ 
      type: NEW_DATE,
      payload: onedate.concat([{today:currentdate, goals:goalCopy }])
    });
    dispatch(saveLocalData());
  };
};

export const formUpdate = ({ prop, value }) => {
  return {
    type: FORM_UPDATE,
    payload: { prop, value }
  };
};

export const createGoal = ({ lastGoal, title }) => {
  return dispatch => {
    dispatch({
      type: CREATE_GOAL,
      payload: lastGoal.concat([{ title: title, marked: false }]),
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
      dispatch({
				type: DELETE_GOAL,
				data: data
			});
			dispatch(saveLocalData());
	};
};

export const editGoal = data => {
  return dispatch => {
    dispatch({
      type: EDIT_GOAL,
      title: newtitle
    });
    dispatch(saveLocalData());
  };
};