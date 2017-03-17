import { Dispatch } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { Panel, Button, ListGroup, ListGroupItem, Form, Col, FormGroup, ControlLabel, FormControl, HelpBlock  } from 'react-bootstrap';
import { ScatterPlot } from '../scatterPlotWidget';
import { LinearChart } from '../LinearChart';
import { GraphScreenState } from './model';
import { TextInput } from './../../components/ui/textInput';
import { changeDateFromToValue, changeDateWindowMinimalWidthMinutes } from './actions';
import { ReactSlider } from './../../components/react-slider/react-slider';
import { BootstrapFormGroupStaticText } from './../../components/ui/bootstrapFormGroupStaticText';

interface MainScreenProps {
  state: GraphScreenState;
  dispatch: Dispatch<{}>;
}

export class MainScreen extends React.Component<MainScreenProps, void> {  
  calculateDomainLengthMinutes(state: GraphScreenState): number {
    if (state.points.length <= 1)
      return 0;
    return this.translateDateTimeToMinutesDomain(state, state.points[state.points.length-1].time)
  }

  /**
   * Calculates the difference in minutes between the datetime of the last available and the first available point
   */
  translateDateTimeToMinutesDomain(state: GraphScreenState, dateTime: moment.Moment): number {
    if (state.points.length <= 1)
      return 0;
    var dateFrom = state.points[0].time;    
    return dateTime.diff(dateFrom, "minutes");
  }

  // translate

  translateMinutesDomainToDateTime(state: GraphScreenState, minutes: number): moment.Moment {
    if (state.points.length <= 1)
      return moment();
    return state.points[0].time.clone().add(minutes, "minutes");
  }

  render() {
    const { state, dispatch } = this.props;

    return (
      <div>
        <h5>
          This screen uses Bootstrap input controls that define
          max-values of randomly selected (x,y) points and the total number of points,
          that are immediately rendered in D3-based svg component on the screen.   
        </h5>
        <Form horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
               Window date from:
            </Col>
            <Col sm={8}>
              <BootstrapFormGroupStaticText text={state.dateFrom.format("YYYY-MM-DD HH:mm")} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
              Window date to:
            </Col>
            <Col sm={8}>
              <BootstrapFormGroupStaticText text={state.dateTo.format("YYYY-MM-DD HH:mm")} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
              Minimal Window width minutes:
            </Col>
            <Col sm={8}>
              <TextInput value={state.dateFromToMinimalWidthMinutes.toString()} changed={(value: string) => { 
                this.props.dispatch(changeDateWindowMinimalWidthMinutes(value)) 
              }} />
            </Col>
          </FormGroup>
        </Form>
        <LinearChart 
          width={700} 
          height={500} 
          padding={30} 
          data={this.props.state.points} 
          from={this.props.state.dateFrom} 
          to={this.props.state.dateTo} />
        <ReactSlider 
          className="horizontal-slider" 
          defaultValue={[this.translateDateTimeToMinutesDomain(state, state.dateFrom), this.translateDateTimeToMinutesDomain(state, state.dateTo)]}           
          min={0} 
          max={this.calculateDomainLengthMinutes(state)} 
          pearling={true}
          minDistance={state.dateFromToMinimalWidthMinutes}
          onChange={(e: Array<number>) => {
            var [fromMinutes, toMinutes] = e;
            var newDateFrom = this.translateMinutesDomainToDateTime(state, fromMinutes);
            var newDateTo = this.translateMinutesDomainToDateTime(state, toMinutes);
            if (!this.props.state.dateFrom.isSame(newDateFrom) || !this.props.state.dateTo.isSame(newDateTo)) {
              this.props.dispatch(changeDateFromToValue(newDateFrom.format("YYYY-MM-DD HH:mm"), newDateTo.format("YYYY-MM-DD HH:mm")));
              return;
            }
          }}            
        />
      </div>
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