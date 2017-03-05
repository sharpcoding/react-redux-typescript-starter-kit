import { createAction, Action } from 'redux-actions';

import { GraphScreenState, EnumSelectedChartType } from './model';

export const SELECT_CHART = 'SELECT_CHART';

/**
 * This is a fragment of code that actually transforms call arguments 
 * (used in conjuction with dispatch(actionCall())) to action payload object 
 * (the returned type is the FIRST generic type parameter).
 */
const selectChartAction = createAction<EnumSelectedChartType, EnumSelectedChartType>(
  SELECT_CHART,
  (chartType: EnumSelectedChartType) => chartType
);

export {
  selectChartAction
}
