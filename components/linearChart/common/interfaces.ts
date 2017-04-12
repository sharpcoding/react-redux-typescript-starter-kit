import { Moment } from 'Moment';
import { DateTimePoint } from '../models/dateTimePoint';
import { EnumZoomSelected } from './enums';

/**
 * Describes a single cache entry
 */
export interface IDateTimePointSeriesCache {
  /**
   * Resample Factor - key for every cache entry
   */
  rFactor: number;

  /**
   * For a value set to true, for zoom level other than EnumZoomSelected.NoZoom,
   * zoomLvlSamples should be recalculated based on allSamples array
   * every time zoom level is changed.
   */
  resampleEveryTimeZoomLevelChanged: boolean;

  /**
   * If allowedForZoomOnly is false, contains samples after resampling, 
   * available for the maximum date range regardless the zooming level effect.
   * 
   * If allowedForZoomOnly is true, contains a reference to array 
   * of all the samples available / sent from backend. 
   */
  allSamples: DateTimePoint[];

  /**
   * Samples taken from allSamples - but only limited to a current zoom level.
   * Recalulated based on allSamples array every time zoom level gets changed.
   * So, makes sense in Zoom Level 1 or in Zoom Level 2.
   * If we seeing detailed view with, say, every second accuracy and 
   * we are in "Zoom Level 2", there is no point in scanning
   * millions of samples, that are present in all samples cache.
   */
  zoomLvlSamples: DateTimePoint[];
}


/**
 * Different read-only dimensions provided in creation time 
 */
export interface ILinearChartDimensions {
  canvasWidth: number;
  canvasHeight: number;
  paddingBottom: number;
  paddingTop: number;
  paddingLeft: number;
  paddingRight: number;
}

export interface ILinearChartZoomSettings {
  zoomSelected: EnumZoomSelected;
  zoomLevel1PointsFrom: Moment;
  zoomLevel1PointsTo: Moment;
  zoomLevel2PointsFrom: Moment;
  zoomLevel2PointsTo: Moment;
}