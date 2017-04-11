import * as moment from 'moment';
import { createAction, Action } from 'redux-actions';

import { EnumGraphPointsSelectionMode, EnumZoomSelected } from '../LinearChart/components/enums';
import { GraphScreenState } from './model';

export const CHANGE_DATE_FROM_TO_VALUE = 'CHANGE_DATE_FROM_TO_VALUE';
export const SETUP_WINDOW_WIDTH_MINUTES = 'SETUP_WINDOW_WIDTH_MINUTES';
export const SETUP_GRAPH_POINTS_SELECTION_MODE = 'SETUP_GRAPH_POINTS_SELECTION_MODE';
export const SETUP_ZOOM_WINDOW_LIMITATION = 'SETUP_ZOOM_WINDOW_LIMITATION';

/**
 * This is a fragment of code that actually transforms call arguments 
 * (used in conjunction with dispatch(actionCall())) to action payload object 
 * (the returned type is the FIRST generic type parameter).
 */

const changeDateFromToValue = createAction<moment.Moment[], string, string>(
  CHANGE_DATE_FROM_TO_VALUE,
  (from: string, to: string) => [moment(from), moment(to)]
);

const setupWindowWidthMinutes = createAction<number, number>(
  SETUP_WINDOW_WIDTH_MINUTES,
  (v: number) => v
);

const setupGraphPointsSelectionMode = createAction<EnumGraphPointsSelectionMode, EnumGraphPointsSelectionMode>(
  SETUP_GRAPH_POINTS_SELECTION_MODE,
  (v: EnumGraphPointsSelectionMode) => v
);

const setupZoomWindowLimitation = createAction<EnumZoomSelected, EnumZoomSelected>(
  SETUP_ZOOM_WINDOW_LIMITATION,
  (v: EnumZoomSelected) => v
);


export {
  changeDateFromToValue,
  setupWindowWidthMinutes,
  setupGraphPointsSelectionMode,
  setupZoomWindowLimitation
}
