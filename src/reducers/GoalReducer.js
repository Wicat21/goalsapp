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
			return {
				...state,
				onedate: action.payload
			}		
		case MARK_GOAL:
			return {
				...state,
				goals: action.payload
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