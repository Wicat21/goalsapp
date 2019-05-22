import React, {Component} from 'react';
import { View, StyleSheet} from 'react-native';
//import Navigation from './src/components/Navigation';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/store/index';
//import {createAppContainer } from 'react-navigation';
import RouterComponent from './src/components/Router';

const middlewares = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/*const AppContainer = createAppContainer(Navigation)
<AppContainer/>*/

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <RouterComponent/>
      </Provider>
    );
  }
};


