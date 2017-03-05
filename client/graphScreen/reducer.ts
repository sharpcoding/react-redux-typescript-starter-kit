import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { EnumSelectedChartType, GraphScreenState } from './model';
import {
  SELECT_CHART
} from './actions';

const initialState: GraphScreenState = <GraphScreenState>{
    chartType: EnumSelectedChartType.Linear,
    chartTypeToDescriptionMapping: {
        [EnumSelectedChartType.Linear]: "Linear",
        [EnumSelectedChartType.Pie]: "Pie"
    }
};

export default handleActions<GraphScreenState, GraphScreenState>({
  /**
   * See that:
   * 1) state is automagically passed from store !
   * 2) action (with payload type of EnumSelectedChartType) is created by action generator
   * 3) chartTypeToDescriptionMapping must be rewritten to the next state object
   */
  [SELECT_CHART]: (state: GraphScreenState, action: Action<EnumSelectedChartType>): GraphScreenState => {
    return { chartType: action.payload, chartTypeToDescriptionMapping: state.chartTypeToDescriptionMapping };
  }
}, initialState);
