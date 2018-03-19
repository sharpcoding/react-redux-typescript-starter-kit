import * as _ from "lodash";
import { SetWidthAction, SetHeightAction, SetTextAction } from "./actions";
import { BLUE_SCR_SET_WIDTH } from "./action-types";

interface ISetWidthActionCreator {
  (width: string): SetWidthAction;
}

interface ISetHeightActionCreator {
  (width: string): SetHeightAction;
}

interface ISetTextActionCreator {
  (text: string): SetTextAction;
}

const setWidth: ISetWidthActionCreator = (width: string) => 
  _.toPlainObject(new SetWidthAction(_.parseInt(width)));

const setHeight: ISetHeightActionCreator = (height: string) => 
  _.toPlainObject(new SetHeightAction(_.parseInt(height)));

const setText: ISetTextActionCreator = (text: string) => 
  _.toPlainObject(new SetTextAction(text));

export {
  setWidth,
  ISetWidthActionCreator,
  setHeight,
  ISetHeightActionCreator,
  setText,
  ISetTextActionCreator
}