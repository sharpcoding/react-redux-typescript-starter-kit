import * as _ from 'lodash';
import * as moment from 'moment';
import { handleActions, Action } from 'redux-actions';
import { Point2D } from '../scatterPlotWidget/models';
import { DateTimePoint } from '../linearChart/models/dateTimePoint';

import { EnumSelectedChartType, GraphScreenState } from './model';
import {
  SELECT_CHART,
  CHANGE_MAX_X_AXIS_VALUE,
  CHANGE_MAX_Y_AXIS_VALUE,
  CHANGE_NUMBER_OF_POINTS
} from './actions';

const MAX_X_AXIS_VALUE = 650;
const MAX_Y_AXIS_VALUE = 650;
const NUMBER_OF_POINTS = 50;

const random2DPoints = (maxXAxisValue: number, maxYAxisValue: number, numberOfPoints: number) => {
  return Array.apply(null, {length: numberOfPoints}).map(() => 
    <Point2D>{ x: _.random(maxXAxisValue), y: _.random(maxYAxisValue)});
}

const randomDateTimePoints = (maxYAxisValue: number) => {
  var endDate = moment("2010-05-28");
  var referenceDate = moment("2010-05-01");
  var result = [];
  while (referenceDate.isSameOrBefore(endDate)) {
    result.push(<DateTimePoint>{ time: referenceDate.clone(), value: _.random(maxYAxisValue)});
    referenceDate.add("minutes", 5);
  }
  return result;
}

const initialState: GraphScreenState = <GraphScreenState>{
    chartType: EnumSelectedChartType.Scatter,
    chartTypeToDescriptionMapping: {
        [EnumSelectedChartType.Linear]: "Linear",
        [EnumSelectedChartType.Pie]: "Pie",
        [EnumSelectedChartType.Scatter]: "Scatter"
    },
    maxXAxisValue: MAX_X_AXIS_VALUE,
    maxYAxisValue: MAX_Y_AXIS_VALUE,
    numberOfPoints: NUMBER_OF_POINTS,
    randomArrayOf2DPoints: random2DPoints(MAX_X_AXIS_VALUE, MAX_Y_AXIS_VALUE, NUMBER_OF_POINTS),
    randomArrayOfDateTimePoints: randomDateTimePoints(MAX_Y_AXIS_VALUE)
};

export default handleActions<GraphScreenState, GraphScreenState>({
  /**
   * See that:
   * 1) state is automagically passed from store !
   * 2) action (with payload type of EnumSelectedChartType) is created by action generator
   * 3) chartTypeToDescriptionMapping must be rewritten to the next state object
   */
  [SELECT_CHART]: (state: GraphScreenState, action: Action<EnumSelectedChartType>): GraphScreenState => {
    return {
      chartType: action.payload,
      chartTypeToDescriptionMapping: state.chartTypeToDescriptionMapping, 
      randomArrayOf2DPoints: state.randomArrayOf2DPoints,
      randomArrayOfDateTimePoints: state.randomArrayOfDateTimePoints,
      maxXAxisValue: state.maxXAxisValue,
      maxYAxisValue: state.maxYAxisValue,
      numberOfPoints: state.numberOfPoints
    };
  },

  [CHANGE_MAX_X_AXIS_VALUE]: (state: GraphScreenState, action: Action<number>): GraphScreenState => {
    var subObject = {
      chartType: state.chartType, 
      chartTypeToDescriptionMapping: state.chartTypeToDescriptionMapping,
      maxXAxisValue: action.payload, 
      maxYAxisValue: state.maxYAxisValue, 
      numberOfPoints: state.numberOfPoints,
      randomArrayOfDateTimePoints: state.randomArrayOfDateTimePoints
    };
    return _.extend(subObject, { 
      randomArrayOf2DPoints: random2DPoints(subObject.maxXAxisValue, subObject.maxYAxisValue, subObject.numberOfPoints)
    });
  },

  [CHANGE_MAX_Y_AXIS_VALUE]: (state: GraphScreenState, action: Action<number>): GraphScreenState => {
    var subObject = {
      chartType: state.chartType, 
      chartTypeToDescriptionMapping: state.chartTypeToDescriptionMapping,
      maxXAxisValue: state.maxXAxisValue, 
      maxYAxisValue: action.payload, 
      numberOfPoints: state.numberOfPoints
    };
    return _.extend(subObject, { 
      randomArrayOf2DPoints: random2DPoints(subObject.maxXAxisValue, subObject.maxYAxisValue, subObject.numberOfPoints),
      randomArrayOfDateTimePoints: randomDateTimePoints(subObject.maxYAxisValue)
    })
  },

  [CHANGE_NUMBER_OF_POINTS]: (state: GraphScreenState, action: Action<number>): GraphScreenState => {
    var subObject = {
      chartType: state.chartType, 
      chartTypeToDescriptionMapping: state.chartTypeToDescriptionMapping,
      maxXAxisValue: state.maxXAxisValue, 
      maxYAxisValue: state.maxYAxisValue, 
      numberOfPoints: action.payload,
      randomArrayOfDateTimePoints: state.randomArrayOfDateTimePoints
    };
    return _.extend(subObject, { 
      randomArrayOf2DPoints: random2DPoints(subObject.maxXAxisValue, subObject.maxYAxisValue, subObject.numberOfPoints),
    });
  }
}, initialState);
