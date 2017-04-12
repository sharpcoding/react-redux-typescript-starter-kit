import * as React from 'react';
import * as d3 from 'd3';
import * as moment from 'Moment';
import * as _ from 'lodash';
import { DateTimePoint } from './models/dateTimePoint';
import { TimeSeries } from './components/timeSeries';
import { IChartDimensions, IChartZoomSettings } from './common/interfaces';
import { EnumGraphPointsSelectionMode, EnumZoomSelected } from './components/enums';
import { getHorizontalSampleDistancePx } from './common/calculations';

export interface ILinearChartProps {
  chartDimensions: IChartDimensions;
  zoomSettings: IChartZoomSettings;
  windowDateFrom: moment.Moment;
  windowDateTo: moment.Moment;
  yMinValue: number;
  yMaxValue: number;
  /**
   * It might be filtered, resampled, processed data - whatever...
   */
  filteredData: DateTimePoint[];
  secondsPerSample: number;
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
}

export interface ITimeSeriesState {
  // rFactorSampleCache: IDateTimePointSeriesCache[];
}

export class LinearChart extends React.Component<ILinearChartProps, ITimeSeriesState> {
  constructor(props) {
    super(props);    
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
    var xScale = this.getXScale(this.props.filteredData, this.props);
    var yScale = this.getYScale(this.props.filteredData, this.props);
    return (
      <svg 
        width={this.props.chartDimensions.canvasWidth} 
        height={this.props.chartDimensions.canvasHeight}>
        <TimeSeries 
          filteredData={this.props.filteredData} 
          xScale={xScale} 
          yScale={yScale}
          horizontalSampleDistancePx={getHorizontalSampleDistancePx(this.props.filteredData.length, this.props.chartDimensions.canvasWidth)}
          graphPointsSelectionMode={this.props.graphPointsSelectionMode} 
          chartDimensions={this.props.chartDimensions}
        />
      </svg>
    );
  }
}