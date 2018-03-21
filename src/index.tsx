import '../assets/scss/styles.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RandomDotsChartScreen } from './screens/random-dots-chart-screen';
import { store } from './store/store-creator';

ReactDOM.render(
  <Provider store={store}>
    <span>
      <h3>Hello from React, Redux, D3 and Bootstrap</h3>
      <RandomDotsChartScreen />
    </span>
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);