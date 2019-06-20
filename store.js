import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/store/index';

const middlewares = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;