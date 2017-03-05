import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Button, DropdownButton, ButtonGroup, MenuItem } from 'react-bootstrap';
import GraphMainScreen from './graphScreen/components/mainScreen';
import graphScreenState from './graphScreen/reducer';

const combinedRedures = combineReducers({
  graphScreenState
});

//this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store: Store<any> = createStore(combinedRedures, composeEnhancers(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <span>
      <h3>Hello from React, Redux and Bootstrap</h3>
      <GraphMainScreen />
    </span>
  </Provider>,
  document.getElementById('app')
);