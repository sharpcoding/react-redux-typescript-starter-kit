import './css/app.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// import './styles.scss';
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import thunk from 'redux-thunk';
// import { hpTimeSeriesChartCsvLoadingActionCreators } from '../hp-time-series-chart/csv-loading/action-creators';
// import { HashRouter, Route } from 'react-router-dom';
// import { Store, createStore, compose, applyMiddleware, combineReducers } from 'redux';
// import { Provider } from 'react-redux';
// import { HpTimeSeriesChart } from '../hp-time-series-chart';
// import { GraphScreen } from './demo-container';
// import { storeCreator } from './demo-container/store-creator';

// const combinedReducers = combineReducers({
//   chartState: storeCreator
// });

// //this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
// const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
// const store: Store<any> = createStore(combinedReducers, composeEnhancers(), applyMiddleware(thunk));

// ReactDOM.render(
//   <Provider store={store}>
//     <div>
//       <GraphScreen />
//     </div>
//   </Provider>,
//   document.body.appendChild(document.createElement('div'))
// );

const combinedReducers = combineReducers({
  // graphScreenState
});

//this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store: Store<any> = createStore(combinedReducers, composeEnhancers(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <span>
      <h3>Hello from React, Redux, D3 and Bootstrap</h3>
      {/* <GraphMainScreen /> */}
    </span>
  </Provider>,
  document.getElementById('app')
);