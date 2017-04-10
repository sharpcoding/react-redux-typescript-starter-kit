import * as moment from 'moment';
import { EnumGraphPointsSelectionMode, EnumSliderWindowZoomLimitationMode } from '../LinearChart/components/enums';
import { DateTimePoint } from '../linearChart/models/dateTimePoint';

export type GraphScreenState = {
  windowDateFrom: moment.Moment,
  windowDateTo: moment.Moment,
  dateFromToMinimalWidthMinutes: number;  
  graphPointsSelectionMode: EnumGraphPointsSelectionMode;
  sliderWindowZoomLimitationMode: EnumSliderWindowZoomLimitationMode;
  allPoints: DateTimePoint[];
  allPointsFrom: moment.Moment;
  allPointsTo: moment.Moment;
  zoomLevel1PointsFrom: moment.Moment;
  zoomLevel1PointsTo: moment.Moment;
  yMinValue: number;
  yMaxValue: number;
  /**
   * Describes the declared density provided in data: DateTimePoint[] collection
   */
  secondsPerSample: number;
};