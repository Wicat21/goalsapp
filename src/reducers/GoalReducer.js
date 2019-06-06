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
} from '../actions/constants';

const localDataExample = {
	errorMessage:"error",
	onedate:{'0':{id:0, today:"2019-05-23", goals: [{ title:"Napi cél", marked: false}]}},
	weekly:[{monday:"2019-05-27", goals: [{ title:"Heti cél", marked: false}]}],
	monthly:[{first:"2019-05-01", goals: [{ title:"Havi cél", marked: false}]}]
}

export const data = (state = localDataExample, action) => {
	switch (action.type) {
		case LOAD_LOCAL_DATA_SUCCESS:
			console.log("load data")
			return {...state,
						data: action.data
		      };
		case LOAD_LOCAL_DATA_FAILURE:
			return {...state,
	        errorMessage: action.error
	      };
		case SAVE_LOCAL_DATA:
			console.log("save data")
			return {
				...state
			};
		case NEW_DATE:
			return {
					...state,
					onedate: action.payload
			}	
		case FORM_UPDATE:
			return {
				...state,
				[action.payload.prop]:action.payload.value
			}
		case CREATE_GOAL:
			let idy = Object.keys(onedate).length-1;	
			return {
				...state,
				//onedate: [...state.last, {goals:action.payload}]
				//onedate: [...state.onedate, {onedate[onedate.length - 1].goals:action.payload}]
				//onedate: [...state.onedate, {goals:action.payload}]
				//onedate: [...state.onedate, goals:action.payload]
				//onedate: [...state.onedate[onedate.length - 1], goals:action.payload]
				//onedate['1']: {goals:action.payload}
				//onedate: {...state.onedate, '1':{...state.today, goals:[...state.goals, {title:action.title, marked:false}]}}
				//onedate: {...state.onedate, goals:action.payload}
				onedate: {...state.onedate, idx:{...state.onedate[idy], goals:action.payload}}
				//goals: action.payload
				//goals: {...state.last, lastGoal: action.payload}
			}		
		case MARK_GOAL:
			return {
				...state,
				goals: action.payload
			}		
		case DELETE_GOAL:
				return {
					...state,
					onedate: {...state.onedate, goals: action.data}
				}		
		case EDIT_GOAL:
				return {
					...state,
					title: newtitle
				}						
		default:
			return state;
	}
}