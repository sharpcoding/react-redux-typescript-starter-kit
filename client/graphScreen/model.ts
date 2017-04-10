import * as moment from 'moment';
import { EnumGraphPointsSelectionMode, EnumSliderWindowLimitation } from '../LinearChart/components/enums';
import { DateTimePoint } from '../linearChart/models/dateTimePoint';

export type GraphScreenState = {
  windowDateFrom: moment.Moment,
  windowDateTo: moment.Moment,
  dateFromToMinimalWidthMinutes: number;  
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
  sliderWindowZoomMode: EnumSliderWindowLimitation;
  allPoints: DateTimePoint[];
  allPointsFrom: moment.Moment;
  allPointsTo: moment.Moment;
  zoomPointsFrom: moment.Moment;
  zoomPointsTo: moment.Moment;
  yMinValue: number;
  yMaxValue: number;
  /**
   * Describes the declared density provided in data: DateTimePoint[] collection
   */
  secondsPerSample: number;
};