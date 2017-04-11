import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as d3 from 'd3';
import { DateTimePoint } from '../models/DateTimePoint';
import { TimeSeriesPointInTime } from './timeSeriesPointInTime';
import { DateTimeAxis } from './dateTimeAxis';
import { EnumGraphPointsSelectionMode } from './enums';
import { IChartDimensions } from '../common/interfaces';


export interface ITimeSeriesProps {
  /**
   * placeholder for D3 function that calculates x-scale
   */
  xScale: (value: any) => any;
  /**
   * placeholder for D3 function that calculates y-scale
   */
  yScale: (value: number) => number;
  horizontalSampleDistancePx: number;
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
  data: DateTimePoint[];
  chartDimensions: IChartDimensions;
}

export interface ITextGauge {
  visible: boolean;
  textValue: string;
  x: number;
  y: number;
}

export interface ITimeSeriesState {
  selectedPoints: Array<DateTimePoint>;
  draggedPointTextGauge: ITextGauge;
}

export class TimeSeries extends React.Component<ITimeSeriesProps, ITimeSeriesState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedPoints: [], 
      draggedPointTextGauge: {
        visible: false,
        textValue: "",
        x: 0,
        y: 0
      }
    }
  }
  
  getSvgPath(): string {
    var self = this;

    var line = d3.line()
      .x(function(d: DateTimePoint) { 
        return self.props.xScale(d.time); 
      })
      .y(function(d: DateTimePoint) { return self.props.yScale(d.value); });

    return line(this.props.data);
  }

  getCircleRadiusBasedOnHorizontalSampleDistancePx = (horizontalSampleDistancePx: number) => {
    if (horizontalSampleDistancePx < 3)
      return 1;
    if ((horizontalSampleDistancePx >= 3) && (horizontalSampleDistancePx < 6))
      return 2;
    if ((horizontalSampleDistancePx >= 6) && (horizontalSampleDistancePx < 8))
      return 3;
    if ((horizontalSampleDistancePx >= 8) && (horizontalSampleDistancePx < 11))
      return 4;
    if ((horizontalSampleDistancePx >= 11) && (horizontalSampleDistancePx < 14))
      return 5;
    if ((horizontalSampleDistancePx >= 14) && (horizontalSampleDistancePx < 20))
      return 6;
    return 8;
  }

  elementMarkedByUnixTimeStapmIsOnSelectedList(unix: number): boolean {
    return (_.findIndex(this.state.selectedPoints, (el) => el.unix == unix) >= 0);
  }

  renderTimeSeriesPointInTimeReactElement(el: DateTimePoint, isSelected: boolean) {
    return <TimeSeriesPointInTime
      key={el.unix} 
      cx={this.props.xScale(el.time)}
      cy={this.props.yScale(el.value)}
      unix={el.unix}
      fill={isSelected ? "red" : "orange"}
      isSelected={isSelected}
      r={this.getCircleRadiusBasedOnHorizontalSampleDistancePx(this.props.horizontalSampleDistancePx)}
      selectionActiveAreaHeightPx={150}
      startedDragging={() => { 
        this.setState({
          selectedPoints: this.state.selectedPoints,
          draggedPointTextGauge: { textValue: "", x: 0, y: 0, visible: true }
        })
      }}
      beingDragged={(x: number, y: number, value: string) => {
        var prevState = this.state;
        prevState.draggedPointTextGauge.textValue = value;
        prevState.draggedPointTextGauge.x = this.props.xScale(el.time);
        prevState.draggedPointTextGauge.y = y-this.getCircleRadiusBasedOnHorizontalSampleDistancePx(this.props.horizontalSampleDistancePx)-1;
        this.setState(prevState);
      }}
      stoppedDragging={() => {
        this.setState({
          selectedPoints: this.state.selectedPoints,
          draggedPointTextGauge: { textValue: "", x: 0, y: 0, visible: false }
        });
      }}
      toggleSelected={(unix) => {
        switch (this.props.graphPointsSelectionMode) {
          case EnumGraphPointsSelectionMode.SelectUnselectSingle:
            if (this.elementMarkedByUnixTimeStapmIsOnSelectedList(unix))
              this.setState((prevState) => {
                return {
                  selectedPoints: _.filter(prevState.selectedPoints, (point: DateTimePoint) => point.unix != unix),
                  draggedPointTextGauge: prevState.draggedPointTextGauge
                }
              });
            else
              this.setState((prevState) => { 
                return {
                  selectedPoints: _.concat(prevState.selectedPoints, [el]),
                  draggedPointTextGauge: prevState.draggedPointTextGauge
                }
              });
            break;
          case EnumGraphPointsSelectionMode.SelectMultiple:
            if (!this.elementMarkedByUnixTimeStapmIsOnSelectedList(unix))
              this.setState({
                selectedPoints: _.concat(this.state.selectedPoints, [el]),
                draggedPointTextGauge: this.state.draggedPointTextGauge
              });
            break;
          case EnumGraphPointsSelectionMode.UnselectMultiple:
            if (this.elementMarkedByUnixTimeStapmIsOnSelectedList(unix))
              this.setState({ 
                selectedPoints: _.filter(this.state.selectedPoints, (point: DateTimePoint) => point.unix != unix),
                draggedPointTextGauge: this.state.draggedPointTextGauge
              });
            break;
        }
      }}
      graphPointsSelectionMode={this.props.graphPointsSelectionMode}
    />
  }

  renderCircles() {
    var result = [];
    switch (this.props.graphPointsSelectionMode) {
      case EnumGraphPointsSelectionMode.SelectMultiple:
      case EnumGraphPointsSelectionMode.SelectUnselectSingle:
      case EnumGraphPointsSelectionMode.UnselectMultiple:
      if (this.props.horizontalSampleDistancePx >= 6) {
        result = _.map(this.props.data, (el) => {
          var isSelected = _.findIndex(this.state.selectedPoints, (selectedPoint) => selectedPoint.unix == el.unix) >= 0;
          return this.renderTimeSeriesPointInTimeReactElement(el, isSelected);
        });
      }
      else {
        result = _.map(this.state.selectedPoints, (el) => {
          return this.renderTimeSeriesPointInTimeReactElement(el, true);
        });
      }
    }
    return result;
  }

  render() {
    return (<g>
      {this.state.draggedPointTextGauge.visible && 
       <text 
        x={this.state.draggedPointTextGauge.x} 
        y={this.state.draggedPointTextGauge.y}>
        {this.state.draggedPointTextGauge.textValue}
      </text>}
      <path d={this.getSvgPath()} fill="none" stroke="steelblue" />
      {this.renderCircles()}
      <DateTimeAxis xScale={this.props.xScale} chartDimensions={this.props.chartDimensions} />
    </g>);
  }
}

export default TimeSeries;