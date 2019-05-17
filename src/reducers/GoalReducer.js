import {
	LOAD_LOCAL_DATA_SUCCESS,
	LOAD_LOCAL_DATA_FAILURE,
	SAVE_LOCAL_DATA, 
	FORM_UPDATE,
	CREATE_GOAL
} from '../actions/constants';

const localDataExample = {
	title: "Első cél",
	errorMessage:"error",
	goals: [{title:"Hah"}]
}

export const data = (state = localDataExample, action) => {
	switch (action.type) {
		case LOAD_LOCAL_DATA_SUCCESS:
			console.log("load data")
			return {...state,
		        title: action.title
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
        goals: [...state.goals, action.goals.title]
			}					
		default:
			return state;
	}
}