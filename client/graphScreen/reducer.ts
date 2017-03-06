import * as _ from 'lodash';
import { handleActions, Action } from 'redux-actions';
import { Point2D } from '../scatterPlotWidget/models';

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

const randomDataSet = (maxXAxisValue: number, maxYAxisValue: number, numberOfPoints: number) => {
  return Array.apply(null, {length: numberOfPoints}).map(() => 
    <Point2D>{ x: _.random(maxXAxisValue), y: _.random(maxYAxisValue)});
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
    randomArrayOfPoints: randomDataSet(MAX_X_AXIS_VALUE, MAX_Y_AXIS_VALUE, NUMBER_OF_POINTS)
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
      randomArrayOfPoints: state.randomArrayOfPoints,
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
      numberOfPoints: state.numberOfPoints
    };
    return _.extend(subObject, { randomArrayOfPoints: randomDataSet(subObject.maxXAxisValue, subObject.maxYAxisValue, subObject.numberOfPoints) });
  },

  [CHANGE_MAX_Y_AXIS_VALUE]: (state: GraphScreenState, action: Action<number>): GraphScreenState => {
    var subObject = {
      chartType: state.chartType, 
      chartTypeToDescriptionMapping: state.chartTypeToDescriptionMapping,
      maxXAxisValue: state.maxXAxisValue, 
      maxYAxisValue: action.payload, 
      numberOfPoints: state.numberOfPoints
    };
    return _.extend(subObject, { randomArrayOfPoints: randomDataSet(subObject.maxXAxisValue, subObject.maxYAxisValue, subObject.numberOfPoints) });
  },

  [CHANGE_NUMBER_OF_POINTS]: (state: GraphScreenState, action: Action<number>): GraphScreenState => {
    var subObject = {
      chartType: state.chartType, 
      chartTypeToDescriptionMapping: state.chartTypeToDescriptionMapping,
      maxXAxisValue: state.maxXAxisValue, 
      maxYAxisValue: state.maxYAxisValue, 
      numberOfPoints: action.payload
    };
    return _.extend(subObject, { randomArrayOfPoints: randomDataSet(subObject.maxXAxisValue, subObject.maxYAxisValue, subObject.numberOfPoints) });
  }
}, initialState);
