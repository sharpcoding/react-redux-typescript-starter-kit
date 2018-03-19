import { Action } from "redux";
import * as actionTypes from "./action-types";

class SetWidthAction implements Action {
  public readonly type = actionTypes.BLUE_SCR_SET_WIDTH;
  constructor(public width: number) { } 
}

class SetHeightAction implements Action {
  public readonly type = actionTypes.BLUE_SCR_SET_HEIGHT;
  constructor(public height: number) { } 
}

class SetTextAction implements Action {
  public readonly type = actionTypes.BLUE_SCR_SET_TEXT;
  constructor(public text: string) { } 
}

export {
  SetWidthAction,
  SetHeightAction,
  SetTextAction
}
