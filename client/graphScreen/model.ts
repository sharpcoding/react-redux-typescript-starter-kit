import * as moment from 'moment';
import { EnumGraphPointsSelectionMode } from '../LinearChart/components/enums';
import { DateTimePoint } from '../linearChart/models/dateTimePoint';

export type GraphScreenState = {
  dateFrom: moment.Moment,
  dateTo: moment.Moment,
  dateFromToMinimalWidthMinutes: number;  
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
  points: DateTimePoint[]
};