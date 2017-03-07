import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import GraphMainScreen from './graphScreen';
import graphScreenState from './graphScreen/reducer';

const combinedReducers = combineReducers({
  graphScreenState
});

//this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store: Store<any> = createStore(combinedReducers, composeEnhancers(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <span>
      <h3>Hello from React, Redux, D3 and Bootstrap</h3>
      <GraphMainScreen />
    </span>
  </Provider>,
  document.getElementById('app')
);