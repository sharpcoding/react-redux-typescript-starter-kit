import * as _ from 'lodash';
import { SetHeightAction, SetWidthAction } from './actions';

type ISetWidthActionCreator = (width: string) => SetWidthAction;
type ISetHeightActionCreator = (width: string) => SetHeightAction;

const setWidth: ISetWidthActionCreator = (width: string) =>
  _.toPlainObject(new SetWidthAction(_.parseInt(width)));

const setHeight: ISetHeightActionCreator = (height: string) =>
  _.toPlainObject(new SetHeightAction(_.parseInt(height)));

export {
  setWidth,
  ISetWidthActionCreator,
  setHeight,
  ISetHeightActionCreator,
};