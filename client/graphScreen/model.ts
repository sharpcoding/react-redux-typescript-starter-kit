import * as moment from 'moment';
import { IChartZoomSettings } from '../linearChart/common/interfaces';
import { EnumGraphPointsSelectionMode, EnumZoomSelected } from '../LinearChart/components/enums';
import { DateTimePoint } from '../linearChart/models/dateTimePoint';

export type GraphScreenState = {
  windowDateFrom: moment.Moment,
  windowDateTo: moment.Moment,
  dateFromToMinimalWidthMinutes: number;  
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
  chartZoomSettings: IChartZoomSettings;
  allPoints: DateTimePoint[];
  allPointsFrom: moment.Moment;
  allPointsTo: moment.Moment;
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