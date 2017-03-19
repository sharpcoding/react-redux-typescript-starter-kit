import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as d3 from 'd3';
import { DateTimePoint } from '../models/DateTimePoint';
import { TimeSeriesCircle } from './TimeSeriesCircle';

export interface TimeSeriesProps {
  xScale: (value: any) => any;
  yScale: (value: number) => number;
  horizontalSampleDistancePx: number;  
  data: DateTimePoint[];  
}

export interface TimeSeriesState {
  selectedPoints: Array<number>;
}

export class TimeSeries extends React.Component<TimeSeriesProps, TimeSeriesState> {
  constructor(props) {
    super(props);
    this.state = { selectedPoints: [] }
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

  renderCircles() {
    if (this.props.horizontalSampleDistancePx > 2)
      return _.map(this.props.data, (el) => {
        var isSelected = _.indexOf(this.state.selectedPoints, el.unix) >= 0;
        return <TimeSeriesCircle
          key={el.unix} 
          cx={this.props.xScale(el.time)}
          cy={this.props.yScale(el.value)}
          unix={el.unix}
          fill={isSelected ? "red" : "orange"}
          isSelected={isSelected}
          r={this.getCircleRadiusBasedOnHorizontalSampleDistancePx(this.props.horizontalSampleDistancePx)}
          toggleSelected={(unix) => {
            if (_.indexOf(this.state.selectedPoints, unix) >= 0) {
              this.setState({ selectedPoints: _.filter(this.state.selectedPoints, (value) => value != unix) } );
            } 
            else
              this.setState({ selectedPoints: _.concat(this.state.selectedPoints, [unix]) } );
          }}
        />}
      );
    return [];
  }

  render() {
    return (<g>
      <path d={this.getSvgPath()} fill="none" stroke="steelblue" />
      {this.renderCircles()}
    </g>);
  }
}

export default TimeSeries;