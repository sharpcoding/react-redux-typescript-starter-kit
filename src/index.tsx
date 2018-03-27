import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../assets/scss/styles.scss';
import { BubbleChartScreen } from '@screens/bubble-chart-screen';
import { store } from '@store/store-creator';

ReactDOM.render(
  <Provider store={store}>
    <span>
      <h3>Hello from React, Redux, Typescript and d3</h3>
      <BubbleChartScreen />
    </span>
  </Provider>,
  document.body.appendChild(document.createElement('div')),
);