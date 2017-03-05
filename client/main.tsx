import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Button, DropdownButton, ButtonGroup, MenuItem } from 'react-bootstrap';
import { MainScreen as GraphMainScreen } from './graphScreen/components/mainScreen';
// import App from './main/components/App';
// import rootReducer from './main/reducer';

//this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
// const store: Store<any> = createStore(rootReducer, composeEnhancers(applyMiddleware()));

ReactDOM.render(
  <span>
  <h3>Hello from React and Bootstrap</h3>
  <GraphMainScreen selectedGraph={null} dispatch={null} />
  </span>,
   document.getElementById('app')
);