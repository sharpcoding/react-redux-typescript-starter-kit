import { ReducersMapObject, combineReducers, compose, Store, createStore, applyMiddleware } from "redux";
import { IRandomDotsScreenState } from "../screens/random-dots-chart-screen/state";
import { RandomDotsScreenReducerActionTypes, randomDotsScreenReducer } from "../screens/random-dots-chart-screen/reducers";
import { IAppState } from "./state";

interface ICombinedReducers extends ReducersMapObject {
  randomDotsScreenState: (state: IRandomDotsScreenState, action: RandomDotsScreenReducerActionTypes) => IRandomDotsScreenState
}

const reducerMapObject: ICombinedReducers = {
  randomDotsScreenState: randomDotsScreenReducer
}

const combinedReducers = combineReducers<IAppState>(reducerMapObject);

//this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export const store: Store<IAppState> = createStore(combinedReducers, composeEnhancers(applyMiddleware()));