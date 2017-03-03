import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Button, DropdownButton, ButtonGroup, MenuItem } from 'react-bootstrap';
// import App from './main/components/App';
// import rootReducer from './main/reducer';

//this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
// const store: Store<any> = createStore(rootReducer, composeEnhancers(applyMiddleware()));

ReactDOM.render(
  <span>
  <h3>Hello from React and Bootstrap</h3>
  <div>
    <Button bsSize="large">This is a large React-Bootstrap button</Button>
    <ButtonGroup>
      <DropdownButton bsStyle="success" title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
      <Button bsStyle="info">Middle</Button>
      <Button bsStyle="info">Right</Button>
    </ButtonGroup>
  </div>
  </span>,
   document.getElementById('app')
);