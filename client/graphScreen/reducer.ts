import * as _ from 'lodash';
import { handleActions, Action } from 'redux-actions';
import { Point2D } from './model';

import { EnumSelectedChartType, GraphScreenState } from './model';
import {
  SELECT_CHART,
  RANDOMIZE_DATA
} from './actions';


//TODO: move this section to a module !
const numDataPoints = 50;
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => <Point2D>{ x: _.random(500), y: _.random(500)});
}

const initialState: GraphScreenState = <GraphScreenState>{
    chartType: EnumSelectedChartType.Linear,
    chartTypeToDescriptionMapping: {
        [EnumSelectedChartType.Linear]: "Linear",
        [EnumSelectedChartType.Pie]: "Pie"
    },
    randomArrayOfPoints: randomDataSet()
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
      randomArrayOfPoints: randomDataSet()
    };
  },

  [RANDOMIZE_DATA]: (state: GraphScreenState, action: Action<void>): GraphScreenState => {
    return { 
      chartType: state.chartType, 
      chartTypeToDescriptionMapping: state.chartTypeToDescriptionMapping, 
      randomArrayOfPoints: randomDataSet()
    };
  }
}, initialState);
