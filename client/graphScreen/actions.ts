import * as moment from 'moment';
import { createAction, Action } from 'redux-actions';

import { GraphScreenState } from './model';

export const CHANGE_DATE_FROM_TO_VALUE = 'CHANGE_DATE_FROM_TO_VALUE';
export const CHANGE_DATE_WINDOW_MINIMAL_WIDTH_MINUTES = 'CHANGE_DATE_WINDOW_MINIMAL_WIDTH_MINUTES';

/**
 * This is a fragment of code that actually transforms call arguments 
 * (used in conjunction with dispatch(actionCall())) to action payload object 
 * (the returned type is the FIRST generic type parameter).
 */

const changeDateFromToValue = createAction<moment.Moment[], string, string>(
  CHANGE_DATE_FROM_TO_VALUE,
  (from: string, to: string) => [moment(from), moment(to)]
);

const changeDateWindowMinimalWidthMinutes = createAction<number, string>(
  CHANGE_DATE_WINDOW_MINIMAL_WIDTH_MINUTES,
  (v: string) => parseInt(v)
);


export {
  changeDateFromToValue,
  changeDateWindowMinimalWidthMinutes
}
