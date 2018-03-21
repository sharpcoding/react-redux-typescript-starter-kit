import * as _ from 'lodash';
import { BLUE_SCR_SET_WIDTH } from './action-types';
import { SetHeightAction, SetTextAction, SetWidthAction } from './actions';

type ISetWidthActionCreator = (width: string) => SetWidthAction;
type ISetHeightActionCreator = (width: string) => SetHeightAction;
type ISetTextActionCreator = (text: string) => SetTextAction;

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
  ISetTextActionCreator,
};