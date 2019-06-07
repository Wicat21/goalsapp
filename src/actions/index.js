import {
  LOAD_LOCAL_DATA_SUCCESS,
  LOAD_LOCAL_DATA_FAILURE,
  SAVE_LOCAL_DATA,
  GET_DATE,
  NEW_DATE,
  NEW_WEEK,
  NEW_MONTH,
  FORM_UPDATE,
  CREATE_GOAL,
 	CREATE_WEEK,
	CREATE_MONTH, 
  MARK_GOAL,
  DELETE_GOAL,
  EDIT_GOAL
} from "./constants";

import AsyncStorage from "@react-native-community/async-storage";
import _ from 'lodash';
import { statement } from "@babel/template";

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

export const newDate = ({ currentdate, goalCopy, onedate}) => (dispatch, getState)=> {
  const onedate = getState().data.onedate;
  let idx = Object.keys(onedate).length;
  var newdate = {[idx]:{id:idx, today:currentdate, goals:goalCopy}};
  _.merge(onedate, newdate);
  return dispatch => {
    dispatch({ 
      type: NEW_DATE,
      payload: onedate
    });
    dispatch(saveLocalData());
  };
};

export const newWeek = ({ currentdate, weekCopy, weekly}) => (dispatch, getState)=> {
  const weekly = getState().data.weekly;
  let idw = Object.keys(weekly).length;
  var newweek = {[idw]:{id:idw, today:currentdate, goals:weekCopy}};
  _.merge(weekly, newweek);
  return dispatch => {
    dispatch({ 
      type: NEW_DATE,
      payload: weekly
    });
    dispatch(saveLocalData());
  };
};

export const newMonth = ({ currentdate, monthCopy, monthly}) => (dispatch, getState)=> {
  const monthly = getState().data.monthly;
  let idm = Object.keys(monthly).length;
  var newmonth = {[idm]:{id:idm, first:currentdate, goals:monthCopy}};
  _.merge(monthly, newmonth);
  return dispatch => {
    dispatch({ 
      type: NEW_MONTH,
      payload: monthly
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

export const createGoal = ({ title, onedate }) => {
  let now = Object.keys(onedate).length-1;
  var update = onedate[now].goals.push({ title: title, marked: false });
  _.merge(onedate, update);
  return dispatch => {
    dispatch({
      type: CREATE_GOAL,
      payload:onedate
    });
    dispatch(saveLocalData());
  };
};

export const createWeek = ({ title, weekly }) => {
  let now = Object.keys(weekly).length-1;
  var updateweek = weekly[now].goals.push({ title: title, marked: false });
  _.merge(weekly, updateweek);
  return dispatch => {
    dispatch({
      type: CREATE_WEEK,
      payload:weekly
    });
    dispatch(saveLocalData());
  };
};

export const createMonth = ({ title, monthly }) => {
  let now = Object.keys(monthly).length-1;
  var updatemonth = monthly[now].goals.push({ title: title, marked: false });
  _.merge(monthly, updatemonth);
  return dispatch => {
    dispatch({
      type: CREATE_MONTH,
      payload: monthly
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
      data: data
    });
    dispatch(saveLocalData());
  };
};