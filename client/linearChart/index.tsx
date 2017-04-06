import * as React from 'react';
import * as d3 from 'd3';
import * as moment from 'Moment';
import * as _ from 'lodash';
import { DateTimePoint } from './models/dateTimePoint';
import { TimeSeries } from './components/timeSeries';
import { EnumGraphPointsSelectionMode } from './components/enums';
import { getHorizontalSampleDistancePx, resampleFactor } from './common/calculations';

export interface LinearChartProps {
  width: number;
  height: number;
  padding: number;
  from: moment.Moment;
  to: moment.Moment;
  data: DateTimePoint[];
  secondsPerSample: number;
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
}

export class LinearChart extends React.Component<LinearChartProps, void> {
  filteredInRange = (data: DateTimePoint[]) => {
    let result = new Array<DateTimePoint>();
    let unixFrom = this.props.from.unix();
    let unixTo = this.props.to.unix();
    let rFactor = resampleFactor(this.props.secondsPerSample, this.props.width, this.props.from.clone(), this.props.to.clone());
    let filtered = _.filter(data, el => el.unix >= unixFrom && el.unix <= unixTo);
    let resampledSum = 0;
    for (let i=0; i < filtered.length; i++) {
      resampledSum += filtered[i].value;
      if (i % rFactor == 0) {
        result.push({
          time: filtered[i].time.clone(),
          unix: filtered[i].time.unix(),
          value: resampledSum / rFactor
        });
        resampledSum = 0;
      }
    }
    return result;
  };
  
  xMin = (data) => d3.min(data, (d: DateTimePoint) => d.time.toDate());
  xMax = (data) => d3.max(data, (d: DateTimePoint) => d.time.toDate());
  yMin = (data) => d3.min(data, (d: DateTimePoint) => d.value);
  yMax = (data) => d3.max(data, (d: DateTimePoint) => d.value);
  
  getXScale = (filteredData: DateTimePoint[], props: LinearChartProps) => {    
    return d3.scaleTime()
      .domain([this.xMin(filteredData), this.xMax(filteredData)])
      .range([props.padding, props.width - props.padding * 2]);
  };
  
  getYScale = (filteredData: DateTimePoint[], props: LinearChartProps) => {
    return d3.scaleLinear()
      .domain([this.yMin(props.data), this.yMax(props.data)])
      .range([props.height - props.padding, props.padding]);
  };

  render() {
    var filteredData = this.filteredInRange(this.props.data);
    var xScale = this.getXScale(filteredData, this.props);
    var yScale = this.getYScale(filteredData, this.props);
    return (
      <svg 
        width={this.props.width} 
        height={this.props.height}>
        <TimeSeries 
          data={filteredData} 
          xScale={xScale} 
          yScale={yScale}
          horizontalSampleDistancePx={getHorizontalSampleDistancePx(filteredData.length, this.props.width)}
          graphPointsSelectionMode={this.props.graphPointsSelectionMode} />
      </svg>
    );
  }
}