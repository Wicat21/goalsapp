import {
  LOAD_LOCAL_DATA_SUCCESS,
  LOAD_LOCAL_DATA_FAILURE,
  SAVE_LOCAL_DATA,
  NEW_DATE,
  NEW_WEEK,
  NEW_MONTH,
  FORM_UPDATE,
  CREATE_GOAL,
  CREATE_WEEK,
  CREATE_MONTH,
  MARK_GOAL,
  MARK_ALL,
  DELETE_GOAL,
  EDIT_GOAL
} from "./constants";

import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import { statement } from "@babel/template";

const LOCALS_STORAGE = "@goals:locals";

export const loadLocalData = () => async (dispatch, getState) => {
  const value = await AsyncStorage.getItem(`${LOCALS_STORAGE}`);
  if (value !== null) {
    console.log(value);
    dispatch({ type: LOAD_LOCAL_DATA_SUCCESS, data: JSON.parse(value) });
  } else {
    dispatch(newDate());
    dispatch(newWeek());
    dispatch(newMonth());
    dispatch({ type: LOAD_LOCAL_DATA_FAILURE, error: "error" });
  }
};

export const saveLocalData = () => async (dispatch, getState) => {
  const data = getState().data;
  AsyncStorage.setItem(`${LOCALS_STORAGE}`, JSON.stringify(data));
  dispatch({ type: SAVE_LOCAL_DATA });
};

export const newDate = () => (
  dispatch,
  getState
) => {
  const onedate = getState().data.onedate;
  var date = new Date().getDate();
  if (date <= 9) date = "0" + date;
  var month = new Date().getMonth() + 1;
  if (month <= 9) month = "0" + month;
  var year = new Date().getFullYear();
  const currentdate = year + "-" + month + "-" + date;
  const last = onedate[Object.keys(onedate).length - 1];
  const goalCopy = onedate[
    Object.keys(onedate).length - 1
  ].goals.slice();
  let idx = Object.keys(onedate).length;
  var newdate = {
    [idx]: { id: idx, today: currentdate, allmarked: false, goals: goalCopy }
  };
  _.merge(onedate, newdate);
  if (last.today != currentdate) {
      dispatch({
        type: NEW_DATE,
        payload: onedate
      });
      dispatch(saveLocalData());
  }
};

export const newWeek = () => (
  dispatch,
  getState
) => {
  const weekly = getState().data.weekly;
  var weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var date = new Date().getDate();
  if (date <= 9) date = "0" + date;
  var month = new Date().getMonth() + 1;
  if (month <= 9) month = "0" + month;
  var year = new Date().getFullYear();
  const currentdate = year + "-" + month + "-" + date;
  
  var day = new Date().getDay();
  const weekday = weekdays[day];
  console.log(weekday);
  //const weekly = this.props.data.weekly;
  const weekCopy = weekly[
    Object.keys(weekly).length - 1
  ].goals.slice();
  let idw = Object.keys(weekly).length;
  var newweek = {
    [idw]: { id: idw, monday: currentdate, allmarked: false, goals: weekCopy }
  };
  _.merge(weekly, newweek);
  if (weekday == "Monday") {
    dispatch({
      type: NEW_WEEK,
      payload: weekly
    });
    dispatch(saveLocalData());
  }
};

export const newMonth = () => (
  dispatch,
  getState
) => {
  const monthly = getState().data.monthly;
  var month = new Date().getMonth() + 1;
  if (month <= 9) month = "0" + month;
  var year = new Date().getFullYear();
  const currentmonth = year + "-" + month;
  //const monthly = this.props.data.monthly;
  const monthCopy = monthly[
    Object.keys(monthly).length - 1
  ].goals.slice();
  const monthnow = monthly[Object.keys(monthly).length - 1]
    .first;
  const lastmonth = monthnow.substring(0, 7);
  const firstmonth = currentmonth + "-01";
  let idm = Object.keys(monthly).length;
  var newmonth = {
    [idm]: { id: idm, first: firstmonth, allmarked: false, goals: monthCopy }
  };
  _.merge(monthly, newmonth);
  if (lastmonth != currentmonth) {
    dispatch({
      type: NEW_MONTH,
      payload: monthly
    });
    dispatch(saveLocalData());
  }
};

export const formUpdate = ({ prop, value }) => {
  return {
    type: FORM_UPDATE,
    payload: { prop, value }
  };
};

export const createGoal = ({ title, onedate }) => {
  let now = Object.keys(onedate).length - 1;
  var update = onedate[now].goals.push({ title: title, marked: false });
  _.merge(onedate, update);
  return dispatch => {
    dispatch({
      type: CREATE_GOAL,
      payload: onedate
    });
    dispatch(saveLocalData());
  };
};

export const createWeek = ({ title, weekly }) => {
  let now = Object.keys(weekly).length - 1;
  var updateweek = weekly[now].goals.push({ title: title, marked: false });
  _.merge(weekly, updateweek);
  return dispatch => {
    dispatch({
      type: CREATE_WEEK,
      payload: weekly
    });
    dispatch(saveLocalData());
  };
};

export const createMonth = ({ title, monthly }) => {
  let now = Object.keys(monthly).length - 1;
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

/*export const markAll = ({onedate}) => {
  let now = Object.keys(onedate).length-1;
  if (onedate[now].goals.filter(element => element.marked = false).length >0) {
    this.setState({onedate[now].allmarked = false})
  } else {
    this.setState({onedate[now].allmarked = true})
  }
  
  /*var update = if (onedate[now].goals
      .filter(function(element) {
        if (element.marked = true) {
          return true;
        }
        return false;
      })
      .length > 0) {
    return (this.setState({onedate[now].allmarked = true}));
  } else {
  return (this.setState({onedate[now].allmarked = false}))
  }
  _.merge(onedate, update);
  
  return dispatch => {
    dispatch({
      type: MARK_ALL,
      payload: onedate
    });
    dispatch(saveLocalData());
  };
};*/

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
