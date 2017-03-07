import * as React   from 'react';
import * as d3      from 'd3';
import * as _ from 'lodash';
import DataCircles  from './components/dataCircles';
import XYAxis       from './components/xyAxis';
import { Point2D } from './models';

export interface ScatterPlotProps {
  width: number;
  height: number;
  padding: number;
  data: Point2D[];
}

export class ScatterPlot extends React.Component<ScatterPlotProps, void> {
  xMax   = (data)  => d3.max(data, (d: Point2D) => d.x);
  yMax   = (data)  => d3.max(data, (d: Point2D) => d.y);
  
  getXScale = (props: ScatterPlotProps) => {
    return d3.scale.linear()
      .domain([0, this.xMax(props.data)])
      .range([props.padding, props.width - props.padding * 2]);
  };
  
  getYScale = (props: ScatterPlotProps) => {
    return d3.scale.linear()
      .domain([0, this.yMax(props.data)])
      .range([props.height - props.padding, props.padding]);
  };

  render() {
    var xScale = this.getXScale(this.props);
    var yScale = this.getYScale(this.props);
    return (
      <svg width={this.props.width} height={this.props.height}>
        <DataCircles data={this.props.data} xScale={xScale} yScale={yScale} />
        <XYAxis 
          height={this.props.height} 
          padding={this.props.padding}
          xScale={xScale} 
          yScale={yScale} />
      </svg>
    );
  }
}

export default ScatterPlot;