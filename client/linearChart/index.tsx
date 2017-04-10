import * as React from 'react';
import * as d3 from 'd3';
import * as moment from 'Moment';
import * as _ from 'lodash';
import { DateTimePoint } from './models/dateTimePoint';
import { TimeSeries } from './components/timeSeries';
import { EnumGraphPointsSelectionMode } from './components/enums';
import { getHorizontalSampleDistancePx, resampleFactor, resampleFactorApproximation, getAllApproximations, getDataResampled } from './common/calculations';

export interface ILinearChartProps {
  width: number;
  height: number;
  padding: number;
  from: moment.Moment;
  to: moment.Moment;
  yMinValue: number;
  yMaxValue: number;
  data: DateTimePoint[];
  secondsPerSample: number;
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
}

export interface IDateTimePointSeriesCache {
  rFractor: number;
  samples: DateTimePoint[];
}

export interface ITimeSeriesState {
  rFactorSampleCache: IDateTimePointSeriesCache[];
}

export class LinearChart extends React.Component<ILinearChartProps, ITimeSeriesState> {
  constructor(props) {
    super(props);
    var rFactorSampleCache = new Array<IDateTimePointSeriesCache>();
    console.log("building rFactor cache...");
    _.each(getAllApproximations(), rFactor => {
      console.log(`rFactor: ${rFactor}`);
      rFactorSampleCache.push({
        rFractor: rFactor,
        samples: getDataResampled(props.data, rFactor)
      });
    });
    this.state = {
      rFactorSampleCache: rFactorSampleCache
    }
    console.log("built rFactor cache !");
    _.each(rFactorSampleCache, el => console.log(el.samples.length));
  };

  filteredInRange = () => {
    let result = new Array<DateTimePoint>();
    let unixFrom = this.props.from.unix();
    let unixTo = this.props.to.unix();
    let rFactor = resampleFactor(this.props.secondsPerSample, this.props.width, this.props.from.clone(), this.props.to.clone());
    let rFactorApproximation = resampleFactorApproximation(rFactor);
    let rFactorCacheElement = _.find(this.state.rFactorSampleCache, el => el.rFractor == rFactorApproximation);
    if (_.isObject(rFactorCacheElement)) {
      result = _.filter(rFactorCacheElement.samples, el => el.unix >= unixFrom && el.unix <= unixTo);
      // console.log(`filteredInRange() rFactor: ${rFactor} rFactorApproximation: ${rFactorApproximation} allSamples: ${this.props.data.length} cacheSamples: ${rFactorCacheElement.samples.length} resultSamples: ${result.length}`);
    } else {
      result = _.filter(this.props.data, el => el.unix >= unixFrom && el.unix <= unixTo);
      // console.log(`filteredInRange() rFactor: ${rFactor}  rFactorApproximation: ${rFactorApproximation} allSamples: ${this.props.data.length} resultSamples: ${result.length}`);
    }
    return result;
  };
  
  xMin = (data) => d3.min(data, (d: DateTimePoint) => d.time.toDate());
  xMax = (data) => d3.max(data, (d: DateTimePoint) => d.time.toDate());
  yMin = (data) => d3.min(data, (d: DateTimePoint) => d.value);
  yMax = (data) => d3.max(data, (d: DateTimePoint) => d.value);
  
  getXScale = (filteredData: DateTimePoint[], props: ILinearChartProps) => {
    return d3.scaleTime()
      .domain([this.xMin(filteredData), this.xMax(filteredData)])
      .range([props.padding, props.width - props.padding * 2]);
  };
  
  getYScale = (filteredData: DateTimePoint[], props: ILinearChartProps) => {
    return d3.scaleLinear()
      .domain([props.yMinValue, props.yMaxValue])
      .range([props.height - props.padding, props.padding]);
  };

  render() {
    var filteredData = this.filteredInRange();    
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