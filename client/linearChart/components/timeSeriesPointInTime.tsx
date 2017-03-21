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
  isSelected: boolean;
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
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
    return <circle {...circleProps} ref={(c) => {
      if (!_.isObject(c))
        return;
      let d3SelectionResult = d3.select(c);
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
    }} />;  
  }
}