import * as _ from 'lodash';
import * as moment from 'moment';
import { handleActions, Action } from 'redux-actions';
import { GraphScreenState } from './model';
// import { LinearChartState } from '../../components/linearChart/models/linearChartState';
import { EnumChartPointsSelectionMode, EnumZoomSelected } from '../../components/linearChart/common/enums';
import { chartActionLabels } from '../../components/linearChart/common/actions';
import { buildInitialState, reducerFunctions } from '../../components/linearChart/common/reducerFunctions';

export default handleActions<GraphScreenState, GraphScreenState>({
  /**
   * See that:
   * 1) state is automagically passed from store !
   * 2) action (with payload type of moment.Moment) is created by action generator
   */
  [chartActionLabels.SET_WINDOW_DATE_FROM_TO]: (state: GraphScreenState, action: Action<moment.Moment[]>): GraphScreenState => {
    return _.extend({}, state, {
      linearChart: reducerFunctions.setWindowDateFromTo(state.linearChart, action)
    });
  },

  [chartActionLabels.SET_WINDOW_WIDTH_MINUTES]: (state: GraphScreenState, action: Action<number>): GraphScreenState => {
    return _.extend({}, state, {
      linearChart: reducerFunctions.setWindowWidthMinutes(state.linearChart, action)
    });
  },

  [chartActionLabels.SET_CHART_POINTS_SELECTION_MODE]: (state: GraphScreenState, action: Action<EnumChartPointsSelectionMode>): GraphScreenState => {
    return _.extend({}, state, {
      linearChart: reducerFunctions.setChartPointsSelectionMode(state.linearChart, action)
    });
  },

  [chartActionLabels.SET_ZOOM]: (state: GraphScreenState, action: Action<EnumZoomSelected>): GraphScreenState => {
    return _.extend({}, state, {
      linearChart: reducerFunctions.setZoom(state.linearChart, action)
    });  
  }

}, <GraphScreenState>{ linearChart: buildInitialState() });
