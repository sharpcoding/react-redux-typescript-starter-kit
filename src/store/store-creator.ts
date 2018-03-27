// tslint:disable:no-string-literal

import { applyMiddleware, combineReducers, compose, createStore, ReducersMapObject, Store } from 'redux';
import reduxThunk from 'redux-thunk';
import { bubbleChartScreenReducer, BubbleChartReducerActionTypes } from '@screens/bubble-chart-screen';
import { IBubbleChartScreenState } from '../screens/bubble-chart-screen/state';
import { IAppState } from './state';

interface ICombinedReducers extends ReducersMapObject {
  bubbleChartScreenState: (state: IBubbleChartScreenState, action: BubbleChartReducerActionTypes) => IBubbleChartScreenState;
}

const reducerMapObject: ICombinedReducers = {
  bubbleChartScreenState: bubbleChartScreenReducer,
};

const combinedReducers = combineReducers<IAppState>(reducerMapObject);

// this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export const store: Store<IAppState> = createStore(combinedReducers, composeEnhancers(applyMiddleware(reduxThunk)));