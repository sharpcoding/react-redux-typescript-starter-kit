import * as React from 'react';
import * as d3 from 'd3';
import * as moment from 'Moment';
import * as _ from 'lodash';
import { DateTimePoint } from './models/dateTimePoint';
import { TimeSeries } from './components/timeSeries';
import { IChartDimensions } from './common/interfaces';
import { EnumGraphPointsSelectionMode } from './components/enums';
import { getHorizontalSampleDistancePx, resampleFactor, resampleFactorApproximation, getAllApproximations, getDataResampled } from './common/calculations';

export interface ILinearChartProps {
  chartDimensions: IChartDimensions;
  from: moment.Moment;
  to: moment.Moment;
  yMinValue: number;
  yMaxValue: number;
  data: DateTimePoint[];
  secondsPerSample: number;
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
}

/**
 * Cache entry
 */
export interface IDateTimePointSeriesCache {
  /**
   * Resample Factor - key for every cache entry
   */
  rFactor: number;

  /**
   * All samples - regardless the zooming level effect
   */
  allSamples: DateTimePoint[];

  /**
   * Samples - but only limited to a current zoom level.
   * Makes sense in Zoom Level 1 or in Zoom Level 2.
   * If we seeing detailed view with, say, every second accuracy and 
   * we are in "Zoom Level 2", there is no point in scanning
   * millions of samples, that are present in all samples cache.
   */
  zoomLvlSamples: DateTimePoint[];
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
      var resampledData = getDataResampled(props.data, rFactor);
      rFactorSampleCache.push({
        rFactor: rFactor,
        allSamples: resampledData,
        zoomLvlSamples: []
      });
    });
    this.state = {
      rFactorSampleCache: rFactorSampleCache
    }
    console.log("built rFactor cache !");
    _.each(rFactorSampleCache, el => console.log(el.allSamples.length));
  };

  reBuildSampleCacheAdjustedToCurrentZoomLevel = ():void => {
    _.each(this.state.rFactorSampleCache, el => {
      console.log(`building for ${el.rFactor}`);
      el.zoomLvlSamples = [];
      // switch (this.props.)
    });
  }

  /**
   * Returns DateTimePoint[] array from a selected sample cache selected.
   * That Selection is based on rRactor (resample factor), after a proper cache is chosen, samples are filtered by date from / to range.
   * Quite an important function in regards to performance aspect.
   */
  filteredInRange = ():DateTimePoint[] => {
    let result = new Array<DateTimePoint>();
    let unixFrom = this.props.from.unix();
    let unixTo = this.props.to.unix();
    let rFactorExact = resampleFactor(this.props.secondsPerSample, this.props.chartDimensions.canvasWidth, this.props.from.clone(), this.props.to.clone());
    let rFactorApproximation = resampleFactorApproximation(rFactorExact);
    let rFactorCacheElement = _.find(this.state.rFactorSampleCache, el => el.rFactor == rFactorApproximation);
    if (_.isObject(rFactorCacheElement)) {
      result = _.filter(rFactorCacheElement.allSamples, el => el.unix >= unixFrom && el.unix <= unixTo);
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
      .range([props.chartDimensions.paddingLeft, 
        props.chartDimensions.canvasWidth - props.chartDimensions.paddingLeft - props.chartDimensions.paddingRight]);
  };
  
  getYScale = (filteredData: DateTimePoint[], props: ILinearChartProps) => {
    return d3.scaleLinear()
      .domain([props.yMinValue, props.yMaxValue])
      .range([props.chartDimensions.canvasHeight - props.chartDimensions.paddingTop - props.chartDimensions.paddingBottom, 
        props.chartDimensions.paddingTop]);
  };

  render() {
    var filteredData = this.filteredInRange();    
    var xScale = this.getXScale(filteredData, this.props);
    var yScale = this.getYScale(filteredData, this.props);
    return (
      <svg 
        width={this.props.chartDimensions.canvasWidth} 
        height={this.props.chartDimensions.canvasHeight}>
        <TimeSeries 
          data={filteredData} 
          xScale={xScale} 
          yScale={yScale}
          horizontalSampleDistancePx={getHorizontalSampleDistancePx(filteredData.length, this.props.chartDimensions.canvasWidth)}
          graphPointsSelectionMode={this.props.graphPointsSelectionMode} 
          chartDimensions={this.props.chartDimensions}
        />
      </svg>
    );
  }
}