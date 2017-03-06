import * as React from 'react';
import * as _ from 'lodash';
import { Point2D } from '../model';

export interface DataCircleProps {
  xScale: (value: number) => number;
  yScale: (value: number) => number;
  data: Point2D[];
}

export class DataCircle extends React.Component<DataCircleProps, void> {
  renderCircle(element: Point2D) {    
    const circleProps = {
      cx: this.props.xScale(element.x),
      cy: this.props.yScale(element.y),
      r: 2,
      key: _.indexOf(this.props.data, element)
    };
    return <circle {...circleProps} />;    
  };

  render() {
    return (
      <g>{ _.map(this.props.data, (el) => this.renderCircle(el)) }</g>      
    );
  }
}

export default DataCircle;