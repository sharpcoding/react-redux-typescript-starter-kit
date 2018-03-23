// tslint:disable:no-empty-interface
// tslint:disable:no-string-literal

import { IAppState } from '@state/.';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { BubbleChart } from '../../components';
import { ISetHeightActionCreator, ISetWidthActionCreator, setHeight, setWidth } from './action-creators';
import { SetHeightAction, SetWidthAction } from './actions';
import { generateBubbulePoints, IGenerateBubblePointsEffect } from './effects';
import { IRandomDotsScreenState } from './state';

export interface IBubbleChartScreenProps extends IRandomDotsScreenState { }

export interface IBubbleChartScreenState {
  width: string;
  height: string;
}

export interface IBubbleChartScreenDispatchProps {
  setWidth: ISetWidthActionCreator;
  setHeight: ISetHeightActionCreator;
  generateBubbulePoints: IGenerateBubblePointsEffect;
}

export class BubbleChartScreenComponent extends React.Component<IBubbleChartScreenProps & IBubbleChartScreenDispatchProps, IBubbleChartScreenState> {
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
      <button type='button' onClick={() => this.props.generateBubbulePoints()}>Generate randomly !</button>
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

const mapStateToProps = (state: IAppState): IBubbleChartScreenProps => {
  return state.randomDotsScreenState;
};

const matchDispatchToProps = (dispatch: Dispatch<void>) => {
  return bindActionCreators({
    setHeight,
    setWidth,
    generateBubbulePoints,
  }, dispatch);
};

export const BubbleChartScreen =
  connect<IBubbleChartScreenProps, IBubbleChartScreenDispatchProps, {}>(mapStateToProps, matchDispatchToProps)(BubbleChartScreenComponent);