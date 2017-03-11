import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as d3 from 'd3';
import { DateTimePoint } from '../models/DateTimePoint';

export interface TimeSeriesProps {
  xScale: (value: moment.Moment) => moment.Moment;
  yScale: (value: number) => number;
  data: DateTimePoint[];
}

export class TimeSeries extends React.Component<TimeSeriesProps, void> {
  getSvgPath(): string {
    var self = this;

    var line = d3.line()
      .x(function(d: DateTimePoint) { 
        return self.props.xScale(d.time); 
      })
      .y(function(d: DateTimePoint) { return self.props.yScale(d.value); });

    return line(this.props.data);
  }

  render() {
    return (<g><path d={this.getSvgPath()} fill="none" stroke="steelblue" /></g>);
  }
}

export default TimeSeries;