import * as React from 'react';
import Axis from './axis';

interface XYAxisProps {
  xScale: (value: number) => number;
  yScale: (value: number) => number;
  height: number;
  padding: number;  
}

export default class XYAxis extends React.Component<XYAxisProps, void> {
  render() {
    const xSettings = {
      translate: 'translate(0,' + (this.props.height - this.props.padding) + ')',
      scale: this.props.xScale,
      orient: 'bottom'
    };
    const ySettings = {
      translate: 'translate(' + this.props.padding + ', 0)',
      scale: this.props.yScale,
      orient: 'left'
    };
    return <g className="xy-axis">
      <Axis {...xSettings}/>
      <Axis {...ySettings}/>
    </g>
  }
}