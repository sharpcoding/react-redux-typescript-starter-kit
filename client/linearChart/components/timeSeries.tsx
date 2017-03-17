import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as d3 from 'd3';
import { DateTimePoint } from '../models/DateTimePoint';

export interface TimeSeriesProps {
  xScale: (value: any) => any;
  yScale: (value: number) => number;
  displayDots: boolean;  
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

  renderCircle(element: DateTimePoint) {    
    var circleProps = {
      cx: this.props.xScale(element.time),
      cy: this.props.yScale(element.value),
      r: 4,
      key: _.indexOf(this.props.data, element),
      fill: "orange"
    };
    return <circle {...circleProps} ref={(c) => {
      if (_.isObject(c)) {
        //console.log(d3.select(c));
        d3.select(c).call(
          d3.drag()
            .on("start", (d) => {              
              d3.select(c).attr("fill", "red");
              {/*d3.select(this).raise().classed("active", true);*/}
            })
            .on("drag", (d) => {              
              {/*d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);*/}
            })
            .on("end", (d) => {               
               {/*d3.select(this).classed("active", false);*/}
            }));
      }
    }} />;
  };

  renderCircles() {
    if (this.props.displayDots)
      return _.map(this.props.data, (el) => this.renderCircle(el));
    return [];
  }

  render() {
    return (<g>
      <path d={this.getSvgPath()} fill="none" stroke="steelblue" />
      {this.renderCircles()}
    </g>);
  }
}

export default TimeSeries;