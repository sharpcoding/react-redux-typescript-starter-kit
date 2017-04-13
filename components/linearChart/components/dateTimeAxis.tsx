import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as d3 from 'd3';
import { ILinearChartDimensions } from '../common/interfaces';
import { EnumChartPointsSelectionMode } from '../common/enums';

export interface DateTimeAxisProps {
  chartDimensions: ILinearChartDimensions;  
  /**
   * placeholder for D3 function that calculates x-scale
   */
  xScale: (value: any) => any;
}

export class DateTimeAxis extends React.Component<DateTimeAxisProps, void> {
  getAxisTransform = ():string =>  {
    return `translate(0, ${this.props.chartDimensions.canvasHeight - this.props.chartDimensions.paddingBottom})`;
  }

  render() {    
    let self = this;
    return (
      <g 
        className="axis"
        transform={this.getAxisTransform()}
        ref={(c) => {
          if (!_.isObject(c))
            return;
          var axisBottom = d3.axisBottom(this.props.xScale);
          let d3SelectionResult = d3.select(c);
          d3SelectionResult.call(axisBottom);
        }} >
      </g>);
  }
}