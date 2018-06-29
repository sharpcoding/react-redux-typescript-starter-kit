import * as _ from 'lodash';
import * as React from 'react';
import { IBubblePoint } from './models/bubble-point';
import { IXScale, IYScale } from './scales';

export interface IDotPlotterProps {
  xScale: IXScale;
  yScale: IYScale;
  dots: IBubblePoint[];
}

export const DotPlotter = (props: IDotPlotterProps) =>
  <g>
    {_.map(props.dots, (el: IBubblePoint, idx: number) =>
      <circle
        key={`circle_${idx}`}
        cx={props.xScale(el.x)}
        cy={props.yScale(el.y)}
        fill={el.color}
        r={el.r}
      />,
    )}
  </g>;