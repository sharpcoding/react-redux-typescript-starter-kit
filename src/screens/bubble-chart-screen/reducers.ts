import * as _ from 'lodash';
import * as blueScreenActionTypes from './action-types';
import { BubblePointsGenerationStartedAction, BubblePointsGenerationSucceededAction, SetHeightAction, SetWidthAction } from './actions';
import { IRandomDotsScreenState } from './state';

const initialState: IRandomDotsScreenState = { width: 800, height: 600, backgroundColor: 'lightblue', bubblePoints: [] };

export type RandomDotsScreenReducerActionTypes = SetWidthAction|SetHeightAction|BubblePointsGenerationStartedAction|BubblePointsGenerationSucceededAction;

// Typescript's discriminated unions (see https://www.typescriptlang.org/docs/handbook/advanced-types.html)
// are used here to write reducer logic in a streamlined way.

// Yeah, this is really cool, yet comes with a small price to pay, namely: action objects are defined as classes !
// Returning new Action(arg1, arg2, ..., argN) in an action-creator would return non-plain objects to the Redux store,
// causing a run-time exception / error.
// So - the price - we need to call lodash _.toPlainObject() in action-creators to convert complex JavaScript object to plain object.

export const randomDotsScreenReducer = (state: IRandomDotsScreenState = initialState, action: RandomDotsScreenReducerActionTypes): IRandomDotsScreenState => {
  switch (action.type) {
    case blueScreenActionTypes.BUBBLE_CHART_SCR_SET_WIDTH:
      return { ...state, width: action.width } as IRandomDotsScreenState;
    case blueScreenActionTypes.BUBBLE_CHART_SCR_SET_HEIGHT:
      return { ...state, height: action.height } as IRandomDotsScreenState;
    case blueScreenActionTypes.BUBBLE_CHART_SCR_POINTS_GENERATION_STARTED:
      return { ...state, bubblePoints: [] } as IRandomDotsScreenState;
    case blueScreenActionTypes.BUBBLE_CHART_SCR_POINTS_GENERATION_SUCCEEED:
      return { ...state, bubblePoints: action.bubblePoints } as IRandomDotsScreenState;
    default:
      return state;
  }
};