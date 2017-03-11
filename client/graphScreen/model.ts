import { Point2D } from '../scatterPlotWidget/models';
import { DateTimePoint } from '../linearChart/models/dateTimePoint';

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
  randomArrayOf2DPoints: Point2D[]
  randomArrayOfDateTimePoints: DateTimePoint[]
};