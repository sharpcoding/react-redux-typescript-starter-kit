import { createAction, Action } from 'redux-actions';

import { GraphScreenState, EnumSelectedChartType } from './model';

export const SELECT_CHART = 'SELECT_CHART';
export const RANDOMIZE_DATA = 'RANDOMIZE_DATA';

/**
 * This is a fragment of code that actually transforms call arguments 
 * (used in conjunction with dispatch(actionCall())) to action payload object 
 * (the returned type is the FIRST generic type parameter).
 */
const selectChartAction = createAction<EnumSelectedChartType, EnumSelectedChartType>(
  SELECT_CHART,
  (chartType: EnumSelectedChartType) => chartType
);

const randomizeDataAction = createAction<void>(
  RANDOMIZE_DATA,
  () => {}
);

export {
  selectChartAction,
  randomizeDataAction
}
