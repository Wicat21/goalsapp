import {
	LOAD_LOCAL_DATA_SUCCESS,
	LOAD_LOCAL_DATA_FAILURE,
	SAVE_LOCAL_DATA, 
	FORM_UPDATE,
	CREATE_GOAL,
	MARK_GOAL,
	DELETE_GOAL,
	EDIT_GOAL
} from '../actions/constants';

const localDataExample = {
	errorMessage:"error",
	goals: [{ title:"Hah", marked: false}]
}

export const data = (state = localDataExample, action) => {
	switch (action.type) {
		case LOAD_LOCAL_DATA_SUCCESS:
			console.log("load data")
			return {...state,
						goals: action.goals
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
		case FORM_UPDATE:
			return {
				...state,
				[action.payload.prop]:action.payload.value
			}
		case CREATE_GOAL:
			return {
				...state,
				goals: action.payload
			}		
		case MARK_GOAL:
			return {
				...state,
				goals: action.data
			}		
		case DELETE_GOAL:
				return {
					...state,
					goals: action.data
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