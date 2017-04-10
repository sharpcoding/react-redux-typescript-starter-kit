import * as _ from 'lodash';
import * as moment from 'moment';
import { handleActions, Action } from 'redux-actions';
import { DateTimePoint } from '../linearChart/models/dateTimePoint';
import { EnumGraphPointsSelectionMode, EnumSliderWindowZoomLimitationMode } from '../LinearChart/components/enums';

import { GraphScreenState } from './model';
import {
  CHANGE_DATE_FROM_TO_VALUE,
  SETUP_WINDOW_WIDTH_MINUTES,
  SETUP_GRAPH_POINTS_SELECTION_MODE,
  SETUP_ZOOM_WINDOW_LIMITATION
} from './actions';

const SAMPLE_VALUE_MAX = 150;
const DATE_RANGE_MIN_VALUE = moment("2010-03-01");
const DATE_RANGE_MAX_VALUE = moment("2010-09-30"  );
const DATE_WINDOW_FROM_VALUE = moment("2010-05-03");
const DATE_WINDOW_TO_VALUE = moment("2010-05-05");
const SECONDS_PER_SAMPLE = 5*60;
const DATE_WINDOW_MINIMAL_WIDTH_MINUTES = 24*60;

const randomDateTimePoints = () => {
  var referenceDate = DATE_RANGE_MIN_VALUE.clone();  
  var result = [];
  var currentValue = _.random(50, 100);
  var iterationIndex = 0;
  while (referenceDate.isBefore(DATE_RANGE_MAX_VALUE)) {
    result.push(<DateTimePoint>{ time: referenceDate.clone(), unix: referenceDate.unix(), value: currentValue });
    referenceDate.add(SECONDS_PER_SAMPLE, "second");
    var chanceForChangeIndexValue = _.random(0, 100);
    if (_.inRange(chanceForChangeIndexValue, 0, 10)) {
      currentValue += 40 - _.random(0, 80);
    }
    if (_.inRange(chanceForChangeIndexValue, 10, 30)) {
      currentValue += 20 - _.random(0, 40);
    }
    iterationIndex++;
    if (iterationIndex % 50000 == 0) {
      console.log(`Generated for ${referenceDate.format("YYYY-MM-DD HH:mm")}`);
    }
  }
  return result;
};

const buildInitialState = (): GraphScreenState => {
  let dtPoints: Array<DateTimePoint> = randomDateTimePoints();
  return <GraphScreenState>{
    windowDateFrom: DATE_WINDOW_FROM_VALUE.clone(),
    windowDateTo: DATE_WINDOW_TO_VALUE.clone(),
    dateFromToMinimalWidthMinutes: DATE_WINDOW_MINIMAL_WIDTH_MINUTES,
    allPoints: dtPoints,
    allPointsFrom: dtPoints[0].time.clone(),
    allPointsTo: dtPoints[dtPoints.length-1].time.clone(),
    yMinValue: _.min(_.map(dtPoints, el => el.value)),
    yMaxValue: _.max(_.map(dtPoints, el => el.value)),
    secondsPerSample: SECONDS_PER_SAMPLE,
    graphPointsSelectionMode: EnumGraphPointsSelectionMode.NoSelection,
    sliderWindowZoomLimitationMode: EnumSliderWindowZoomLimitationMode.NoZoom
  }
}

const initialState = buildInitialState();

export default handleActions<GraphScreenState, GraphScreenState>({
  /**
   * See that:
   * 1) state is automagically passed from store !
   * 2) action (with payload type of moment.Moment) is created by action generator
   */
  [CHANGE_DATE_FROM_TO_VALUE]: (state: GraphScreenState, action: Action<moment.Moment[]>): GraphScreenState => {
    var dateFrom = action.payload[0].clone();
    var dateTo = action.payload[1].clone();
    if (dateFrom.isBefore(DATE_RANGE_MIN_VALUE)) {
      console.log(`rejecting - ${dateFrom.toDate()} is before date range min value ${DATE_RANGE_MIN_VALUE.toDate()}`);
      return state;
    }
    if (dateTo.isAfter(DATE_RANGE_MAX_VALUE)) {
      console.log(`rejecting - ${dateTo.toDate()} is after date range max value ${DATE_RANGE_MIN_VALUE.toDate()}`);
      return state;
    }
    return _.extend({}, state, {
      windowDateFrom: dateFrom,
      windowDateTo: dateTo
    });
  },

  [SETUP_WINDOW_WIDTH_MINUTES]: (state: GraphScreenState, action: Action<number>): GraphScreenState => {
    return _.extend({}, state, {
      dateFromToMinimalWidthMinutes: action.payload
    }); 
  },

  [SETUP_GRAPH_POINTS_SELECTION_MODE]: (state: GraphScreenState, action: Action<EnumGraphPointsSelectionMode>): GraphScreenState => {
    return _.extend({}, state, {
      graphPointsSelectionMode: action.payload
    });
  },

  [SETUP_ZOOM_WINDOW_LIMITATION]: (state: GraphScreenState, action: Action<EnumSliderWindowZoomLimitationMode>): GraphScreenState => {
    return _.extend({}, state, {
      dateFromToMinimalWidthMinutes: state.dateFromToMinimalWidthMinutes/10,
      sliderWindowZoomLimitationMode: action.payload,
      zoomLevel1PointsFrom: state.windowDateFrom.clone(),
      zoomLevel1PointsTo: state.windowDateTo.clone()
    });
  }

}, initialState);
