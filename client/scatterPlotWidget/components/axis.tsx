import * as React from 'react';
import * as d3    from 'd3';

interface AxisProps {
  scale: (value: number) => number;
  orient: string;
  translate: string;
}

export default class Axis extends React.Component<AxisProps, void> {
  componentDidUpdate() {
    this.renderAxis();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    var node  = this.refs['axis'];
    var axis = d3.svg.axis().orient(this.props.orient).ticks(5).scale(this.props.scale);
    d3.select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>
  }
}
