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
  componentDidUpdate() {
    console.log("componentDidUpdated");
    // this.renderPoints();
  }

  // componentDidMount() {
  //   this.renderPoints();
  // }

  getPath(): string {
    // var margin = {
    //   left: 0,
    //   top: 0
    // };
    // var p = this.refs['path'];

    // //dsds 

    var self = this;

    // var x = 0;
    var line = d3.line()
      .x(function(d: DateTimePoint) { return self.props.xScale(d.time); })
      .y(function(d: DateTimePoint) { return self.props.yScale(d.value); });

    return line(this.props.data);

    // var svg = d3.select("svg");//.call(magicD3Calls);
    // var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // g.append("path")
    //   .datum(this.props.data)
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-linejoin", "round")
    //   .attr("stroke-linecap", "round")
    //   .attr("stroke-width", 1.5)
    //   .attr("d", line);
  }

  render() {
    return (<g><path d={this.getPath()} /></g>);
  }
}

export default TimeSeries;