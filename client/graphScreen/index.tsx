import { Dispatch } from 'redux';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock  } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as React from 'react';
import { ScatterPlot } from '../scatterPlotWidget';
import { GraphScreenState, EnumSelectedChartType } from './model';
import { changeMaxXAxisValue, changeMaxYAxisValue, changeNumbeOfPoints } from './actions';

interface MainScreenProps {
  state: GraphScreenState;
  dispatch: Dispatch<{}>;
}

export class MainScreen extends React.Component<MainScreenProps, void> {
  render() {
    const { state, dispatch } = this.props;

    return (
      <form>
        <h5>
          This screen uses Bootstrap input controls that define
          max-values of randomly selected (x,y) points and the total number of points,
          that are immediately rendered in D3-based svg component on the screen.   
        </h5>
        <FormGroup>
          <ControlLabel>Max x-axis value</ControlLabel>
          <FormControl
            type="number"
            min="10"
            max="10000"
            value={state.maxXAxisValue}
            placeholder="Max x value"
            onChange={(e) => { this.props.dispatch(changeMaxXAxisValue(parseInt(e.target.value))) }} />
          <ControlLabel>Max y-axis value</ControlLabel>
          <FormControl
            type="number"
            min="10"
            max="10000"
            value={state.maxYAxisValue}
            placeholder="Max y value"
            onChange={(e) => { this.props.dispatch(changeMaxYAxisValue(parseInt(e.target.value))) }} />
          <ControlLabel>Max number of points</ControlLabel>
          <FormControl
            type="number"
            min="1"
            max="10000"
            value={state.numberOfPoints}
            placeholder="Max number of points"
            onChange={(e) => { this.props.dispatch(changeNumbeOfPoints(parseInt(e.target.value))) }} />

        </FormGroup>
        <div>
          <ScatterPlot width={700} height={500} padding={30} data={this.props.state.randomArrayOfPoints} />
        </div>
      </form>
    );
  }
}

//function call every time re-render is happening,
//allows to transfer all application state to only 
//a fragment MainScreen component keeps interest in 
const mapStateToProps = state => {
  //console.log() only for demonstration purposes
  console.log('mainScreen mapStateToProps', state);
  return  {
    state: state.graphScreenState
  }
};


export default connect(mapStateToProps)(MainScreen);