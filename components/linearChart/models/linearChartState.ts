import { Moment } from 'moment';
import { DateTimePoint } from './dateTimePoint';
import { EnumChartPointsSelectionMode } from '../common/enums';
import { ILinearChartZoomSettings, IDateTimePointSeriesCache } from '../common/interfaces';

export type LinearChartState = {
  /**
   * In the scrolling chart - the moment of time we currently see on x coordinate equal 0
   */
  windowDateFrom: Moment,
  /**
   * In the scrolling chart - the moment of time we currently see on x coordinate equal to full canvas width
   */
  windowDateTo: Moment,
  dateFromToMinimalWidthMinutes: number;  
  graphPointsSelectionMode: EnumChartPointsSelectionMode;
  chartZoomSettings: ILinearChartZoomSettings;
  allPoints: DateTimePoint[];
  allPointsFrom: Moment;
  allPointsTo: Moment;
  rFactorSampleCache: IDateTimePointSeriesCache[];
  /**
   * Minimum y-value as found in the allPoints non-cached array
   */
  yMinValue: number;
  /**
   * Maximum y-value as found in the allPoints non-cached array
   */
  yMaxValue: number;
  /**
   * Describes the declared density provided in data: DateTimePoint[] collection
   */
  secondsPerSample: number;
};