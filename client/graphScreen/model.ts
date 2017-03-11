import * as moment from 'moment';
import { Point2D } from '../scatterPlotWidget/models';
import { DateTimePoint } from '../linearChart/models/dateTimePoint';

export type GraphScreenState = {
  dateFrom: moment.Moment,
  dateTo: moment.Moment,
  points: DateTimePoint[]
};