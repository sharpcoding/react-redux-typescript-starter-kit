import * as _ from "lodash";
import * as blueScreenActionTypes from "./action-types";
import { IRandomDotsScreenState } from "./state";
import { SetWidthAction, SetHeightAction, SetTextAction } from "./actions";

const initialState: IRandomDotsScreenState = { width: 800, height: 600, color: 'lightblue' }

export type RandomDotsScreenReducerActionTypes = SetWidthAction|SetHeightAction|SetTextAction;

// Typescript's discriminated unions (see https://www.typescriptlang.org/docs/handbook/advanced-types.html) 
// are used here to write reducer logic in a streamlined way.

// Yeah, this is really cool, yet comes with a small price to pay, namely: action objects are defined as classes !
// Returning new Action(arg1, arg2, ..., argN) in an action-creator would return non-plain objects to the Redux store,
// causing a run-time exception / error.
// So - the price - we need to call lodash _.toPlainObject() in action-creators to convert complex JavaScript object to plain object.

export const randomDotsScreenReducer = (state: IRandomDotsScreenState = initialState, action: RandomDotsScreenReducerActionTypes): IRandomDotsScreenState => {
  switch (action.type) {
    case blueScreenActionTypes.BLUE_SCR_SET_WIDTH:
      return <IRandomDotsScreenState> { ...state, width: action.width };
    case blueScreenActionTypes.BLUE_SCR_SET_HEIGHT:
      return <IRandomDotsScreenState> { ...state, height: action.height };
    case blueScreenActionTypes.BLUE_SCR_SET_TEXT:
      return <IRandomDotsScreenState> { ...state, text: action.text };
    default:
      return state;
  }
}