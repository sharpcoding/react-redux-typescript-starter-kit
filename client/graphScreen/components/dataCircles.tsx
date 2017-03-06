import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Point2D } from '../model';

export interface DataCirclesProps {
  xScale: (value: number) => number;
  yScale: (value: number) => number;
  data: Point2D[];
}

export class DataCircles extends React.Component<DataCirclesProps, void> {
  renderCircle(element: Point2D) {    
    var circleProps = {
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

export default DataCircles;