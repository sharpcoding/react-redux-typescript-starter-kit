import * as _ from 'lodash';
import * as blueScreenActionTypes from './action-types';
import { BubblePointsGenerationStartedAction, BubblePointsGenerationSucceededAction, SetHeightAction, SetWidthAction } from './actions';
import { IBubbleChartScreenState } from './state';

const initialState: IBubbleChartScreenState = { width: 800, height: 600, backgroundColor: 'lightblue', bubblePoints: [] };

export type BubbleChartReducerActionTypes = SetWidthAction|SetHeightAction|BubblePointsGenerationStartedAction|BubblePointsGenerationSucceededAction;

// Typescript's discriminated unions (see https://www.typescriptlang.org/docs/handbook/advanced-types.html)
// are used here to write reducer logic in a streamlined way.

// Yeah, this is really cool, yet comes with a small price to pay, namely: action objects are defined as classes !
// Returning new Action(arg1, arg2, ..., argN) in an action-creator would return non-plain objects to the Redux store,
// causing a run-time exception / error.
// So - the price - we need to call lodash _.toPlainObject() in action-creators to convert complex JavaScript object to plain object.

export const bubbleChartScreenReducer = (state: IBubbleChartScreenState = initialState, action: BubbleChartReducerActionTypes): IBubbleChartScreenState => {
  switch (action.type) {
    case blueScreenActionTypes.BUBBLE_CHART_SCR_SET_WIDTH:
      return { ...state, width: action.width } as IBubbleChartScreenState;
    case blueScreenActionTypes.BUBBLE_CHART_SCR_SET_HEIGHT:
      return { ...state, height: action.height } as IBubbleChartScreenState;
    case blueScreenActionTypes.BUBBLE_CHART_SCR_POINTS_GENERATION_STARTED:
      return { ...state, bubblePoints: [] } as IBubbleChartScreenState;
    case blueScreenActionTypes.BUBBLE_CHART_SCR_POINTS_GENERATION_SUCCEEED:
      return { ...state, bubblePoints: action.bubblePoints } as IBubbleChartScreenState;
    default:
      return state;
  }
};