import * as React from 'react';
import * as d3 from 'd3';
import { DateTimePoint } from './models/dateTimePoint';
import { LinearChartState } from './models/linearChartState';
import { calculations as c } from './common/calculations';
import { ILinearChartDimensions, ILinearChartZoomSettings } from './common/interfaces';
import { TimeSeries } from './components/timeSeries';

export interface ILinearChartProps {
  state: LinearChartState;
  chartDimensions: ILinearChartDimensions;
}

export class LinearChart extends React.Component<ILinearChartProps, void> {
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
      .domain([props.state.yMinValue, props.state.yMaxValue])
      .range([props.chartDimensions.canvasHeight - props.chartDimensions.paddingTop - props.chartDimensions.paddingBottom, 
        props.chartDimensions.paddingTop]);
  };

  render() {
    var filteredData = c.getFilteredData(this.props.state, this.props.chartDimensions.canvasWidth);
    var xScale = this.getXScale(filteredData, this.props);
    var yScale = this.getYScale(filteredData, this.props);
    return (
      <svg 
        width={this.props.chartDimensions.canvasWidth} 
        height={this.props.chartDimensions.canvasHeight}>
        <TimeSeries 
          filteredData={filteredData} 
          xScale={xScale} 
          yScale={yScale}
          horizontalSampleDistancePx={c.getHorizontalSampleDistancePx(filteredData.length, this.props.chartDimensions.canvasWidth)}
          graphPointsSelectionMode={this.props.state.graphPointsSelectionMode} 
          chartDimensions={this.props.chartDimensions}
        />
      </svg>
    );
  }
}