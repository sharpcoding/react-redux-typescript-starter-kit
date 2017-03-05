export enum EnumSelectedChartType {
  Linear,
  Pie
}

export type GraphScreenState = {
  chartType: EnumSelectedChartType,
  chartTypeToDescriptionMapping: Object
};