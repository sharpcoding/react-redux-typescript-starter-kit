import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as d3 from 'd3';

export interface TimeSeriesCircleProps {
  cx: number;
  cy: number;
  r: number,
  fill: string;
  unix: number;
  toggleSelected: Function;
  isSelected: boolean;
}

export class TimeSeriesCircle extends React.Component<TimeSeriesCircleProps, void> {
  render() {
    var circleProps = {
      cx: this.props.cx,
      cy: this.props.cy,
      r: this.props.r,
      fill: this.props.fill
    };
    var self = this;
    return <circle {...circleProps} ref={(c) => {
      if (_.isObject(c)) {
        d3.select(c).call(
          d3.drag()
            .on("start", (d) => {     
              self.props.toggleSelected(self.props.unix);
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
  }
}