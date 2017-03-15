import * as React from 'react';
import * as d3 from 'd3';
import * as moment from 'Moment';
import * as _ from 'lodash';
import { DateTimePoint } from './models/dateTimePoint';
import { TimeSeries } from './components/timeSeries';

export interface LinearChartProps {
  width: number;
  height: number;
  padding: number;
  from: moment.Moment;
  to: moment.Moment;
  data: DateTimePoint[];
}

export class LinearChart extends React.Component<LinearChartProps, void> {
  filteredInRange = (data: DateTimePoint[]) => {
    var unixFrom = this.props.from.unix();
    var unixTo = this.props.to.unix();
    
    return _.filter(data, el => el.unix >= unixFrom && el.unix <= unixTo);
  } 
  
  xMin = (data) => d3.min(data, (d: DateTimePoint) => d.time.toDate());
  xMax = (data) => d3.max(data, (d: DateTimePoint) => d.time.toDate());
  yMax = (data) => d3.max(data, (d: DateTimePoint) => d.value);
  
  getXScale = (props: LinearChartProps) => {
    var filteredData = this.filteredInRange(this.props.data);
    console.log('filteredData.length', filteredData.length);
    return d3.scaleTime()
      .domain([this.xMin(filteredData), this.xMax(filteredData)])
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
      <svg 
        width={this.props.width} 
        height={this.props.height}>
        <TimeSeries data={this.props.data} xScale={xScale} yScale={yScale} />
      </svg>
    );
  }
}