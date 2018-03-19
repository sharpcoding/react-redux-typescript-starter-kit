import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { SvgGraph } from '../../components';
import { IAppState } from '@state/.';
import { Dispatch, bindActionCreators } from 'redux';
import { setWidth, setHeight, ISetWidthActionCreator, ISetHeightActionCreator } from './action-creators';
import { SetWidthAction, SetHeightAction } from './actions';
import { IRandomDotsScreenState } from './state';

export interface IRandomDotsChartScreenProps extends IRandomDotsScreenState { };

export interface IRandomDotsChartScreenState {
  width: string; 
  height: string; 
}

export interface IRandomDotsChartScreenDispatchProps {
  setWidth: ISetWidthActionCreator;
  setHeight: ISetHeightActionCreator;
}

export class RandomDotsChartScreenComponent extends React.Component<IRandomDotsChartScreenProps & IRandomDotsChartScreenDispatchProps, IRandomDotsChartScreenState> {
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
      />
      <br />
      <br />
      <SvgGraph 
        backgroundColor={this.props.color} 
        width={this.props.width} 
        height={this.props.height} />
    </span>;
  }
}


const mapStateToProps = (state: IAppState): IRandomDotsChartScreenProps => {
  return state.randomDotsScreenState
};

const matchDispatchToProps = (dispatch: Dispatch<void>) => {
  return bindActionCreators({
    setWidth: setWidth,
    setHeight: setHeight,
  }, dispatch);
}

export const RandomDotsChartScreen = connect<IRandomDotsChartScreenProps, IRandomDotsChartScreenDispatchProps, {}>(mapStateToProps, matchDispatchToProps)(RandomDotsChartScreenComponent)