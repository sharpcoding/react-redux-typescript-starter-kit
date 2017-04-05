import * as moment from 'moment';
import { EnumGraphPointsSelectionMode } from '../LinearChart/components/enums';
import { DateTimePoint } from '../linearChart/models/dateTimePoint';

export type GraphScreenState = {
  dateFrom: moment.Moment,
  dateTo: moment.Moment,
  dateFromToMinimalWidthMinutes: number;  
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
  allPoints: DateTimePoint[];
  /**
   * Describes the declared density provided in data: DateTimePoint[] collection
   */
  secondsPerSample: number;
};