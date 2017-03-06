import { Point2D } from '../scatterPlotWidget/models';

export enum EnumSelectedChartType {
  Linear,
  Pie,
  Scatter
}

export type GraphScreenState = {
  chartType: EnumSelectedChartType,
  chartTypeToDescriptionMapping: Object,
  maxXAxisValue: number,
  maxYAxisValue: number,
  numberOfPoints: number,
  randomArrayOfPoints: Point2D[]
};