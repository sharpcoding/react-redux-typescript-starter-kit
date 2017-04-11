import * as moment from 'Moment';
import { DateTimePoint } from '../models/dateTimePoint';
import { EnumZoomSelected } from '../components/enums';

/**
 * Cache entry
 */
export interface IDateTimePointSeriesCache {
  /**
   * Resample Factor - key for every cache entry
   */
  rFactor: number;

  /**
   * All samples after resampling available for the maximum date range
   * regardless the zooming level effect.
   */
  allSamples: DateTimePoint[];

  /**
   * Samples - but only limited to a current zoom level.
   * Makes sense in Zoom Level 1 or in Zoom Level 2.
   * If we seeing detailed view with, say, every second accuracy and 
   * we are in "Zoom Level 2", there is no point in scanning
   * millions of samples, that are present in all samples cache.
   */
  zoomLvlSamples: DateTimePoint[];
}


/**
 * Different read-only dimensions provided in creation time 
 */
export interface IChartDimensions {
  canvasWidth: number;
  canvasHeight: number;
  paddingBottom: number;
  paddingTop: number;
  paddingLeft: number;
  paddingRight: number;
}

export interface IChartZoomSettings {
  zoomSelected: EnumZoomSelected;
  zoomLevel1PointsFrom: moment.Moment;
  zoomLevel1PointsTo: moment.Moment;
  zoomLevel2PointsFrom: moment.Moment;
  zoomLevel2PointsTo: moment.Moment;
}