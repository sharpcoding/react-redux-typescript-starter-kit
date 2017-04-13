import { Dispatch } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Panel, ButtonGroup, Button, ListGroup, ListGroupItem, Grid, Form, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock  } from 'react-bootstrap';
import { ReactSlider } from './../../components/react-slider/react-slider';
import { BootstrapFormGroupStaticText } from './../../components/ui/bootstrapFormGroupStaticText';
import { GraphScreenState } from './model';
import { TextInput } from './../../components/ui/textInput';
import { LinearChart } from './../../components/linearChart';
import { EnumChartPointsSelectionMode, EnumZoomSelected } from '../../components/linearChart/common/enums';
import { ILinearChartDimensions } from '../../components/linearChart/common/interfaces';
import { calculations as c } from '../../components/linearChart/common/calculations';
import { chartActions } from '../../components/linearChart/common/actions';

interface MainScreenProps {
  state: GraphScreenState;
  dispatch: Dispatch<{}>;
}

export class MainScreen extends React.Component<MainScreenProps, void> {
  private _chartDimensions: ILinearChartDimensions = {
    canvasHeight: 500,
    canvasWidth: 800,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  };

  getGraphPointsSelectionButtonStyle(stateMode: EnumChartPointsSelectionMode, expectedMode: EnumChartPointsSelectionMode): string {
    return stateMode == expectedMode ? "success" : "default";
  }

  getZoomButtonStyle(stateMode: EnumZoomSelected, expectedMode: EnumZoomSelected): string {
    return stateMode == expectedMode ? "success" : "default";
  }

  calculateSliderValue(state: GraphScreenState): number[] {
    return [
      c.translateDateTimeToMinutesDomain(state.linearChart, state.linearChart.windowDateFrom), 
      c.translateDateTimeToMinutesDomain(state.linearChart, state.linearChart.windowDateTo)
    ];
  }

