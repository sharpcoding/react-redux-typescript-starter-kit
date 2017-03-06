import { createAction, Action } from 'redux-actions';

import { GraphScreenState, EnumSelectedChartType } from './model';

export const SELECT_CHART = 'SELECT_CHART';
export const CHANGE_MAX_X_AXIS_VALUE = 'CHANGE_MAX_X_AXIS_VALUE';
export const CHANGE_MAX_Y_AXIS_VALUE = 'CHANGE_MAX_Y_AXIS_VALUE';
export const CHANGE_NUMBER_OF_POINTS = 'CHANGE_NUMBER_OF_POINTS';

/**
 * This is a fragment of code that actually transforms call arguments 
 * (used in conjunction with dispatch(actionCall())) to action payload object 
 * (the returned type is the FIRST generic type parameter).
 */
const selectChartAction = createAction<EnumSelectedChartType, EnumSelectedChartType>(
  SELECT_CHART,
  (t: EnumSelectedChartType) => t
);

const changeMaxXAxisValue = createAction<number, number>(
  CHANGE_MAX_X_AXIS_VALUE,
  (v: number) => v
);

const changeMaxYAxisValue = createAction<number, number>(
  CHANGE_MAX_Y_AXIS_VALUE,
  (v: number) => v
);

const changeNumbeOfPoints = createAction<number, number>(
  CHANGE_NUMBER_OF_POINTS,
  (v: number) => v
);

export {
  selectChartAction,
  changeMaxXAxisValue,
  changeMaxYAxisValue,
  changeNumbeOfPoints
}
