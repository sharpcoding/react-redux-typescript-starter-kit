import * as _ from 'lodash';
import { SetHeightAction, SetWidthAction } from './actions';

export type ISetWidthActionCreator = (width: string) => SetWidthAction;
export type ISetHeightActionCreator = (width: string) => SetHeightAction;

export const setWidth: ISetWidthActionCreator = (width: string) =>
  _.toPlainObject(new SetWidthAction(_.parseInt(width)));

export const setHeight: ISetHeightActionCreator = (height: string) =>
  _.toPlainObject(new SetHeightAction(_.parseInt(height)));