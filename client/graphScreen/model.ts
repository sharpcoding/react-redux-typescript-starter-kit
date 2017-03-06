export enum EnumSelectedChartType {
  Linear,
  Pie
}

export type Point2D = {
  x: number;
  y: number;
}

export type GraphScreenState = {
  chartType: EnumSelectedChartType,
  chartTypeToDescriptionMapping: Object,
  randomArrayOfPoints: Point2D[]
};