import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as d3 from 'd3';
import { EnumGraphPointsSelectionMode } from './enums';

export interface TimeSeriesPointInTimeProps {
  cx: number;
  cy: number;
  r: number,
  fill: string;
  unix: number;
  toggleSelected: Function;
  selectionActiveAreaHeightPx: number;
  isSelected: boolean;
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
  startedDragging: Function;
  beingDragged: Function;
  stoppedDragging: Function;
}

export class TimeSeriesPointInTime extends React.Component<TimeSeriesPointInTimeProps, void> {
  render() {
    var circleProps = {
      cx: this.props.cx,
      cy: this.props.cy,
      r: this.props.r,
      fill: this.props.fill
    };
    let self = this;
    return (
      <g>
        <rect 
          x={self.props.cx-self.props.r} 
          y={self.props.cy-(self.props.selectionActiveAreaHeightPx/2)} 
          width={self.props.r*2} 
          height={self.props.selectionActiveAreaHeightPx} 
          fill="white"
          opacity="0.0"
          ref={(c) => {
            if (!_.isObject(c))
              return;
            let d3SelectionResult = d3.select(c);            
            d3SelectionResult.on("mouseenter", null);
            switch (self.props.graphPointsSelectionMode) {
              case EnumGraphPointsSelectionMode.SelectMultiple:
              case EnumGraphPointsSelectionMode.UnselectMultiple:      
                d3SelectionResult.on("mouseenter", () => { self.props.toggleSelected(self.props.unix); });
                break;
            }
          }}
        />        
        <circle {...circleProps} ref={(c) => {
          if (!_.isObject(c))
            return;
          var selfReact = this;
          let d3SelectionResult = d3.select(c);
          d3SelectionResult.call(d3.drag()
            .on("start", () => selfReact.props.startedDragging())
            .on("drag", () => {
              d3SelectionResult.attr("cy", d3.event.y);
              selfReact.props.beingDragged(d3.event.x, d3.event.y, d3.event.y.toString());
            })
            .on("end", () => selfReact.props.stoppedDragging()));
          d3SelectionResult.style("cursor", "pointer");
          d3SelectionResult.on("click", null);
          d3SelectionResult.on("mouseenter", null);
          switch (self.props.graphPointsSelectionMode) {
            case EnumGraphPointsSelectionMode.SelectUnselectSingle:
              d3SelectionResult.on("click", () => self.props.toggleSelected(self.props.unix));
              break;
            case EnumGraphPointsSelectionMode.SelectMultiple:
            case EnumGraphPointsSelectionMode.UnselectMultiple:      
              d3SelectionResult.on("mouseenter", () => { self.props.toggleSelected(self.props.unix); });
              break;
          }
        }} />
      </g>);
  }
}