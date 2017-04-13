/**
 * Declares reusable actions that can be used by screen using this compontent  
 */
import * as moment from 'moment';
import { createAction } from 'redux-actions';

import { EnumChartPointsSelectionMode, EnumZoomSelected } from './enums';

export const chartActionLabels = {
  SET_WINDOW_DATE_FROM_TO: 'SET_WINDOW_DATE_FROM_TO',
  SET_WINDOW_WIDTH_MINUTES: 'SET_WINDOW_WIDTH_MINUTES',
  SET_CHART_POINTS_SELECTION_MODE: 'SET_CHART_POINTS_SELECTION_MODE',
  SET_ZOOM: 'SET_ZOOM'
} 


/**
 * This fragment of code that actually transforms call arguments 
 * (used in conjunction with dispatch(actionCall())) to action payload object 
 * (the returned type is the FIRST generic type parameter).
 */
export const chartActions = {
  setWindowDateFromTo: createAction<moment.Moment[], string, string>(
    chartActionLabels.SET_WINDOW_DATE_FROM_TO,
    (from: string, to: string) => [moment(from), moment(to)]
  ),
  setWindowWidthMinutes: createAction<number, number>(
    chartActionLabels.SET_WINDOW_WIDTH_MINUTES,
    (v: number) => v
  ),
  setGraphPointsSelectionMode: createAction<EnumChartPointsSelectionMode, EnumChartPointsSelectionMode>(
    chartActionLabels.SET_CHART_POINTS_SELECTION_MODE,
    (v: EnumChartPointsSelectionMode) => v
  ),
  setZoomWindowLimitation: createAction<EnumZoomSelected, EnumZoomSelected>(
    chartActionLabels.SET_ZOOM,
    (v: EnumZoomSelected) => v
  )
}
