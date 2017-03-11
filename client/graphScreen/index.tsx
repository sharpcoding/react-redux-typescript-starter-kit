import { Dispatch } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock  } from 'react-bootstrap';
import { ScatterPlot } from '../scatterPlotWidget';
import { LinearChart } from '../LinearChart';
import { GraphScreenState } from './model';
import { DateTimePicker } from './dateTimePicker';
import { changeDateFromValue, changeDateToValue } from './actions';

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
          <ControlLabel>Date from</ControlLabel>
          <DateTimePicker value={state.dateFrom} dateChanged={(value: string) => { 
            this.props.dispatch(changeDateFromValue(value))
          }} />
          <ControlLabel>Date to</ControlLabel>
          <DateTimePicker value={state.dateTo} dateChanged={(value: string) => { 
            this.props.dispatch(changeDateToValue(value))
          }} />
        </FormGroup>
        <div>
          <LinearChart 
            width={700} 
            height={500} 
            padding={30} 
            data={this.props.state.points} 
            from={this.props.state.dateFrom} 
            to={this.props.state.dateTo} />
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