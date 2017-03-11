import * as moment from 'moment';
import { createAction, Action } from 'redux-actions';

import { GraphScreenState } from './model';

export const CHANGE_DATE_FROM_VALUE = 'CHANGE_DATE_FROM_VALUE';
export const CHANGE_DATE_TO_VALUE = 'CHANGE_DATE_TO_VALUE';

/**
 * This is a fragment of code that actually transforms call arguments 
 * (used in conjunction with dispatch(actionCall())) to action payload object 
 * (the returned type is the FIRST generic type parameter).
 */

const changeDateFromValue = createAction<moment.Moment, string>(
  CHANGE_DATE_FROM_VALUE,
  (v: string) => moment(v)
);

const changeDateToValue = createAction<moment.Moment, string>(
  CHANGE_DATE_TO_VALUE,
  (v: string) => moment(v)
);

export {
  changeDateFromValue,
  changeDateToValue
}
