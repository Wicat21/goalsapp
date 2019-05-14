import React, {Component} from 'react';
import { View, StyleSheet} from 'react-native';
import RouterComponent from './src/components/Router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/store/index';

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <RouterComponent/>
      </Provider>
    );
  }
}


