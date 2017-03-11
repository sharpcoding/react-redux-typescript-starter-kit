import * as React from 'react';
import * as d3 from 'd3';
import * as Moment from 'Moment';
import { DateTimePoint } from './models/dateTimePoint';
import { TimeSeries } from './components/timeSeries';

export interface LinearChartProps {
  width: number;
  height: number;
  padding: number;
  data: DateTimePoint[];
}

export class LinearChart extends React.Component<LinearChartProps, void> {
  xMax = (data) => d3.max(data, (d: DateTimePoint) => d.time.toDate());
  yMax = (data) => d3.max(data, (d: DateTimePoint) => d.value);
  
  getXScale = (props: LinearChartProps) => {
    return d3.scaleTime()
      .domain([0, this.xMax(props.data)])
      .range([props.padding, props.width - props.padding * 2]);
  };
  
  getYScale = (props: LinearChartProps) => {
    return d3.scaleLinear()
      .domain([0, this.yMax(props.data)])
      .range([props.height - props.padding, props.padding]);
  };

  render() {
    var xScale = this.getXScale(this.props);
    var yScale = this.getYScale(this.props);
    return (
      <svg width={this.props.width} height={this.props.height}>
        <TimeSeries data={this.props.data} xScale={xScale} yScale={yScale} />
      </svg>
    );
  }
}

export default LinearChart;