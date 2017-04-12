import { Moment } from 'moment';
import { DateTimePoint } from './dateTimePoint';
import { EnumGraphPointsSelectionMode } from '../common/enums';
import { ILinearChartZoomSettings, IDateTimePointSeriesCache } from '../common/interfaces';

export type LinearChartState = {
  /**
   * The moment of time we see on x coordinate equal 0
   */
  windowDateFrom: Moment,
  /**
   * The moment of time we see on x coordinate equal full component width px
   */
  windowDateTo: Moment,
  dateFromToMinimalWidthMinutes: number;  
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
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