import * as d3 from 'd3';
import * as _ from 'lodash';
import * as React from 'react';
import { DotPlotter } from './dot-plotter';
import { IBubblePoint } from './model/bubble-point';

export { IBubblePoint };

export interface IBubbleChartProps {
  width: number;
  height: number;
  backgroundColor: string;
  dots: IBubblePoint[];
}

export const BubbleChart = (props: IBubbleChartProps) => {
  const getCssStyle = () => {
    return { backgroundColor: props.backgroundColor  };
  };

  const xScale = d3.scaleLinear()
    .domain([_.isEmpty(props.dots) ? 0 : _.minBy(props.dots, (d: IBubblePoint) => d.x).x,
             _.isEmpty(props.dots) ? 0 : _.maxBy(props.dots, (d: IBubblePoint) => d.x).x])
    .range([0, props.width]);

  const yScale = d3.scaleLinear()
    .domain([_.isEmpty(props.dots) ? 0 : _.minBy(props.dots, (d: IBubblePoint) => d.y).y,
             _.isEmpty(props.dots) ? 0 : _.maxBy(props.dots, (d: IBubblePoint) => d.y).y])
    .range([0, props.width]);

  return (
    <svg
      width={props.width}
      height={props.height}
      style={getCssStyle()}>
      <DotPlotter xScale={xScale} yScale={yScale} dots={props.dots} />
    </svg>
  );
};