import {
	LOAD_LOCAL_DATA_SUCCESS,
	LOAD_LOCAL_DATA_FAILURE,
	SAVE_LOCAL_DATA
} from '../actions/constants';

const localDataExample = {
	title: "Első cél"
}

export default (state=localDataExample, action) => {
	switch (action.type) {
		case LOAD_LOCAL_DATA_SUCCESS:
			return action.data;
		case LOAD_LOCAL_DATA_FAILURE:
			return action.error;
		case SAVE_LOCAL_DATA:
			return {
				...state
			};
		default:
			return state;
	}
}