  isButtonDisabled(zoomLimitationLevelButtonIsPresenting: EnumZoomSelected, currentZoomLimitationLevel: EnumZoomSelected): boolean {
    return Math.abs(zoomLimitationLevelButtonIsPresenting - currentZoomLimitationLevel) > 1;
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
        <Grid>
          <Row>
            <Col componentClass={ControlLabel} md={2}>
               Samples from:
            </Col>
            <Col md={2}>
              <BootstrapFormGroupStaticText text={state.linearChart.allPointsFrom.format("YYYY-MM-DD HH:mm")} />
            </Col>
            <Col componentClass={ControlLabel} md={2}>
              Samples to:
            </Col>
            <Col md={2}>
              <BootstrapFormGroupStaticText text={state.linearChart.allPointsTo.format("YYYY-MM-DD HH:mm")} />
            </Col>
            <Col componentClass={ControlLabel} md={2}>
              Total number of samples:
            </Col>
            <Col md={2}>
              <BootstrapFormGroupStaticText text={state.linearChart.allPoints.length.toString()} />
            </Col>
          </Row>
          <Row>
            <Col componentClass={ControlLabel} md={2}>
               Window date from:
            </Col>
            <Col md={2}>
              <BootstrapFormGroupStaticText text={state.linearChart.windowDateFrom.format("YYYY-MM-DD HH:mm")} />
            </Col>
            <Col componentClass={ControlLabel} md={2}>
              Window date to:
            </Col>
            <Col md={2}>
              <BootstrapFormGroupStaticText text={state.linearChart.windowDateTo.format("YYYY-MM-DD HH:mm")} />
            </Col>
            <Col componentClass={ControlLabel} md={2}>
              Min. window width:
            </Col>
            <Col md={2}>
              <BootstrapFormGroupStaticText text={ state.linearChart.dateFromToMinimalWidthMinutes.toString() + " minutes"} />
            </Col>
          </Row>
          <Row>
            <Col componentClass={ControlLabel} md={12}>
              <ButtonGroup>
                <Button bsSize="xs" onClick={() => this.props.dispatch(chartActions.setGraphPointsSelectionMode(EnumChartPointsSelectionMode.NoSelection)) } 
                  bsStyle={this.getGraphPointsSelectionButtonStyle(state.linearChart.graphPointsSelectionMode, EnumChartPointsSelectionMode.NoSelection)}>No selection</Button>
                <Button bsSize="xs" onClick={() => this.props.dispatch(chartActions.setGraphPointsSelectionMode(EnumChartPointsSelectionMode.SelectUnselectSingle)) } 
                  bsStyle={this.getGraphPointsSelectionButtonStyle(state.linearChart.graphPointsSelectionMode, EnumChartPointsSelectionMode.SelectUnselectSingle)}>Select single point</Button>
                <Button bsSize="xs" onClick={() => this.props.dispatch(chartActions.setGraphPointsSelectionMode(EnumChartPointsSelectionMode.SelectMultiple)) } 
                  bsStyle={this.getGraphPointsSelectionButtonStyle(state.linearChart.graphPointsSelectionMode, EnumChartPointsSelectionMode.SelectMultiple)}>Select multiple points</Button>
                <Button bsSize="xs" onClick={() => this.props.dispatch(chartActions.setGraphPointsSelectionMode(EnumChartPointsSelectionMode.UnselectMultiple))} 
                  bsStyle={this.getGraphPointsSelectionButtonStyle(state.linearChart.graphPointsSelectionMode, EnumChartPointsSelectionMode.UnselectMultiple)}>Unselect multiple points</Button>
              </ButtonGroup>
              &nbsp;
              <ButtonGroup>
                <Button bsSize="xs"
                  onClick={() => this.props.dispatch(chartActions.setWindowWidthMinutes(state.linearChart.windowDateTo.diff(state.linearChart.windowDateFrom, "minutes"))) }>
                  Lock window width to current
                </Button>
                <Button bsSize="xs"
                  onClick={() => this.props.dispatch(chartActions.setWindowWidthMinutes(5)) }>
                  Unlock window width
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col componentClass={ControlLabel} md={12}>
              <LinearChart
                chartDimensions={this._chartDimensions}
                state={this.props.state.linearChart} />
            </Col>
          </Row>
          <Row>
            <Col componentClass={ControlLabel} md={12}>
              <ButtonGroup>
                <Button 
                  disabled={this.isButtonDisabled(EnumZoomSelected.NoZoom, state.linearChart.chartZoomSettings.zoomSelected)} 
                  bsSize="xs" 
                  onClick={() => this.props.dispatch(chartActions.setZoomWindowLimitation(EnumZoomSelected.NoZoom)) } 
                  bsStyle={this.getZoomButtonStyle(state.linearChart.chartZoomSettings.zoomSelected, EnumZoomSelected.NoZoom)}>
                  View All
                </Button>
                <Button 
                  disabled={this.isButtonDisabled(EnumZoomSelected.ZoomLevel1, state.linearChart.chartZoomSettings.zoomSelected)}
                  bsSize="xs" 
                  onClick={() => { this.props.dispatch(chartActions.setZoomWindowLimitation(EnumZoomSelected.ZoomLevel1)) }} 
                  bsStyle={this.getZoomButtonStyle(state.linearChart.chartZoomSettings.zoomSelected, EnumZoomSelected.ZoomLevel1)}>
                  We need to go deeper...
                </Button>
                <Button 
                  disabled={this.isButtonDisabled(EnumZoomSelected.ZoomLevel2, state.linearChart.chartZoomSettings.zoomSelected)}
                  bsSize="xs" 
                  onClick={() => this.props.dispatch(chartActions.setZoomWindowLimitation(EnumZoomSelected.ZoomLevel2)) } 
                  bsStyle={this.getZoomButtonStyle(state.linearChart.chartZoomSettings.zoomSelected, EnumZoomSelected.ZoomLevel2)}>
                  We need to go deeper...
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col componentClass={ControlLabel} md={12}>
              <ReactSlider
                value={this.calculateSliderValue(state)}
                min={0} 
                max={c.calculateDomainLengthMinutes(this.props.state.linearChart)} 
                pearling={true}
                minDistance={state.linearChart.dateFromToMinimalWidthMinutes}
                onChange={(e: Array<number>) => {
                  var [fromMinutes, toMinutes] = e;
                  var newDateFrom = c.translateMinutesDomainToDateTime(state.linearChart, fromMinutes);
                  var newDateTo = c.translateMinutesDomainToDateTime(state.linearChart, toMinutes);
                  if (!this.props.state.linearChart.windowDateFrom.isSame(newDateFrom) || !this.props.state.linearChart.windowDateTo.isSame(newDateTo)) {
                    this.props.dispatch(chartActions.setWindowDateFromTo(newDateFrom.format("YYYY-MM-DD HH:mm"), newDateTo.format("YYYY-MM-DD HH:mm")));
                    return;
                  }
                }}
              />
            </Col>
          </Row>
        </Grid>
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