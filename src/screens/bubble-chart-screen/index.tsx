// tslint:disable:no-empty-interface
// tslint:disable:no-string-literal

import { IAppState } from '@store/state';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { BubbleChart } from '@components/bubble-chart';
import { ISetHeightActionCreator, ISetWidthActionCreator, setHeight, setWidth } from './action-creators';
import { SetHeightAction, SetWidthAction } from './actions';
import { generateBubbulePoints, IGenerateBubblePointsEffect } from './effects';
import { IBubbleChartScreenState } from './state';

export { IBubbleChartScreenState }
export { bubbleChartScreenReducer, BubbleChartReducerActionTypes } from './reducers';

interface IScreenProps extends IBubbleChartScreenState { }

interface IScreenState {
  width: string;
  height: string;
}

interface IDispatchProps {
  setWidth: ISetWidthActionCreator;
  setHeight: ISetHeightActionCreator;
  generateBubbulePoints: IGenerateBubblePointsEffect;
}

export class BubbleChartScreenComponent extends React.Component<IScreenProps & IDispatchProps, IScreenState> {
  constructor(props) {
    super(props);
    this.state = _.extend({}, props);
  }

  public render() {
    return <span>
      <label>width:</label> &nbsp;
      <input
        onChange={(e) => this.setState({ width: e.target.value }) }
        onBlur={(e) => this.props.setWidth(this.state.width)}
        value={this.state.width}
        type='number'
        min={100}
        max={2400}
      /> &nbsp;
      <label>height:</label> &nbsp;
      <input
        onChange={(e) => this.setState({ height: e.target.value }) }
        onBlur={(e) => this.props.setHeight(this.state.height)}
        value={this.state.height}
        type='number'
        min={100}
        max={2400}
      /> &nbsp;
      <button type='button' onClick={() => this.props.generateBubbulePoints()}>Async random generation</button>
      <br />
      <br />
      <BubbleChart
        dots={this.props.bubblePoints}
        backgroundColor={this.props.backgroundColor}
        width={this.props.width}
        height={this.props.height} />
    </span>;
  }
}

const mapStateToProps = (state: IAppState): IScreenProps => {
  return state.bubbleChartScreenState as IScreenProps;
};

const matchDispatchToProps = (dispatch: Dispatch<void>) => {
  return bindActionCreators({
    setHeight,
    setWidth,
    generateBubbulePoints,
  }, dispatch);
};

export const BubbleChartScreen = connect<IScreenProps, IDispatchProps, {}>(mapStateToProps, matchDispatchToProps)(BubbleChartScreenComponent);