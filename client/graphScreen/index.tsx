import { Dispatch } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Panel, ButtonGroup, Button, ListGroup, ListGroupItem, Form, Col, FormGroup, ControlLabel, FormControl, HelpBlock  } from 'react-bootstrap';
import { LinearChart } from '../LinearChart';
import { EnumGraphPointsSelectionMode } from '../LinearChart/components/enums';
import { GraphScreenState } from './model';
import { TextInput } from './../../components/ui/textInput';
import { changeDateFromToValue, setupWindowWidthMinutes, setupGraphPointsSelectionMode } from './actions';
import { ReactSlider } from './../../components/react-slider/react-slider';
import { BootstrapFormGroupStaticText } from './../../components/ui/bootstrapFormGroupStaticText';

interface MainScreenProps {
  state: GraphScreenState;
  dispatch: Dispatch<{}>;
}

export class MainScreen extends React.Component<MainScreenProps, void> {  
  calculateDomainLengthMinutes(state: GraphScreenState): number {
    if (state.allPoints.length <= 1)
      return 0;
    return this.translateDateTimeToMinutesDomain(state, state.allPoints[state.allPoints.length-1].time)
  }

  /**
   * Calculates the difference in minutes between the datetime of the last available and the first available point
   */
  translateDateTimeToMinutesDomain(state: GraphScreenState, dateTime: moment.Moment): number {
    if (state.allPoints.length <= 1)
      return 0;
    var dateFrom = state.allPoints[0].time;    
    return dateTime.diff(dateFrom, "minutes");
  }

  // translate

  translateMinutesDomainToDateTime(state: GraphScreenState, minutes: number): moment.Moment {
    if (state.allPoints.length <= 1)
      return moment();
    return state.allPoints[0].time.clone().add(minutes, "minutes");
  }

  getGraphPointsSelectionButtonStyle(stateMode: EnumGraphPointsSelectionMode, expectedMode: EnumGraphPointsSelectionMode): string {
    return stateMode == expectedMode ? "success" : "default";
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
            <Col componentClass={ControlLabel} sm={2}>
               Samples from:
            </Col>
            <Col sm={2}>
              <BootstrapFormGroupStaticText text={state.allPoints[0].time.format("YYYY-MM-DD HH:mm")} />
            </Col>
            <Col componentClass={ControlLabel} sm={2}>
              Samples to:
            </Col>
            <Col sm={2}>
              <BootstrapFormGroupStaticText text={state.allPoints[state.allPoints.length-1].time.format("YYYY-MM-DD HH:mm")} />
            </Col>
            <Col componentClass={ControlLabel} sm={2}>
              Total number of samples:
            </Col>
            <Col sm={2}>
              <BootstrapFormGroupStaticText text={state.allPoints.length.toString()} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
               Window date from:
            </Col>
            <Col sm={2}>
              <BootstrapFormGroupStaticText text={state.dateFrom.format("YYYY-MM-DD HH:mm")} />
            </Col>
            <Col componentClass={ControlLabel} sm={2}>
              Window date to:
            </Col>
            <Col sm={2}>
              <BootstrapFormGroupStaticText text={state.dateTo.format("YYYY-MM-DD HH:mm")} />
            </Col>
            <Col componentClass={ControlLabel} sm={2}>
              Min. window width:
            </Col>
            <Col sm={2}>
              <BootstrapFormGroupStaticText text={ state.dateFromToMinimalWidthMinutes.toString() + " minutes"} />
            </Col>
          </FormGroup>
        </Form>
        <ButtonGroup>
          <Button bsSize="xs" onClick={() => this.props.dispatch(setupGraphPointsSelectionMode(EnumGraphPointsSelectionMode.NoSelection)) } 
            bsStyle={this.getGraphPointsSelectionButtonStyle(state.graphPointsSelectionMode, EnumGraphPointsSelectionMode.NoSelection)}>No selection</Button>
          <Button bsSize="xs" onClick={() => this.props.dispatch(setupGraphPointsSelectionMode(EnumGraphPointsSelectionMode.SelectUnselectSingle)) } 
            bsStyle={this.getGraphPointsSelectionButtonStyle(state.graphPointsSelectionMode, EnumGraphPointsSelectionMode.SelectUnselectSingle)}>Select single point</Button>
          <Button bsSize="xs" onClick={() => this.props.dispatch(setupGraphPointsSelectionMode(EnumGraphPointsSelectionMode.SelectMultiple)) } 
            bsStyle={this.getGraphPointsSelectionButtonStyle(state.graphPointsSelectionMode, EnumGraphPointsSelectionMode.SelectMultiple)}>Select multiple points</Button>
          <Button bsSize="xs" onClick={() => this.props.dispatch(setupGraphPointsSelectionMode(EnumGraphPointsSelectionMode.UnselectMultiple))} 
            bsStyle={this.getGraphPointsSelectionButtonStyle(state.graphPointsSelectionMode, EnumGraphPointsSelectionMode.UnselectMultiple)}>Unselect multiple points</Button>
        </ButtonGroup>
        &nbsp;
        <ButtonGroup>
          <Button bsSize="xs"
            onClick={() => this.props.dispatch(setupWindowWidthMinutes(state.dateTo.diff(state.dateFrom, "minutes"))) }>
            Lock window width to current
          </Button>
          <Button bsSize="xs"
            onClick={() => this.props.dispatch(setupWindowWidthMinutes(60)) }>
            Unlock window width
          </Button>
        </ButtonGroup>
        <LinearChart 
          width={1800} 
          height={600} 
          padding={0} 
          data={this.props.state.allPoints} 
          from={this.props.state.dateFrom} 
          to={this.props.state.dateTo}
          graphPointsSelectionMode={this.props.state.graphPointsSelectionMode} />
        <ReactSlider 
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
  // console.log('mainScreen mapStateToProps', state);
  return  {
    state: state.graphScreenState
  }
};


export default connect(mapStateToProps)(MainScreen);